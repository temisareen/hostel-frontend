"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: any
  login: (email: string, password: string, role: "student" | "admin") => Promise<boolean>
  register: (
    name: string,
    email: string,
    password: string,
    matricNumber: string,
    role?: "student" | "admin",
    department?: string,
    level?: string,
    phoneNumber?: string,
    gender?: string
  ) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err)
      localStorage.removeItem("user")
    }
  }, [])

  const register = async (
    name: string,
    email: string,
    password: string,
    matricNumber: string,
    role: "student" | "admin" = "student",
    department?: string,
    level?: string,
    phoneNumber?: string,
    gender?: string
  ): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          matricNumber,
          role,
          department,
          level,
          phoneNumber,
          gender,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Registration failed")
      }

      const userData = data.data?.user
      const token = data.data?.token

      if (userData && token) {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        setUser(userData)
        return true
      }

      throw new Error("Invalid response format")
    } catch (err) {
      console.error("Registration error:", err)
      return false
    }
  }

  const login = async (
    email: string,
    password: string,
    role: "student" | "admin"
  ): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Login API error:", data)
        throw new Error(data.message || "Login failed")
      }

      const userData = data.data?.user
      const token = data.data?.token

      if (userData && token) {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        setUser(userData)
        return true
      }

      throw new Error("Invalid login response structure")
    } catch (err) {
      console.error("Login error:", err)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
