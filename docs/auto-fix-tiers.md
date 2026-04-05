# Auto-Fix Policy

Used by slash commands and skills when deciding whether to fix an error automatically or stop and ask. Single source of truth — referenced from CLAUDE.md, /ship, and any skill that may auto-fix.

## Core principle

Auto-fix is safe when the fix is **reversible, small, self-verifying, and low-stakes**. Otherwise, stop and ask.

The cost of asking on every fix is higher than the cost of occasionally fixing wrong — *as long as* the fix is reversible and scoped. Tight limits on attempts and scope keep drift under control.

## Tiers

### Tier 1 — Auto-fix silently
Small, mechanical, same-file fixes that a human reviewer would never question.

- Unused imports, unused variables
- Dead code from type narrowing (e.g., unreachable branches after a type change)
- Trailing whitespace, quote style, missing semicolons
- Linter auto-fixables (`--fix` flags)
- Single-line null/undefined guards where the type requires them
- Reverting a single edit that just broke the build

### Tier 2 — Auto-fix, report clearly in output
Fixes with a bit more judgment. Report what was changed.

- Replacing a raw hex color with a palette token (when design-system.md defines the mapping)
- Adjusting a font weight to one allowed by the design rules
- Fixing an import path that the linter/TS flagged
- Adding a missing `"use client"` directive on a component that needs it
- Renaming a single variable to match a linter rule

### Tier 3 — Stop, explain, ask first
Fixes that require judgment about intent or could cascade.

- Changing public component APIs (props, exports)
- Adding/removing npm dependencies
- Modifying config files (`next.config.*`, `tsconfig.json`, `tailwind.config.*`, `package.json` beyond `scripts`)
- Touching any file outside the user's current `git diff`
- Fixing by guessing what the user meant
- Any fix affecting more than one page/component

### Tier 4 — Always stop, never auto-fix
- Security-related changes (auth, CSP, CORS, secrets, session handling)
- Destructive git operations (`--force`, `reset --hard`, branch deletion)
- Environment variables, `.env` files
- Deployment config, CI/CD workflows
- Database migrations
- Force pushing

## Safety rails (apply to Tier 1 & 2 auto-fixes)

### Attempt limit
**Max 2 auto-fix cycles per check.** If a check fails, fix, re-run — if it *still* fails, stop and report. No infinite loops.

### Scope enforcement
Auto-fixes may only modify files already in the current `git diff`. If a fix would require touching a file the user hasn't modified, that becomes a **Tier 3** fix → stop and ask.

### Named-location rule
Fix at the file:line the checker named. Do not "clean up the surrounding area." Do not refactor. Do not add comments explaining the fix unless the fix itself requires them.

### Visibility
After every auto-fix, the summary must list what was changed:
```
Auto-fixed (Tier 1-2):
  - {file}:{line} — {one-line description}
```

## When in doubt

Escalate one tier up. Tier 2 → ask instead. Tier 3 → never auto-fix. When the situation doesn't match any tier cleanly, treat it as Tier 3.
