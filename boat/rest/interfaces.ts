import { User } from '@/domain';
import { Request as BaseRequest, Response as BaseResponse } from 'express';
export interface Request extends BaseRequest {
  /**
   * Get all inputs from the request object
   */
  all(): Record<string, any>;

  getContext(): Request;

  /**
   * Get the current user from the request object from keycloak
   */
  user: User;

  isAdmin: boolean;

  // Permission required to access the route
  routePermissions?: string[];

  canAccess?: (resource: string, resourceId: string) => Promise<boolean>;
}

export interface Response extends BaseResponse {
  success(
    data: Record<string, any> | Array<any> | string | boolean,
    status?: number | string,
  ): any;

  error(error: Record<string, any> | string, status?: number | string): any;

  noContent(): any;

  withMeta(data: Record<string, any>, status?: number | string): any;
}

export interface ServerOptions {
  addValidationContainer?: boolean;
  port?: number;
  globalPrefix?: string;
}
