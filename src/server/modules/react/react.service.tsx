import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Injectable } from '@nestjs/common';

import ReactApp from '@/client/bootstrap';
import { ContextType } from '@/server/utils/common.dto';

interface Context {
  url?: string;
}

@Injectable()
export class ReactService {
  public render({ req, res }: ContextType) {
    const context: Context = {};
    const extractor = new ChunkExtractor({
      statsFile: process.env.MANIFEST as string,
    });

    const markup = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StaticRouter context={context} location={req.url}>
          <ReactApp />
        </StaticRouter>
      </ChunkExtractorManager>
    );
    if (context.url) {
      return res.redirect(context.url);
    }

    const helmet = Helmet.renderStatic();
    return res.send(
      '<!DOCTYPE html>'.concat(this.html(markup, helmet, extractor))
    );
  }

  private html = (
    markup: string,
    helmet: HelmetData,
    extractor: ChunkExtractor
  ) => {
    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements();
    const scriptEls = extractor.getStyleElements();

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return renderToStaticMarkup(
      <html lang="en" {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {linkEls}
          {styleEls}
        </head>
        <body {...bodyAttrs}>
          {/* eslint-disable-next-line */}
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {scriptEls}
        </body>
      </html>
    );
  };
}
