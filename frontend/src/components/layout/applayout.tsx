import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { useState } from "react"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center h-14 px-4 border-b bg-background md:hidden shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <span className="ml-3 font-semibold text-sm">
            My App
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}