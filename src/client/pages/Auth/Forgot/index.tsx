import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik, Form } from 'formik';
import { Typography, Button, Divider, Link } from '@material-ui/core';

import { FormikField, PrefetchLink } from '@/client/components/composed';
import { useStyles } from './styles';

export default function Forgot() {
  const classes = useStyles();

  return (
    <>
      <Helmet title="Esqueceu a senha" />
      <div className={classes.form}>
        <Typography variant="h4">Recuperar a senha!</Typography>
        <Typography variant="button" gutterBottom color="secondary">
          Esqueceu
        </Typography>
        <Formik initialValues={{ email: '' }} onSubmit={() => {}}>
          <Form>
            <FormikField name="email" id="email" label="Email" />
            <div className={classes.buttonMargin}>
              <Button variant="contained" color="primary" type="submit">
                Recuperar
              </Button>
            </div>
            <Divider />
            <div className={classes.topOr}>
              select with languages
              <Link color="secondary" component={PrefetchLink} to="/auth/login">
                Está perdido?
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
