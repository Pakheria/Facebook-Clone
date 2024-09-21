// components/DynamicBackground.tsx

import React, { useState, useEffect } from 'react';

const DynamicBackground = () => {
  const [background, setBackground] = useState('');
  const [particles, setParticles] = useState<Array<{ x: number, y: number, size: number, duration: number }>>([]);

  // Elegant futuristic gradients
  const gradientColors = [
    'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,121,113,1) 50%, rgba(0,212,255,1) 100%)',
    'radial-gradient(circle, rgba(255,123,0,1) 0%, rgba(251,255,0,1) 100%)',
    'radial-gradient(circle, rgba(29,233,182,1) 0%, rgba(29,233,182,0.5) 100%)',
    'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(63,94,251,1) 100%)',
    // Add more elegant gradients here
  ];

  // Function to get a random gradient
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    return gradientColors[randomIndex];
  };

  // Generate random particles for the background animation
  const generateParticles = (numParticles: number) => {
    const particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
      particlesArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2, // Particle size
        duration: Math.random() * 5 + 2, // Animation duration
      });
    }
    setParticles(particlesArray);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackground(getRandomGradient());
    }, 10000); // Change background every 10 seconds

    generateParticles(100); // Generate 100 particles
    return () => clearInterval(interval);
  }, [getRandomGradient]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Rotating gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1] transition-all duration-1000 animate-rotate"
        style={{ background }}
      />

      {/* Particles for a futuristic effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute bg-white opacity-30 rounded-full animate-move"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.y}px`,
              left: `${particle.x}px`,
              animationDuration: `${particle.duration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Moving objects for added effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="moving-object bg-blue-500"></div>
        <div className="moving-object bg-red-500"></div>
        <div className="moving-object bg-green-500"></div>
      </div>

      {/* Subtle overlay for sleek glass-like effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 backdrop-blur-md"></div>
    </div>
  );
};

export default DynamicBackground;
