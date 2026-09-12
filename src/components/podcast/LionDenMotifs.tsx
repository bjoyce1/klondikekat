import type { CSSProperties, ReactNode } from "react";
import { MetalDefs } from "./materials";
import { useMetalId } from "@/hooks/useMetalId";

type MotifProps = { className?: string };

export function LionDenHalo({ className = "" }: MotifProps) {
  const id = useMetalId();
  return (
    <svg className={`ld-halo ${className}`} viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <MetalDefs id={id} />
      <circle
        cx="300"
        cy="300"
        r="263"
        stroke="#f3a939"
        strokeWidth="8"
        opacity=".2"
        filter={`url(#${id}-glow)`}
      />
      <circle cx="300" cy="300" r="263" stroke={`url(#${id}-gold)`} strokeWidth="1.7" />
      <circle cx="300" cy="300" r="253" stroke="#77502a" strokeWidth=".7" />
      <circle cx="300" cy="300" r="277" stroke="#513317" strokeWidth=".7" strokeDasharray="2 9" />
      <path
        d="M57 197A263 263 0 0 1 262 40M385 51A263 263 0 0 1 558 249M539 410A263 263 0 0 1 371 554M215 549A263 263 0 0 1 56 400"
        stroke="#ffdc91"
        strokeWidth="2"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <g key={a} transform={`rotate(${a} 300 300)`}>
          <path d="M300 16v15M294 24h12" stroke="#b28342" />
          <circle cx="300" cy="38" r="2" fill="#ffe1a0" />
        </g>
      ))}
    </svg>
  );
}

export function LionDenWaveform({ className = "" }: MotifProps) {
  return (
    <svg
      className={`ld-waveform ${className}`}
      viewBox="0 0 760 86"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 43H760" stroke="currentColor" strokeOpacity=".4" />
      {Array.from({ length: 137 }, (_, i) => {
        const envelope = Math.sin((i / 136) * Math.PI) ** 1.6;
        const h = 3 + envelope * (4 + ((i * 37 + i * i * 7) % 35));
        return (
          <path
            key={i}
            d={`M${6 + i * 5.5} ${(43 - h).toFixed(3)}v${(h * 2).toFixed(3)}`}
            stroke="currentColor"
            strokeWidth={i % 4 === 0 ? 1.5 : 1}
            opacity={0.4 + (i % 5) * 0.12}
          />
        );
      })}
    </svg>
  );
}

export function LionDenMicrophone({ className = "" }: MotifProps) {
  const id = useMetalId();
  const gold = `url(#${id}-gold)`;
  return (
    <svg className={`ld-microphone ${className}`} viewBox="0 0 230 420" aria-hidden="true">
      <MetalDefs id={id} />
      <ellipse cx="117" cy="393" rx="87" ry="14" fill="#000" opacity=".6" />
      <ellipse cx="115" cy="383" rx="67" ry="12" fill={gold} stroke="#43270e" strokeWidth="2" />
      <path
        d="M64 381Q115 351 166 381Q120 391 64 381Z"
        fill={`url(#${id}-black)`}
        stroke="#c99548"
      />
      <path d="M103 282h24v94q-12 6-24 0Z" fill={gold} />
      <path d="M112 290h4v83" stroke="#ffe3a0" opacity=".6" />
      <rect x="96" y="326" width="38" height="14" rx="4" fill={gold} stroke="#342515" />
      <path
        d="M40 159H29v63c0 58 35 82 85 82s87-24 87-82v-63h-13v62c0 44-24 69-74 69s-74-26-74-69Z"
        fill={gold}
        stroke="#e7b65d"
        strokeWidth="1"
      />
      <path
        d="M32 174v44q0 76 82 80M198 177v39q0 53-42 72"
        fill="none"
        stroke="#fff0bc"
        strokeWidth="1"
        opacity=".6"
      />
      <rect x="24" y="160" width="26" height="28" rx="6" fill={`url(#${id}-chrome)`} />
      <rect x="180" y="160" width="26" height="28" rx="6" fill={gold} />
      <rect
        x="48"
        y="17"
        width="135"
        height="259"
        rx="63"
        fill={`url(#${id}-black)`}
        stroke={gold}
        strokeWidth="7"
      />
      <rect
        x="57"
        y="26"
        width="117"
        height="241"
        rx="55"
        fill={`url(#${id}-mesh)`}
        stroke="#d9a354"
        strokeWidth="1"
      />
      <path d="M104 24q12-4 24 0v42h-24Z" fill={gold} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <g key={i}>
          <path
            d={`M${i === 0 ? 69 : 56} ${69 + i * 19}Q115 ${80 + i * 19} ${i === 0 ? 162 : 175} ${69 + i * 19}v9Q115 ${92 + i * 19} ${i === 0 ? 69 : 56} ${78 + i * 19}Z`}
            fill={gold}
          />
          <path
            d={`M${i === 0 ? 72 : 59} ${70 + i * 19}Q115 ${80 + i * 19} ${i === 0 ? 159 : 173} ${70 + i * 19}`}
            fill="none"
            stroke="#ffe8af"
            strokeWidth=".8"
          />
        </g>
      ))}
      <path
        d="M76 50q7-15 15-16v26l-15 5ZM139 34q9 5 16 16v15l-16-5ZM82 240v17l10 5v-21ZM138 241v21l10-5v-17Z"
        fill={gold}
      />
      <path d="M50 95v92M181 75v128" stroke="#ffe7a8" opacity=".6" strokeWidth="2" />
      <rect x="98" y="179" width="35" height="31" rx="5" fill="#1b1610" stroke="#b98035" />
      <path d="m104 188 6 4 6-8 6 8 6-4-3 14h-18Z" fill="none" stroke="#deb16a" />
      <circle cx="36" cy="174" r="7" fill="#2c2113" stroke="#f4d087" />
      <path d="m32 174h8" stroke="#a77e46" />
      <circle cx="193" cy="174" r="7" fill="#2c2113" stroke="#f4d087" />
      <path d="m189 174h8" stroke="#a77e46" />
    </svg>
  );
}

export function LionDenDragTree({ className = "" }: MotifProps) {
  const id = useMetalId();
  return (
    <svg className={`ld-drag-tree ${className}`} viewBox="0 0 200 490" aria-hidden="true">
      <MetalDefs id={id} />
      <path d="M91 65h18v393H91Z" fill={`url(#${id}-chrome)`} />
      <path d="m70 466 22-16h17l22 16Z" fill={`url(#${id}-black)`} stroke="#806439" />
      {[0, 1].map((row) => (
        <g key={row} className={`ld-stage ld-stage-${row}`}>
          <path d={`M20 ${10 + row * 75}H180v32H20Z`} fill={`url(#${id}-black)`} stroke="#97703d" />
          <text
            x="100"
            y={32 + row * 75}
            textAnchor="middle"
            fill="#dfd7c3"
            fontSize="18"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
          >
            {row === 0 ? "PRE-STAGE" : "STAGE"}
          </text>
          {[49, 72, 128, 151].map((x) => (
            <g key={x}>
              <circle cx={x} cy={59 + row * 75} r="11" fill="#13110c" stroke="#735322" />
              <circle
                className="ld-stage-bulb"
                cx={x}
                cy={59 + row * 75}
                r="7"
                fill={`url(#${id}-lamp)`}
              />
            </g>
          ))}
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((row) => (
        <g
          key={row}
          className={`ld-tree-row ld-tree-row-${row}`}
          style={{ "--lamp-delay": `${0.75 + row * 0.35}s` } as CSSProperties}
        >
          <path
            d={`M40 ${157 + row * 58}h120v48H40Z`}
            fill={`url(#${id}-black)`}
            stroke="#443923"
          />
          {[62, 138].map((x) => (
            <g key={x}>
              <ellipse
                cx={x - 3}
                cy={180 + row * 58}
                rx="25"
                ry="23"
                fill="#050606"
                stroke="#8c6931"
              />
              <circle
                cx={x}
                cy={181 + row * 58}
                r="19"
                fill={row === 3 ? "#062c1a" : row === 4 ? "#32100c" : "#362009"}
                stroke="#9a6a31"
              />
              <circle
                className="ld-tree-bulb"
                cx={x}
                cy={181 + row * 58}
                r="17"
                fill={row === 3 ? "#69ffc0" : row === 4 ? "#e54328" : `url(#${id}-lamp)`}
              />
              <circle
                className="ld-tree-glow"
                cx={x}
                cy={181 + row * 58}
                r="22"
                fill={row === 3 ? "#42ffa8" : "#ffc255"}
                filter={`url(#${id}-glow)`}
              />
              <path
                d={`M${x - 23} ${178 + row * 58}q-3-25 25-23q17 0 22 10q-29-9-47 13Z`}
                fill={`url(#${id}-black)`}
                stroke="#a1793d"
                strokeWidth=".8"
              />
              <path
                d={`M${x - 11} ${181 + row * 58}h22m-11-11v22`}
                stroke="#fff3c7"
                strokeWidth=".5"
                opacity=".25"
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

const towers = [
  [3, 100, 53, 140, 0],
  [58, 142, 47, 98, 1],
  [98, 67, 53, 173, 0],
  [158, 104, 41, 136, 0],
  [202, 29, 67, 211, 2],
  [275, 93, 48, 147, 0],
  [328, 122, 43, 118, 0],
  [373, 57, 71, 183, 1],
  [451, 92, 48, 148, 0],
  [505, 16, 56, 224, 3],
  [568, 60, 77, 180, 0],
  [651, 112, 45, 128, 0],
  [702, 79, 51, 161, 1],
  [760, 115, 69, 125, 0],
  [835, 49, 59, 191, 2],
  [901, 102, 45, 138, 0],
  [951, 153, 45, 87, 0],
  [1005, 122, 62, 118, 1],
  [1074, 154, 47, 86, 0],
  [1127, 117, 65, 123, 0],
] as const;
export function LionDenSkyline({ className = "" }: MotifProps) {
  const id = useMetalId();
  return (
    <svg
      className={`ld-skyline ${className}`}
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-city`} x2="0" y2="1">
          <stop stopColor="#0d0d0c" />
          <stop offset="1" stopColor="#050606" />
        </linearGradient>
        <linearGradient id={`${id}-reflection`} x2="0" y2="1">
          <stop stopColor="#b4772a" stopOpacity=".18" />
          <stop offset="1" stopColor="#b4772a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 241V190h20v-29h32v39h16v-53h49v-23h42v57h45v-79h38v77h31v-12h31v-29h37v69h52v-51h36v-54h48v47h18v-28h35v52h50v-28h73v42h18V126h32v69h32v-70h43v-17h37v42h46v-20h36v80h26v-54h31v-33h43v55h44v-26h23v-24h58v40h25v-31h42v67h28v-23h30v55h43v-51h49v56Z"
        fill="#1c1912"
        opacity=".65"
      />
      {towers.map(([x, y, w, h, roof], n) => (
        <g key={x}>
          <path
            d={
              roof === 2
                ? `M${x} 240V${y + 20}L${x + w / 2} ${y} ${x + w} ${y + 20}V240Z`
                : roof === 3
                  ? `M${x} 240V${y + 17}h8V${y}h${w - 16}v17h8V240Z`
                  : `M${x} 240V${y}h${w}v${h}Z`
            }
            fill={`url(#${id}-city)`}
            stroke="#4e3b23"
            strokeWidth=".65"
          />
          {roof === 1 && <path d={`M${x + w / 2} ${y}v-25`} stroke="#79603a" strokeWidth="1" />}
          <path d={`M${x + 3} ${y + 25}v${h - 25}`} stroke="#9d723a" opacity=".35" />
          {Array.from({ length: Math.floor((h - 30) / 11) }, (_, r) =>
            Array.from(
              { length: Math.floor((w - 10) / 9) },
              (_, c) =>
                (r * 7 + c * 3 + n) % 5 !== 0 && (
                  <rect
                    key={`${r}-${c}`}
                    x={x + 7 + c * 9}
                    y={y + 26 + r * 11}
                    width={3}
                    height={4}
                    fill="#d7a354"
                    opacity={0.15 + ((r + c * 3 + n) % 6) * 0.1}
                  />
                ),
            ),
          )}
          <path d={`M${x} 245h${w}v70h-${w}Z`} fill={`url(#${id}-reflection)`} />
        </g>
      ))}
      <path d="M0 244h1200" stroke="#af7c37" opacity=".35" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M0 ${251 + i * 11}h1200`} stroke="#080909" strokeWidth={4 + i} />
      ))}
    </svg>
  );
}

export function LionDenTachometer({ className = "" }: MotifProps) {
  const id = useMetalId();
  return (
    <svg className={`ld-tachometer ${className}`} viewBox="0 0 280 280" aria-hidden="true">
      <MetalDefs id={id} />
      <circle
        cx="140"
        cy="140"
        r="133"
        fill={`url(#${id}-black)`}
        stroke={`url(#${id}-gold)`}
        strokeWidth="5"
      />
      <circle cx="140" cy="140" r="121" fill="#0a0a09" stroke="#695335" />
      <path d="M208 66A101 101 0 0 1 232 183" fill="none" stroke="#b72f22" strokeWidth="10" />
      {Array.from({ length: 41 }, (_, i) => (
        <path
          key={i}
          d={`M140 29v${i % 5 === 0 ? 15 : 6}`}
          stroke={i > 29 ? "#f34732" : "#d9be87"}
          strokeWidth={i % 5 === 0 ? 2 : 1}
          transform={`rotate(${-125 + i * 6.25} 140 140)`}
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const angle = ((-215 + i * 31.25) * Math.PI) / 180;
        return (
          <text
            key={i}
            x={(140 + 85 * Math.cos(angle)).toFixed(3)}
            y={(146 + 85 * Math.sin(angle)).toFixed(3)}
            fill={i > 5 ? "#ee614c" : "#e6d6b7"}
            textAnchor="middle"
            fontSize="19"
            fontFamily="Arial, sans-serif"
          >
            {i}
          </text>
        );
      })}
      <text x="140" y="110" textAnchor="middle" fill="#a37b44" fontSize="11" letterSpacing="2">
        LION’S DEN
      </text>
      <text x="140" y="189" textAnchor="middle" fill="#e5d4b1" fontSize="13" letterSpacing="2">
        RPM
      </text>
      <text x="140" y="208" textAnchor="middle" fill="#8a806e" fontSize="9" letterSpacing="1.5">
        × 1000
      </text>
      <g className="ld-tach-needle">
        <path d="m137 144 3-108 3 108 4 20h-14Z" fill="#ef4930" />
        <path d="m140 42v113" stroke="#ffb15c" strokeWidth="1" />
      </g>
      <circle cx="140" cy="140" r="12" fill={`url(#${id}-gold)`} />
      <circle cx="140" cy="140" r="7" fill="#181610" />
      <path d="M51 76q75-75 175 14" fill="none" stroke="#ffefbe" opacity=".06" strokeWidth="15" />
    </svg>
  );
}

export function LionDenPlaque({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ld-plaque ${className}`}>
      <div className="ld-plaque-core">{children}</div>
    </div>
  );
}

export function Crown({ className = "" }: MotifProps) {
  return (
    <svg className={className} viewBox="0 0 48 36" fill="none" aria-hidden="true">
      <path d="m4 9 11 7L24 3l9 13 11-7-6 22H10Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 26h24M14 35h20" stroke="currentColor" />
      <circle cx="24" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
