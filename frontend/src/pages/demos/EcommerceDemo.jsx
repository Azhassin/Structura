import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Search, User, ChevronRight, Truck, Shield, CreditCard, X, Plus, Minus, Check, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const EcommerceDemo = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: 'electronics' },
    { id: 2, name: 'Smart Watch Pro', price: 449, originalPrice: 549, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'electronics' },
    { id: 3, name: 'Designer Sunglasses', price: 189, originalPrice: 249, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'fashion' },
    { id: 4, name: 'Leather Backpack', price: 159, originalPrice: 199, rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: 'fashion' },
    { id: 5, name: 'Minimalist Desk Lamp', price: 79, originalPrice: 99, rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', category: 'home' },
    { id: 6, name: 'Ceramic Plant Pot Set', price: 45, originalPrice: 65, rating: 4.4, reviews: 43, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', category: 'home' },
    { id: 7, name: 'Running Sneakers', price: 129, originalPrice: 169, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'sports' },
    { id: 8, name: 'Yoga Mat Premium', price: 49, originalPrice: 69, rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', category: 'sports' },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'sports', name: 'Sports' },
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(w => w !== id));
      showNotification('Removed from wishlist');
    } else {
      setWishlist([...wishlist, id]);
      showNotification('Added to wishlist!');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of an E-commerce website</span>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-purple-600">LuxeCart</h1>
              <nav className="hidden md:flex gap-6">
                {categories.slice(1).map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveTab(cat.id)}
                    className={`transition-colors ${activeTab === cat.id ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon"><User className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-20" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 border-b pb-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="flex-1 text-lg outline-none"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Headphones', 'Watch', 'Sneakers', 'Backpack'].map(term => (
                  <Badge key={term} variant="outline" className="cursor-pointer hover:bg-purple-50">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setCartOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Shopping Cart ({cartCount})</h2>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 flex-1 overflow-auto max-h-[60vh]">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-purple-600 font-bold">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center border hover:bg-gray-100">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center border hover:bg-gray-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6" onClick={() => showNotification('Checkout feature coming soon!')}>
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge className="bg-yellow-400 text-yellow-900 mb-4">Summer Sale - Up to 50% Off</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Discover Premium Products</h2>
            <p className="text-base md:text-xl text-purple-200 mb-6 md:mb-8">Shop the latest trends with exclusive deals and free shipping on orders over $50</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 w-full sm:w-auto" onClick={() => setActiveTab('all')}>
                Shop Now <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" onClick={() => setActiveTab('electronics')}>
                View Collections
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-purple-500/20 to-transparent hidden md:block" />
      </section>

      {/* Features */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Free Shipping', sub: 'On orders over $50' },
              { icon: Shield, text: 'Secure Payment', sub: '100% protected' },
              { icon: CreditCard, text: 'Easy Returns', sub: '30-day policy' },
              { icon: Star, text: 'Top Quality', sub: 'Premium products' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 md:px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm md:text-base ${
                  activeTab === cat.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-xl md:text-3xl font-bold text-gray-900">
              {activeTab === 'all' ? 'Featured Products' : categories.find(c => c.id === activeTab)?.name}
            </h3>
            <span className="text-sm md:text-base text-gray-500">{filteredProducts.length} products</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-40 md:h-64 bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-purple-50 transition-colors"
                  >
                    <Heart className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-purple-600'}`} />
                  </button>
                  <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white text-xs">Sale</Badge>
                </div>
                <div className="p-3 md:p-4">
                  <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs md:text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 hidden md:inline">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="text-lg md:text-xl font-bold text-purple-600">${product.price}</span>
                      <span className="text-xs md:text-sm text-gray-400 line-through ml-1 md:ml-2">${product.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs md:text-sm w-full md:w-auto" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-purple-200 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">Get exclusive deals, new arrivals, and 10% off your first order</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <Button className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 px-6" onClick={() => showNotification('Subscribed successfully!')}>
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-white mb-4">LuxeCart</p>
          <p className="mb-4">Premium shopping experience since 2020</p>
          <p className="text-sm">Demo created by Structura Studio</p>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceDemo;
