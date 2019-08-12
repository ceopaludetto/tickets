import React from 'react';
import { Helmet } from 'react-helmet';

export default function App() {
  return (
    <>
      <Helmet defaultTitle="Domus" titleTemplate="%s - Domus">
        <link
          rel="manifest"
          href={`${process.env.PUBLIC_PATH as string}public/manifest.json`}
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#23272A" />
      </Helmet>
    </>
  );
}
