import React, { useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Play, Clock, Star, ChevronRight, CheckCircle, X, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const EducationDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [enrollModal, setEnrollModal] = useState(null);
  const [notification, setNotification] = useState(null);

  const courses = [
    { id: 1, title: 'Web Development Bootcamp', instructor: 'John Smith', price: 99, originalPrice: 199, rating: 4.9, students: '15K+', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop', category: 'development', lessons: 120, hours: 48 },
    { id: 2, title: 'UI/UX Design Masterclass', instructor: 'Sarah Lee', price: 79, originalPrice: 149, rating: 4.8, students: '12K+', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', category: 'design', lessons: 85, hours: 32 },
    { id: 3, title: 'Data Science Fundamentals', instructor: 'Mike Chen', price: 129, originalPrice: 249, rating: 4.9, students: '20K+', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', category: 'data', lessons: 150, hours: 56 },
    { id: 4, title: 'Digital Marketing Pro', instructor: 'Emily Brown', price: 69, originalPrice: 129, rating: 4.7, students: '8K+', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', category: 'marketing', lessons: 72, hours: 28 },
    { id: 5, title: 'Python Programming', instructor: 'Alex Johnson', price: 89, originalPrice: 179, rating: 4.8, students: '18K+', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop', category: 'development', lessons: 100, hours: 40 },
    { id: 6, title: 'Mobile App Development', instructor: 'Lisa Wang', price: 119, originalPrice: 219, rating: 4.9, students: '10K+', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop', category: 'development', lessons: 130, hours: 52 },
  ];

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'data', name: 'Data Science' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const filteredCourses = categoryFilter === 'all' ? courses : courses.filter(c => c.category === categoryFilter);

  const features = [
    { icon: BookOpen, title: '500+ Courses', desc: 'Wide range of topics' },
    { icon: Users, title: 'Expert Instructors', desc: 'Learn from the best' },
    { icon: Award, title: 'Certificates', desc: 'Earn credentials' },
    { icon: Clock, title: 'Lifetime Access', desc: 'Learn at your pace' },
  ];

  const instructors = [
    { name: 'John Smith', role: 'Web Development Expert', students: '45K+', courses: 12, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', rating: 4.9 },
    { name: 'Sarah Lee', role: 'UI/UX Design Lead', students: '38K+', courses: 8, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', rating: 4.8 },
    { name: 'Mike Chen', role: 'Data Science Professor', students: '52K+', courses: 15, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', rating: 4.9 },
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEnroll = (course) => {
    showNotification(`Successfully enrolled in ${course.title}!`);
    setEnrollModal(null);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Enroll Modal */}
      {enrollModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setEnrollModal(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Enroll in Course</h3>
              <button onClick={() => setEnrollModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-4 mb-6">
              <img src={enrollModal.image} alt={enrollModal.title} className="w-24 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900">{enrollModal.title}</h4>
                <p className="text-slate-500 text-sm">by {enrollModal.instructor}</p>
              </div>
            </div>
            <div className="bg-violet-50 p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Course Price</span>
                <div>
                  <span className="text-2xl font-bold text-violet-600">${enrollModal.price}</span>
                  <span className="text-slate-400 line-through ml-2">${enrollModal.originalPrice}</span>
                </div>
              </div>
              <p className="text-sm text-violet-600">You save ${enrollModal.originalPrice - enrollModal.price}!</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[`${enrollModal.lessons} video lessons`, `${enrollModal.hours} hours of content`, 'Lifetime access', 'Certificate of completion'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-violet-600 hover:bg-violet-700 py-6" onClick={() => handleEnroll(enrollModal)}>
              Enroll Now - ${enrollModal.price}
            </Button>
          </div>
        </div>
      )}

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center py-2 text-sm">
        <Link to="/" className="hover:underline">← Back to Structura Studio</Link>
        <span className="mx-4">|</span>
        <span>This is a demo preview of an Education website</span>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-violet-600" />
              <span className="text-xl font-bold text-slate-900">LearnHub</span>
            </div>
            <nav className="hidden md:flex gap-6">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors ${activeTab === item.id ? 'text-violet-600 font-medium' : 'text-slate-600 hover:text-violet-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Log In</Button>
              <Button className="bg-violet-600 hover:bg-violet-700">Sign Up Free</Button>
            </div>
          </div>
        </div>
      </header>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <>
          {/* Hero */}
          <section className="relative py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-purple-800/30" />
            <div className="container mx-auto px-4 relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-6">🚀 New: AI-Powered Learning</Badge>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Learn Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Limits</span>
                  </h1>
                  <p className="text-xl text-purple-200 mb-8">
                    Access world-class education from top instructors. Start your journey today with over 500+ courses.
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-white text-violet-900 hover:bg-slate-100" onClick={() => setActiveTab('courses')}>
                      Explore Courses <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Play className="w-4 h-4 mr-2" /> Watch Demo
                    </Button>
                  </div>
                  <div className="flex items-center gap-8 mt-10">
                    <div>
                      <p className="text-3xl font-bold">50K+</p>
                      <p className="text-purple-300">Students</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-purple-300">Courses</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">100+</p>
                      <p className="text-purple-300">Instructors</p>
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" alt="Students" className="rounded-2xl shadow-2xl" />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">98% Success Rate</p>
                        <p className="text-sm text-slate-500">Course completion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {features.map((feat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feat.icon className="w-8 h-8 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{feat.title}</h3>
                    <p className="text-slate-600 text-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Courses Preview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Courses</h2>
                  <p className="text-slate-600">Learn from the best instructors worldwide</p>
                </div>
                <Button variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50" onClick={() => setActiveTab('courses')}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.slice(0, 4).map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <Badge className="absolute top-4 left-4 bg-violet-600 text-white capitalize">{course.category}</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                      <p className="text-slate-500 text-sm mb-3">by {course.instructor}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium ml-1">{course.rating}</span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm text-slate-500">{course.students} students</span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <span className="text-xl font-bold text-violet-600">${course.price}</span>
                          <span className="text-sm text-slate-400 line-through ml-2">${course.originalPrice}</span>
                        </div>
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-700" onClick={() => setEnrollModal(course)}>
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* COURSES TAB */}
      {activeTab === 'courses' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">All Courses</h2>
              <p className="text-slate-600">Find the perfect course for your learning journey</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    categoryFilter === cat.id 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white text-slate-600 hover:bg-violet-50 border'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-violet-600 text-white capitalize">{course.category}</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">{course.title}</h3>
                    <p className="text-slate-500 text-sm mb-3">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>•</span>
                      <span>{course.hours} hours</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-slate-400">({course.students} students)</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <span className="text-2xl font-bold text-violet-600">${course.price}</span>
                        <span className="text-slate-400 line-through ml-2">${course.originalPrice}</span>
                      </div>
                      <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setEnrollModal(course)}>
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INSTRUCTORS TAB */}
      {activeTab === 'instructors' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Instructors</h2>
              <p className="text-slate-600">Learn from industry experts and thought leaders</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {instructors.map((instructor, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all">
                  <img src={instructor.image} alt={instructor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="font-bold text-slate-900 text-lg">{instructor.name}</h3>
                  <p className="text-violet-600 text-sm mb-4">{instructor.role}</p>
                  <div className="flex justify-center items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{instructor.rating}</span>
                  </div>
                  <div className="flex justify-center gap-6 text-sm text-slate-500">
                    <div>
                      <p className="font-bold text-slate-900">{instructor.students}</p>
                      <p>Students</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{instructor.courses}</p>
                      <p>Courses</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING TAB */}
      {activeTab === 'pricing' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple Pricing</h2>
              <p className="text-slate-600">Choose the plan that works for you</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Basic', price: 0, desc: 'Perfect for getting started', features: ['Access to free courses', 'Community forum', 'Basic certificates'] },
                { name: 'Pro', price: 29, desc: 'Most popular choice', features: ['All Basic features', 'Unlimited courses', 'Premium certificates', 'Priority support', 'Downloadable resources'], popular: true },
                { name: 'Team', price: 99, desc: 'For organizations', features: ['All Pro features', 'Team management', 'Analytics dashboard', 'Custom branding', 'Dedicated account manager'] },
              ].map((plan, i) => (
                <div key={i} className={`bg-white rounded-2xl p-8 ${plan.popular ? 'ring-2 ring-violet-600 shadow-xl scale-105' : 'shadow-sm'}`}>
                  {plan.popular && <Badge className="bg-violet-600 text-white mb-4">Most Popular</Badge>}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-violet-600 hover:bg-violet-700' : ''}`} variant={plan.popular ? 'default' : 'outline'} onClick={() => showNotification(`Selected ${plan.name} plan!`)}>
                    {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-violet-100 mb-8 max-w-xl mx-auto">Join millions of learners and unlock your potential with our world-class courses.</p>
          <Button size="lg" className="bg-white text-violet-600 hover:bg-slate-100" onClick={() => setActiveTab('courses')}>
            Get Started Free <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-center text-slate-500">
        <p>Demo created by Structura Studio</p>
      </footer>
    </div>
  );
};

export default EducationDemo;
