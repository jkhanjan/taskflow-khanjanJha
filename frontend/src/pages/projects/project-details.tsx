import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Plus,
} from "lucide-react";import { cn } from "@/lib/utils";
import { FAKE_PROJECT, FAKE_TASKS, STATUS_CONFIG, STATUS_ORDER } from "@/lib/constants";
import type {
  Task,
  TaskStatus,
} from "@/lib/types";
import { InitialsAvatar } from "@/components/ui/initital-avatar";
import { TaskSheet } from "@/components/tasks/TaskSheet";
import { TaskTable } from "@/components/tasks/TaskTable";
import { useParams } from "react-router-dom";

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProjectDetails = () => {
    const { id } = useParams();

  const project = FAKE_PROJECT.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const [tasks, setTasks] = useState<Task[]>(FAKE_TASKS);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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
      <div className="px-6 py-5 border-b shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl flex flex-start font-semibold">
              {project.name}
            </h2>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            )}
          </div>
          <Button onClick={() => openCreateSheet()} variant='outline'>
            <Plus  />
            New task
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {/* <Filter className="w-4 h-4 text-muted-foreground" /> */}

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white" sideOffset={4}>
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
            <SelectContent position="popper" className="bg-white" sideOffset={4}>
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

      <TaskTable 
        filteredTasks={filteredTasks} 
        openEditSheet={openEditSheet} 
        setTaskToDelete= {setTaskToDelete} 
        setDeleteDialogOpen ={setDeleteDialogOpen} 
      />

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