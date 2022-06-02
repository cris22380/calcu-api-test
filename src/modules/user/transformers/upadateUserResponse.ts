import { Expose } from 'class-transformer';

export class UpdateUserResponse {
  @Expose()
  userId: string;
  @Expose()
  update: Record<string, any>;
}
