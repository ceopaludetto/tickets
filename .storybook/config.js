import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { ThemeChanger } from "../src/client/components/logic";
import { Normalize } from "../src/client/components/primitives";

addDecorator(withA11y);

addDecorator(storyFn => (
  <ThemeChanger>
    <Normalize />
    {storyFn()}
  </ThemeChanger>
));

configure(require.context("../src", true, /\.stories\.ts/), module);
