import { Sun } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  return (
    <header className="border-b h-16 flex items-center px-6">
      
      <div className="font-semibold text-lg">
        TaskFlow
      </div>

      <div className="ml-auto flex items-center gap-4">
         <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
          <Sun className="group-data-[state=on]/toggle:fill-foreground" />
           Light Mode
        </Toggle>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

    </header>
  )
}

