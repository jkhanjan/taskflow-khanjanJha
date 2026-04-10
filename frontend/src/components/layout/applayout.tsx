import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-[100svh]">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}