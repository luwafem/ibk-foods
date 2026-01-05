// utils/loadPaystack.js
export const loadPaystack = () =>
  new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(window.PaystackPop);

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = () => reject(new Error("Paystack failed to load"));
    document.body.appendChild(script);
  });
