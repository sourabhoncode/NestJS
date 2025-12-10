import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const RoleRequired = (role: Role) => SetMetadata('role', role);
