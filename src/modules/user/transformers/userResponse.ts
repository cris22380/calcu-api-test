import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  first: string;
  @Expose()
  last: string;
  @Expose()
  location: string;
  @Expose()
  locale: string;
  @Expose()
  tutorial: Record<string, any>;
  @Expose()
  isBusiness: boolean;
  @Expose()
  roles: string;
  @Expose()
  collapsed: string;
  @Expose()
  emailPrev: string;
  @Expose()
  creationDate: Date;
}
