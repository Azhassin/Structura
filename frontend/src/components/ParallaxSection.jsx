import React, { useEffect, useState, useRef } from 'react';

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Check if mobile - disable parallax on mobile for performance
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    
    if (checkMobile()) return; // Skip parallax on mobile

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrolled = window.scrollY;
            const elementTop = rect.top + scrolled;
            const offset = (scrolled - elementTop) * speed;
            setOffsetY(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  // On mobile, just render children without parallax effect
  if (isMobile) {
    return (
      <div ref={sectionRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={className}>
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
