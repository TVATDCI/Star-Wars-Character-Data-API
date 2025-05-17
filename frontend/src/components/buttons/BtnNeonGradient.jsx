// This the BtnNeon.jsx
// It is second generation modified from ButtonGradient.jsx.
// It is a button component that triggers a cinematic effect outlined of any .svg file with the same id!
// In this case , it is SpaceBtnSvg.jsx.
const BtnNeonGradient = () => {
  return (
    <svg className="block" width={0} height={0}>
      <defs>
        {/* Left Edge: Cool Blue to Electric Purple */}
        <linearGradient id="btnNeon-left" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#7F00FF" />
        </linearGradient>

        {/* Top Edge: Teal to Neon Lime */}
        <linearGradient id="btnNeon-top" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#00F5A0" />
          <stop offset="100%" stopColor="#A3FF00" />
        </linearGradient>

        {/* Bottom Edge: Electric Pink to Magenta */}
        <linearGradient id="btnNeon-bottom" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#F31559" />
          <stop offset="50%" stopColor="#FF3CAC" />
          <stop offset="100%" stopColor="#562B7C" />
        </linearGradient>

        {/* Right Edge: Gold to Hot Orange */}
        <linearGradient
          id="btnNeon-right"
          x1="14.635%"
          x2="14.635%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFCC00" />
          <stop offset="100%" stopColor="#FF5733" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BtnNeonGradient;
