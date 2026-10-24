# Resume Modal 40/60 Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an executive two-column Resume Modal with a 40% About & Direct Contact sidebar on the left and a 60% High-Resolution Resume Image Viewer on the right.

**Architecture:** Create a dedicated, reusable `ResumeModal` component (`src/components/ResumeModal.tsx`) using Radix/Shadcn `Dialog`. The left 40% column renders executive bio and interactive contact cards with clipboard copy, while the right 60% column renders high-DPI rendered resume images (`resume-page-1.png`, `resume-page-2.png`) with Page 1 / Page 2 switcher and zoom controls. Connect to `Navbar.tsx` for desktop and mobile triggers.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Radix UI Dialog.

## Global Constraints
- Target 40/60 visual split on desktop (`lg:grid-cols-12` -> 5 cols left / 7 cols right, or 4 cols / 8 cols).
- Never use raw PDF iframe in the viewer; display high-res PNG images (`/resume-page-1.png`, `/resume-page-2.png`).
- Direct Download button must point to `/Sahil_Vaghela_Resume.pdf`.
- Phone and Email cards must provide 1-click clipboard copy with feedback.
- Must pass `npx tsc --noEmit` and `npm run build` with 0 errors.

---

### Task 1: Create `ResumeModal` Component

**Files:**
- Create: `src/components/ResumeModal.tsx`
- Images: `public/resume-page-1.png`, `public/resume-page-2.png` (already rendered and committed)

**Interfaces:**
- Produces: `export const ResumeModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }>`
- Consumes: `profileData` from `@/data/portfolioData`, UI components from `@/components/ui/dialog`

- [ ] **Step 1: Write `src/components/ResumeModal.tsx`**
  - Implement 40% left panel with:
    - Profile header (Sahil Vaghela, Real-Time 3D & XR Dev, Status: Available).
    - Summary bullets (Unreal Engine 5 C++, Unity C#, OpenXR, Procedural Geometry).
    - Contact cards (Phone with copy/call, Primary & Secondary Email with copy, LinkedIn link).
    - Action CTAs (Download PDF Resume, Contact shortcut).
  - Implement 60% right panel with:
    - Header controls: Page 1 / Page 2 switcher tabs, Zoom in / out / fit controls, Fullscreen toggle, Download PDF button.
    - Image viewport: Displays `resume-page-1.png` / `resume-page-2.png` with smooth transitions and paper shadow.
- [ ] **Step 2: Verify type safety**
  - Run `npx tsc --noEmit`.
- [ ] **Step 3: Commit component**
  - Commit with message: `feat(resume): create 40/60 split ResumeModal component with high-res image viewer and contact sidebar`.

---

### Task 2: Integrate `ResumeModal` into `Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `<ResumeModal open={isResumeOpen} onOpenChange={setIsResumeOpen} />`

- [ ] **Step 1: Replace inline modal in `Navbar.tsx`**
  - Remove inline dialog markup and replace with `<ResumeModal open={isResumeOpen} onOpenChange={setIsResumeOpen} />`.
  - Ensure desktop `Resume` button (styled like Contact) and mobile `View Resume` item cleanly trigger `setIsResumeOpen(true)`.
- [ ] **Step 2: Verify build & tests**
  - Run `npx tsc --noEmit`.
  - Run `npm run build`.
- [ ] **Step 3: Commit integration**
  - Commit with message: `feat(navbar): wire ResumeModal into desktop and mobile navigation`.

---

### Task 3: Visual & Functional Verification

**Files:**
- Verify: Full responsive experience in browser build

- [ ] **Step 1: Run production build check**
  - Ensure `dist/` is completely up-to-date and all assets are referenced properly.
- [ ] **Step 2: Verify copy and download actions**
  - Verify phone/email copy functionality.
  - Verify Page 1 and Page 2 switcher.
  - Verify PDF download link.
- [ ] **Step 3: Commit final assets and dist**
  - Commit with message: `chore: verify and package production build with 40/60 resume modal`.
