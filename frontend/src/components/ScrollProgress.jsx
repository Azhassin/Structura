import React, { useEffect, useState, useRef } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());

    let ticking = false;
    const updateScrollProgress = () => {
      if (!ticking) {
        rafRef.current = window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = (window.scrollY / scrollHeight) * 100;
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Simpler progress bar on mobile (no shadow)
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-200 to-teal-200">
      <div
        className={`h-full bg-gradient-to-r from-blue-500 to-teal-500 ${isMobile ? '' : 'shadow-lg shadow-teal-500/50'}`}
        style={{ 
          width: `${scrollProgress}%`,
          transition: isMobile ? 'none' : 'width 0.15s ease-out'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
