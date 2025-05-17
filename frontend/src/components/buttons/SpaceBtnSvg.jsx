const SpaceBtnSvg = (white) => (
  <>
    {/* Left Edge */}
    <svg
      className="absolute top-0 left-0"
      width="21"
      height="44"
      viewBox="0 0 21 44"
    >
      <path
        fill={white ? "white" : "none"}
        stroke={white ? "white" : "url(#btnNeon-left)"}
        strokeWidth="2"
        d="M20,43 L6,43 C3.5,43 1,40.5 1,38 L1,6 C1,3.5 3.5,1 6,1 L20,1 L18,4 L6,4 C5,4 4,5 4,6 L4,38 C4,39 5,40 6,40 L18,40 L20,43 Z"
      />
    </svg>

    {/* Top & Bottom Bars */}
    <svg
      className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]"
      height="44"
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      fill={white ? "white" : "none"}
    >
      {white ? (
        <polygon
          fill="white"
          fillRule="nonzero"
          points="100 0 100 44 0 44 0 0"
        />
      ) : (
        <>
          {/* Top Bevel */}
          <polygon
            fill="url(#btnNeon-top)"
            fillRule="nonzero"
            points="100 2 96 0 4 0 0 2"
          />
          {/* Bottom Bevel */}
          <polygon
            fill="url(#btnNeon-bottom)"
            fillRule="nonzero"
            points="100 42 96 44 4 44 0 42"
          />
        </>
      )}
    </svg>

    {/* Right Edge */}
    <svg
      className="absolute top-0 right-0"
      width="21"
      height="44"
      viewBox="0 0 21 44"
    >
      <path
        fill={white ? "white" : "none"}
        stroke={white ? "white" : "url(#btnNeon-right)"}
        strokeWidth="2"
        d="M1,43 L15,43 C17.5,43 20,40.5 20,38 L20,6 C20,3.5 17.5,1 15,1 L1,1 L3,4 L15,4 C16,4 17,5 17,6 L17,38 C17,39 16,40 15,40 L3,40 L1,43 Z"
      />
    </svg>
  </>
);

export default SpaceBtnSvg;
