export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPassword = (password: string): boolean => {
    // En az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const isValidPhoneNumber = (phone: string): boolean => {
    // Türkiye telefon formatı: +90 5XX XXX XX XX
    const phoneRegex = /^\+90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone);
  };