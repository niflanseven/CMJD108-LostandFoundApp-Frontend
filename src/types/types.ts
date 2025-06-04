export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'USER';
}

export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
  user: User | null;
}

export type ItemFormData = {
  title: string;
  description: string;
  location: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
};

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}