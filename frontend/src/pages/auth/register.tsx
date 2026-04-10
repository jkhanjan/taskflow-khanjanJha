import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/hooks/use-theme"

export function RegisterPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative bg-background text-foreground">
      <Toggle 
        aria-label="Toggle theme" 
        size="sm" 
        variant="outline"
        pressed={theme === "dark"}
        onPressedChange={toggleTheme}
        className="absolute top-6 right-6"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Toggle>
      <div className="w-full max-w-md space-y-6 rounded-lg p-6 shadow-sm sm:p-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" placeholder="Jordan Lee" />
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              id="fieldgroup-password"
              type="password"
              placeholder="Create a password"
            />
          </Field>

          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}
