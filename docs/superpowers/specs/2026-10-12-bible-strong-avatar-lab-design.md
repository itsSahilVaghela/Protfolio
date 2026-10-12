# Design Spec: Add "Bible Strong Avatar Lab" to Portfolio

- **Date:** 2026-10-12
- **Topic:** bible-strong-avatar-lab-integration
- **Target File:** `src/components/Portfolio.tsx`

---

## 1. Overview
Integrate the open-source repository **Bible Strong Avatar Lab** (`https://github.com/smontlouis/bible-strong-avatar-lab`) into the portfolio as a showcased project under the "Software & Unreal" category with the role of "Open Source Contributor".

The integration will upgrade the portfolio project schema to support direct GitHub and Live Demo links both on the project card and inside the detail modal dialog.

---

## 2. Data Structure Updates

### 2.1 Project Schema
Update the `projects` type definition in `src/components/Portfolio.tsx`:

```typescript
interface Project {
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}
```

### 2.2 Project Entry
Add the following record to the top of `projects` array:

```typescript
{
  title: "Bible Strong Avatar Lab",
  type: "Procedural Avatar Studio & Web Tool",
  role: "Open Source Contributor",
  tech: ["TypeScript", "SVG / 3D Geometry", "Vite", "React", "Procedural Animation"],
  description:
    "A browser-based authoring studio for procedural 2D avatars. Combines 3D-inspired geometry with SVG rendering to construct characters, customize facial dimensions/perspective, compose reusable expressions, and export portable animation definitions (.avatar.json).",
  category: "software",
  githubUrl: "https://github.com/smontlouis/bible-strong-avatar-lab",
  liveUrl: "https://avatars.bible-strong.app",
}
```

---

## 3. UI & Interaction Design

### 3.1 Project Card
- Retain the existing card layout and styling.
- In the card footer:
  - Display role badge (`Open Source Contributor`).
  - If `githubUrl` or `liveUrl` are defined, render icon links (`Github`, `ExternalLink` from `lucide-react`) with `e.stopPropagation()` so clicking the links opens the URL in a new tab without inadvertently triggering the modal dialog.

### 3.2 Detail Dialog Modal
- Inside the project detail modal (`DialogContent`):
  - Retain the project banner, type, role, description, and tech stack tags.
  - Add an action button section below the technologies list:
    - **View on GitHub** button (variant `outline`) linking to `githubUrl`.
    - **Launch Live Demo** button (variant `default`) linking to `liveUrl`.

---

## 4. Verification & Testing
1. Verify `npm run build` succeeds without compilation errors.
2. Verify cards render cleanly across mobile and desktop breakpoints.
3. Verify clicking external links does not open the modal, while clicking anywhere else on the card opens the modal dialog.
