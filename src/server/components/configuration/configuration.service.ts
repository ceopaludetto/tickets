import dotenv from 'dotenv';
import fs from 'fs';
import * as Yup from 'yup';

interface EnvConfig {
  [key: string]: string;
  MONGO_URI: string;
  SECRET: string;
}

const EnvSchema = Yup.object().shape({
  MONGO_URI: Yup.string().required('Campo obrigatório'),
  SECRET: Yup.string().required('Campo obrigatório'),
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
}
