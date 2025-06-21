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
    phone?: string
  ) => Promise<boolean>
  
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  
  const register = async (
    name: string,
    email: string,
    password: string,
    matricNumber: string,
    role: "student" | "admin" = "student"
  ): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      console.log("API URL:", apiUrl)
  
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, matricNumber, role }),
      })
  
      const data = await res.json()
      console.log("Response from API:", data)
  
      if (!res.ok) {
        throw new Error(data.message || "Registration failed")
      }
  
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      setUser(data.user)
  
      return true
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      setUser(data.user)

      return true
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
