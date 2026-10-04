export function SystemArt() {
  return (
    <svg
      viewBox="0 0 320 300"
      className="system-art"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="art-glow">
          <stop stopColor="#89f7ef" stopOpacity=".14" />
          <stop offset="1" stopColor="#89f7ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="art-line"
          x1="30"
          y1="0"
          x2="260"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b5fff6" stopOpacity=".8" />
          <stop offset=".55" stopColor="#67d9d5" stopOpacity=".35" />
          <stop offset="1" stopColor="#5f6b94" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <circle cx="163" cy="141" r="130" fill="url(#art-glow)" />
      <g stroke="#396c70" strokeWidth=".55">
        <circle cx="164" cy="140" r="122" strokeDasharray="2 8" />
        <path
          d="M9 140h303M164 8v270M38 44l245 201M283 44 40 245"
          opacity=".5"
        />
        <path
          d="M49 36h-20v20M279 237v20h-20"
          stroke="#89f7ef"
          strokeWidth="1.4"
        />
      </g>
      <g stroke="url(#art-line)" strokeWidth=".7">
        {Array.from({ length: 40 }, (_, i) => {
          const t = i / 40;
          const points = Array.from({ length: 101 }, (_, j) => {
            const a = (j / 100) * Math.PI * 2;
            const r =
              72 + 20 * Math.sin(5 * a + t * 3) + 13 * Math.cos(3 * a - t * 5);
            const x = 164 + Math.cos(a) * r * (0.45 + t * 0.6);
            const y =
              138 +
              Math.sin(a) * r -
              35 * Math.sin(t * Math.PI) * Math.cos(a * 2);
            return `${j === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
          }).join(" ");
          return <path d={points + "Z"} key={i} />;
        })}
      </g>
      <path
        d="M168 178q-34 59-17 106M171 184q-21 53-15 100"
        stroke="#74ded8"
        strokeWidth=".7"
      />
      <g fill="#89f7ef">
        <rect x="27" y="55" width="3" height="3" />
        <rect x="277" y="222" width="4" height="4" />
      </g>
      <text
        x="210"
        y="276"
        fill="#79abaa"
        fontFamily="monospace"
        fontSize="7"
        letterSpacing="1.5"
      >
        FORM / 001
      </text>
    </svg>
  );
}
export function Radar() {
  return (
    <svg viewBox="0 0 150 76" fill="none" aria-hidden="true">
      <g stroke="#65c7c6" strokeWidth=".6">
        <ellipse cx="75" cy="38" rx="66" ry="28" />
        <ellipse cx="75" cy="38" rx="42" ry="28" />
        <ellipse cx="75" cy="38" rx="18" ry="28" />
        <ellipse cx="75" cy="38" rx="66" ry="13" />
        <path d="M9 38h132M75 10v56" />
      </g>
    </svg>
  );
}
