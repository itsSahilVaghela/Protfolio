# Engineering Bento Capsules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform front project cards from dense paragraph text and plain bullets into 3 high-impact "Engineering Bento Capsules" per card, making the project list skimmable in 3 seconds while preserving all deep case study details in the modal.

**Architecture:**
1. Extend `ProjectCaseStudy` interface with `cardCapsules?: ProjectCardCapsule[]` in `src/data/portfolioData.ts` and add tailored 3-capsule lists for all 7 featured projects.
2. In `src/components/Portfolio.tsx`, replace the paragraph description (`shortDescription`) and bulleted highlights (`highlights`) with 3 glassmorphic bento capsule rows with colored dots, category tags, and crisp 1-line details.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React.

## Global Constraints
- Do NOT remove or modify any data inside `caseStudy: { ... }`.
- Ensure fallback support so any project without `cardCapsules` still renders cleanly.
- Zero TypeScript errors (`npx tsc --noEmit`) and successful production build (`npm run build`).

---

### Task 1: Add `cardCapsules` Schema and Data in `src/data/portfolioData.ts`

**Files:**
- Modify: `src/data/portfolioData.ts`

**Interfaces:**
- Consumes: `ProjectCaseStudy`
- Produces: `cardCapsules?: ProjectCardCapsule[]` across all 7 featured projects.

- [ ] **Step 1: Add `ProjectCardCapsule` type definition**
```typescript
export interface ProjectCardCapsule {
  tag: string;
  detail: string;
}
```
Add `cardCapsules?: ProjectCardCapsule[];` to `ProjectCaseStudy`.

- [ ] **Step 2: Add 3 curated capsules to each of the 7 featured projects**
  - `fiction-mech`
  - `radicon-powerbuild-xr`
  - `fiction-archviz`
  - `mimadim-home-studio`
  - `webar-coloring-book`
  - `motion-controlled-games`
  - `unity-game-development`

- [ ] **Step 3: Run TypeScript type check**
```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 4: Commit changes**
```bash
git add src/data/portfolioData.ts
git commit -m "feat(data): add cardCapsules to featured projects for point-wise overview"
```

---

### Task 2: Update Front Card UI in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (lines ~225-247)

**Interfaces:**
- Consumes: `project.cardCapsules` or parsed fallback from `project.highlights`
- Produces: 3 glassmorphic Bento Capsule rows per card.

- [ ] **Step 1: Replace description and plain bullets with Bento Capsules**
```tsx
{/* Engineering Bento Capsules (Point-Wise Overview) */}
<div className="space-y-2 mb-5">
  {displayCapsules.map((capsule, i) => (
    <div
      key={i}
      className="p-2.5 rounded-xl bg-[#10151D]/80 border border-[#1E2736]/80 hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-center space-y-0.5 group/capsule"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            i === 0
              ? "bg-[#4D8DFF]"
              : i === 1
                ? "bg-[#8B6CFF]"
                : "bg-emerald-400"
          }`}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#89B2FF]">
          {capsule.tag}
        </span>
      </div>
      <p className="text-xs text-[#CBD5E1] leading-relaxed pl-3 font-normal">
        {capsule.detail}
      </p>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Run TypeScript type check**
```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Run production build**
```bash
npm run build
```
Expected: Clean build.

- [ ] **Step 4: Commit changes**
```bash
git add src/components/Portfolio.tsx dist/
git commit -m "feat(portfolio): render Engineering Bento Capsules on front project cards"
```
