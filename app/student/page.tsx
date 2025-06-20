"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Home, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [applicationStatus, setApplicationStatus] = useState<"none" | "pending" | "approved" | "rejected">("none")
  const [roomDetails, setRoomDetails] = useState<any>(null)

  useEffect(() => {
    if (!user || user.role !== "student") {
      router.push("/login")
      return
    }

    // Simulate fetching application status
    const savedStatus = localStorage.getItem("applicationStatus")
    if (savedStatus) {
      setApplicationStatus(savedStatus as any)
      if (savedStatus === "approved") {
        const assignedRoom = localStorage.getItem("assignedRoom")
        if (assignedRoom) {
          setRoomDetails(JSON.parse(assignedRoom))
        } else {
          setRoomDetails({
            hostel: "Levi Hall",
            room: "101",
            bedSpace: "Bed 2",
            isEnsuite: true,
          })
        }
      }
    }
  }, [user, router])

  if (!user) return null

  const getStatusIcon = () => {
    switch (applicationStatus) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = () => {
    switch (applicationStatus) {
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">No Application</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon()}
                    <CardTitle>Application Status</CardTitle>
                  </div>
                  {getStatusBadge()}
                </div>
                <CardDescription>Current status of your hostel accommodation application</CardDescription>
              </CardHeader>
              <CardContent>
                {applicationStatus === "none" && (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Application Found</h3>
                    <p className="text-gray-600 mb-4">You haven't submitted a hostel application yet.</p>
                    <Button asChild>
                      <Link href="/student/apply">Apply for Hostel</Link>
                    </Button>
                  </div>
                )}

                {applicationStatus === "pending" && (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Application Under Review</h3>
                    <p className="text-gray-600 mb-4">
                      Your application is being reviewed by the accommodation office. You will be notified once a
                      decision is made.
                    </p>

                    {/* Display pending room details */}
                    {(() => {
                      const pendingRoomStr = localStorage.getItem("pendingRoom")
                      if (pendingRoomStr) {
                        const pendingRoom = JSON.parse(pendingRoomStr)
                        return (
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
                            <h4 className="font-medium text-yellow-800 mb-2">Requested Room</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-left">Hostel:</div>
                              <div className="text-right font-medium">{pendingRoom.hostel}</div>
                              <div className="text-left">Room:</div>
                              <div className="text-right font-medium">{pendingRoom.room}</div>
                              <div className="text-left">Bed Space:</div>
                              <div className="text-right font-medium">{pendingRoom.bedSpace}</div>
                              <div className="text-left">Type:</div>
                              <div className="text-right font-medium">
                                {pendingRoom.isEnsuite ? "Ensuite" : "Shared Bathroom"}
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>
                )}

                {applicationStatus === "approved" && roomDetails && (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Application Approved!</h3>
                      <p className="text-gray-600">Congratulations! Your hostel accommodation has been approved.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Hostel</p>
                        <p className="text-lg font-semibold">{roomDetails.hostel}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Room</p>
                        <p className="text-lg font-semibold">{roomDetails.room}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Bed Space</p>
                        <p className="text-lg font-semibold">{roomDetails.bedSpace}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Room Type</p>
                        <p className="text-sm">{roomDetails.isEnsuite ? "Ensuite" : "Shared Bathroom"}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button asChild variant="outline">
                        <Link href="/student/room-selection">Change Room</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {applicationStatus === "rejected" && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Application Rejected</h3>
                    <p className="text-gray-600 mb-4">
                      Unfortunately, your application was not successful. Please contact the accommodation office for
                      more information.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/support">Contact Support</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and important links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link href="/student/apply" className="flex flex-col items-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span>Apply for Hostel</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link href="/student/status" className="flex flex-col items-center space-y-2">
                      <CheckCircle className="w-6 h-6" />
                      <span>Check Status</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link href="/support" className="flex flex-col items-center space-y-2">
                      <Home className="w-6 h-6" />
                      <span>Support</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link href="/about" className="flex flex-col items-center space-y-2">
                      <FileText className="w-6 h-6" />
                      <span>System Info</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link href="/student/room-selection" className="flex flex-col items-center space-y-2">
                      <Home className="w-6 h-6" />
                      <span>Select Room</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Matric Number</p>
                  <p className="text-sm">{user.matricNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Application Deadline</p>
                  <p className="text-sm text-gray-600">March 15, 2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Room Allocation</p>
                  <p className="text-sm text-gray-600">March 30, 2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Move-in Date</p>
                  <p className="text-sm text-gray-600">April 15, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
