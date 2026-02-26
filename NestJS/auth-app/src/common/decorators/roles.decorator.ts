import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// Key used to store roles metadata on route handlers
export const ROLES_KEY = 'roles';

// Custom decorator: @Roles(Role.ADMIN) — attaches required roles to a route
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
