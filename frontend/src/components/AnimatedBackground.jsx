import React, { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 1000, 1);

  return (
    <>
      {/* Main Dynamic Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${135 + scrollY * 0.1}deg, 
              hsl(${250 - scrollProgress * 30}, 70%, 95%) 0%, 
              hsl(${270 + scrollProgress * 20}, 80%, 90%) 50%, 
              hsl(${210 + scrollProgress * 30}, 75%, 92%) 100%)`,
            transition: 'background 0.3s ease-out'
          }}
        ></div>
        
        {/* Large Animated Orbs - Very Visible */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"
          style={{
            top: '10%',
            left: '-10%',
            background: `radial-gradient(circle, rgba(139, 92, 246, ${0.4 + scrollProgress * 0.3}), transparent)`,
            transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.25}px) scale(${1 + scrollProgress * 0.3})`,
            transition: 'all 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[90px] animate-pulse"
          style={{
            top: '5%',
            right: '-5%',
            background: `radial-gradient(circle, rgba(59, 130, 246, ${0.35 + scrollProgress * 0.25}), transparent)`,
            transform: `translate(-${scrollY * 0.35}px, ${scrollY * 0.3}px) scale(${1 + scrollProgress * 0.25})`,
            transition: 'all 0.5s ease-out',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full mix-blend-multiply filter blur-[80px] animate-pulse"
          style={{
            bottom: '15%',
            left: '20%',
            background: `radial-gradient(circle, rgba(236, 72, 153, ${0.3 + scrollProgress * 0.2}), transparent)`,
            transform: `translate(${scrollY * 0.2}px, -${scrollY * 0.28}px) scale(${1 + scrollProgress * 0.2})`,
            transition: 'all 0.5s ease-out',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-[550px] h-[550px] rounded-full mix-blend-multiply filter blur-[95px] animate-pulse"
          style={{
            bottom: '10%',
            right: '15%',
            background: `radial-gradient(circle, rgba(99, 102, 241, ${0.38 + scrollProgress * 0.28}), transparent)`,
            transform: `translate(-${scrollY * 0.25}px, -${scrollY * 0.32}px) scale(${1 + scrollProgress * 0.22})`,
            transition: 'all 0.5s ease-out',
            animationDelay: '1.5s'
          }}
        />

        {/* Floating Large Geometric Shapes */}
        <div
          className="absolute w-64 h-64 border-4 border-purple-400/40 rounded-[50px]"
          style={{
            top: '25%',
            right: '10%',
            transform: `rotate(${scrollY * 0.15}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
            transition: 'transform 0.3s ease-out',
            opacity: 0.6
          }}
        />
        <div
          className="absolute w-48 h-48 border-4 border-blue-400/40 rounded-full"
          style={{
            bottom: '30%',
            left: '15%',
            transform: `rotate(-${scrollY * 0.12}deg) scale(${1 + Math.sin(scrollY * 0.008) * 0.25})`,
            transition: 'transform 0.3s ease-out',
            opacity: 0.5
          }}
        />
        <div
          className="absolute w-40 h-40 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-3xl"
          style={{
            top: '45%',
            left: '5%',
            transform: `rotate(${45 + scrollY * 0.18}deg) scale(${1 + Math.sin(scrollY * 0.009) * 0.3})`,
            transition: 'transform 0.3s ease-out',
            opacity: 0.7
          }}
        />

        {/* Animated Wave Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 ${300 + Math.sin(scrollY * 0.01) * 50} Q 400 ${250 + Math.cos(scrollY * 0.01) * 80}, 800 ${300 + Math.sin(scrollY * 0.01) * 50} T 1600 ${300 + Math.sin(scrollY * 0.01) * 50}`}
            stroke="url(#wave-gradient)"
            strokeWidth="3"
            fill="none"
            style={{
              transform: `translateX(${-scrollY * 0.5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          <path
            d={`M 0 ${500 + Math.cos(scrollY * 0.012) * 60} Q 400 ${450 + Math.sin(scrollY * 0.012) * 70}, 800 ${500 + Math.cos(scrollY * 0.012) * 60} T 1600 ${500 + Math.cos(scrollY * 0.012) * 60}`}
            stroke="url(#wave-gradient)"
            strokeWidth="3"
            fill="none"
            style={{
              transform: `translateX(${-scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          <path
            d={`M 0 ${700 + Math.sin(scrollY * 0.015) * 70} Q 400 ${650 + Math.cos(scrollY * 0.015) * 90}, 800 ${700 + Math.sin(scrollY * 0.015) * 70} T 1600 ${700 + Math.sin(scrollY * 0.015) * 70}`}
            stroke="url(#wave-gradient)"
            strokeWidth="3"
            fill="none"
            style={{
              transform: `translateX(${-scrollY * 0.7}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        </svg>

        {/* Grid Pattern with Movement */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />

        {/* Large Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${12 + Math.random() * 20}px`,
              height: `${12 + Math.random() * 20}px`,
              background: `radial-gradient(circle, 
                hsl(${250 + i * 15}, 70%, 60%), 
                hsl(${270 + i * 10}, 80%, 70%))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.2 + Math.random() * 0.4)}px) 
                         translateX(${scrollY * (Math.random() * 0.2 - 0.1)}px) 
                         scale(${1 + Math.sin(scrollY * 0.01 + i) * 0.5})`,
              transition: 'transform 0.3s ease-out',
              opacity: 0.6,
              filter: 'blur(1px)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;