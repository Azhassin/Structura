import React from 'react';
import { GraduationCap, BookOpen, Users, Award, Play, Clock, Star, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const EducationDemo = () => {
  const courses = [
    { title: 'Web Development Bootcamp', instructor: 'John Smith', price: 99, originalPrice: 199, rating: 4.9, students: '15K+', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop', category: 'Development' },
    { title: 'UI/UX Design Masterclass', instructor: 'Sarah Lee', price: 79, originalPrice: 149, rating: 4.8, students: '12K+', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', category: 'Design' },
    { title: 'Data Science Fundamentals', instructor: 'Mike Chen', price: 129, originalPrice: 249, rating: 4.9, students: '20K+', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', category: 'Data Science' },
    { title: 'Digital Marketing Pro', instructor: 'Emily Brown', price: 69, originalPrice: 129, rating: 4.7, students: '8K+', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', category: 'Marketing' },
  ];

  const features = [
    { icon: BookOpen, title: '500+ Courses', desc: 'Wide range of topics' },
    { icon: Users, title: 'Expert Instructors', desc: 'Learn from the best' },
    { icon: Award, title: 'Certificates', desc: 'Earn credentials' },
    { icon: Clock, title: 'Lifetime Access', desc: 'Learn at your pace' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
              {['Courses', 'Categories', 'Instructors', 'Pricing', 'Blog'].map(item => (
                <a key={item} href="#" className="text-slate-600 hover:text-violet-600 transition-colors">{item}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Log In</Button>
              <Button className="bg-violet-600 hover:bg-violet-700">Sign Up Free</Button>
            </div>
          </div>
        </div>
      </header>

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
                <Button size="lg" className="bg-white text-violet-900 hover:bg-slate-100">
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

      {/* Popular Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Courses</h2>
              <p className="text-slate-600">Learn from the best instructors worldwide</p>
            </div>
            <Button variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-4 left-4 bg-violet-600 text-white">{course.category}</Badge>
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
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700">Enroll</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-violet-100 mb-8 max-w-xl mx-auto">Join millions of learners and unlock your potential with our world-class courses.</p>
          <Button size="lg" className="bg-white text-violet-600 hover:bg-slate-100">
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
