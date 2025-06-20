"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Home, CheckCircle, Clock } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { hostels } from "@/lib/hostel-data"

const applicationData = [
  { month: "Jan", applications: 120 },
  { month: "Feb", applications: 150 },
  { month: "Mar", applications: 200 },
  { month: "Apr", applications: 180 },
  { month: "May", applications: 220 },
  { month: "Jun", applications: 190 },
]

const allocationData = [
  { name: "Allocated", value: 1200, color: "#22c55e" },
  { name: "Pending", value: 300, color: "#eab308" },
  { name: "Available", value: 500, color: "#3b82f6" },
]

const mockApplications = [
  {
    id: 1,
    name: "John Doe",
    matricNumber: "21/1234",
    department: "Computer Science",
    status: "pending",
    appliedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    matricNumber: "21/5678",
    department: "Engineering",
    status: "approved",
    appliedDate: "2024-01-14",
  },
  {
    id: 3,
    name: "Mike Johnson",
    matricNumber: "21/9012",
    department: "Business",
    status: "pending",
    appliedDate: "2024-01-13",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    matricNumber: "21/3456",
    department: "Law",
    status: "rejected",
    appliedDate: "2024-01-12",
  },
  {
    id: 5,
    name: "David Brown",
    matricNumber: "21/7890",
    department: "Medicine",
    status: "approved",
    appliedDate: "2024-01-11",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState(mockApplications)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
  }, [user, router])

  if (!user) return null

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage hostel allocations and monitor system performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hostels.length}</div>
              <p className="text-xs text-muted-foreground">5 Male, 7 Female</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,400</div>
              <p className="text-xs text-muted-foreground">200 rooms per hostel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,200</div>
              <p className="text-xs text-muted-foreground">60% approval rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">300</div>
              <p className="text-xs text-muted-foreground">Awaiting decision</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Applications Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Applications</CardTitle>
              <CardDescription>Number of applications received per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  applications: {
                    label: "Applications",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="applications" fill="var(--color-applications)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Allocation Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Room Allocation Status</CardTitle>
              <CardDescription>Current distribution of room allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  allocated: {
                    label: "Allocated",
                    color: "#22c55e",
                  },
                  pending: {
                    label: "Pending",
                    color: "#eab308",
                  },
                  available: {
                    label: "Available",
                    color: "#3b82f6",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest hostel accommodation applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold">{application.name}</p>
                        <p className="text-sm text-gray-600">
                          {application.matricNumber} • {application.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Applied: {application.appliedDate}</p>
                      {getStatusBadge(application.status)}
                    </div>

                    {application.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "approved")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(application.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hostel Breakdown */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Hostel Overview</CardTitle>
            <CardDescription>Room capacity and types across all hostels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Male Hostels</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>• Levi Hall - 4-bed ensuite (200 rooms)</div>
                  <div>• Integrity Hall - 4-bed ensuite (200 rooms)</div>
                  <div>• Joseph Hall - 6-bed ensuite (200 rooms)</div>
                  <div>• Joshua Hall - 6-bed ensuite (200 rooms)</div>
                  <div>• Elisha Hall - 6-bed no ensuite (200 rooms)</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Female Hostels</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>• Deborah Hall - Mixed types (200 rooms)</div>
                  <div>• Rebecca Hall - 2,4,6-bed ensuite (200 rooms)</div>
                  <div>• Mercy Hall - 4,6-bed ensuite (200 rooms)</div>
                  <div>• Esme Hall - 6-bed ensuite (200 rooms)</div>
                  <div>• Mary Hall - 6-bed no ensuite (200 rooms)</div>
                  <div>• Susan Hall - 4,6-bed no ensuite (200 rooms)</div>
                  <div>• Dorcas Hall - 6-bed ensuite (200 rooms)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
