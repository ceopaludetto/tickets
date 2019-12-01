import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';

import { PrefetchLink } from './index';

describe('PrefetchLink', () => {
  it('should render', () => {
    const wrapper = shallow(
      <MockedProvider>
        <PrefetchLink to="/app" />
      </MockedProvider>,
      { disableLifecycleMethods: true }
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper.is('ForwardRef')).toBe(true);
  });

  it('should render as anchor', () => {
    const wrapper = render(
      <MemoryRouter>
        <MockedProvider>
          <PrefetchLink to="/app" />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(wrapper.is('a')).toBe(true);
  });

  it('should render children text', () => {
    const wrapper = render(
      <MemoryRouter>
        <MockedProvider>
          <PrefetchLink to="/app">teste</PrefetchLink>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(wrapper.html()).toBe('teste');
  });

  it('should require module on click', () => {
    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider>
          <PrefetchLink to="/app">teste</PrefetchLink>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(wrapper.find('Link')).toHaveLength(1);

    wrapper.find('Link').simulate('click');
  });
});
