import React, { useEffect, useState } from 'react';

const ProfessionalBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Animated gradient orbs with parallax */}
        <div 
          className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.2}px) scale(${1 + scrollY * 0.0002})`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{
            transform: `translate(-${scrollY * 0.12}px, ${scrollY * 0.18}px) scale(${1 + scrollY * 0.0001})`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${scrollY * 0.08}px, -${scrollY * 0.15}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        
        {/* Additional floating orbs */}
        <div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob"
          style={{
            transform: `translate(-${scrollY * 0.25}px, ${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-3000"
          style={{
            transform: `translate(${scrollY * 0.18}px, -${scrollY * 0.22}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.2s ease-out'
        }}>
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="90%" y2="30%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="20%" y1="50%" x2="80%" y2="60%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="15%" y1="80%" x2="85%" y2="70%" stroke="url(#line-gradient)" strokeWidth="2" />
        </svg>
        
        {/* Grid pattern with parallax */}
        <div 
          className="absolute inset-0 bg-grid-slate-100 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out',
            maskImage: 'linear-gradient(0deg, white, rgba(255,255,255,0.5))'
          }}
        ></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px) translateX(${scrollY * (Math.random() * 0.1 - 0.05)}px)`,
              transition: 'transform 0.3s ease-out',
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </>
  );
};

export default ProfessionalBackground;