import { Status } from "src/auth/role.enum";

export class UserDto {
  user_id: number;
  user_name: string;
  email: string;
  password?: string;
  is_verified: boolean;
  verification_code: number;
  status: Status;
  create_time: Date;
  updated_time: Date;
}
