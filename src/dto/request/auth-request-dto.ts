
import type { JwtPayload } from "jsonwebtoken";
export interface ILoginRequestDto {
    email: string;
    password: string;
  }

  export interface ICreateUserRequestDto {
    name: string;
    email: string;
    password: string;
  }

  export interface IJwtPayload extends JwtPayload {
    id: number;
    email: string;
  }
