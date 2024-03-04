import { Request } from 'express';

export interface ReturnUserDto {
  id: string;
  email: string;
  password: string;
}

export type RequestWithUserId = Request & { userId: string };
