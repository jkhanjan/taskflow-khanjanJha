import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FAKE_PROJECT, PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "../ui/badge";
import { InitialsAvatar } from "../ui/initital-avatar";
import { cn } from "@/lib/utils";

export const TaskTable = ({
  filteredTasks,
  openEditSheet,
  setTaskToDelete,
  setDeleteDialogOpen,
}: {
  filteredTasks: any[];
  openEditSheet: (task: any) => void;
  setTaskToDelete: (task: any) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}) => {
  const currentUserId = "u1";
  const project = FAKE_PROJECT[0];

  const ActionMenu = ({ task }: { task: any }) => {
    const canDelete =
      task.created_by === currentUserId ||
      project.owner_id === currentUserId;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="h-7 w-7">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            onClick={() => openEditSheet(task)}
            className="hover:cursor-pointer"
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
    );
  };

  return (
    <ScrollArea className="flex-1 w-full">
      <div className="p-3 md:p-6">

        {/* ── Empty state ── */}
        {filteredTasks.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            No tasks found. Try adjusting filters or create a new task.
          </p>
        )}

        {/* ── Mobile card list (hidden on md+) ── */}
        {filteredTasks.length > 0 && (
          <div className="flex flex-col gap-3 md:hidden">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
              >
                {/* Title + action row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-snug">
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <ActionMenu task={task} />
                </div>

                {/* Meta pills row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        STATUS_CONFIG[task.status].dotColor
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {STATUS_CONFIG[task.status].label}
                    </span>
                  </div>

                  {/* Priority */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[11px] px-2 py-0",
                      PRIORITY_CONFIG[task.priority].color
                    )}
                  >
                    {PRIORITY_CONFIG[task.priority].label}
                  </Badge>

                  {/* Due date */}
                  {task.due_date && (
                    <span
                      className={cn(
                        "text-xs",
                        new Date(task.due_date) < new Date()
                          ? "text-red-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {format(new Date(task.due_date), "MMM d, yyyy")}
                    </span>
                  )}
                </div>

                {/* Assignee */}
                {task.assignee && (
                  <div className="flex items-center gap-1.5">
                    <InitialsAvatar name={task.assignee.name} />
                    <span className="text-xs text-muted-foreground">
                      {task.assignee.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Desktop table (hidden below md) ── */}
        {filteredTasks.length > 0 && (
          <div className="hidden md:block rounded-lg border border-border overflow-hidden w-full">
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
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="group">
                    {/* Title */}
                    <TableCell className="font-medium flex items-start flex-col">
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
                          "text-[11px] px-2 py-0 flex flex-start",
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
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
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
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="opacity-0 group-hover:opacity-100">
                        <ActionMenu task={task} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};