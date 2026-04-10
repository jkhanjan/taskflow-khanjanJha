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

  return (
    <>
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
                                "text-sm flex flex-start",
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
                                variant="secondary"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                              >
                                <MoreHorizontal className="w-4 h-4 "/>
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
    </>
  );
};