import { SetMetadata } from '@nestjs/common';

import { Role } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR } from '@/server/utils/constants';

export const UseRole = (role: Role) =>
  SetMetadata(SECURITY_ROLE_DECORATOR, role);
