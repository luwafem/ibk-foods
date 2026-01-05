import { useState } from "react";
import Menu from "./components/Menu";
import CustomizeModal from "./components/CustomizeModal";
import CheckoutModal from "./components/CheckoutModal";
import { useCartStore } from "./store/cartStore";
import { SETTINGS } from "./config/settings";

export default function App() {
  const [food, setFood] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const cart = useCartStore(s => s.cart);
  const total = useCartStore(s => s.getTotal());

  // Determine button state for styling
  const isCartEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 🌟 MINIMALIST FLOATING CARD HEADER (Shadows Removed) */}
      <header className="fixed top-3 inset-x-4 z-40 bg-white p-5 rounded-xl text-center border border-gray-100">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          IBK FOODS
        </h1>
        
        {/* Slogan */}
        <p className="text-sm font-light text-gray-500 mb-2">
          The best local flavours.
        </p>
        
        <hr className="my-2 border-gray-100" />
        
        {/* Status Line */}
        <div className={`text-sm font-medium pt-1 flex items-center justify-center gap-2 ${SETTINGS.isOpen ? "text-green-600" : "text-gray-600"}`}>
          <span className={`h-2 w-2 rounded-full ${SETTINGS.isOpen ? "bg-green-500" : "bg-gray-400"}`} />
          <span>
            {SETTINGS.isOpen ? "Open Now" : "Closed"} 
            <span className="text-gray-400 mx-2">•</span>
            {SETTINGS.openingHours}
          </span>
        </div>
      </header>
      
      {/* 💻 MAIN SCROLLING CONTENT AREA */}
      {/* Retain padding to clear the fixed header and footer */}
      <div className="pt-48 pb-28 p-4">
        <Menu onSelect={setFood} />
      </div>

      {/* 🛒 FLOATING CHECKOUT BUTTON (Removed Shadow) */}
      {!isCartEmpty && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-40">
          <button
            onClick={() => setCheckout(true)}
            // 🚨 Removed shadow-lg and shadow-orange-300
            className="w-full py-4 text-lg font-extrabold rounded-2xl transition 
                       bg-orange-600 hover:bg-orange-700 text-white 
                       active:scale-[0.98]" 
          >
            <div className="flex justify-between items-center px-4">
              <span>Checkout ({cart.length} Items)</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                ₦{total}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Modals */}
      {food && <CustomizeModal food={food} onClose={() => setFood(null)} />}
      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
    </div>
  );
}