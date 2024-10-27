import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { IS_WITHOUT_APIKEY } from "./apikey.decorator";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let apikey = request.headers["api-key"];

    const isWithoutApiKey = this.reflector.get<boolean>(
      IS_WITHOUT_APIKEY,
      context.getHandler()
    );

    if (isWithoutApiKey) {
      return true;
    }

    if (apikey == process.env.API_KEY) {
      return true;
    } else {
      return false;
    }
  }
}
