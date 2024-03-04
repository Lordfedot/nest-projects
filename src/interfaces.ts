import { Request } from 'express';

export interface ReturnUserDto {
  id: string;
  email: string;
  password: string;
}

export type JwtPayload = {
  username: string;
  sub: number;
  iat: number;
  exp: number;
};

export type RequestWithUser = Request & { user: JwtPayload };
