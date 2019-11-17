import React from 'react';
import { Divider, Container, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';

import { useStyles } from './styles';

interface PageProps {
  title: string;
  subTitle?: string;
  children?: React.ReactNode | React.ReactNodeArray;
  helmetProps?: Helmet['props'];
  helmetChildren?: React.ReactNode | React.ReactNodeArray;
  notFluid?: boolean;
  footer?: React.ReactNode | React.ReactNodeArray;
  append?: React.ReactNode | React.ReactNodeArray;
}

export function Page({
  children,
  title,
  subTitle,
  helmetProps,
  helmetChildren,
  notFluid = false,
  footer,
  append,
}: PageProps) {
  const classes = useStyles({
    hasFooter: !!footer,
  });

  return (
    <>
      {(helmetChildren || helmetProps) && <Helmet {...helmetProps}>{helmetChildren}</Helmet>}
      <Container fixed={notFluid} maxWidth={false} classes={{ root: classes.container }}>
        <>
          <div className={classes.header}>
            <div className={clsx(classes.content, classes.full)}>
              {subTitle && (
                <Typography variant="button" component="small" color="secondary">
                  {subTitle}
                </Typography>
              )}
              <Typography variant="h4" component="h4" gutterBottom>
                {title}
              </Typography>
            </div>
            {append && <div className={classes.content}>{append}</div>}
          </div>
          {!footer && <Divider />}
          {footer && <div className={classes.footer}>{footer}</div>}
          <>{children}</>
        </>
      </Container>
    </>
  );
}
