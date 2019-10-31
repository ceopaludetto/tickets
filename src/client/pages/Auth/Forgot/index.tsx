import React from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { Typography, Button } from '@material-ui/core';

import { FormikField } from '@/client/components/composed';
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableRipple
                disableTouchRipple
                type="submit"
                fullWidth
              >
                Recuperar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
