Alpheya UI Rebuild

Figma → Code, reimagined with Shadcn UI and Claude Code.

We're taking our existing Figma designs and rebuilding them from the ground up — not just cloning pixels, but rethinking the experience along the way. Claude Code handles the translation from design to code, and Shadcn UI replaces our current design system, providing a more flexible, accessible, and developer-friendly foundation.


Why This Project Exists
Our current UI was built over time across multiple squads and sprints. It works, but it's accumulated inconsistencies — different spacing conventions, duplicated components, accessibility gaps, and patterns that don't scale well. Instead of patching what we have, we're starting fresh.
The goals are straightforward:

Clone the Figma designs faithfully — every screen, every state, every edge case.
Rebuild using Shadcn UI — replacing our existing design system with something modern, composable, and well-documented.
Use Claude Code as the primary build tool — accelerating the Figma-to-code pipeline and reducing manual translation errors.
Improve the experience — where we spot UX friction, accessibility issues, or interaction gaps during the rebuild, we fix them.

This isn't a redesign. It's a disciplined reconstruction with room to make things better where it matters.


Tech Stack
LayerTechnologyDesign SourceFigmaDesign SystemShadcn UI (Radix + Tailwind CSS)FrameworkNext.js / ReactStylingTailwind CSSBuild ToolingClaude CodeLanguageTypeScriptPackage Managerpnpm


Getting Started
Prerequisites

Node.js 18+
pnpm (npm install -g pnpm)
Claude Code CLI (for design-to-code workflows)


Adding Shadcn UI Components
We use the Shadcn CLI to add components as needed:


# Example: add a button component
npx shadcn@latest add button

# Add multiple at once
npx shadcn@latest add dialog dropdown-menu table
```

Components land in `src/components/ui/` and are fully editable — they're your code, not a black box.

---

## Design System Migration Notes

### What's Changing

We're moving away from our previous custom component library and adopting Shadcn UI as the foundation. Here's what that means in practice:

**Component mapping** — Each existing component has a Shadcn equivalent or a composed alternative. We maintain a mapping doc in `docs/component-mapping.md` that tracks what replaces what.

**Design tokens** — Colors, spacing, typography, and radii are configured through Tailwind's `tailwind.config.ts` and CSS variables in `globals.css`. These map to our Figma tokens.

**Dark mode** — Shadcn UI supports dark mode out of the box via CSS variables and the `class` strategy. We configure it from day one.

**Accessibility** — Shadcn is built on Radix primitives, which handle focus management, keyboard navigation, and ARIA attributes properly. This is a significant upgrade from where we are today.

### What We're Improving

As we rebuild each screen, we're tracking UX improvements in `docs/improvements.md`. These aren't scope creep — they're things we notice during the rebuild that are worth fixing:

- Inconsistent loading and empty states
- Missing keyboard navigation paths
- Form validation patterns that could be clearer
- Data table interactions that need refinement
- Responsive behavior gaps

Every improvement gets documented with a before/after rationale so the team can review the reasoning.

---

## Workflow: Figma → Claude Code → UI

The build process follows a clear pipeline:

1. **Export from Figma** — Grab the relevant frames, variants, and specs. Drop reference screenshots in `figma/`.
2. **Feed to Claude Code** — Use Claude Code to generate the initial component code from the Figma design context. This handles layout, spacing, typography, and basic interactivity.
3. **Refine and compose** — Review the generated code, wire up data, adjust interactions, and integrate with the broader app.
4. **QA against Figma** — Compare the built UI side-by-side with the original designs. Check every state: default, hover, active, disabled, loading, error, empty.
5. **Document improvements** — If something looks off in the original design or there's a chance to improve the experience, document it and discuss with the team.

---

## Contributing Guidelines

### For Designers

- Keep Figma components organized and up to date — the rebuild references them directly.
- Use auto layout and proper constraints so Claude Code can interpret structure accurately.
- Flag any design inconsistencies you spot during the rebuild process.

### For Developers

- Follow the existing folder structure. Base UI components go in `ui/`, composed feature components go in `modules/`.
- Use Shadcn UI components as building blocks. Don't reinvent what already exists.
- Write TypeScript. Define prop interfaces for every component.
- Keep components small and composable. If a component does too much, break it apart.
- Test against the Figma source. Screenshots in PRs help reviewers.

### Commit Conventions
```
feat: add order book table component
fix: correct spacing in portfolio summary card
refactor: migrate client metrics to shadcn data table
docs: add migration notes for trading module


Team
This project is led by the Product Design team in collaboration with frontend engineering. If you have questions about design decisions, component mapping, or the migration approach, reach out to the project lead.