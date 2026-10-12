# Bible Strong Avatar Lab Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Bible Strong Avatar Lab" as a featured open-source project card in the Portfolio section with external GitHub and Live Demo links.

**Architecture:** Extend the project item data interface in `src/components/Portfolio.tsx` with optional `githubUrl` and `liveUrl` attributes, then render interactive link buttons in both the project card footer and the detailed project modal dialog.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Radix UI Dialog.

## Global Constraints
- Target File: `src/components/Portfolio.tsx`
- Maintain existing styling and animation classes (`hover-lift`, `hover-glow`, `text-gradient`, `bg-card`).
- Ensure external link clicks on project cards stop propagation so the modal is not unintentionally opened.
- TypeScript compilation must pass without errors (`npm run build`).

---

### Task 1: Extend Project Schema & Add "Bible Strong Avatar Lab" Entry

**Files:**
- Modify: `src/components/Portfolio.tsx:1-55`

**Interfaces:**
- Produces: `interface Project` with `githubUrl?: string`, `liveUrl?: string`.

- [ ] **Step 1: Update imports and Project interface**
In `src/components/Portfolio.tsx`, import `Github` and ensure `ExternalLink` is imported from `lucide-react`. Define:
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

- [ ] **Step 2: Add Bible Strong Avatar Lab project entry**
Add the new project to `projects: Project[]`:
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
  },
```

- [ ] **Step 3: Verify TypeScript typing in build**
Run: `npx tsc --noEmit`
Expected: Passes with no new errors in `Portfolio.tsx`.

- [ ] **Step 4: Commit schema changes**
Run: `git add src/components/Portfolio.tsx; git commit -m "feat(portfolio): add bible-strong-avatar-lab project data and schema"`

---

### Task 2: Update Portfolio Card & Detail Modal UI

**Files:**
- Modify: `src/components/Portfolio.tsx:170-260`

**Interfaces:**
- Consumes: `Project` interface with `githubUrl` and `liveUrl`.

- [ ] **Step 1: Add external action links to card footer**
In the card footer of `filteredProjects.map`, render direct links when `project.githubUrl` or `project.liveUrl` are present:
```tsx
<div className="flex items-center gap-2">
  {project.githubUrl && (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title="View GitHub Repository"
      className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
    >
      <Github className="h-4 w-4" />
    </a>
  )}
  {project.liveUrl && (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title="Open Live App"
      className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
    >
      <ExternalLink className="h-4 w-4" />
    </a>
  )}
  {!project.githubUrl && !project.liveUrl && (
    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
  )}
</div>
```

- [ ] **Step 2: Add action buttons in detail modal**
Inside `<DialogContent>` in `Portfolio.tsx`, render action buttons at the bottom of the modal:
```tsx
{(selectedProject.githubUrl || selectedProject.liveUrl) && (
  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
    {selectedProject.githubUrl && (
      <Button asChild variant="outline" size="sm" className="hover-lift">
        <a
          href={selectedProject.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </Button>
    )}
    {selectedProject.liveUrl && (
      <Button asChild size="sm" className="hover-lift">
        <a
          href={selectedProject.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Try Live Demo
        </a>
      </Button>
    )}
  </div>
)}
```

- [ ] **Step 3: Run production build**
Run: `npm run build`
Expected: Exit code 0, clean build.

- [ ] **Step 4: Commit UI changes**
Run: `git add src/components/Portfolio.tsx; git commit -m "feat(portfolio): render external links on cards and modal"`
