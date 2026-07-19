import type { Optional } from "sequelize";

export interface IUserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
  }

    export type ICreateUserRequestDto = Optional<
    IUserAttributes,
    "id" 
  >;