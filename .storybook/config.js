import React from 'react'
import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { createReduxStore } from '@/client/providers/store';
import '@/client/scss/normalize.scss';

const { store } = createReduxStore();

addDecorator((storyFn) => <HelmetProvider><Provider store={store}><BrowserRouter>{storyFn()}</BrowserRouter></Provider></HelmetProvider>)

addDecorator(withA11y);

configure(require.context("../src", true, /\.stories\.ts/), module);
