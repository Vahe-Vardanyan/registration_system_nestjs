import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./role.enum";
import { UserDto } from "../user/dto/user.dto";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assuming user roles are now stored directly in the user object.

        if (!user || !user.roles || user.roles.length === 0) {
            return false; // No user or no roles, access denied.
        }

        return requiredRoles.some((role) => user.roles.includes(role));
    }
}