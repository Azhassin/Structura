import React, { useState } from 'react';
import { BookOpen, Clock, User, Search, ArrowRight, TrendingUp, X, Check, Bookmark } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const BlogDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);

  const featuredPost = {
    id: 'featured',
    title: 'The Future of AI in Web Development: What to Expect in 2026',
    excerpt: 'Artificial intelligence is revolutionizing how we build websites. From automated coding to intelligent design systems, discover what the future holds.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    author: 'Sarah Chen',
    date: 'Jan 20, 2026',
    readTime: '8 min read',
    category: 'Technology',
  };

  const posts = [
    { id: 1, title: '10 CSS Tricks Every Developer Should Know', category: 'Development', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop', date: 'Jan 18', readTime: '5 min', author: 'John Doe', excerpt: 'Master these CSS techniques to take your styling skills to the next level.' },
    { id: 2, title: 'Building Scalable React Applications', category: 'React', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop', date: 'Jan 15', readTime: '7 min', author: 'Mike Smith', excerpt: 'Learn architecture patterns for large-scale React apps.' },
    { id: 3, title: 'The Art of UI/UX Design in 2026', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', date: 'Jan 12', readTime: '6 min', author: 'Emily Wang', excerpt: 'Explore the latest trends shaping digital experiences.' },
    { id: 4, title: 'Mastering TypeScript: Advanced Patterns', category: 'TypeScript', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop', date: 'Jan 10', readTime: '10 min', author: 'Alex Johnson', excerpt: 'Deep dive into TypeScript most powerful features.' },
    { id: 5, title: 'Career Tips for Junior Developers', category: 'Career', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop', date: 'Jan 8', readTime: '4 min', author: 'Lisa Brown', excerpt: 'Navigate your tech career with these essential strategies.' },
    { id: 6, title: 'Introduction to Machine Learning', category: 'Technology', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop', date: 'Jan 5', readTime: '9 min', author: 'David Lee', excerpt: 'Get started with ML fundamentals and practical applications.' },
  ];

  const categories = ['All', 'Technology', 'Development', 'Design', 'React', 'TypeScript', 'Career'];

  const filteredPosts = categoryFilter === 'All' ? posts : posts.filter(p => p.category === categoryFilter);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(b => b !== id));
      showNotification('Removed from bookmarks');
    } else {
      setBookmarked([...bookmarked, id]);
      showNotification('Added to bookmarks!');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'articles', label: 'Articles' },
    { id: 'topics', label: 'Topics' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-20" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 border-b pb-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input type="text" placeholder="Search articles..." className="flex-1 text-lg outline-none" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-3">Popular Topics</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'CSS', 'TypeScript', 'AI'].map(term => (
                  <Badge key={term} variant="outline" className="cursor-pointer hover:bg-emerald-50" onClick={() => { setCategoryFilter(term === 'AI' ? 'Technology' : term); setSearchOpen(false); setActiveTab('articles'); }}>
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of a Blog website</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-slate-900">TechInsider</span>
            </div>
            <nav className="hidden md:flex gap-6">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors ${activeTab === item.id ? 'text-emerald-600 font-medium' : 'text-slate-600 hover:text-emerald-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bookmark className={`w-5 h-5 ${bookmarked.length > 0 ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                {bookmarked.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {bookmarked.length}
                  </span>
                )}
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => showNotification('Subscribed to newsletter!')}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
          {/* Featured Post */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className="h-80 md:h-auto">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="bg-emerald-100 text-emerald-600 w-fit mb-4">{featuredPost.category}</Badge>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">{featuredPost.title}</h1>
                  <p className="text-slate-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit" onClick={() => showNotification('Opening article...')}>
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Posts Preview */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
                <Button variant="outline" className="hover:bg-emerald-50 hover:text-emerald-600" onClick={() => setActiveTab('articles')}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.slice(0, 4).map(post => (
                  <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="h-48 overflow-hidden relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-50"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked.includes(post.id) ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} />
                      </button>
                    </div>
                    <div className="p-5">
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200 mb-3">{post.category}</Badge>
                      <h3 className="font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ARTICLES TAB */}
      {activeTab === 'articles' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">All Articles</h2>
              <p className="text-slate-600">Browse our collection of tech insights and tutorials</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    categoryFilter === cat 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white text-slate-600 hover:bg-emerald-50 border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <button 
                      onClick={() => toggleBookmark(post.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-50"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked.includes(post.id) ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} />
                    </button>
                  </div>
                  <div className="p-5">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 mb-3">{post.category}</Badge>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TOPICS TAB */}
      {activeTab === 'topics' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Browse Topics</h2>
              <p className="text-slate-600">Find articles by topic</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {categories.filter(c => c !== 'All').map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => { setCategoryFilter(cat); setActiveTab('articles'); }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600 transition-colors">
                    <TrendingUp className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{cat}</h3>
                  <p className="text-slate-500 text-sm">{posts.filter(p => p.category === cat).length} articles</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">About TechInsider</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                TechInsider is your go-to resource for the latest in technology, web development, and digital innovation. Our team of expert writers brings you in-depth tutorials, industry insights, and practical tips to help you stay ahead in the ever-evolving tech landscape.
              </p>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Whether you're a seasoned developer or just starting your coding journey, we have content tailored for every skill level. Join our community of over 50,000 readers and start learning today!
              </p>
              <div className="grid grid-cols-3 gap-6 py-8 border-y my-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">500+</p>
                  <p className="text-slate-500">Articles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">50K+</p>
                  <p className="text-slate-500">Readers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">25</p>
                  <p className="text-slate-500">Writers</p>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => showNotification('Subscribed to newsletter!')}>
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">Get the latest articles, tutorials, and insights delivered straight to your inbox.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-slate-900" />
            <Button className="bg-slate-900 hover:bg-slate-800 px-6" onClick={() => showNotification('Subscribed successfully!')}>
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-center text-slate-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default BlogDemo;
