/* eslint-disable react/no-danger */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ApolloProvider } from '@apollo/react-common';
import { renderToStringWithData } from '@apollo/react-ssr';
import { SchemaLink } from 'apollo-link-schema';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { SheetsRegistry } from 'jss';
import { ChunkExtractorManager, ChunkExtractor } from '@loadable/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
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
    const helmetContext: FilledContext | {} = {};

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
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */}
        {/* 
          // @ts-ignore */}
        <StylesProvider
          serverGenerateClassName={generateClassName}
          generateClassName={generateClassName}
          sheetsManager={new Map()}
          sheetsRegistry={sheetsRegistry}
        >
          <HelmetProvider context={helmetContext}>
            <ApolloProvider client={client}>
              <StaticRouter context={context} location={req.url}>
                <ReactApp />
              </StaticRouter>
            </ApolloProvider>
          </HelmetProvider>
        </StylesProvider>
      </ChunkExtractorManager>
    );

    try {
      const markup = await renderToStringWithData(App);
      const initialState = client.extract();

      if (context.url) {
        return res.redirect(context.url);
      }

      return res.send(
        this.html(markup, initialState, extractor, sheetsRegistry, (helmetContext as FilledContext).helmet)
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw new BadRequestException('Erro ao coletar estilos');
    }
  }

  private html = (
    markup: string,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    sheetsRegistry: SheetsRegistry,
    helmet: FilledContext['helmet']
  ) => {
    const { htmlAttributes, bodyAttributes } = helmet;

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
                __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};`,
              }}
            />
            {scriptEls}
          </body>
        </html>
      )
    );
  };
}
