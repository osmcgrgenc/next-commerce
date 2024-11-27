import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: 'ADMIN' | 'CUSTOMER';
  }

  interface Session {
    user: User & {
      role: 'ADMIN' | 'CUSTOMER';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'ADMIN' | 'CUSTOMER';
  }
} 