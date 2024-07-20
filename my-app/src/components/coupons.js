export const coupons = [
    { code: "SAVE10", discount: "10% off" },
  ];
  
  export function getRandomCoupon() {
    const randomIndex = Math.floor(Math.random() * coupons.length);
    return coupons[randomIndex];
  }