import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/hooks/use-theme"

export function LoginPage() {
  const { login, isLoading, error } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit() {
    const success = await login({ email, password })
    if (success) {
      navigate("/projects")
    }
  }

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
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Log in</h3>
          <p className="text-sm text-muted-foreground">
            Welcome back. Enter your credentials to continue.
          </p>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="login-email">Email</FieldLabel>
            <Input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="login-password">Password</FieldLabel>
            <Input
              id="login-password"
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </Field>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit}
              disabled={isLoading || !email || !password}
            >
              {isLoading ? "Signing in..." : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}