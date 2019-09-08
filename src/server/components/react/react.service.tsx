/* eslint-disable react/no-danger */
import React, { StrictMode } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ApolloProvider } from '@apollo/react-common';
import { getDataFromTree } from '@apollo/react-ssr';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import ReactApp from '@/client/bootstrap';
import { ContextType, ReactContextType } from '@/server/utils/common.dto';
import { createClient } from '@/client/providers/apollo';
import { SCHEMA_LINK } from '@/server/utils/constants';

@Injectable()
export class ReactService {
  private schemaLink: SchemaLink;

  public constructor(@Inject(SCHEMA_LINK) schemaLink: SchemaLink) {
    this.schemaLink = schemaLink;
  }

  public render({ req, res }: ContextType) {
    const client = createClient(true, this.schemaLink);
    const context: ReactContextType = {};
    const extractor = new ChunkExtractor({
      statsFile: process.env.MANIFEST as string,
    });
    const sheet = new ServerStyleSheet();

    if (req.user) {
      client.cache.writeData({
        data: {
          logged: true,
          userId: req.user._id,
        },
      });
    } else {
      client.cache.writeData({
        data: {
          logged: false,
          userId: null,
        },
      });
    }

    const App = (
      <StrictMode>
        <ChunkExtractorManager extractor={extractor}>
          <StyleSheetManager sheet={sheet.instance}>
            <ApolloProvider client={client}>
              <StaticRouter context={context} location={req.url}>
                <ReactApp />
              </StaticRouter>
            </ApolloProvider>
          </StyleSheetManager>
        </ChunkExtractorManager>
      </StrictMode>
    );

    try {
      getDataFromTree(App).then(() => {
        const markup = renderToString(App);
        const initialState = client.extract();

        if (context.url) {
          return res.redirect(context.url);
        }

        const helmet = Helmet.renderStatic();

        return res.send(
          '<!DOCTYPE html>'.concat(
            this.html(markup, helmet, extractor, sheet, initialState)
          )
        );
      });
    } catch (err) {
      throw new BadRequestException('Erro ao coletar estilos');
    }
  }

  private html = (
    markup: string,
    helmet: HelmetData,
    extractor: ChunkExtractor,
    sheet: ServerStyleSheet,
    initialState: NormalizedCacheObject
  ) => {
    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getScriptElements();

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    const styleSheetEls = sheet.getStyleElement();
    sheet.seal();

    return renderToStaticMarkup(
      <html lang="pt-BR" {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {linkEls}
          {styleEls}
          {styleSheetEls}
        </head>
        <body {...bodyAttrs}>
          <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                initialState
              ).replace(/</g, '\\u003c')};`,
            }}
          />
          {scriptEls}
        </body>
      </html>
    );
  };
}
