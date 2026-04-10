import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Folder, CheckSquare, Settings, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/hooks/use-theme"

const navItems = [
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: CheckSquare, label: "All Tasks", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function Sidebar() {
  
  const [collapsed, setCollapsed] = useState(false)
const { theme, toggleTheme } = useTheme()

  return (
    <TooltipProvider delayDuration={0}>
     <aside
          className={cn(
            "hidden md:flex flex-col border-r bg-background text-foreground ",
            collapsed ? "w-14" : "w-56"
          )}
        >
        {/* Header */}
        <div
          className={cn(
            "flex items-center h-14 px-3 shrink-0 bg-background",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <span className="font-semibold text-sm truncate">My App</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-2 mt-2">
          {navItems.map(({ icon: Icon, label, href }) =>
            collapsed ? (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 mx-auto"
                    asChild
                  >
                    <a href={href}>
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                key={label}
                variant="ghost"
                className="justify-start gap-2 h-9 px-3"
                asChild
              >
                <a href={href}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </a>
              </Button>
            )
          )}
        </nav>
        
       <div className="mt-auto p-3">
        <Separator className="mb-3" />

        <div
          className={cn(
            "flex items-center gap-2",
            collapsed && "flex-col"
          )}
        >
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
               <Toggle
                aria-label="Toggle theme"
                size="sm"
                variant="outline"
                pressed={theme === "dark"}
                onPressedChange={toggleTheme}
              >
                  <Sun className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side="right">
              {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
           <Toggle
              aria-label="Toggle theme"
              size="sm"
              variant="outline"
              pressed={theme === "dark"}
              onPressedChange={toggleTheme}
            >
              {theme === "dark" ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Toggle>
          )}

          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      </aside>
    </TooltipProvider>
  )
}