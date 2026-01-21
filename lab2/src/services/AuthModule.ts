const USERS_KEY = "users"
const SESSION_KEY = "sessionUser"

type User = { id: string; email: string; password: string , name: string }

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
}

function setUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSessionUser(): Omit<User, "password"> | null {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null")
}

export function isAuthed() {
  return !!localStorage.getItem(SESSION_KEY)
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function register(email: string, password: string,name: string) {
  const users = getUsers()
  const normalized = email.trim().toLowerCase()
  if (users.some(u => u.email === normalized)) throw new Error("Email  already exists")

  const user: User = { id: crypto.randomUUID(), email: normalized, password, name : name }
  users.push(user)
  setUsers(users)

  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, name: user.name }))
}

export function login(email: string, password: string) {
  const users = getUsers()
  const normalized = email.trim().toLowerCase()
  const user = users.find(u => u.email === normalized && u.password === password)
  if (!user) throw new Error("uncorrect login/password")

  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email }))
}



export type SessionUser = { id: string; email: string; name?: string }

function getCurrentUser(): SessionUser | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as SessionUser | null
  } catch {
    return null
  }
}

export function getNameOfCurrentUser(): string {
  const user = getCurrentUser()
  if (user != null && user.name) {
    return user.name
  }
  else return ""
}