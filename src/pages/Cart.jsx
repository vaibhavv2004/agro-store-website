import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    // Format the WhatsApp message
    let message = `*🌿 NEW ORDER - EACHUR AGRO STORE 🌿*\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Customer Details:*\n`;
    message += `• Name: ${formData.name}\n`;
    message += `• Phone: ${formData.phone}\n`;
    message += `• Address: ${formData.address}\n`;
    if (formData.notes) {
      message += `• Note: ${formData.notes}\n`;
    }
    message += `----------------------------------------\n`;
    message += `🛒 *Order Items:*\n`;

    cart.forEach((item) => {
      message += `• ${item.name} (${item.category}) - ${item.quantity} x ${item.price} = ₹${(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString('en-IN')}\n`;
    });

    message += `----------------------------------------\n`;
    message += `💵 *Total Amount:* ₹${cartTotal.toLocaleString('en-IN')}\n\n`;
    message += `Please confirm my order. Thank you!`;

    // Encode message for URL
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919446062168?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear the cart after placing the order
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="bg-background min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-custom p-8 shadow-custom text-center border border-gray-100 mx-4">
          <div className="text-primary text-6xl mb-4">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Your Cart is Empty</h2>
          <p className="text-lightText mb-6">
            Looks like you haven't added any products to your cart yet. Browse our selection and start shopping!
          </p>
          <Link
            to="/products"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors duration-300 inline-block"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark mb-8 flex items-center gap-2">
          <i className="fa-solid fa-cart-shopping text-primary"></i> Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="bg-white rounded-custom shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-dark">Cart Items ({cart.length})</h3>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=200&sig=${item.id}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-dark text-base">{item.name}</h4>
                        <span className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full font-medium">
                          {item.category}
                        </span>
                        <p className="text-primary font-bold text-sm mt-1">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-dark font-semibold text-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-dark font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-dark font-semibold text-lg transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <i className="fa-solid fa-trash-can text-lg"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-dark border-b border-gray-100 pb-4 mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between font-medium text-dark text-base mb-6">
                <span>Total Amount:</span>
                <span className="text-primary font-bold text-xl">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <h4 className="font-bold text-dark text-sm border-t border-gray-100 pt-4">
                  Delivery Details
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Complete delivery address"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Any specific delivery instructions..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 mt-6 shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  Place Order via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
