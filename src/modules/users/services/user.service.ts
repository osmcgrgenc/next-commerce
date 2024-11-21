export class UserService {
    static hashPassword(password: string): string {
      // Şifreleme algoritması örneği
      return password.split("").reverse().join(""); // Örnek, güçlü şifreleme değildir
    }
  }
  