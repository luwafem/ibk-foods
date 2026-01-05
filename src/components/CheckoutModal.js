import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { SETTINGS } from "../config/settings";
import { sendToFormspree } from "../utils/sendToFormspree";

/**
 * Load Paystack safely (CRA compatible)
 */
const loadPaystack = () =>
  new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(window.PaystackPop);

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = () => reject(new Error("Failed to load Paystack"));
    document.body.appendChild(script);
  });

export default function CheckoutModal({ onClose }) {
  const {
    cart,
    customer,
    setCustomer,
    delivery,
    getTotal,
    clearCart
  } = useCartStore();

  const [loading, setLoading] = useState(false);

  /**
   * Form validation
   */
  const isFormValid = () => {
    const name = customer?.name?.trim();
    const phone = customer?.phone?.trim();
    const email = customer?.email?.trim();
    const total = Number(getTotal());

    const emailRegex = /^\S+@\S+\.\S+$/;

    return (
      name &&
      phone &&
      email &&
      emailRegex.test(email) &&
      Number.isFinite(total) &&
      total > 0
    );
  };

  /**
   * Start Paystack payment
   */
  const pay = async () => {
    if (!isFormValid()) {
      alert("Please enter name, phone, email and ensure cart is not empty.");
      return;
    }

    if (!SETTINGS.paystackKey?.startsWith("pk_")) {
      alert("Payment unavailable. Invalid Paystack key.");
      return;
    }

    setLoading(true);

    const total = Number(getTotal());
    const orderId = `ORD-${Date.now()}`;

    let PaystackPop;
    try {
      PaystackPop = await loadPaystack();
    } catch (err) {
      console.error(err);
      alert("Unable to load payment system. Check your internet.");
      setLoading(false);
      return;
    }

    try {
      const handler = PaystackPop.setup({
        key: SETTINGS.paystackKey,
        email: customer.email,
        amount: Math.round(total * 100),
        currency: "NGN",
        ref: orderId,

        // ⚠️ MUST NOT BE ASYNC (Paystack rule)
        callback: (res) => {
          (async () => {
            try {
              const order = {
                orderId,
                reference: res.reference,
                customer,
                delivery,
                items: cart,
                total,
                paid: true,
                createdAt: new Date().toISOString()
              };

              // Backup order
              await sendToFormspree(
                SETTINGS.formspreeEndpoint,
                order
              );

              // WhatsApp confirmation
              const msg = `
PAID ORDER ✅
Order ID: ${orderId}

${cart
  .map(
    (i) =>
      `${i.foodName} - ${
        (i.variant && i.variant.name) || "Default"
      } x${i.quantity}`
  )
  .join("\n")}

${delivery?.type === "delivery" ? delivery.address : "Pickup"}
TOTAL: ₦${total}
              `;

              clearCart();

              window.location.href =
                `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(
                  msg
                )}`;
            } catch (err) {
              console.error("Order processing failed:", err);
              alert("Payment successful, but order processing failed.");
            }
          })();
        },

        onClose: () => {
          console.log("Payment closed by user");
        }
      });

      handler.openIframe();
    } catch (err) {
      console.error("Paystack setup failed:", err);
      alert("Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-4 border-2 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition shadow-sm placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  
  return (
    // Backdrop and Modal Positioning (Aesthetic match: inset-0 overlay, z-50)
    <div className="fixed inset-0 bg-black/60 flex items-end z-50">
      <div className="bg-white p-6 w-full rounded-t-3xl shadow-2xl space-y-4">
        
        {/* Modal Header */}
        <h2 className="text-2xl font-extrabold text-gray-800 border-b pb-3 mb-4">
          Complete Your Order
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input
              id="name"
              className={inputClass}
              placeholder="E.g., John Doe"
              value={customer.name || ""}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number</label>
            <input
              id="phone"
              className={inputClass}
              placeholder="E.g., 08012345678"
              value={customer.phone || ""}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input
              id="email"
              className={inputClass}
              placeholder="E.g., john.doe@example.com"
              type="email"
              value={customer.email || ""}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </div>
        </div>

        {/* Action Button (CTA Match: bold color, full width, rounded, responsive) */}
        <div className="pt-2">
          <button
            onClick={pay}
            disabled={!isFormValid() || loading}
            className={`
              w-full py-4 text-lg font-extrabold rounded-2xl transition shadow-lg 
              ${isFormValid() && !loading
                ? "bg-orange-600 hover:bg-orange-700 text-white active:scale-[0.99] shadow-orange-300"
                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
              }
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {/* Simple spinner animation for loading */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </div>
            ) : (
              `Pay Now • ₦${getTotal()}`
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full mt-3 py-3 text-gray-500 font-semibold text-lg hover:text-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}