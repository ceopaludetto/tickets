import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import fs from 'fs';

interface EnvConfig {
  [key: string]: string | number;
  PORT: number;
  HOST: string;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
  SECRET: string;
}

export class ConfigurationService {
  private readonly envConfig: EnvConfig;

  public constructor(filePath: string) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private validateInput = (config: any) => {
    const EnvVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number(),
      HOST: Joi.string(),
      USERNAME: Joi.string(),
      PASSWORD: Joi.string(),
      DATABASE: Joi.string(),
      SECRET: Joi.string(),
    });

    const { error, value } = Joi.validate(config, EnvVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value as EnvConfig;
  };

  public get PORT() {
    return this.envConfig.PORT;
  }

  public get HOST() {
    return this.envConfig.HOST;
  }

  public get USERNAME() {
    return this.envConfig.USERNAME;
  }

  public get PASSWORD() {
    return this.envConfig.PASSWORD;
  }

  public get DATABASE() {
    return this.envConfig.DATABASE;
  }

  public get SECRET() {
    return this.envConfig.SECRET;
  }
}
