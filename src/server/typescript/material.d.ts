import { Jss, GenerateId } from 'jss';

declare module '@material-ui/styles' {
  interface StylesOptions {
    disableGeneration?: boolean;
    generateClassName?: GenerateId;
    serverGenerateClassName?: GenerateId;
    injectFirst?: boolean;
    jss?: Jss;
    sheetsCache?: {};
    sheetsManager?: {};
    sheetsRegistry?: {};
  }

  interface StylesProviderProps extends StylesOptions {
    children: React.ReactNode;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  export const StylesProvider: React.ComponentType<StylesProviderProps>;
}
