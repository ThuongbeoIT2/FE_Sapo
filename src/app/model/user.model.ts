export interface User {
  id: number;
  name: string;
  email: string;
  imageUrl?: string;
  emailVerified: boolean;
  provider: string;
  providerId: string;
  phoneNumber: string;
  address: string;
  role: number;
}
