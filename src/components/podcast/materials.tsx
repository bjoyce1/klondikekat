/** All machinery shares these metals, grille textures, and warm optical bloom. */
export function MetalDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2=".8">
        <stop stopColor="#38210e" />
        <stop offset=".18" stopColor="#a36724" />
        <stop offset=".33" stopColor="#ffdc8b" />
        <stop offset=".43" stopColor="#f2ba5c" />
        <stop offset=".52" stopColor="#603710" />
        <stop offset=".7" stopColor="#d69438" />
        <stop offset=".85" stopColor="#fff0c2" />
        <stop offset="1" stopColor="#64370e" />
      </linearGradient>
      <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#262522" />
        <stop offset=".24" stopColor="#ebe4d1" />
        <stop offset=".35" stopColor="#b5b0a4" />
        <stop offset=".47" stopColor="#161617" />
        <stop offset=".68" stopColor="#595550" />
        <stop offset=".79" stopColor="#e8d5b0" />
        <stop offset="1" stopColor="#4c3b24" />
      </linearGradient>
      <linearGradient id={`${id}-black`} x1=".15" y1="0" x2=".8" y2="1">
        <stop stopColor="#272723" />
        <stop offset=".23" stopColor="#08090a" />
        <stop offset=".4" stopColor="#34312a" />
        <stop offset=".47" stopColor="#0b0b0b" />
        <stop offset=".8" stopColor="#030405" />
        <stop offset="1" stopColor="#27221a" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2=".8" y2="1">
        <stop stopColor="#0c1010" />
        <stop offset=".34" stopColor="#4c4d42" />
        <stop offset=".39" stopColor="#222827" />
        <stop offset=".74" stopColor="#070c0d" />
        <stop offset="1" stopColor="#383b33" />
      </linearGradient>
      <radialGradient id={`${id}-lamp`}>
        <stop stopColor="#fffce1" />
        <stop offset=".16" stopColor="#fff0af" />
        <stop offset=".45" stopColor="#ffc052" />
        <stop offset=".75" stopColor="#a86010" />
        <stop offset="1" stopColor="#42210b" />
      </radialGradient>
      <radialGradient id={`${id}-bloom`}>
        <stop stopColor="#ffce6b" stopOpacity=".6" />
        <stop offset=".3" stopColor="#ee9e29" stopOpacity=".18" />
        <stop offset="1" stopColor="#ee9e29" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-rubber`}>
        <stop stopColor="#343432" />
        <stop offset=".54" stopColor="#080909" />
        <stop offset=".72" stopColor="#20211f" />
        <stop offset=".84" stopColor="#050607" />
        <stop offset=".95" stopColor="#23231f" />
        <stop offset="1" stopColor="#070808" />
      </radialGradient>
      <pattern id={`${id}-mesh`} width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="#080909" />
        <circle cx="2" cy="2" r=".9" fill="#564a36" />
      </pattern>
      <filter id={`${id}-glow`} x="-90%" y="-90%" width="280%" height="280%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <filter id={`${id}-soft`} x="-50%" y="-100%" width="200%" height="300%">
        <feGaussianBlur stdDeviation="16" />
      </filter>
    </defs>
  );
}
