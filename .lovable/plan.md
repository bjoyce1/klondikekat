# Lion’s Den Artwork-Led Podcast Rebuild

## Direction
- Rebuild only `/podcast` so the supplied Lion’s Den artwork defines every section, surface, transition, and interaction.
- Preserve the existing route, navigation, footer, metadata, structured data, canonical URL, and working 60-second preview.
- Remove the motorcycle component, imports, motion values, and related styling completely.

## Page experience
- Turn the opening into a restrained title sequence: recognizable uncropped artwork, lion depth, localized eye glow, traced fire-ring arcs, smoke, embers, red signal line, and a branded scroll cue.
- Replace the generic progress gauge with a drag-racing PRE-STAGE / STAGE chapter navigator: vertical on desktop and compact horizontal on mobile.
- Recompose Music, Wisdom, and Horsepower as three forged badge chapters with artwork-specific microphone, lion/halo, and automotive instrumentation motifs.
- Rebuild the player as a vintage microphone and broadcast console with grille ribs, engraved labels, illuminated signal lamps, VU meters, waveform, hardware controls, and accessible playback progress.
- Replace the motorcycle scene with a low, wide muscle-car sequence using a detailed vector silhouette, hood scoop, grille, headlights, chrome trim, wheel details, smoke, asphalt reflection, speed lines, and scroll-driven tachometer motion.
- Add an atmospheric Houston skyline and reflected city lights as the transition into the automotive chapter.
- Present upcoming transmissions as beveled shield/plaque entries while preserving only the existing honest coming-soon copy.
- Close with the lion, halo, microphone, and shield language so “Join the Pride” feels like the final title card from the same artwork.

## Motion and accessibility
- Drive ring traces, section progress, lion depth, waveform amplitude, car movement, headlights, and tachometer response from scroll or section visibility.
- Animate VU needles only during playback and keep all controls keyboard-accessible with clear labels and focus states.
- Pause or avoid perpetual heavy effects offscreen; provide a complete reduced-motion treatment with the same hierarchy and content.
- Simplify layered motion on mobile, preserve the artwork without awkward cropping, clear the bottom navigation, and prevent horizontal overflow.

## Technical details
- Refactor `src/routes/podcast.tsx`, `src/components/site/PodcastMachinery.tsx`, and podcast-specific rules in `src/styles.css`.
- Use React Motion, semantic design tokens, CSS, and lightweight SVG only; no 3D runtime.
- Keep typography limited to a forged display face, condensed industrial labels, and the existing readable body family.

## Verification
- Verify desktop and mobile composition, sticky chapter navigation, scroll-linked effects, audio play/pause and 60-second limit, and reduced-motion behavior.
- Check artwork framing, control visibility, horizontal overflow, console/runtime errors, and the production build.
