import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import type { Assignee, Task, TaskFormData, TaskPriority, TaskStatus } from "@/lib/types";
import { useState, useEffect } from "react";
import { EMPTY_FORM, FAKE_MEMBERS, PRIORITY_CONFIG, STATUS_CONFIG, STATUS_ORDER } from "@/lib/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InitialsAvatar } from "../ui/initital-avatar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export const TaskSheet = ({
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
}) => {
  const [form, setForm] = useState<TaskFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormData, string>>
  >({});

  // Sync form when sheet opens
  useEffect(() => {
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
  }, [editingTask, defaultStatus]);

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
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0 bg-background text-foreground">
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
                  <SelectContent className="bg-white" position="popper" sideOffset={4}>
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
                  <SelectContent className="bg-white" position="popper" sideOffset={4}>
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
                <SelectContent className="bg-white" position="popper" sideOffset={4}>
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
                <PopoverContent className="w-auto p-0 bg-white" align="start">
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

        <SheetFooter className="px-6 py-4 gap-2">
          <Button
            
            onClick={() => onOpenChange(false)}
            className="py-5 hover:cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="outline" className="py-5 hover:cursor-pointer">
            {editingTask ? "Save changes" : "Create task"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}