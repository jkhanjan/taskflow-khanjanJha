import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Folder, CheckSquare, Settings, PanelLeftClose, PanelLeftOpen, Sun, Moon, LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/hooks/use-theme"
import { useAuth } from "@/hooks/use-auth"

const navItems = [
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: CheckSquare, label: "All Tasks", href: "#" },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { logout, user } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const sidebarContent = (isMobile = false) => (
    <aside
      className={cn(
        "flex flex-col border-r bg-background text-foreground h-full",
        !isMobile && (collapsed ? "w-14" : "w-56")
      )}
      style={isMobile ? { width: "16rem" } : undefined}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center h-14 px-3 shrink-0",
          !isMobile && collapsed ? "justify-center" : "justify-between"
        )}
      >
        <span className="font-semibold text-sm lg:text-base truncate">TaskFlow</span>
        {isMobile ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onMobileClose}>
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <Separator />

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-2 mt-2">
        {navItems.map(({ icon: Icon, label, href }) =>
          !isMobile && collapsed ? (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 mx-auto" asChild>
                  <a href={href}><Icon className="h-4 w-4" /><span className="sr-only">{label}</span></a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ) : (
            <Button key={label} variant="ghost" className="justify-start gap-2 h-9 px-3" asChild>
              <a href={href}><Icon className="h-4 w-4 shrink-0" /><span className="truncate">{label}</span></a>
            </Button>
          )
        )}

        {/* Settings + Logout */}
        {!isMobile && collapsed ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 mx-auto" asChild>
                  <a href="#"><Settings className="h-4 w-4" /><span className="sr-only">Settings</span></a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 mx-auto text-destructive hover:text-destructive" onClick={logout}>
                  <LogOut className="h-4 w-4" /><span className="sr-only">Logout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <Button variant="ghost" className="justify-start gap-2 h-9 px-3" asChild>
              <a href="#"><Settings className="h-4 w-4 shrink-0" /><span className="truncate">Settings</span></a>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 h-9 px-3 text-destructive hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="truncate">Logout</span>
            </Button>
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className="mt-auto p-3">
        <Separator className="mb-3" />
        <div className={cn("flex items-center gap-2", !isMobile && collapsed && "flex-col")}>
          {!isMobile && collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle aria-label="Toggle theme" size="sm" variant="outline" pressed={theme === "dark"} onPressedChange={toggleTheme}>
                  <Sun className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side="right">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Toggle aria-label="Toggle theme" size="sm" variant="outline" pressed={theme === "dark"} onPressedChange={toggleTheme}>
              {theme === "dark" ? <><Moon className="h-4 w-4" /> Dark Mode</> : <><Sun className="h-4 w-4" /> Light Mode</>}
            </Toggle>
          )}

          <div className="relative" ref={menuRef}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setAvatarMenuOpen(prev => !prev)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
                  <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              </TooltipTrigger>
              {!avatarMenuOpen && (
                <TooltipContent side={(!isMobile && collapsed) ? "right" : "top"}>Account</TooltipContent>
              )}
            </Tooltip>

            {avatarMenuOpen && (
              <div className={cn(
                "absolute z-50 bg-popover border rounded-md shadow-md p-1 min-w-[140px]",
                (!isMobile && collapsed) ? "left-10 bottom-0" : "bottom-10 left-0"
              )}>
                {user?.username && (
                  <>
                    <p className="px-2 py-1.5 text-xs text-muted-foreground truncate">{user.username}</p>
                    <Separator className="my-1" />
                  </>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-8 px-2 text-destructive hover:text-destructive text-sm"
                  onClick={() => { setAvatarMenuOpen(false); logout() }}
                >
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <TooltipProvider delayDuration={0}>
      {/* Desktop */}
      <div className="hidden md:flex h-full">
        {sidebarContent(false)}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 md:hidden shadow-xl">
            {sidebarContent(true)}
          </div>
        </>
      )}
    </TooltipProvider>
  )
}