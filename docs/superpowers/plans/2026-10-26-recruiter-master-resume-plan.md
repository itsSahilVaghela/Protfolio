# Recruiter-Magnet Master 1-Page Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a production-ready, ATS-optimized 1-page master resume in both clean Markdown and pixel-perfect printable HTML format to maximize interview callbacks for software engineering, game development, and XR/spatial computing roles.

**Architecture:** Create two primary assets in the workspace root: `Sahil_Vaghela_Resume_1Page.md` (clean text/ATS-ready) and `Sahil_Vaghela_Resume_1Page.html` (print-ready single page Letter/A4 layout with an embedded 1-click Print/PDF trigger). Both assets implement the exact approved spec with Google X-Y-Z achievement formulas, categorized skills, and verified contact links.

**Tech Stack:** Markdown, HTML5, CSS3 (`@media print`, flexbox, CSS grid, typography).

## Global Constraints
- Target strict 1-page density (zero page overflow when printed or exported to PDF).
- Single-column ATS-friendly structural hierarchy (`SUMMARY`, `TECHNICAL SKILLS`, `PROFESSIONAL EXPERIENCE`, `KEY TECHNICAL PROJECTS`, `EDUCATION`).
- Include verified links: Portfolio (`https://itssahilvaghela.github.io/Protfolio/`), LinkedIn, email, and phone.
- No vague placeholders or duplicate project listings.

---

### Task 1: Create Markdown Master Resume

**Files:**
- Create: `Sahil_Vaghela_Resume_1Page.md`

**Interfaces:**
- Produces: Complete ATS-compliant text resume formatted in Markdown.

- [ ] **Step 1: Write `Sahil_Vaghela_Resume_1Page.md`**
  - Implement full header with name, dual-threat title (`Software Engineer — Real-Time 3D, Systems & XR`), location, phone, email, portfolio URL, and LinkedIn.
  - Implement the dense 2-sentence Professional Summary highlighting B.E. (9.11 CGPA), 3+ years experience, and core domains.
  - Implement the ATS-categorized Technical Skills matrix (Languages, Engines & 3D Systems, Software Engineering, XR/CV/Networking, Tools & Platforms).
  - Implement Professional Experience at Invisible Fiction with Google X-Y-Z formula bullets across all 3 progression levels.
  - Implement Key Technical Projects (WebAR Unwarping, FictionArchviz, Motion Games).
  - Implement Education & Academic Achievements (B.E. 9.11 CGPA, coursework, languages).

- [ ] **Step 2: Verify Markdown formatting and completeness**
  - Confirm all sections from spec are present with zero missing entries or typos.

- [ ] **Step 3: Commit Markdown resume to git**
  - Command: `git add Sahil_Vaghela_Resume_1Page.md && git commit -m "feat(resume): add recruiter master 1-page resume in markdown"`

---

### Task 2: Create Pixel-Perfect Printable HTML/CSS 1-Page Resume

**Files:**
- Create: `Sahil_Vaghela_Resume_1Page.html`

**Interfaces:**
- Consumes: Content from `Sahil_Vaghela_Resume_1Page.md`.
- Produces: Standalone HTML file with print stylesheet (`@page { size: letter; margin: 0.4in; }`), modern typography, responsive preview, and a floating 1-click "Print / Save as PDF" button that hides during printing.

- [ ] **Step 1: Write `Sahil_Vaghela_Resume_1Page.html`**
  - Implement clean semantic HTML5 markup (`<header>`, `<section>`, `<ul>`, `<li>`).
  - Configure CSS print rules:
    ```css
    @page {
      size: letter;
      margin: 0.4in 0.45in;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff; }
      .no-print { display: none !important; }
      .page { box-shadow: none !important; margin: 0 !important; width: 100% !important; min-height: auto !important; padding: 0 !important; }
    }
    ```
  - Style with professional, modern typography (Inter/system-ui), crisp blue/slate accents (`#1A56DB` / `#0F172A`), bullet spacing, and precise line-heights to guarantee a strict 1-page fit.
  - Add an interactive floating toolbar with a `Print / Save as PDF` button triggering `window.print()`.

- [ ] **Step 2: Verify HTML layout and print CSS**
  - Ensure all links have proper `href` attributes (`tel:`, `mailto:`, `https://`).
  - Ensure zero horizontal or vertical overflow beyond the single page bounds.

- [ ] **Step 3: Commit HTML resume to git**
  - Command: `git add Sahil_Vaghela_Resume_1Page.html && git commit -m "feat(resume): add pixel-perfect printable 1-page html resume"`

---

### Task 3: Final Verification & Delivery

**Files:**
- Verify: `Sahil_Vaghela_Resume_1Page.md`, `Sahil_Vaghela_Resume_1Page.html`

- [ ] **Step 1: Check document paths and accessibility**
  - Verify that both files exist in the project root and are directly openable.
- [ ] **Step 2: Review against spec checklist**
  - Verify Google X-Y-Z formula on all bullets.
  - Verify ATS keyword coverage.
  - Verify 1-page constraint.
