// ─── Fake Data ────────────────────────────────────────────────────────────────

import type { Assignee, Project, Task } from "./types";

export const FAKE_MEMBERS: Assignee[] = [
  { id: "u1", name: "Alice Johnson" },
  { id: "u2", name: "Bob Martinez" },
  { id: "u3", name: "Priya Kapoor" },
  { id: "u4", name: "James Lee" },
];

export const FAKE_PROJECT: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Redesign the marketing site with the new brand guidelines.",
    owner_id: "u1",
    members: FAKE_MEMBERS,
  }
];

export const FAKE_TASKS: Task[] = [
  {
    id: "t1",
    title: "Set up project repo and CI pipeline",
    description: "Init repo, configure GitHub Actions for lint + test.",
    status: "done",
    priority: "high",
    assignee: FAKE_MEMBERS[0],
    due_date: "2025-03-10",
    created_by: "u1",
  },
  {
    id: "t2",
    title: "Design homepage wireframes",
    description: "Create low-fi wireframes for mobile and desktop.",
    status: "done",
    priority: "medium",
    assignee: FAKE_MEMBERS[2],
    due_date: "2025-03-15",
    created_by: "u3",
  },
  {
    id: "t3",
    title: "Build Navbar component",
    status: "in_progress",
    priority: "high",
    assignee: FAKE_MEMBERS[1],
    due_date: "2025-04-18",
    created_by: "u2",
  },
  {
    id: "t4",
    title: "Implement auth flow (login / register)",
    description: "JWT-based auth, form validation, token storage.",
    status: "in_progress",
    priority: "urgent",
    assignee: FAKE_MEMBERS[0],
    due_date: "2025-04-20",
    created_by: "u1",
  },
  {
    id: "t5",
    title: "Hero section animation",
    status: "in_review",
    priority: "medium",
    assignee: FAKE_MEMBERS[2],
    due_date: "2025-04-22",
    created_by: "u3",
  },
  {
    id: "t6",
    title: "Review accessibility audit report",
    description: "Go through the axe report and fix critical issues.",
    status: "in_review",
    priority: "high",
    assignee: FAKE_MEMBERS[3],
    due_date: "2025-04-25",
    created_by: "u4",
  },
  {
    id: "t7",
    title: "Write unit tests for auth hooks",
    status: "todo",
    priority: "medium",
    assignee: FAKE_MEMBERS[1],
    due_date: "2025-04-30",
    created_by: "u2",
  },
  {
    id: "t8",
    title: "SEO meta tags and Open Graph setup",
    status: "todo",
    priority: "low",
    assignee: undefined,
    due_date: undefined,
    created_by: "u1",
  },
  {
    id: "t9",
    title: "Footer component with sitemap links",
    status: "todo",
    priority: "low",
    assignee: FAKE_MEMBERS[3],
    due_date: "2025-05-05",
    created_by: "u4",
  },
];
