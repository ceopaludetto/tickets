import { Usuario } from './usuario';
import { Empresa } from './empresa';
import { Ticket } from './ticket';
import { Perfil, Politica } from './perfil';
import { Label } from './label';

export { ConfigurationModule, ConfigurationService } from './configuration';
export { DatabaseModule, DatabaseProvider, InjectModel } from './database';
export { AuthModule, AuthMiddleware, AuthService } from './authentication';
export { ReactModule } from './react';

// export { SecurityModule } from "./Security/security.module";
// export { SecurityResolver } from "./Security/security.resolver";

export { UsuarioModule, UsuarioService } from './usuario';
export { EmpresaModule, EmpresaService } from './empresa';
export { TicketModule, TicketService } from './ticket';
export { LabelModule, LabelService } from './label';
export { PerfilModule, PerfilService } from './perfil';

export const Entities = [Usuario, Empresa, Ticket, Label, Perfil, Politica];
