import React from 'react';
import { Field } from 'formik';
import { Checkbox } from 'formik-material-ui';
import {
  IconButton,
  FormControlLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import { TodayOutlined } from '@material-ui/icons';

import { FormikDatePicker, FormikField } from '@/client/components/composed';
import * as validations from '@/client/providers/validations/masks';
import { useMultipleVisibility } from '@/client/utils';
import { useRenderStyles } from './styles';

interface RenderStepProps {
  currentPage: number;
}

export function RenderStep({ currentPage }: RenderStepProps) {
  const classes = useRenderStyles();
  const { toggleVisibility, renderVisibility } = useMultipleVisibility<
    ('senha' | 'confirmar')[]
  >(['senha', 'confirmar']);

  if (currentPage === 0) {
    return (
      <>
        <div className={classes.fieldContainer}>
          <div className={classes.field}>
            <FormikField label="Nome" id="nome" name="nome" />
          </div>
          <div className={classes.field}>
            <FormikField label="Sobrenome" id="sobrenome" name="sobrenome" />
          </div>
        </div>
        <FormikField label="Email" id="email" name="email" />
        <div className={classes.fieldContainer}>
          <div className={classes.field}>
            <FormikField
              label="Telefone"
              id="telefone"
              name="telefone"
              mask
              replace={validations.cel.mask}
              format={validations.cel.formatter}
            />
          </div>
          <div className={classes.field}>
            <FormikDatePicker
              disableFuture
              keyboardIcon={<TodayOutlined />}
              okLabel="OK"
              cancelLabel="Cancelar"
              format="dd/MM/yyyy"
              label="Data de Nascimento"
              id="nascimento"
              name="nascimento"
              invalidDateMessage="Data inválida"
            />
          </div>
        </div>
      </>
    );
  }

  if (currentPage === 1) {
    return (
      <>
        <div className={classes.fieldContainer}>
          <div className={classes.field}>
            <FormikField
              label="Senha"
              id="senha"
              name="senha"
              type={renderVisibility('senha', 'text', 'password')}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={renderVisibility(
                      'senha',
                      'Esconder senha',
                      'Ver senha'
                    )}
                    type="button"
                    onClick={toggleVisibility('senha')}
                  >
                    {renderVisibility('senha')}
                  </IconButton>
                ),
              }}
            />
            <FormikField
              label="Confirmar Senha"
              id="rsenha"
              name="rsenha"
              type={renderVisibility('confirmar', 'text', 'password')}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={renderVisibility(
                      'confirmar',
                      'Esconder Confirmar Senha',
                      'Ver Confirmar Senha'
                    )}
                    type="button"
                    onClick={toggleVisibility('confirmar')}
                  >
                    {renderVisibility('confirmar')}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className={classes.field}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="subtitle2" gutterBottom color="secondary">
                Dicas de senha
              </Typography>
              <Typography variant="body2" color="textPrimary">
                No mínimo 8 caracteres;
                <br />
                Pelo menos 1 caractere especial;
                <br />
                Pelo menos 1 caractere maiúsculo.
              </Typography>
            </Paper>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FormControlLabel
        label="Criar empresa?"
        control={
          <Field name="hasEmpresa" id="hasEmpresa" component={Checkbox} />
        }
      />
      <div className={classes.fieldContainer}>
        <div className={classes.field}>
          <FormikField
            label="CNPJ"
            id="cnpj"
            name="cnpj"
            format={validations.cnpj.formatter}
            replace={validations.cnpj.mask}
            mask
          />
        </div>
        <div className={classes.field}>
          <FormikField
            label="Razão Social"
            id="razaoSocial"
            name="razaoSocial"
          />
        </div>
      </div>
      <div className={classes.fieldContainer}>
        <div className={classes.field}>
          <FormikField
            label="Nome Fantasia"
            id="nomeFantasia"
            name="nomeFantasia"
          />
        </div>
        <div className={classes.field}>
          <FormikField
            label="Nome Completo"
            id="nomeCompleto"
            name="nomeCompleto"
          />
        </div>
      </div>
      <FormikField label="Email" id="empresaEmail" name="empresaEmail" />
      <div className={classes.fieldContainer}>
        <div className={classes.field}>
          <FormikField
            label="Telefone"
            id="empresaTelefone"
            name="empresaTelefone"
            format={validations.fixed.formatter}
            replace={validations.fixed.mask}
            mask
          />
        </div>
        <div className={classes.field}>
          <FormikField label="Site" id="site" name="site" />
        </div>
      </div>
      <div className={classes.fieldContainer}>
        <div className={classes.field}>
          <FormikField label="Endereço" id="endereco" name="endereco" />
        </div>
        <div className={classes.field}>
          <FormikField
            label="CEP"
            id="cep"
            name="cep"
            format={validations.cep.formatter}
            replace={validations.cep.mask}
            mask
          />
        </div>
      </div>
    </>
  );
}
