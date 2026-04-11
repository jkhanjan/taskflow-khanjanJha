// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Assignee {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: Assignee;
  due_date?: string;
  created_by: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  members: Assignee[];
  created_at: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id: string;
  due_date: Date | undefined;
}