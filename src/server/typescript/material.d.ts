declare module '@material-ui/styles' {
  interface StylesOptions {
    disableGeneration?: boolean;
    generateClassName?: GenerateId;
    serverGenerateClassName?: GenerateId;
    injectFirst?: boolean;
    jss?: Jss;
    // TODO need info @oliviertassinari
    sheetsCache?: {};
    // TODO need info @oliviertassinari
    sheetsManager?: {};
    // TODO need info @oliviertassinari
    sheetsRegistry?: {};
  }

  interface StylesProviderProps extends StylesOptions {
    children: React.ReactNode;
  }

  export declare const StylesProvider: React.ComponentType<StylesProviderProps>;
}
