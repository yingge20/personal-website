# Workflow Log: ying-ge-site

**Project root:** /Users/ying/Documents/Personal Website/ying-ge-site
**Created:** 2026-04-01
**Purpose:** Track workflow steps, decisions, corrections, and patterns for later optimization.

---

## How to read this log
- Each entry has a timestamp, tag, and short description
- Tags: `session-start`, `session-end`, `task-start`, `task-complete`, `decision`, `correction`, `pivot`, `debugging`, `planning`, `coding`, `review`, `feedback`, `user-note`
- Entries tagged `correction` capture where the user corrected Claude's approach -- these are high-signal for building better instructions
- Entries tagged `decision` capture architectural and design choices -- these inform future project templates

---

## Workflow Entries

### [2026-04-01 00:00] [session-start] Responsive design pass
- **What:** Starting session to make responsive design fixes across all pages
- **Why:** Site uses absolute positioning and vw/vh units that break on mobile/tablet
- **Outcome:** In progress

### [2026-04-01 00:00] [task-start] Responsive design pass across 4 pages
- **What:** Fixing responsive layout issues on about, tenets, home, and landing pages
- **Why:** User provided detailed breakpoint requirements and per-page fixes needed
- **Outcome:** In progress

### [2026-04-01 00:05] [coding] Responsive design pass complete
- **What:** Applied responsive fixes to all 4 pages: about, tenets, home, landing
- **Why:** Site used absolute vw/vh positioning and large font sizes that broke on mobile
- **Outcome:** All pages now responsive with Tailwind breakpoints (sm/md/lg), touch targets, and mobile-friendly layouts
