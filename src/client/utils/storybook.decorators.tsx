import React from 'react';

import clsx from 'clsx';

import u from '@/client/scss/utils.scss';

export const AlignToCenterWithMaxWidth = (storyFn: () => JSX.Element) => (
  <div className={clsx(u['xs:d-flex'], u['xs:h-100vh'], u['xs:ai-center'], u['xs:jc-center'])}>
    <div className={clsx(u['xs:w-100'], u['xs:mw-8'])}>{storyFn()}</div>
  </div>
);

export const AlignToCenter = (storyFn: () => JSX.Element) => (
  <div className={clsx(u['xs:d-flex'], u['xs:h-100vh'], u['xs:ai-center'], u['xs:jc-center'])}>{storyFn()}</div>
);
