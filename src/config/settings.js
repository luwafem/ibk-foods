// App-wide configuration (SAFE FOR CRA)

export const SETTINGS = {
  // Business status
  isOpen: true,

  // Display only
  openingHours: "5:00 PM – 11:00 PM",

  // WhatsApp number (NO + sign)
  whatsappNumber: "2349127373463",

  // Paystack PUBLIC key (pk_test_... or pk_live_...)
  paystackKey: "pk_test_129628160c0fdb0e1e837751e5ff0233872676b8",

  // Formspree JSON endpoint
  formspreeEndpoint: "https://formspree.io/f/mblnapya"
};

// Toggle what is available today
export const DAILY_MENU = {
  shawarma: true,
  pepper_soup: true,
  noodles: true,
  parfait: true,
};
