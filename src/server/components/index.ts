// export { ReactModule } from "./react/react.module";

import { Usuario } from './Usuario/usuario.entity';
import { Empresa } from './Empresa/empresa.entity';

export { AuthModule } from './Authentication';

export { ConfigurationModule, ConfigurationService } from './Configuration';

// export { SecurityModule } from "./Security/security.module";
// export { SecurityResolver } from "./Security/security.resolver";

export { DatabaseModule, InjectModel } from './Database';

export { UsuarioModule, UsuarioService } from './Usuario';

export { EmpresaModule, EmpresaService } from './Empresa';

export const Entities = [Usuario, Empresa];
