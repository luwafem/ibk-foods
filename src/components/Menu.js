import { menu } from "../data/menu";
import { DAILY_MENU, SETTINGS } from "../config/settings";

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "2348012345678"; // Replace with IBK FOODS' actual WhatsApp number

// --- EXTERNAL IMAGE URLS (EXAMPLE DATA) ---
const CAKE_SHOWCASE_DATA = [
  // Removed 'price' property
  { id: 1, name: "Velvet Red Cake", image: "https://example.com/images/cake-red.jpg" },
  { id: 2, name: "Chocolate Drip", image: "https://example.com/images/cake-choc.jpg" },
  { id: 3, name: "Birthday Funfetti", image: "https://example.com/images/cake-party.jpg" },
  { id: 4, name: "Classic Vanilla", image: "https://example.com/images/cake-vanilla.jpg" },
];

const HERO_IMAGE_URL = "https://example.com/images/hero-food.jpg"; 
// ------------------------------------------

// Utility function to generate the WhatsApp link
const getWhatsAppLink = (itemName) => {
    // URL-encode the message
    const message = encodeURIComponent(`Hello, I would like to enquire about or order the: ${itemName}.`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};


export default function Menu({ onSelect }) {
  return (
    <div className="space-y-8">
      
      {/* 🔥 DOMINANT HERO SECTION */}
      <div
        className="relative h-72 rounded-3xl overflow-hidden" 
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full p-6 flex flex-col justify-end text-white">
          <h1 className="text-4xl font-extrabold">
            IBK FOODS
          </h1>
          <p className="text-base font-medium opacity-95 mb-2">
            Fresh shawarma, pepper soup & noodles
          </p>
          <div
            className={`inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full text-lg font-bold w-fit transition ${
              SETTINGS.isOpen ? "bg-green-600" : "bg-gray-700" 
            }`}
          >
            <span className="h-3 w-3 rounded-full bg-white" />
            {SETTINGS.isOpen ? "Open Now" : "Closed"}
          </div>
        </div>
      </div>
      
      {/* 🍰 CAKE SHOWCASE SECTION (WhatsApp Redirect) */}
      <div className="space-y-3">
        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight px-1">
          Custom Cakes & Desserts
        </h2>
        
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-scroll space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {CAKE_SHOWCASE_DATA.map((cake) => (
            // 🚨 Changed from <button> to <a> tag for external link
            <a
              key={cake.id}
              href={getWhatsAppLink(cake.name)} // 🚨 Set the WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              disabled={!SETTINGS.isOpen}
              className="flex-shrink-0 w-40 active:scale-[0.98] transition disabled:opacity-50 block"
            >
              <div
                className="h-40 w-40 rounded-xl overflow-hidden mb-2 border border-gray-100"
                style={{
                  backgroundImage: `url('${cake.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <p className="text-sm font-semibold text-gray-800 truncate">{cake.name}</p>
              {/* 🚨 Replaced price with WhatsApp CTA */}
              <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339.4 55.4 283.4 32 224 32c-122.9 0-222 99.3-222 221.7 0 39.5 10.4 78.4 30.5 112.5L1.6 476.3l105.7-34.5c31.1 16.9 66.2 25.4 102.7 25.4 123 0 222.1-99.3 222.1-221.7 0-59.4-22.1-115.5-64.2-157.2zm-43.6 261.3c-2.4 7.6-13.6 15.2-19.1 16.3-5.5 1.1-10.7.3-17.7-4.1-36.6-23.7-74.8-49.8-109.8-77.9-25.2-19.8-44.5-44.7-54.9-70.8-7.9-20.1-6.1-28.5 2.1-38.3 8.2-9.9 19.3-15 28.5-12.8 9.2 2.2 15.6 12.3 20.2 23.4 4.5 11.2 7.7 23.3 11.7 34.9 3.9 11.7 2.1 21.6-3.9 32.5-6.1 11.1-14.7 20.4-23.9 28.5-12.8 11.2-25.5 22.4-38.3 33.6-21.6 18.5-38.1 36.6-50.9 57.6-12.7 20.9-19.1 43.1-19.1 66.2 0 42.4 34.5 77.2 77 77.2 23.9 0 47.9-10.8 66.2-28.5 20.4-19.8 41.5-39.6 62.7-59.5 17.5-17.2 30.2-38.3 35.8-61.4 5.5-23.1 3.7-47.5-5.5-67.6z"/>
                </svg>
                Order & Enquire
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* 🍽️ MAIN MENU CARDS (No functional changes here) */}
      <h2 className="text-xl font-extrabold text-gray-800 tracking-tight px-1">
          Daily Menu
      </h2>
      {menu
        .filter((m) => DAILY_MENU[m.id])
        .map((food) => (
          <button
            key={food.id}
            disabled={!SETTINGS.isOpen}
            onClick={() => onSelect(food)}
            className="relative w-full h-36 rounded-2xl overflow-hidden active:scale-[0.98] transition disabled:opacity-50 border border-gray-100"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${food.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            {/* Overlay and Content remain the same... */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full p-4 flex flex-col justify-between text-white text-left">
              <div>
                <p className="text-sm opacity-90">Popular</p>
                <h3 className="text-2xl font-extrabold">
                  {food.name}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-semibold w-fit">
                {SETTINGS.isOpen ? "Customize" : "Closed"}
                <span>→</span>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
}