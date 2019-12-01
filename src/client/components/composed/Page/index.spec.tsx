import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow } from '@material-ui/core/test-utils';

import { Page } from './index';
import { theme } from '@/client/providers/theme';

describe('Page', () => {
  let shallow: ReturnType<typeof createShallow>;
  beforeAll(() => {
    shallow = createShallow({ disableLifecycleMethods: true });
  });

  it('should render', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Page title="test" />
      </ThemeProvider>
    ).dive();

    expect(wrapper.is('Page')).toBe(true);
  });

  it("shouldn't render subtitle", () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Page title="test" />
      </ThemeProvider>
    ).render();

    expect(wrapper.find('small').length).toBe(0);
  });

  it('should render subtitle', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Page title="test" subTitle="subTest" />
      </ThemeProvider>
    ).render();

    expect(wrapper.find('small').text()).toBe('subTest');
  });
});
