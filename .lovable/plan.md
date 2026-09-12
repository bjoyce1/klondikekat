# The Lion’s Den Animated Scroll Experience

## Direction
- Rebuild `/podcast` around the selected **Cinematic narrative scroll** composition.
- Lock the visual system to molten black, firelit gold, warm highlight gold, and restrained racing red.
- Use Abril Fatface for dramatic editorial headlines and Cabin for readable supporting copy.
- Keep the supplied Lion’s Den artwork as the unmistakable opening image and brand anchor.

## Page experience
- Create a full-height opening chapter where the artwork gains depth through slow push-in, subtle lion “breathing,” mane parallax, ember movement, pulsing eye glow, and a restrained waveform response.
- Turn the page into connected broadcast-magazine chapters rather than a stack of ordinary sections:
  1. Lion’s Den opening scene
  2. Music, Wisdom, Horsepower manifesto
  3. Working 60-second preview player styled as a broadcast control console
  4. Mechanical story sequence with interlocking gears, rotating wheel details, racing lights, and a moving motorcycle silhouette
  5. Upcoming transmissions presented as cinematic editorial entries
  6. Closing “Join the Pride” scene linking visitors back to the music catalog
- Preserve the existing honest “coming soon” state; do not invent released episodes, audience statistics, or listening-platform links.

## Motion and interaction
- Use scroll progress to drive layered movement, reveals, scale, rotation, and chapter transitions.
- Build gears, gauges, waveforms, and wheel motion as lightweight vector/CSS elements so they stay crisp and responsive.
- Keep the lion movement atmospheric rather than cartoon-like; the artwork itself remains recognizable and undistorted.
- Pause or limit costly animation when elements leave the screen.
- Provide a complete reduced-motion version with static compositions and no essential information hidden behind animation.
- Retain functional play/pause, progress feedback, keyboard access, focus states, and touch-friendly controls.

## Responsive treatment
- On desktop, use sticky cinematic scenes and overlapping magazine layouts with controlled depth.
- On mobile, simplify parallax layers, keep the artwork uncropped, avoid scroll traps, and maintain comfortable reading and control sizes above the site’s bottom navigation.
- Prevent horizontal overflow and ensure animated decorative elements cannot cover text or controls.

## Technical details
- Implement the selected composition with React, Motion, semantic Tailwind tokens, and small inline vector graphics; no heavy 3D runtime is required.
- Extend the global design tokens for the locked palette and typography, loading the chosen fonts through the document head.
- Keep the existing podcast metadata, canonical URL, structured data, navigation, and supplied asset pointer.
- Split the larger animated scenes into focused podcast components where needed to keep the page maintainable.

## Verification
- Verify scroll-linked motion, preview playback, chapter readability, and reduced-motion behavior.
- Check desktop and mobile layouts for cropping, overlap, horizontal overflow, and fixed-navigation conflicts.
- Confirm keyboard navigation, accessible labels, console output, and the production build.
