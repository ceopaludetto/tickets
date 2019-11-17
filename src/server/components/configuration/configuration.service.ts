import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import * as Yup from 'yup';

interface EnvConfig {
  [key: string]: string | number;
  MONGO_URI: string;
  SECRET: string;
  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_PORT: number;
  DEFAULT_MAIL: string;
}

const EnvSchema = Yup.object().shape({
  MONGO_URI: Yup.string().required('Campo obrigatório'),
  SECRET: Yup.string().required('Campo obrigatório'),
  SMTP_HOST: Yup.string().required('Campo obrigatório'),
  SMTP_USER: Yup.string().required('Campo obrigatório'),
  SMTP_PASS: Yup.string().required('Campo obrigatório'),
  SMTP_PORT: Yup.string().required('Campo obrigatório'),
  DEFAULT_MAIL: Yup.string().required('Campo obrigatório'),
});

export class ConfigurationService {
  private readonly envConfig: EnvConfig;

  public constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private validateInput = (config: any) => {
    const isValid = EnvSchema.isValidSync(config);

    if (!isValid) {
      throw new Error('Invalid .env configuration');
    }

    return config as EnvConfig;
  };

  public get SECRET() {
    return this.envConfig.SECRET;
  }

  public get MONGO_URI() {
    return this.envConfig.MONGO_URI;
  }

  public get SMTP_HOST() {
    return this.envConfig.SMTP_HOST;
  }

  public get SMTP_USER() {
    return this.envConfig.SMTP_USER;
  }

  public get SMTP_PASS() {
    return this.envConfig.SMTP_PASS;
  }

  public get SMTP_PORT() {
    return this.envConfig.SMTP_PORT;
  }

  public get DEFAULT_MAIL() {
    return this.envConfig.DEFAULT_MAIL;
  }

  // eslint-disable-next-line class-methods-use-this
  public get TEMPLATES() {
    return path.resolve('src', 'server', 'templates');
  }
}
