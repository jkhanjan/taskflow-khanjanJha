import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-lg p-6 shadow-sm sm:p-8">
        
        <FieldGroup>

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
              placeholder="enter the password"
            />
          </Field>

          <Field orientation="horizontal">
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}