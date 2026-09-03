import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConfigService } from "../config/config.service.js";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private config: ConfigService) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    console.log(`[Guard] Checking access...`);

    return apiKey === this.config.get('API_KEY');
  }
}