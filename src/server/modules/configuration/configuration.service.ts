import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import fs from 'fs';

interface EnvConfig {
  [key: string]: string;
  MONGO_URI: string;
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
      MONGO_URI: Joi.string(),
      SECRET: Joi.string(),
    });

    const { error, value } = Joi.validate(config, EnvVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value as EnvConfig;
  };

  public get SECRET() {
    return this.envConfig.SECRET;
  }

  public get MONGO_URI() {
    return this.envConfig.MONGO_URI;
  }
}
