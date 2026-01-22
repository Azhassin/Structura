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
              hsl(${250 - scrollProgress * 30}, 70%, 96%) 0%, 
              hsl(${270 + scrollProgress * 20}, 80%, 94%) 50%, 
              hsl(${210 + scrollProgress * 30}, 75%, 95%) 100%)`,
            transition: 'background 0.3s ease-out'
          }}
        ></div>
        
        {/* Subtle gradient orbs - Much lighter and fewer */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[120px]"
          style={{
            top: '10%',
            left: '-10%',
            background: `radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent)`,
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.15}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-[100px]"
          style={{
            bottom: '15%',
            right: '10%',
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.06), transparent)`,
            transform: `translate(-${scrollY * 0.18}px, -${scrollY * 0.2}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />

        {/* Clean geometric shapes - More subtle */}
        <div
          className="absolute w-48 h-48 border border-purple-200/40 rounded-[40px]"
          style={{
            top: '20%',
            right: '15%',
            transform: `rotate(${scrollY * 0.08}deg)`,
            transition: 'transform 0.3s ease-out',
            opacity: 0.4
          }}
        />
        <div
          className="absolute w-32 h-32 border border-blue-200/40 rounded-full"
          style={{
            bottom: '30%',
            left: '10%',
            transform: `rotate(-${scrollY * 0.06}deg)`,
            transition: 'transform 0.3s ease-out',
            opacity: 0.3
          }}
        />

        {/* Subtle wave lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 ${300 + Math.sin(scrollY * 0.01) * 30} Q 400 ${250 + Math.cos(scrollY * 0.01) * 50}, 800 ${300 + Math.sin(scrollY * 0.01) * 30} T 1600 ${300 + Math.sin(scrollY * 0.01) * 30}`}
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            style={{
              transform: `translateX(${-scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          <path
            d={`M 0 ${500 + Math.cos(scrollY * 0.012) * 40} Q 400 ${450 + Math.sin(scrollY * 0.012) * 50}, 800 ${500 + Math.cos(scrollY * 0.012) * 40} T 1600 ${500 + Math.cos(scrollY * 0.012) * 40}`}
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            style={{
              transform: `translateX(${-scrollY * 0.2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        </svg>

        {/* Minimal grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;