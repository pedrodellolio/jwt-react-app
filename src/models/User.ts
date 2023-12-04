export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: Date;
  is_active: boolean;
  is_staff: boolean;
  access_token: string;
  refresh_token: string;
}
