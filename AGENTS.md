# Agent Instructions

This repository is a Remotion component library for consistent reel design.

Before creating or editing any Remotion scene, read:

- `COMPONENT_LIBRARY_SKILL.md`
- `README.md`

Prefer existing primitives over custom animated UI.

Use the component library as the source of truth for:
- cards, windows, captions, status badges, sticky notes
- code/diff panels, terminal UI, safe-zone wrappers
- flow connectors, typography, spacing, colors, animation timing

Before implementation:
1. Identify the scene intent
2. Choose matching existing components
3. List the components you plan to use
4. Only create new primitives if no existing component fits

After implementation:
1. Run `npm run typecheck`
2. Render or inspect the ComponentBrowser if relevant
3. Confirm caption/PiP safe zones are respected
4. Confirm no debug guides appear in final scenes
