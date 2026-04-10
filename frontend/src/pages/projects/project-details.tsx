import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  MoreHorizontal,
  CalendarIcon,
  Filter,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FAKE_MEMBERS, FAKE_PROJECT, FAKE_TASKS } from "@/lib/constants";
import type {
  Assignee,
  Task,
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from "@/lib/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<TaskStatus, { label: string; dotColor: string }> = {
  todo:        { label: "Todo",        dotColor: "bg-slate-400" },
  in_progress: { label: "In Progress", dotColor: "bg-blue-500" },
  in_review:   { label: "In Review",   dotColor: "bg-amber-500" },
  done:        { label: "Done",        dotColor: "bg-emerald-500" },
};

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string }
> = {
  low:    { label: "Low",    color: "bg-slate-100 text-slate-600 border-slate-200" },
  medium: { label: "Medium", color: "bg-blue-50 text-blue-600 border-blue-200" },
  high:   { label: "High",   color: "bg-orange-50 text-orange-600 border-orange-200" },
  urgent: { label: "Urgent", color: "bg-red-50 text-red-600 border-red-200" },
};

const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];

const EMPTY_FORM: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  assignee_id: "",
  due_date: undefined,
};

// ─── InitialsAvatar ───────────────────────────────────────────────────────────

function InitialsAvatar({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className={cn(
        "rounded-full bg-indigo-100 text-indigo-700 font-medium flex items-center justify-center shrink-0",
        size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
      )}
    >
      {initials}
    </div>
  );
}

// ─── TaskSheet ────────────────────────────────────────────────────────────────

function TaskSheet({
  open,
  onOpenChange,
  editingTask,
  defaultStatus,
  members,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editingTask: Task | null;
  defaultStatus: TaskStatus;
  members: Assignee[];
  onSaved: (task: Task) => void;
}) {
  const [form, setForm] = useState<TaskFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormData, string>>
  >({});

  // Sync form when sheet opens
  useState(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description ?? "",
        status: editingTask.status,
        priority: editingTask.priority,
        assignee_id: editingTask.assignee?.id ?? "",
        due_date: editingTask.due_date
          ? new Date(editingTask.due_date)
          : undefined,
      });
    } else {
      setForm({ ...EMPTY_FORM, status: defaultStatus });
    }
    setErrors({});
  });

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const member = FAKE_MEMBERS.find((m) => m.id === form.assignee_id);
    const saved: Task = editingTask
      ? {
          ...editingTask,
          title: form.title.trim(),
          description: form.description,
          status: form.status,
          priority: form.priority,
          assignee: member,
          due_date: form.due_date
            ? format(form.due_date, "yyyy-MM-dd")
            : undefined,
        }
      : {
          id: `t${Date.now()}`,
          title: form.title.trim(),
          description: form.description,
          status: form.status,
          priority: form.priority,
          assignee: member,
          due_date: form.due_date
            ? format(form.due_date, "yyyy-MM-dd")
            : undefined,
          created_by: "u1",
        };
    onSaved(saved);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>{editingTask ? "Edit task" : "New task"}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="task-title"
                placeholder="What needs to be done?"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className={cn(errors.title && "border-destructive")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-desc">Description</Label>
              <Textarea
                id="task-desc"
                placeholder="Add details…"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="resize-none"
              />
            </div>

            <Separator />

            {/* Status + Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, status: v as TaskStatus }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_ORDER.map((s) => (
                      <SelectItem key={s} value={s}>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full",
                              STATUS_CONFIG[s].dotColor
                            )}
                          />
                          {STATUS_CONFIG[s].label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Priority</Label>
                <Select
                  value={form.priority}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, priority: v as TaskPriority }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      ["low", "medium", "high", "urgent"] as TaskPriority[]
                    ).map((p) => (
                      <SelectItem key={p} value={p}>
                        {PRIORITY_CONFIG[p].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assignee */}
            <div className="flex flex-col gap-1.5">
              <Label>Assignee</Label>
              <Select
                value={form.assignee_id || "unassigned"}
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    assignee_id: v === "unassigned" ? "" : v,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <div className="flex items-center gap-2">
                        <InitialsAvatar name={m.name} />
                        {m.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due date */}
            <div className="flex flex-col gap-1.5">
              <Label>Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.due_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.due_date ? format(form.due_date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.due_date}
                    onSelect={(d) => setForm((f) => ({ ...f, due_date: d }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {editingTask ? "Save changes" : "Create task"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProjectDetails = () => {
  const project = FAKE_PROJECT[0];

  const [tasks, setTasks] = useState<Task[]>(FAKE_TASKS);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const currentUserId = "u1";

  // Derived filtered list — no network call needed
  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (filterAssignee !== "all" && t.assignee?.id !== filterAssignee)
      return false;
    return true;
  });

  const openCreateSheet = (status: TaskStatus = "todo") => {
    setEditingTask(null);
    setDefaultStatus(status);
    setSheetOpen(true);
  };

  const openEditSheet = (task: Task) => {
    setEditingTask(task);
    setSheetOpen(true);
  };

  const handleSaved = (saved: Task) => {
    setTasks((prev) => {
      const idx = prev.findIndex((t) => t.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
  };

  const handleDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b bg-background shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            )}
          </div>
          <Button onClick={() => openCreateSheet()} size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New task
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        STATUS_CONFIG[s].dotColor
                      )}
                    />
                    {STATUS_CONFIG[s].label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterAssignee} onValueChange={setFilterAssignee}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All assignees</SelectItem>
              {project.members.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  <div className="flex items-center gap-2">
                    <InitialsAvatar name={m.name} />
                    {m.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(filterStatus !== "all" || filterAssignee !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground"
              onClick={() => {
                setFilterStatus("all");
                setFilterAssignee("all");
              }}
            >
              Clear filters
            </Button>
          )}

          <span className="ml-auto text-xs text-muted-foreground">
            {filteredTasks.length} task
            {filteredTasks.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Shadcn Table ── */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[35%]">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-sm text-muted-foreground py-12"
                    >
                      No tasks found. Try adjusting filters or create a new task.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => {
                    const canDelete =
                      task.created_by === currentUserId ||
                      project.owner_id === currentUserId;

                    return (
                      <TableRow key={task.id} className="group">
                        {/* Title */}
                        <TableCell className="font-medium text-sm">
                          {task.title}
                          {task.description && (
                            <p className="text-xs text-muted-foreground font-normal truncate max-w-xs mt-0.5">
                              {task.description}
                            </p>
                          )}
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                STATUS_CONFIG[task.status].dotColor
                              )}
                            />
                            <span className="text-sm">
                              {STATUS_CONFIG[task.status].label}
                            </span>
                          </div>
                        </TableCell>

                        {/* Priority */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[11px] px-2 py-0",
                              PRIORITY_CONFIG[task.priority].color
                            )}
                          >
                            {PRIORITY_CONFIG[task.priority].label}
                          </Badge>
                        </TableCell>

                        {/* Assignee */}
                        <TableCell>
                          {task.assignee ? (
                            <div className="flex items-center gap-1.5">
                              <InitialsAvatar name={task.assignee.name} />
                              <span className="text-sm">
                                {task.assignee.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>

                        {/* Due date */}
                        <TableCell>
                          {task.due_date ? (
                            <span
                              className={cn(
                                "text-sm",
                                new Date(task.due_date) < new Date()
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                              )}
                            >
                              {format(new Date(task.due_date), "MMM d, yyyy")}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem
                                onClick={() => openEditSheet(task)}
                              >
                                <Pencil className="w-3.5 h-3.5 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {canDelete && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setTaskToDelete(task);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      {/* Task create / edit sheet */}
      <TaskSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        editingTask={editingTask}
        defaultStatus={defaultStatus}
        members={project.members}
        onSaved={handleSaved}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete task?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{taskToDelete?.title}"</strong> will be permanently
              deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectDetails;