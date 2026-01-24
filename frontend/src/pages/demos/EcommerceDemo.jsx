import React from 'react';
import { ShoppingCart, Star, Heart, Search, User, ChevronRight, Truck, Shield, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const EcommerceDemo = () => {
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { id: 2, name: 'Smart Watch Pro', price: 449, originalPrice: 549, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: 3, name: 'Designer Sunglasses', price: 189, originalPrice: 249, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' },
    { id: 4, name: 'Leather Backpack', price: 159, originalPrice: 199, rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  ];

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty', 'Books'];

  return (
    <div className="min-h-screen bg-gray-50">
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
                {categories.slice(0, 4).map(cat => (
                  <a key={cat} href="#" className="text-gray-600 hover:text-purple-600 transition-colors">{cat}</a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search products..." className="bg-transparent border-none outline-none ml-2 w-full text-sm" />
              </div>
              <Button variant="ghost" size="icon"><User className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Heart className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge className="bg-yellow-400 text-yellow-900 mb-4">Summer Sale - Up to 50% Off</Badge>
            <h2 className="text-5xl font-bold mb-4">Discover Premium Products</h2>
            <p className="text-xl text-purple-200 mb-8">Shop the latest trends with exclusive deals and free shipping on orders over $50</p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">Shop Now <ChevronRight className="ml-2 w-4 h-4" /></Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">View Collections</Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-purple-500/20 to-transparent" />
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

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Products</h3>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64 bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-purple-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-purple-600" />
                  </button>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-purple-600">${product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-purple-200 mb-8 max-w-xl mx-auto">Get exclusive deals, new arrivals, and 10% off your first order</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <Button className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 px-6">Subscribe</Button>
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
