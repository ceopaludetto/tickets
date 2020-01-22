/* eslint-disable react/no-danger */
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { ChunkExtractorManager, ChunkExtractor } from '@loadable/server';
import { Injectable, BadRequestException } from '@nestjs/common';

import ReactApp from '@/client/bootstrap';
import { createReduxStore } from '@/client/providers/store';
import { loginSuccess } from '@/client/services/ducks/auth/actions';
import { getInitialContent } from '@/client/utils/prefetch.routes';
import { UsuarioService } from '@/server/components/usuario';
import { ContextType, ReactContextType } from '@/server/utils/common.dto';

@Injectable()
export class ReactService {
  public constructor(private readonly usuarioService: UsuarioService) {}

  public async render({ req, res }: ContextType) {
    try {
      const extractor = new ChunkExtractor({
        statsFile: process.env.MANIFEST as string,
      });
      const context: ReactContextType = {};
      const helmetContext: FilledContext | {} = {};
      const { store, tasks } = createReduxStore();

      if (process.env.NODE_ENV === 'production') {
        res.cookie('XSRF-TOKEN', req.csrfToken());
      }

      if (req.user) {
        const user = await this.usuarioService.findOne(req.user.id);

        if (!user) {
          throw new BadRequestException('Erro ao encontrar usuário');
        }

        store.dispatch(loginSuccess(user));
      }

      await getInitialContent(store.dispatch, req.url);
      await tasks.toPromise();

      const markup = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter context={context} location={req.url}>
              <Provider store={store}>
                <ReactApp />
              </Provider>
            </StaticRouter>
          </HelmetProvider>
        </ChunkExtractorManager>
      );

      if (context.url) {
        return res.redirect(context.url);
      }

      const initialState = store.getState();

      return res.send(this.html(markup, initialState, extractor, (helmetContext as FilledContext).helmet));
    } catch (err) {
      throw new BadRequestException(err);
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
