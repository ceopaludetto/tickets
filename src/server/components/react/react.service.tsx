/* eslint-disable react/no-danger */
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ApolloProvider } from '@apollo/react-common';
import { getDataFromTree } from '@apollo/react-ssr';
import { SchemaLink } from 'apollo-link-schema';
import { StylesProvider } from '@material-ui/styles';
import { SheetsRegistry } from 'jss';
import { ChunkExtractorManager, ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import ReactApp from '@/client/bootstrap';
import { ContextType, ReactContextType } from '@/server/utils/common.dto';
import { createClient } from '@/client/providers/apollo';
import { SCHEMA_LINK } from '@/server/utils/constants';
import { createClassGenerator } from '@/client/providers/theme';

@Injectable()
export class ReactService {
  private schemaLink: SchemaLink;

  public constructor(@Inject(SCHEMA_LINK) schemaLink: SchemaLink) {
    this.schemaLink = schemaLink;
  }

  public async render({ req, res }: ContextType) {
    const generateClassName = createClassGenerator();
    const client = createClient(true, this.schemaLink);
    const extractor = new ChunkExtractor({
      statsFile: process.env.MANIFEST as string,
    });
    const sheetsRegistry = new SheetsRegistry();
    const context: ReactContextType = {};

    if (req.user) {
      client.cache.writeData({
        data: {
          logged: true,
        },
      });
    } else {
      client.cache.writeData({
        data: {
          logged: false,
        },
      });
    }

    const App = (
      <ChunkExtractorManager extractor={extractor}>
        <StylesProvider
          serverGenerateClassName={generateClassName}
          generateClassName={generateClassName}
          sheetsManager={new Map()}
          sheetsRegistry={sheetsRegistry}
        >
          <ApolloProvider client={client}>
            <StaticRouter context={context} location={req.url}>
              <ReactApp />
            </StaticRouter>
          </ApolloProvider>
        </StylesProvider>
      </ChunkExtractorManager>
    );

    try {
      await getDataFromTree(App);

      const markup = renderToString(App);
      const initialState = client.extract();

      if (context.url) {
        return res.redirect(context.url);
      }

      return res.send(
        this.html(markup, initialState, extractor, sheetsRegistry)
      );
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Erro ao coletar estilos');
    }
  }

  private html = (
    markup: string,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    sheetsRegistry: SheetsRegistry
  ) => {
    const { htmlAttributes, bodyAttributes, ...helmet } = Helmet.renderStatic();

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getScriptElements();

    const styleMUI = sheetsRegistry.toString();

    return '<!DOCTYPE html>'.concat(
      renderToStaticMarkup(
        <html lang="pt-BR" {...htmlAttributes.toComponent()}>
          <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {linkEls}
            {styleEls}
            {/* eslint-disable-next-line react/no-danger */}
            <style id="ssr" dangerouslySetInnerHTML={{ __html: styleMUI }} />
          </head>
          <body {...bodyAttributes.toComponent()}>
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
      )
    );
  };
}
