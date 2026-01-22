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

  // Calculate scroll progress (0 to 1)
  const maxScroll = 3000; // Adjust this based on your page height
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Interpolate from purple to blue
  const hue1 = 250 - (scrollProgress * 40); // Purple (250) to Blue (210)
  const hue2 = 270 - (scrollProgress * 60); // Purple-Pink (270) to Blue (210)
  const hue3 = 280 - (scrollProgress * 70); // Light Purple (280) to Cyan (210)

  return (
    <>
      {/* Main Dynamic Gradient Background - Purple to Blue Transition */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${135 + scrollY * 0.05}deg, 
              hsl(${hue1}, ${70 - scrollProgress * 10}%, ${96 - scrollProgress * 2}%) 0%, 
              hsl(${hue2}, ${80 - scrollProgress * 15}%, ${94 - scrollProgress * 2}%) 50%, 
              hsl(${hue3}, ${75 - scrollProgress * 10}%, ${95 - scrollProgress * 2}%) 100%)`,
            transition: 'background 0.5s ease-out'
          }}
        ></div>
        
        {/* Animated Orbs - Color changes from purple to blue */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[120px]"
          style={{
            top: '10%',
            left: '-10%',
            background: `radial-gradient(circle, 
              hsla(${250 - scrollProgress * 40}, 70%, 60%, ${0.12 + scrollProgress * 0.05}), 
              transparent)`,
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.15}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full mix-blend-multiply filter blur-[110px]"
          style={{
            bottom: '15%',
            right: '10%',
            background: `radial-gradient(circle, 
              hsla(${220 - scrollProgress * 10}, 75%, 65%, ${0.1 + scrollProgress * 0.08}), 
              transparent)`,
            transform: `translate(-${scrollY * 0.18}px, -${scrollY * 0.2}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-[100px]"
          style={{
            top: '40%',
            right: '20%',
            background: `radial-gradient(circle, 
              hsla(${240 - scrollProgress * 30}, 70%, 62%, ${0.08 + scrollProgress * 0.06}), 
              transparent)`,
            transform: `translate(-${scrollY * 0.15}px, ${scrollY * 0.12}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />

        {/* Geometric shapes with color transition */}
        <div
          className="absolute w-48 h-48 rounded-[40px]"
          style={{
            top: '20%',
            right: '15%',
            border: `2px solid hsla(${250 - scrollProgress * 40}, 60%, 70%, ${0.3 + scrollProgress * 0.2})`,
            transform: `rotate(${scrollY * 0.08}deg)`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full"
          style={{
            bottom: '30%',
            left: '10%',
            border: `2px solid hsla(${220 - scrollProgress * 10}, 65%, 68%, ${0.25 + scrollProgress * 0.2})`,
            transform: `rotate(-${scrollY * 0.06}deg)`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-2xl"
          style={{
            top: '55%',
            left: '8%',
            border: `2px solid hsla(${235 - scrollProgress * 25}, 68%, 65%, ${0.28 + scrollProgress * 0.15})`,
            transform: `rotate(${45 + scrollY * 0.1}deg)`,
            transition: 'all 0.3s ease-out'
          }}
        />

        {/* Wave lines with color transition */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop 
                offset="0%" 
                stopColor={`hsl(${250 - scrollProgress * 40}, 70%, 60%)`} 
                stopOpacity="0.3" 
              />
              <stop 
                offset="50%" 
                stopColor={`hsl(${230 - scrollProgress * 20}, 75%, 65%)`} 
                stopOpacity="0.25" 
              />
              <stop 
                offset="100%" 
                stopColor={`hsl(${210 - scrollProgress * 5}, 80%, 70%)`} 
                stopOpacity="0.3" 
              />
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

        {/* Grid pattern with color transition */}
        <div 
          className="absolute inset-0"
          style={{
            opacity: 0.08,
            backgroundImage: `
              linear-gradient(hsla(${250 - scrollProgress * 40}, 70%, 60%, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, hsla(${250 - scrollProgress * 40}, 70%, 60%, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)`,
            transition: 'all 0.2s ease-out'
          }}
        />

        {/* Scroll indicator text */}
        <div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center"
          style={{
            opacity: scrollProgress < 0.9 ? 0.6 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <p 
            className="text-sm font-medium"
            style={{
              color: `hsl(${250 - scrollProgress * 40}, 70%, 50%)`
            }}
          >
            {scrollProgress < 0.3 ? 'Scroll to see the magic ✨' : 
             scrollProgress < 0.7 ? 'Keep scrolling...' : 
             'Almost there!'}
          </p>
        </div>
      </div>
    </>
  );
};

export default AnimatedBackground;