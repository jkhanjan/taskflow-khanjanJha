import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { FAKE_PROJECT } from "@/lib/constants";

import type { Task } from "@/lib/types";

// ─── Main Page ────────────────────────────────────────────────────────────────

const Project = () => {
  const navigate = useNavigate();
  const STORAGE_KEY = "projects";
  const [createOpen, setCreateOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Task[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(FAKE_PROJECT);
    }
  }, []);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Task | null>(null);

  // ─── Create Project ─────────────────────────────

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const nextId = `p${projects.length + 1}`;

    const newProject: Task = {
      id: nextId,
      name: projectName,
      due_date: new Date().toISOString(),
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProjectName("");
    setCreateOpen(false);
  };

  // ─── Delete Project ─────────────────────────────

  const handleDelete = () => {
    if (!projectToDelete) return;
    setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // ─── Navigate to Project Details ────────────────

  const handleOpenProject = (id: string) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold truncate">
            Your Projects: {"user"}
          </h2>
          <Button
            size="sm"
            className="text-xs md:text-sm"
            variant="outline"
            onClick={() => setCreateOpen(true)}
          >
            New Project
          </Button>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogOverlay className="bg-background/80 backdrop-blur-lg" />
        <DialogContent className="w-[95vw] sm:max-w-md bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose onClick={() => setCreateOpen(false)} asChild>
              <Button type="button">Close</Button>
            </DialogClose>
            <Button variant="outline" onClick={handleCreateProject}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ScrollArea className="flex-1 w-full">
        <div className="p-3 md:p-6">

          {/* Empty state */}
          {projects.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-12">
              No projects yet. Create your first one.
            </p>
          )}

          {/* ── Mobile card list (hidden on md+) ── */}
          {projects.length > 0 && (
            <div className="flex flex-col gap-3 md:hidden">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-border bg-card p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleOpenProject(project.id)}
                >
                  {/* Index + Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-muted-foreground w-5 shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {project.name}
                    </span>
                  </div>

                  {/* Date */}
                  {project.due_date && (
                    <span
                      className={cn(
                        "text-xs shrink-0",
                        new Date(project.due_date) < new Date()
                          ? "text-red-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {format(new Date(project.due_date), "MMM d, yyyy")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Desktop table (hidden below md) ── */}
          {projects.length > 0 && (
            <div className="hidden md:block rounded-lg overflow-hidden border bg-card">
              <Table className="w-full table-fixed text-sm">
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-[80px] text-left">S.No</TableHead>
                    <TableHead className="text-left">Title</TableHead>
                    <TableHead className="w-[140px] text-left">Created date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow
                      key={project.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleOpenProject(project.id)}
                    >
                      <TableCell className="text-left">{index + 1}</TableCell>
                      <TableCell className="truncate text-left">
                        {project?.name}
                      </TableCell>
                      <TableCell className="text-left">
                        {project.due_date ? (
                          <span
                            className={cn(
                              "text-sm",
                              new Date(project.due_date) < new Date()
                                ? "text-red-500"
                                : "text-muted-foreground"
                            )}
                          >
                            {format(new Date(project.due_date), "MMM d, yyyy")}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{projectToDelete?.name}"</strong> will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Project;