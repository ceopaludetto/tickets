// export { ReactModule } from "./react/react.module";

import { Usuario } from './Usuario';
import { Empresa } from './Empresa';
import { Ticket } from './Ticket';
import { Label } from './Label';

export { ConfigurationModule, ConfigurationService } from './Configuration';
export { DatabaseModule, DatabaseProvider, InjectModel } from './Database';
export { AuthModule, AuthMiddleware, AuthService } from './Authentication';

// export { SecurityModule } from "./Security/security.module";
// export { SecurityResolver } from "./Security/security.resolver";

export { UsuarioModule, UsuarioService } from './Usuario';
export { EmpresaModule, EmpresaService } from './Empresa';
export { TicketModule, TicketService } from './Ticket';
export { LabelModule } from './Label';

export const Entities = [Usuario, Empresa, Ticket, Label];
