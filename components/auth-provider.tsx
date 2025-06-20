"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  matricNumber?: string
  role: "student" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "student" | "admin") => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, matricNumber: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string, role: "student" | "admin"): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication
    if (email === "admin@caleb.edu.ng" && password === "admin123" && role === "admin") {
      const adminUser = { id: "1", name: "Admin User", email, role: "admin" as const }
      setUser(adminUser)
      localStorage.setItem("user", JSON.stringify(adminUser))
      return true
    } else if (email === "student@caleb.edu.ng" && password === "student123" && role === "student") {
      const studentUser = {
        id: "2",
        name: "John Doe",
        email,
        matricNumber: "21/1234",
        role: "student" as const,
        role: "student",
      }
      setUser(studentUser)
      localStorage.setItem("user", JSON.stringify(studentUser))
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string, matricNumber: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = { id: Date.now().toString(), name, email, matricNumber, role: "student" as const }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
