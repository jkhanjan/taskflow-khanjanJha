import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <div className="flex h-[100svh]">  {/* adjust 3.5rem to your navbar height */}
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}