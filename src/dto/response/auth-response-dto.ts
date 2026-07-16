export interface ILoginResponseDto {
    message: string;
    token: string;
    result: {
      id: number;
      name: string;
      email: string;
    };
  }