/* eslint-disable react/no-danger */
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ChunkExtractorManager, ChunkExtractor } from '@loadable/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import { CacheProvider } from '@emotion/core';
import { Provider } from 'react-redux';

import ReactApp from '@/client/bootstrap';
import { createReduxStore } from '@/client/providers/store';
import { generateCache } from '@/client/providers/emotion.cache';
import { Types } from '@/client/services/ducks/auth';
import { ContextType, ReactContextType } from '@/server/utils/common.dto';

@Injectable()
export class ReactService {
  public async render({ req, res }: ContextType) {
    try {
      const cache = generateCache();
      const extractor = new ChunkExtractor({
        statsFile: process.env.MANIFEST as string,
      });
      const context: ReactContextType = {};
      const helmetContext: FilledContext | {} = {};
      const store = createReduxStore();

      if (req.user) {
        store.dispatch({
          type: Types.LOGIN_SUCCESS,
          payload: {
            data: req.user,
          },
        });
      }

      const markup = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <CacheProvider value={cache}>
            <HelmetProvider context={helmetContext}>
              <StaticRouter context={context} location={req.url}>
                <Provider store={store}>
                  <ReactApp />
                </Provider>
              </StaticRouter>
            </HelmetProvider>
          </CacheProvider>
        </ChunkExtractorManager>
      );

      if (context.url) {
        return res.redirect(context.url);
      }

      const initialState = store.getState();

      return res.send(this.html(markup, initialState, extractor, (helmetContext as FilledContext).helmet));
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Erro ao coletar estilos');
    }
  }

  private html = (markup: string, initialState: {}, extractor: ChunkExtractor, helmet: FilledContext['helmet']) => {
    const { htmlAttributes, bodyAttributes } = helmet;

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getScriptElements();

    return '<!DOCTYPE html>'.concat(
      renderToStaticMarkup(
        <html lang="pt-BR" {...htmlAttributes.toComponent()}>
          <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {linkEls}
            {styleEls}
          </head>
          <body {...bodyAttributes.toComponent()}>
            <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__PRELOADED_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};`,
              }}
            />
            {scriptEls}
          </body>
        </html>
      )
    );
  };
}
