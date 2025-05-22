export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'STAFF' | 'ADMIN';
  }
  
  export interface Item {
    id: number;
    title: string;
    description: string;
    location: string;
    status: 'LOST' | 'FOUND' | 'CLAIMED';
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'USER' | 'STAFF' | 'ADMIN';
  }