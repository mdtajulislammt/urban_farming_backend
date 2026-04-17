export type IUserRole = "ADMIN" | "VENDOR" | "CUSTOMER";

export interface IJwtPayload {
  userId: string;
  role: IUserRole;
}
