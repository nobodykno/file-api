export interface ILoginResponseDto {
    message: string;
    token: string;
    result: {
      id: number;
      name: string;
      email: string;
    };
  }

  export interface ILoginResponseDto {
    message: string;
    token: string;
  }
  
  export interface IUserDto {
    id: number;
    name: string;
    email: string;
  }
  
  export interface ICreateUserResponseDto {
    message: string;
    result: IUserDto;
  }