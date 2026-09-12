import { useState } from "react";
import { MetalDefs } from "./materials";
import { useMetalId } from "@/hooks/useMetalId";

/** Artwork-led SVG composite: the painted body and mechanical layers animate independently. */
export function LionDenMuscleCar({ className = "" }: { className?: string }) {
  const id = useMetalId();
  const [failed, setFailed] = useState(false);
  if (failed) return <VectorMuscleCar className={className} />;
  const asset = "/images/podcast/lions-den-muscle-car.png";
  return (
    <svg
      className={`ld-muscle-car ld-artwork-car ${className}`}
      viewBox="0 145 1536 770"
      role="img"
      aria-label="Black muscle car in the poster’s gold-lit style, with a three-port hood blower, deep chrome wheels, and illuminated round headlights"
    >
      <MetalDefs id={id} />
      <defs>
        <filter id={`${id}-feather`}>
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <mask
          id={`${id}-silhouette`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="140"
          width="1536"
          height="780"
        >
          <path
            d="M4 580 22 478 28 403 57 381 178 355 250 275Q332 199 505 190Q801 185 920 234L1029 233Q1102 230 1129 266L1128 390 1379 437Q1514 468 1530 580L1533 661 1476 699 1431 729Q1403 831 1281 850L640 865 493 871 351 818 169 792 6 751Z"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
        </mask>
        <radialGradient id={`${id}-smoke-art`}>
          <stop stopColor="#d3bf99" stopOpacity=".38" />
          <stop offset="1" stopColor="#897354" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-front-rim`}>
          <circle r="103" />
        </clipPath>
        <clipPath id={`${id}-rear-rim`}>
          <circle r="88" />
        </clipPath>
      </defs>
      <g data-layer="ground-reflection" className="ld-car-reflection">
        <ellipse cx="823" cy="850" rx="662" ry="32" fill="#b18137" filter={`url(#${id}-soft)`} />
        <path
          d="m673 850 57 33 19-32m619-3 45 24 7-25"
          stroke="#e9ac4c"
          strokeWidth="10"
          filter={`url(#${id}-glow)`}
        />
      </g>
      <g data-layer="car-shadow">
        <ellipse
          cx="820"
          cy="827"
          rx="670"
          ry="32"
          fill="#010302"
          opacity=".8"
          filter={`url(#${id}-soft)`}
        />
      </g>
      <g data-layer="smoke-left" className="ld-tire-smoke" fill={`url(#${id}-smoke-art)`}>
        <ellipse cx="100" cy="682" rx="205" ry="114" />
        <ellipse cx="213" cy="753" rx="200" ry="66" />
      </g>
      <g className="ld-car-assembly">
        <image
          data-layer="painted-body"
          href={asset}
          width="1536"
          height="1024"
          mask={`url(#${id}-silhouette)`}
          onError={() => setFailed(true)}
        />
        {/* Unwarp each elliptical rim to a circle, rotate, then project it back to perspective. */}
        {[
          { name: "front", cx: 450, cy: 670, rx: 44, ry: 103, tilt: -8 },
          { name: "rear", cx: 119, cy: 618, rx: 24, ry: 88, tilt: 1 },
        ].map((wheel) => (
          <g
            key={wheel.name}
            data-layer={`${wheel.name}-wheel`}
            transform={`translate(${wheel.cx} ${wheel.cy}) rotate(${wheel.tilt}) scale(${wheel.rx / wheel.ry} 1)`}
          >
            <g clipPath={`url(#${id}-${wheel.name}-rim)`}>
              <g className="ld-wheel-spokes" data-layer={`${wheel.name}-rim`}>
                <image
                  href={asset}
                  width="1536"
                  height="1024"
                  transform={`scale(${wheel.ry / wheel.rx} 1) rotate(${-wheel.tilt}) translate(${-wheel.cx} ${-wheel.cy})`}
                />
              </g>
            </g>
          </g>
        ))}
        {[
          { x: 710, y: 554, rx: 42, ry: 48 },
          { x: 1383, y: 557, rx: 40, ry: 45 },
        ].map((lamp, i) => (
          <g key={i} data-layer={`headlight-${i === 0 ? "left" : "right"}`}>
            <ellipse
              className="ld-lamp-shade"
              cx={lamp.x}
              cy={lamp.y}
              rx={lamp.rx}
              ry={lamp.ry}
              fill="#171006"
            />
            <g className="ld-car-headlight">
              <ellipse
                cx={lamp.x}
                cy={lamp.y}
                rx="115"
                ry="100"
                fill={`url(#${id}-bloom)`}
                opacity=".8"
              />
              <path
                d={`M${lamp.x - 76} ${lamp.y}h152`}
                stroke="#ffda81"
                strokeWidth="1.2"
                opacity=".45"
              />
            </g>
          </g>
        ))}
      </g>
      <g
        data-layer="smoke-right"
        className="ld-tire-smoke ld-tire-smoke-right"
        fill={`url(#${id}-smoke-art)`}
      >
        <ellipse cx="1400" cy="786" rx="112" ry="45" />
      </g>
    </svg>
  );
}

/** Fully procedural fallback retains the individually editable vector machinery. */
function VectorMuscleCar({ className = "" }: { className?: string }) {
  const id = useMetalId();
  const paint = `url(#${id}-black)`,
    chrome = `url(#${id}-chrome)`,
    gold = `url(#${id}-gold)`;
  return (
    <svg
      className={`ld-muscle-car ${className}`}
      viewBox="0 0 1100 620"
      role="img"
      aria-label="Glossy black classic muscle car with a hood blower, deep chrome wheels, and warm gold headlights"
    >
      <MetalDefs id={id} />
      <defs>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2=".1" y2="1">
          <stop stopColor="#b2a380" />
          <stop offset=".045" stopColor="#35332b" />
          <stop offset=".17" stopColor="#060808" />
          <stop offset=".42" stopColor="#242723" />
          <stop offset=".49" stopColor="#060708" />
          <stop offset=".82" stopColor="#030405" />
          <stop offset="1" stopColor="#4c3a20" />
        </linearGradient>
        <linearGradient id={`${id}-hood`} x1="0" y1="0" x2=".75" y2="1">
          <stop stopColor="#0a1010" />
          <stop offset=".17" stopColor="#777563" />
          <stop offset=".2" stopColor="#2d322f" />
          <stop offset=".25" stopColor="#030607" />
          <stop offset=".58" stopColor="#111b1b" />
          <stop offset=".7" stopColor="#363831" />
          <stop offset=".73" stopColor="#080b0c" />
          <stop offset=".94" stopColor="#131714" />
          <stop offset="1" stopColor="#c2a061" />
        </linearGradient>
        <linearGradient id={`${id}-smoke`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c7b395" stopOpacity=".01" />
          <stop offset=".5" stopColor="#baa37e" stopOpacity=".55" />
          <stop offset="1" stopColor="#dfc5a0" stopOpacity=".06" />
        </linearGradient>
        <radialGradient id={`${id}-rim`}>
          <stop stopColor="#050808" />
          <stop offset=".35" stopColor="#66635b" />
          <stop offset=".42" stopColor="#111719" />
          <stop offset=".7" stopColor="#040707" />
          <stop offset=".78" stopColor="#9c9687" />
          <stop offset=".84" stopColor="#eee3c2" />
          <stop offset=".89" stopColor="#13191a" />
          <stop offset=".96" stopColor="#787970" />
          <stop offset="1" stopColor="#161c1c" />
        </radialGradient>
        <pattern id={`${id}-grille`} width="7" height="9" patternUnits="userSpaceOnUse">
          <rect width="7" height="9" fill="#050809" />
          <path d="M0 2h7M2 0v9" stroke="#444640" strokeWidth=".7" />
          <path d="M0 3h7" stroke="#121919" />
        </pattern>
        <filter id={`${id}-smokeBlur`} x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <g data-layer="ground-reflection" className="ld-car-reflection">
        <ellipse cx="595" cy="544" rx="435" ry="34" fill="#b18543" filter={`url(#${id}-soft)`} />
        <path
          d="m175 531 255 61 553-52-51-12Z"
          fill={gold}
          opacity=".23"
          filter={`url(#${id}-soft)`}
        />
        <path
          d="m711 539 31 58h39l14-58m155-13 19 43h35l5-48"
          stroke="#ffb84c"
          strokeWidth="9"
          opacity=".3"
          filter={`url(#${id}-soft)`}
        />
      </g>
      <g data-layer="car-shadow">
        <ellipse
          cx="587"
          cy="522"
          rx="430"
          ry="36"
          fill="#000"
          opacity=".95"
          filter={`url(#${id}-soft)`}
        />
        <path d="m158 483 337 66 476-33 55-57-489-47Z" fill="#020303" />
      </g>
      <g
        data-layer="smoke-left"
        className="ld-tire-smoke"
        filter={`url(#${id}-smokeBlur)`}
        fill={`url(#${id}-smoke)`}
      >
        <path d="M372 481c-80 46-102-8-142-13-31-4-78 33-114 6-51-39 10-68 9-91-2-33-53-35-47-78 5-30 42-16 45-39 4-34-45-42-13-82-11 55 86 36 61 103-21 55 69 39 48 86-25 55 141 4 153 108Z" />
        <path d="M283 498c-71 23-183 6-211-28-28-35-3-44-13-68-15-34-37-50-14-87-5 68 78 27 72 95-2 36 70 8 87 32 15 22 61 17 79 56Z" />
        <ellipse cx="180" cy="479" rx="127" ry="36" />
      </g>
      <g
        data-layer="smoke-right"
        className="ld-tire-smoke ld-tire-smoke-right"
        fill={`url(#${id}-smoke)`}
        filter={`url(#${id}-smokeBlur)`}
      >
        <path d="M872 505c11-51 76-19 91-60 13-33 6-55 51-65 41-10 0-60 43-74-24 41 26 58 5 97-12 24-28 32-13 52 24 31-30 67-177 50Z" />
      </g>

      <g className="ld-car-assembly">
        <g data-layer="far-front-wheel">
          <path
            d="M907 417q-12 106 28 113l42-4q40-21 31-112Z"
            fill="#050808"
            stroke="#252a26"
            strokeWidth="2"
          />
          <path d="M967 430q29 29 6 84" stroke="#77705a" strokeWidth="2" opacity=".5" />
        </g>
        <g data-layer="rear-wheel" transform="translate(266 427) rotate(-9)">
          <ellipse cx="7" cy="4" rx="67" ry="88" fill="#000" />
          <ellipse
            cx="0"
            cy="0"
            rx="59"
            ry="81"
            fill={`url(#${id}-rubber)`}
            stroke="#4b4b3f"
            strokeWidth="1.4"
          />
          <ellipse rx="43" ry="64" fill={`url(#${id}-rim)`} />
          <g transform="scale(.65 1)">
            <g className="ld-wheel-spokes" data-layer="rear-rim">
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 36})`}>
                  <path
                    d="m-4-11-7-43 9-6 8 8-5 41Z"
                    fill={chrome}
                    stroke="#737569"
                    strokeWidth=".6"
                  />
                  <path d="m-2-16-3-31" stroke="#e3ddc3" strokeWidth="1" />
                </g>
              ))}
              <circle r="17" fill={chrome} />
              <circle r="10" fill="#131818" stroke="#a3916f" />
              {Array.from({ length: 5 }, (_, i) => (
                <circle
                  key={i}
                  cx={(12 * Math.sin((i * Math.PI * 2) / 5)).toFixed(3)}
                  cy={(12 * Math.cos((i * Math.PI * 2) / 5)).toFixed(3)}
                  r="2"
                  fill="#ded9c9"
                />
              ))}
            </g>
          </g>
          <ellipse
            rx="51"
            ry="73"
            fill="none"
            stroke="#686856"
            strokeWidth=".7"
            strokeDasharray="2 6"
            opacity=".55"
          />
          <path
            d="M-44-47Q1-99 43-50"
            fill="none"
            stroke="#b9ab89"
            strokeWidth="1.5"
            opacity=".38"
          />
        </g>

        <g data-layer="body-shell">
          <path
            d="M120 336 172 309 315 274 365 205Q374 190 400 184L511 175Q543 172 560 187L675 263 907 309Q958 318 1006 350L1020 414 1009 475 935 498 706 513 663 497Q683 433 660 393 639 359 613 368 568 387 558 470L328 451Q334 398 310 362 289 334 260 348 219 366 205 433L139 419 116 384Z"
            fill={`url(#${id}-side)`}
            stroke="#60553c"
            strokeWidth="1.7"
          />
          <path
            d="M126 348 213 350Q258 314 313 343L587 371Q627 341 662 368L997 350 947 324 677 268 314 280 171 316Z"
            fill={paint}
          />
          <path
            d="M137 408 203 422Q225 337 275 337 329 332 341 435L553 457Q565 351 617 354 675 352 683 421L697 497l-32-7q10-66-9-99-17-34-44-24-41 11-54 103L328 451q4-80-36-103-55-22-87 85l-66-14Z"
            fill="#070a0b"
          />
          <path
            d="M147 412 200 422M335 447 554 468M704 498 928 484"
            stroke="#a27c41"
            strokeWidth="2"
          />
          <path d="M150 400 196 408M341 435 551 456" stroke="#e8bb66" strokeWidth=".75" />
          <path
            d="M165 318 154 385 194 397M353 289 341 430 546 450 568 344"
            fill="none"
            stroke="#020404"
            strokeWidth="3"
          />
          <path
            d="M356 292 345 428 545 446"
            fill="none"
            stroke="#6f7059"
            strokeWidth=".75"
            opacity=".7"
          />
          <path
            d="M176 331 308 307 553 333 556 340 306 315 178 337Z"
            fill="#b49759"
            opacity=".42"
          />
          <path d="M179 338 306 318 548 345" fill="none" stroke="#ceac67" strokeWidth="1" />
          <path d="M179 343 208 340M348 326l190 21" stroke="#eee2ba" strokeWidth=".7" />
          <path d="M366 321l38 4v8l-38-4Z" fill={chrome} stroke="#111a19" />
          <path d="m371 322 29 3" stroke="#ead7ab" />
          <path d="M171 371h19v9h-19Z" fill="#b5581c" stroke="#a67e47" />
          <path d="m485 365 36 4" stroke="#b6a781" strokeWidth="2" />
          <path d="m486 369 25 3" stroke="#626153" />
        </g>

        <g data-layer="roof">
          <path
            d="M311 282 362 203Q374 185 400 182L512 173Q541 171 562 187L677 264 649 270 548 193 400 197 340 285Z"
            fill={paint}
            stroke={chrome}
            strokeWidth="1.5"
          />
          <path
            d="M367 204q10-15 34-17l111-10q26-2 45 13"
            stroke="#e6c78d"
            strokeWidth="2"
            fill="none"
          />
          <path d="M401 190 512 181 546 191 411 201Z" fill="#959282" opacity=".16" />
        </g>
        <g data-layer="side-windows">
          <path
            d="m361 215 44-14 47-3-16 102-111-13Z"
            fill={`url(#${id}-glass)`}
            stroke={chrome}
            strokeWidth="2"
          />
          <path
            d="m461 199 64-5 80 102-159 4Z"
            fill={`url(#${id}-glass)`}
            stroke={chrome}
            strokeWidth="2.5"
          />
          <path d="m453 198-12 105" stroke="#080c0d" strokeWidth="8" />
          <path d="m383 209-38 68 39-2 35-73Z" fill="#d2d5ba" opacity=".09" />
          <path d="m478 205 16-2 27 88-36 1Z" fill="#cfd0b1" opacity=".08" />
          <path d="M461 289q17-34 35-33 20 0 30 37" fill="#050909" />
          <path d="m347 283 246 16" stroke="#e2c58c" opacity=".5" />
        </g>
        <g data-layer="windshield">
          <path
            d="m539 199 19-1 110 71 72 54-125-21Z"
            fill={`url(#${id}-glass)`}
            stroke={chrome}
            strokeWidth="3"
          />
          <path d="m554 205 89 69 72 39-92-17Z" fill="#0b1111" opacity=".65" />
          <path d="m558 203 18 13 109 92-23-6Z" fill="#a9b09d" opacity=".22" />
          <path
            d="m616 295 66 13-19-10m14 12 35 6-25-12"
            stroke="#92907b"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="m620 291 60 11 40 10" stroke="#030809" strokeWidth="3" fill="none" />
        </g>
        <g data-layer="side-mirror">
          <path d="m586 300-8 18-19-4 8-21Z" fill={chrome} />
          <path
            d="m550 290 29-4q11 1 13 13l-3 12-34-1q-11-6-5-20Z"
            fill={paint}
            stroke={chrome}
            strokeWidth="2"
          />
          <path d="m554 293 27-3 5 9-31 5Z" fill="#7b7e6e" />
        </g>

        <g data-layer="hood">
          <path
            d="m663 271 231 38q60 11 105 37L688 367l-82-61Z"
            fill={`url(#${id}-hood)`}
            stroke="#a28e66"
            strokeWidth="1.1"
          />
          <path
            d="m676 279 215 38 82 28-269 16-83-53Z"
            fill="none"
            stroke="#050b0c"
            strokeWidth="2"
          />
          <path d="m689 280 63 10 118 62-36 2Z" fill="#070c0d" stroke="#877345" strokeWidth=".7" />
          <path d="m770 294 20 3 104 53-15 1Z" fill="#080e0f" stroke="#b09252" strokeWidth=".8" />
          <path
            d="m634 313 72 44 259-15"
            stroke="#f0c47c"
            strokeWidth=".8"
            fill="none"
            opacity=".65"
          />
        </g>
        <g data-layer="hood-blower">
          <path d="m709 288 105 10 39 29-107 8-43-31Z" fill="#050909" stroke="#a09273" />
          <path
            d="m720 262 69 4 40 46-83 9-29-19Z"
            fill={chrome}
            stroke="#222a29"
            strokeWidth="2"
          />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`m${727 + i * 10} ${271 + i * 0.55} 24 41`}
              stroke="#161d1d"
              strokeWidth="3"
            />
          ))}
          <path d="m721 263 68 5 40 44-80 5Z" fill="none" stroke="#ead5a5" />
          <path
            d="m779 270 42 0 22 35-11 19-32-6-8-22Z"
            fill="#1c2321"
            stroke={chrome}
            strokeWidth="3"
          />
          <circle cx="820" cy="301" r="15" fill="#050a0a" stroke={chrome} strokeWidth="4" />
          <circle cx="820" cy="301" r="5" fill={gold} />
          <circle cx="800" cy="279" r="8" fill="#090d0e" stroke={chrome} strokeWidth="2" />
          <path
            d="M798 271Q791 266 790 280L807 310Q815 322 832 308L829 290Z"
            fill="none"
            stroke="#060a0b"
            strokeWidth="4"
          />
        </g>
        <g data-layer="hood-scoop">
          <path
            d="M694 265v-26q-1-18 24-22l84 3q18 2 28 19l-5 31-86 7Z"
            fill={paint}
            stroke={gold}
            strokeWidth="1.7"
          />
          <path d="m706 223 85 2q19 0 29 12l-85-3Z" fill="#6b6450" opacity=".65" />
          <path
            d="m696 243 39-8 91 3v32l-87 5-42-12Z"
            fill="#121b1b"
            stroke={chrome}
            strokeWidth="1.2"
          />
          {[749, 776, 803].map((x, i) => (
            <g key={x}>
              <ellipse
                cx={x}
                cy={254 - i}
                rx="12"
                ry="16"
                fill="#010405"
                stroke={chrome}
                strokeWidth="2.8"
              />
              <ellipse cx={x - 1} cy={256 - i} rx="8" ry="11" fill="#010203" />
              <path
                d={`M${x - 8} ${247 - i}q7-8 15-1`}
                fill="none"
                stroke="#c4964b"
                strokeWidth="1"
              />
            </g>
          ))}
          <path d="M697 244v13l32 8v-23Z" fill="#080e0e" />
          <path d="m704 243 23-5" stroke="#efc47c" strokeWidth="1" />
        </g>

        <g data-layer="front-wheel" transform="translate(617 448) rotate(-8)">
          <ellipse cx="13" cy="4" rx="77" ry="96" fill="#020606" stroke="#282e29" strokeWidth="3" />
          <ellipse rx="68" ry="91" fill={`url(#${id}-rubber)`} stroke="#646454" strokeWidth="1.4" />
          <ellipse rx="50" ry="73" fill={`url(#${id}-rim)`} />
          <ellipse rx="42" ry="63" fill="#101918" stroke="#9e9987" strokeWidth="1" />
          <ellipse rx="35" ry="52" fill="#343b35" />
          <ellipse rx="31" ry="47" fill="#19211f" />
          <path d="M28-40q17 14 12 43l-10 3-5-43Z" fill="#63251b" />
          <g transform="scale(.66 1)">
            <g className="ld-wheel-spokes" data-layer="front-rim">
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 36})`}>
                  <path
                    d="m-4-13-9-45 10-8 10 10-4 43Z"
                    fill={chrome}
                    stroke="#a1a394"
                    strokeWidth=".8"
                  />
                  <path d="M-2-19-5-53" stroke="#e7debf" strokeWidth="1.2" />
                </g>
              ))}
              <circle r="19" fill={chrome} stroke="#b5af98" />
              <circle r="11" fill="#131b1b" stroke="#b19a6e" />
              {Array.from({ length: 5 }, (_, i) => (
                <circle
                  key={i}
                  cx={(14 * Math.sin((i * Math.PI * 2) / 5)).toFixed(3)}
                  cy={(14 * Math.cos((i * Math.PI * 2) / 5)).toFixed(3)}
                  r="2.4"
                  fill="#e5decb"
                />
              ))}
              <path d="m-6-3 6-5 6 5v7l-6 4-6-4Z" fill={gold} />
            </g>
          </g>
          <ellipse rx="56" ry="79" fill="none" stroke="#7b7865" strokeWidth=".6" />
          <ellipse
            rx="61"
            ry="83"
            fill="none"
            stroke="#6f6e5b"
            strokeWidth="1.4"
            strokeDasharray="1 7"
            opacity=".6"
          />
          <path
            d="M-49-58Q0-106 46-64M-60 32q7 37 34 46"
            fill="none"
            stroke="#c2b38e"
            strokeWidth="1.2"
            opacity=".45"
          />
          <text x="0" y="-76" fill="#787a69" fontSize="6" textAnchor="middle" letterSpacing="2">
            RADIAL • PERFORMANCE
          </text>
        </g>
        <g data-layer="wheel-arch-trim">
          <path
            d="M204 427q17-79 60-87 49-9 65 92M554 465q10-105 62-108 57-3 65 82"
            stroke={chrome}
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M551 461q7-115 66-109 53-4 68 80"
            stroke="#e4b664"
            strokeWidth=".8"
            fill="none"
            opacity=".65"
          />
        </g>

        <g data-layer="front-fascia">
          <path
            d="m687 368 315-20 14 64-12 49-300 28-12-59Z"
            fill={paint}
            stroke={chrome}
            strokeWidth="2"
          />
          <path d="m700 376 296-18 7 51-303 24Z" fill="#020607" stroke={chrome} strokeWidth="3" />
          <path
            d="m765 374 167-10 8 48-171 12Z"
            fill={`url(#${id}-grille)`}
            stroke="#a89a7d"
            strokeWidth="1.5"
          />
          <g data-layer="grille">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`m770 ${381 + i * 8} 163-11`} stroke={chrome} strokeWidth="1.1" />
            ))}
            <path d="m850 371 3 46" stroke="#bcb294" strokeWidth="1.5" />
            <path d="m841 389 17-1 1 10-17 1Z" fill="#201b12" stroke={gold} />
            <path d="m846 392 7-1" stroke="#e0b36d" />
          </g>
          <path d="m705 441 295-25-3 33-289 29Z" fill="#070b0c" stroke="#423f32" />
          <path d="m725 447 235-19-3 14-224 24Z" fill="#000203" />
          <path d="m749 451 190-16" stroke="#413f33" strokeWidth="1" />
          <path d="m839 444 56-5-2 38-56 6Z" fill="#141a18" stroke="#776a4d" />
          <path d="m846 452 42-4" stroke="#625f4c" />
          <text
            transform="matrix(1 -.1 -.05 1 847 469)"
            fill="#a59877"
            fontFamily="Georgia,serif"
            fontSize="9"
            letterSpacing="1"
          >
            THE DEN
          </text>
        </g>
        <g data-layer="bumper">
          <path
            d="m690 428 13 10 301-26 14-10-2 17-16 10-295 29-13-12Z"
            fill={chrome}
            stroke="#91907d"
            strokeWidth=".8"
          />
          <path d="m706 439 294-26" stroke="#f3dba8" strokeWidth="1.5" />
          <path d="m706 480 289-28-2 9-285 28Z" fill={chrome} />
        </g>
        {[
          { x: 734, y: 399, r: 25, name: "headlight-left" },
          { x: 965, y: 382, r: 24, name: "headlight-right" },
        ].map(({ x, y, r, name }) => (
          <g data-layer={name} key={name}>
            <ellipse
              cx={x}
              cy={y}
              rx={r + 5}
              ry={r + 6}
              fill="#020606"
              stroke={chrome}
              strokeWidth="3"
            />
            <circle cx={x} cy={y} r={r - 1} fill="#4b341b" stroke="#dac18d" strokeWidth="2" />
            <g className="ld-car-headlight">
              <circle cx={x} cy={y} r={r - 2} fill={`url(#${id}-lamp)`} />
              <circle cx={x} cy={y} r="7" fill="#ffefb8" />
              <circle cx={x} cy={y} r="75" fill={`url(#${id}-bloom)`} />
            </g>
            {[-12, -6, 0, 6, 12].map((o) => (
              <path
                key={o}
                d={`M${x + o} ${y - 17}v34M${x - 17} ${y + o}h34`}
                stroke="#ffedbc"
                strokeWidth=".5"
                opacity=".28"
              />
            ))}
            <path
              d={`m${x - r} ${y}h${r * 2}m-${r} -${r}v${r * 2}`}
              stroke="#fff6d5"
              strokeWidth=".8"
              opacity=".5"
            />
          </g>
        ))}
        <g data-layer="chrome-trim" fill="none">
          <path
            d="m126 338 48-22 138-35M688 367l310-20M714 490l274-25"
            stroke="#f5cd81"
            strokeWidth="1"
          />
          <path d="m128 355 74-14M359 305l184 20" stroke="#e9c47e" strokeWidth=".65" />
        </g>
        <g data-layer="body-highlights" fill="none" strokeLinecap="round">
          <path d="m339 371 194 23" stroke="#b5a987" opacity=".13" strokeWidth="7" />
          <path
            d="m134 350 69-12M342 337l199 21"
            stroke="#ede0b1"
            opacity=".32"
            strokeWidth="1.6"
          />
          <path d="m387 184 114-8" stroke="#fff0c5" strokeWidth="1" opacity=".65" />
        </g>
      </g>
      <g data-layer="light-bloom" className="ld-car-headlight" opacity=".5">
        <ellipse cx="746" cy="528" rx="87" ry="7" fill={`url(#${id}-bloom)`} />
        <ellipse cx="968" cy="522" rx="70" ry="6" fill={`url(#${id}-bloom)`} />
      </g>
      <g data-layer="speed-line-accents" className="ld-speed-lines" stroke="#c69649" fill="none">
        <path d="M24 368h118M55 406h116M16 451h138" strokeWidth=".8" />
      </g>
    </svg>
  );
}
