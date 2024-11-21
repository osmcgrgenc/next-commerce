export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };
  
  export const calculateDiscountedPrice = (price: number, discountRate: number): number => {
    return price - (price * discountRate);
  };