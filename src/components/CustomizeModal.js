import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function CustomizeModal({ food, onClose }) {
  const addItem = useCartStore(s => s.addItem);
  const [variant, setVariant] = useState(null);
  const [addons, setAddons] = useState([]);
  const [qty, setQty] = useState(1);

  // Calculate total price: (variant_price + sum_of_addons) * quantity
  const total =
    variant &&
    (variant.price + addons.reduce((s, a) => s + a.price, 0)) * qty;

  const add = () => {
    if (!variant) return alert("Select a variant");
    addItem({
      cartItemId: crypto.randomUUID(),
      foodName: food.name,
      variant,
      addons,
      quantity: qty,
      totalPrice: total
    });
    onClose();
  };

  const isAddonSelected = (addonId) => addons.find(x => x.id === addonId);

  return (
    // Backdrop and Modal Positioning (Aesthetic match: inset-0 overlay)
    <div className="fixed inset-0 bg-black/60 flex items-end z-50">
      <div className="bg-white w-full p-6 rounded-t-3xl shadow-2xl space-y-4">
        
        {/* Modal Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-3 mb-4">{food.name}</h2>

        {/* 1. VARIANT SELECTION (Radio Buttons) */}
        <div className="space-y-3">
          <p className="text-lg font-semibold text-gray-700">Choose Size / Variant</p>
          {food.variants.map(v => (
            <label
              key={v.id}
              className={`
                flex justify-between items-center p-4 rounded-xl cursor-pointer transition
                border-2
                ${variant?.id === v.id 
                  ? "bg-orange-50 border-orange-600 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex flex-col">
                <span className="font-medium text-lg">{v.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-700">₦{v.price}</span>
                <input 
                  type="radio" 
                  name="variant"
                  checked={variant?.id === v.id}
                  onChange={() => setVariant(v)} 
                  className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
              </div>
            </label>
          ))}
        </div>

        {/* 2. ADD-ON SELECTION (Checkboxes) */}
        {food.addons?.length > 0 && (
          <div className="pt-2 space-y-3">
            <p className="text-lg font-semibold text-gray-700">Add Extras</p>
            {food.addons.map(a => (
              <label 
                key={a.id} 
                className={`
                  flex justify-between items-center p-4 rounded-xl cursor-pointer transition
                  border-2
                  ${isAddonSelected(a.id)
                    ? "bg-green-50 border-green-600 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-lg">{a.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-700">
                    +₦{a.price}
                  </span>
                  <input
                    type="checkbox"
                    checked={isAddonSelected(a.id)}
                    onChange={() =>
                      setAddons(p =>
                        p.find(x => x.id === a.id)
                          ? p.filter(x => x.id !== a.id)
                          : [...p, a]
                      )
                    }
                    className="h-5 w-5 rounded text-green-600 focus:ring-green-500 border-gray-300"
                  />
                </div>
              </label>
            ))}
          </div>
        )}

        {/* 3. QUANTITY CONTROL (Added for completeness) */}
        <div className="flex justify-center items-center py-4">
          <button 
            onClick={() => setQty(p => Math.max(1, p - 1))}
            className="p-3 bg-gray-100 rounded-xl text-xl font-bold text-gray-600 active:scale-95 transition"
          >
            −
          </button>
          <span className="mx-8 text-2xl font-extrabold text-gray-800 w-10 text-center">{qty}</span>
          <button 
            onClick={() => setQty(p => p + 1)}
            className="p-3 bg-gray-100 rounded-xl text-xl font-bold text-gray-600 active:scale-95 transition"
          >
            +
          </button>
        </div>


        {/* 4. ACTION BUTTONS (CTA Match: bold color, full width, rounded) */}
        <div className="pt-2">
          <button
            onClick={add}
            disabled={!variant}
            className={`
              w-full py-4 text-lg font-extrabold rounded-2xl transition
              ${variant 
                ? "bg-orange-600 hover:bg-orange-700 text-white active:scale-[0.99] shadow-lg shadow-orange-300"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {variant ? `Add to Cart • ₦${total}` : "Select a Variant"}
          </button>

          <button onClick={onClose} className="w-full mt-3 py-3 text-gray-500 font-semibold text-lg hover:text-gray-700 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}