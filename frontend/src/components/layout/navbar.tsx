import { Sun, Moon } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b h-16 flex items-center px-6">
      
      <div className="font-semibold text-lg">
        TaskFlow
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Toggle 
          aria-label="Toggle theme" 
          size="sm" 
          variant="outline"
          pressed={theme === "dark"}
          onPressedChange={toggleTheme}
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Toggle>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

    </header>
  )
}

