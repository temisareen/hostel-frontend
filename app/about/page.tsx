import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Users, BarChart3, Clock, CheckCircle, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About the Hostel Allocation System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive solution designed to streamline hostel accommodation management at Caleb University through
            intelligent allocation algorithms and modern technology.
          </p>
        </div>

        {/* System Overview */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">System Overview</CardTitle>
              <CardDescription>
                Understanding the core functionality and purpose of our allocation system
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The Caleb University Hostel Allocation System is a state-of-the-art platform designed to revolutionize
                how student accommodation is managed in academic institutions. Built with fairness, efficiency, and
                transparency at its core, the system employs advanced algorithms to ensure optimal room allocation based
                on multiple criteria including academic level, department, preferences, and availability.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This system addresses the traditional challenges of manual allocation processes, reducing administrative
                burden while providing students with a seamless application experience. The platform supports real-time
                monitoring, comprehensive reporting, and data-driven decision making for accommodation management.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Fair Allocation Algorithm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced algorithm that considers multiple factors including academic level, department, special
                  needs, and student preferences to ensure fair distribution.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Student Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Intuitive interface for students to submit applications, track status, and manage their accommodation
                  preferences with real-time updates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive analytics and reporting tools for administrators to monitor allocation patterns,
                  occupancy rates, and system performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Clock className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Real-time Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Instant application processing and status updates with automated notifications to keep students
                  informed throughout the process.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Automated Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Streamlined processes that reduce manual intervention while maintaining accuracy and compliance with
                  university accommodation policies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Scalable Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built on modern technology stack that can scale to accommodate growing student populations and
                  evolving institutional needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Allocation Algorithm */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Allocation Algorithm</CardTitle>
              <CardDescription>How our intelligent system ensures fair and efficient room allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Priority Factors</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Academic level (priority to senior students)</li>
                    <li>Department and faculty considerations</li>
                    <li>Special medical or accessibility needs</li>
                    <li>Application submission timestamp</li>
                    <li>Previous accommodation history</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Allocation Process</h3>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Applications are collected during the specified period</li>
                    <li>System validates all submitted information</li>
                    <li>Algorithm processes applications based on priority matrix</li>
                    <li>Room assignments are generated optimizing for preferences</li>
                    <li>Results are reviewed and approved by administration</li>
                    <li>Students are notified of allocation decisions</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Fairness Metrics</h3>
                  <p className="text-gray-700">
                    The system employs multiple fairness metrics to ensure equitable distribution: departmental balance,
                    gender considerations, academic performance weighting, and special needs accommodation. Regular
                    audits ensure the algorithm maintains its fairness objectives while adapting to changing
                    requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Technical Specifications</CardTitle>
              <CardDescription>Built with modern technologies for reliability and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Frontend Technologies</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Next.js 14 with App Router</li>
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Shadcn/ui component library</li>
                    <li>• Responsive design principles</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Secure authentication system</li>
                    <li>• Real-time data visualization</li>
                    <li>• Mobile-responsive interface</li>
                    <li>• Accessibility compliance</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Information */}
        <div className="text-center">
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Project Information</CardTitle>
              <CardDescription className="text-blue-100">
                Academic project details and development information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Developer</h3>
                  <p>Jemerigbe Toluwanimi</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Matric Number</h3>
                  <p>21/8477</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Institution</h3>
                  <p>Caleb University</p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Project Title</h3>
                <p className="text-blue-100">
                  "Design and Implementation of a Hostel Allocation System for Efficient Room Allocation in Academic
                  Institutions – Caleb University"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
