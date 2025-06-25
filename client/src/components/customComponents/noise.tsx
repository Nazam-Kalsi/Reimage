import React from 'react'



function Noise({className}:{className?:string}) {
  return (
    <svg
        className={`pointer-events-none isolate z-[999999] size-full absolute inset-0 opacity-40 mix-blend-soft-light ${className}`}
        width="100%"
        height="100%"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
  )
}

export default Noise