import React from 'react';
import { BookOpen, Clock, User, Search, Tag, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const BlogDemo = () => {
  const featuredPost = {
    title: 'The Future of AI in Web Development: What to Expect in 2026',
    excerpt: 'Artificial intelligence is revolutionizing how we build websites. From automated coding to intelligent design systems, discover what the future holds.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    author: 'Sarah Chen',
    date: 'Jan 20, 2026',
    readTime: '8 min read',
    category: 'Technology',
  };

  const posts = [
    { id: 1, title: '10 CSS Tricks Every Developer Should Know', category: 'Development', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop', date: 'Jan 18', readTime: '5 min' },
    { id: 2, title: 'Building Scalable React Applications', category: 'React', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop', date: 'Jan 15', readTime: '7 min' },
    { id: 3, title: 'The Art of UI/UX Design in 2026', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', date: 'Jan 12', readTime: '6 min' },
    { id: 4, title: 'Mastering TypeScript: Advanced Patterns', category: 'TypeScript', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop', date: 'Jan 10', readTime: '10 min' },
  ];

  const categories = ['All', 'Technology', 'Development', 'Design', 'React', 'TypeScript', 'Career'];

  return (
    <div className="min-h-screen bg-slate-50">
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
              {['Home', 'Articles', 'Topics', 'About', 'Newsletter'].map(item => (
                <a key={item} href="#" className="text-slate-600 hover:text-emerald-600 transition-colors">{item}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon"><Search className="w-5 h-5" /></Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </header>

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
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit">
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat, i) => (
              <Button key={cat} variant={i === 0 ? 'default' : 'outline'} className={i === 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300'} size="sm">
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
            <Button variant="outline" className="hover:bg-emerald-50 hover:text-emerald-600">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
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

      {/* Trending Topics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['#AI', '#WebDev', '#React', '#JavaScript', '#Design', '#Startup', '#Cloud', '#Security'].map(tag => (
              <a key={tag} href="#" className="px-4 py-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 rounded-full text-slate-600 transition-colors">
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">Get the latest articles, tutorials, and insights delivered straight to your inbox.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-slate-900" />
            <Button className="bg-slate-900 hover:bg-slate-800 px-6">Subscribe</Button>
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
