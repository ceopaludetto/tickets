import yaml from 'yaml';
import path from 'path';
import fs from 'fs';
import * as Yup from 'yup';

interface EnvConfig {
  database: {
    dialect: 'postgres' | 'sqlite';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize?: boolean;
  };
  auth: {
    secret: string;
  };
  email: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

const EnvSchema = Yup.object().shape({
  database: Yup.object().shape({
    dialect: Yup.string()
      .required('Campo obrigatório')
      .oneOf(['postgres', 'sqlite']),
    host: Yup.string().required('Campo obrigatório'),
    port: Yup.number().required('Campo obrigatório'),
    username: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    database: Yup.string().required('Campo obrigatório'),
    synchronize: Yup.boolean().notRequired(),
  }),
  auth: Yup.object().shape({
    secret: Yup.string().required('Campo obrigatório'),
  }),
  email: Yup.object().shape({
    host: Yup.string().required('Campo obrigatório'),
    port: Yup.number().required('Campo obrigatório'),
    username: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  }),
});

export class ConfigurationService {
  private readonly envConfig: EnvConfig;

  public constructor(filePath: string) {
    const config = yaml.parse(fs.readFileSync(filePath, 'UTF-8'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput = (config: any) => {
    const isValid = EnvSchema.isValidSync(config);

    if (!isValid) {
      throw new Error('Invalid .yml configuration');
    }

    return config as EnvConfig;
  };

  public get auth() {
    return this.envConfig.auth;
  }

  public get database() {
    return this.envConfig.database;
  }

  public get email() {
    return this.envConfig.email;
  }

  // eslint-disable-next-line class-methods-use-this
  public get templates() {
    return path.resolve('src', 'server', 'templates');
  }
}
