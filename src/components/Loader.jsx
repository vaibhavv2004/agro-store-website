import React from 'react';

function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 w-full text-center">
      <style>{`
        @keyframes drop-fall {
          0% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          45% {
            transform: translateY(50px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(55px) scale(0.2, 1.5);
            opacity: 0;
          }
          100% {
            transform: translateY(55px) scale(0);
            opacity: 0;
          }
        }

        @keyframes stem-grow {
          0%, 45% {
            transform: scaleY(0);
            opacity: 0;
          }
          65%, 90% {
            transform: scaleY(1);
            opacity: 1;
          }
          95%, 100% {
            transform: scaleY(0);
            opacity: 0;
          }
        }

        @keyframes leaf-left-grow {
          0%, 55% {
            transform: scale(0) rotate(20deg);
            opacity: 0;
          }
          70%, 90% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          95%, 100% {
            transform: scale(0) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes leaf-right-grow {
          0%, 57% {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
          72%, 90% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          95%, 100% {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
        }

        @keyframes sun-glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.1);
          }
        }

        @keyframes ripple {
          0%, 48% {
            transform: scale(0);
            opacity: 0;
          }
          55% {
            transform: scale(1);
            opacity: 0.8;
          }
          75% {
            transform: scale(2.5);
            opacity: 0;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes pulse-text {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .loader-container {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .animate-drop {
          animation: drop-fall 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: center top;
        }

        .animate-stem {
          animation: stem-grow 2.2s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .animate-leaf-left {
          animation: leaf-left-grow 2.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
          transform-origin: 58px 70px;
        }

        .animate-leaf-right {
          animation: leaf-right-grow 2.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
          transform-origin: 62px 70px;
        }

        .animate-glow {
          animation: sun-glow 4s ease-in-out infinite;
          transform-origin: center center;
        }

        .animate-ripple-wave {
          animation: ripple 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          transform-origin: 60px 85px;
        }

        .text-pulse {
          animation: pulse-text 1.8s ease-in-out infinite;
        }
      `}</style>
      
      <div className="loader-container mb-4">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Sun / Solar Glow Background */}
          <circle
            cx="60"
            cy="50"
            r="30"
            fill="url(#solarGlow)"
            className="animate-glow"
          />

          {/* Water Ripple Wave */}
          <ellipse
            cx="60"
            cy="85"
            rx="12"
            ry="4"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="1.5"
            className="animate-ripple-wave"
          />

          {/* Soil Mound */}
          <path
            d="M 30 90 Q 60 78 90 90 Q 60 98 30 90"
            fill="#8B5A2B"
            opacity="0.85"
          />
          <path
            d="M 40 89 Q 60 81 80 89"
            stroke="#5C4033"
            strokeWidth="2"
            fill="none"
          />

          {/* Growing Sprout Stem */}
          <path
            d="M 60 85 Q 58 70 60 52"
            fill="none"
            stroke="#2E7D32"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-stem"
          />

          {/* Left Leaf */}
          <path
            d="M 60 62 Q 42 50 46 64 Q 56 66 60 62"
            fill="#4CAF50"
            className="animate-leaf-left"
          />

          {/* Right Leaf */}
          <path
            d="M 60 56 Q 78 44 74 58 Q 64 60 60 56"
            fill="#81C784"
            className="animate-leaf-right"
          />

          {/* Falling Water Droplet */}
          <path
            d="M 60 15 Q 56 23 56 26 A 4 4 0 0 0 64 26 Q 64 23 60 15"
            fill="#2196F3"
            className="animate-drop"
          />

          {/* Gradients */}
          <defs>
            <radialGradient id="solarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFF59D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="text-pulse text-dark font-medium text-base tracking-wide flex items-center gap-1">
        {message}
      </div>
    </div>
  );
}

export default Loader;
