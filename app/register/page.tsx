"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    matricNumber: "",
    department: "",
    level: "",
    phone: "",
    gender:"",
    role: "student",
  })

  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (formData.role === "admin" && !formData.matricNumber.includes("-")) {
      toast({
        title: "Error",
        description: "Admin matric number should use format: 21-8282",
        variant: "destructive",
      })
      return
    }
    if (formData.role === "student" && !formData.matricNumber.includes("/")) {
      toast({
        title: "Error",
        description: "Student matric number should use format: 21/8477",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.matricNumber,
        formData.role as "student" | "admin",
        formData.department,
        formData.level,
        formData.gender,
        formData.phone
      )

      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to Caleb University Hostel System!",
        })
        router.push(formData.role === "admin" ? "/admin" : "/student")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>Create your account to apply for hostel accommodation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Register as</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  defaultValue="student"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricNumber">Matric Number</Label>
                  <Input
                    id="matricNumber"
                    required
                    placeholder={formData.role === "admin" ? "e.g., 21-8282" : "e.g., 21/8477"}
                    value={formData.matricNumber}
                    onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your.email@caleb.edu.ng"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
  <Label htmlFor="gender">Gender</Label>
  <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
    <SelectTrigger>
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="male">Male</SelectItem>
      <SelectItem value="female">Female</SelectItem>
    </SelectContent>
  </Select>
</div>


              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+234 123 456 7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business Administration</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Academic Level</Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 Level</SelectItem>
                      <SelectItem value="200">200 Level</SelectItem>
                      <SelectItem value="300">300 Level</SelectItem>
                      <SelectItem value="400">400 Level</SelectItem>
                      <SelectItem value="500">500 Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
