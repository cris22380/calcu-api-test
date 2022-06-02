import { Expose } from 'class-transformer';

export class DeleteUserResponse {
  @Expose()
  userId: string;
  @Expose()
  removed: boolean;
}
