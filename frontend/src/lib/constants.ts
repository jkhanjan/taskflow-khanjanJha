// ─── Fake Data ────────────────────────────────────────────────────────────────

import type { Assignee, Project, Task, TaskFormData, TaskStatus } from "./types";

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
  }, 
    {
    id: "p2",
    name: "Mobile App Development",
    description: "Develop the new mobile application for iOS and Android.",
    owner_id: "u2",
    members: FAKE_MEMBERS,
  }, 
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

export const EMPTY_FORM: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  assignee_id: "",
  due_date: undefined,
};

export const STATUS_CONFIG: Record<TaskStatus, { label: string; dotColor: string }> = {
  todo:        { label: "Todo",        dotColor: "bg-slate-400" },
  in_progress: { label: "In Progress", dotColor: "bg-blue-500" },
  in_review:   { label: "In Review",   dotColor: "bg-amber-500" },
  done:        { label: "Done",        dotColor: "bg-emerald-500" },
};

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string }
> = {
  low:    { label: "Low",    color: "bg-slate-100 text-slate-600 border-slate-200" },
  medium: { label: "Medium", color: "bg-blue-50 text-blue-600 border-blue-200" },
  high:   { label: "High",   color: "bg-orange-50 text-orange-600 border-orange-200" },
  urgent: { label: "Urgent", color: "bg-red-50 text-red-600 border-red-200" },
};

export const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];