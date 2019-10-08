import React from 'react';
import { Divider, Container, Typography } from '@material-ui/core';
import { HelmetProps, Helmet } from 'react-helmet';

import { useStyles } from './styles';

interface PageProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode | React.ReactNodeArray;
  helmetProps?: HelmetProps;
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
      <Helmet {...helmetProps}>{helmetChildren}</Helmet>
      <Container fixed={notFluid}>
        <>
          <div className={classes.header}>
            <div className={classes.content}>
              <Typography color="primary" variant="button">
                {subTitle}
              </Typography>
              <Typography variant="h4" gutterBottom>
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
