export interface Profile {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
}
