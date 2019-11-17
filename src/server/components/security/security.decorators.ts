import { SetMetadata } from '@nestjs/common';

import { Role, CustomMatcherOptions } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR, SECURITY_CUSTOM_MATCHER_DECORATOR } from '@/server/utils/constants';

export const UseRole = (role: Role) => SetMetadata(SECURITY_ROLE_DECORATOR, role);

export const UseCustomMatcher = (cm: CustomMatcherOptions) => SetMetadata(SECURITY_CUSTOM_MATCHER_DECORATOR, cm);
