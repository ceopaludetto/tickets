import React from 'react'
import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { HelmetProvider } from 'react-helmet-async'

import { ThemeChanger } from '@/client/components/logic'
import '@/client/scss/normalize.scss';

addDecorator((storyFn) => <HelmetProvider><ThemeChanger>{storyFn()}</ThemeChanger></HelmetProvider>)

addDecorator(withA11y);

configure(require.context("../src", true, /\.stories\.ts/), module);
