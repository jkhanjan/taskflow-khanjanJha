import type { LoginCredentials, LoginResponse } from "@/types/auth"

const MOCK_USERS: Record<string, { password: string; username: string }> = {
  "test@example.com": { password: "password123", username: "User 1" },
  "admin@example.com": { password: "admin123", username: "Admin User" },
}

function generateFakeToken(email: string): string {
  const payload = btoa(JSON.stringify({ email, iat: Date.now() }))
  return `fake.${payload}.signature`
}

export async function mockFetch(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }> {
  await new Promise((res) => setTimeout(res, 400))

  if (url === "/auth/login" && options?.method === "POST") {
    const body = JSON.parse(options.body as string) as LoginCredentials
    const user = MOCK_USERS[body.email]

    if (!user || user.password !== body.password) {
      return {
        ok: false,
        status: 401,
        json: async () => ({ message: "Invalid email or password" }),
      }
    }

    const response: LoginResponse = {
      token: generateFakeToken(body.email),
      username: user.username,
      expiresAt: Date.now() + 1000 * 60 * 60, // 1 hour from now
    }

    return {
      ok: true,
      status: 200,
      json: async () => response,
    }
  }

  return {
    ok: false,
    status: 404,
    json: async () => ({ message: "Not found" }),
  }
}