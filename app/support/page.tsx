import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const faqs = [
    {
      question: "When is the application deadline?",
      answer:
        "The hostel application deadline is typically March 15th for the upcoming academic session. Late applications may be considered based on availability.",
    },
    {
      question: "How are rooms allocated?",
      answer:
        "Rooms are allocated using our fair allocation algorithm that considers academic level, department, special needs, and application timestamp. Priority is given to senior students and those with special requirements.",
    },
    {
      question: "Can I change my room preference after submission?",
      answer:
        "Room preferences can be modified before the application deadline. After the deadline, changes are only possible in exceptional circumstances and subject to availability.",
    },
    {
      question: "What if my application is rejected?",
      answer:
        "If your application is rejected, you will receive an email with the reason. You can contact the accommodation office for clarification or to discuss alternative options.",
    },
    {
      question: "How do I check my application status?",
      answer:
        "Log into your student portal to check your application status in real-time. You will also receive email notifications for any status changes.",
    },
    {
      question: "What documents do I need for application?",
      answer:
        "You need a valid student ID, completed application form, medical certificate (if applicable), and emergency contact information.",
    },
    {
      question: "Can I request a specific roommate?",
      answer:
        "While we consider roommate preferences, allocation is primarily based on our fairness algorithm. Roommate requests are accommodated when possible.",
    },
    {
      question: "What are the hostel fees?",
      answer:
        "Hostel fees vary by room type and block. Single rooms: ₦150,000/session, Double rooms: ₦120,000/session, Triple/Quad rooms: ₦100,000/session.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Support & Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with your hostel application, find answers to common questions, or contact our support team for
            assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription>Get in touch with our accommodation office</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">hostel@caleb.edu.ng</p>
                    <p className="text-sm text-gray-600">accommodation@caleb.edu.ng</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+234 (0) 123 456 7890</p>
                    <p className="text-sm text-gray-600">+234 (0) 123 456 7891</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-sm text-gray-600">
                      Student Affairs Building
                      <br />
                      Room 201, Caleb University
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and helpful links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/student/apply">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Apply for Hostel
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/student">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Check Application Status
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/about">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    About the System
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Find answers to the most common questions about hostel allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200 mt-8">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Contact</CardTitle>
                <CardDescription className="text-red-600">
                  For urgent accommodation issues outside office hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">24/7 Emergency Line</p>
                    <p className="text-red-600">+234 (0) 800 CALEB HELP</p>
                    <p className="text-red-600">+234 (0) 800 22532 4357</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-green-50 border-green-200 mt-8">
              <CardHeader>
                <CardTitle className="text-green-800">System Status</CardTitle>
                <CardDescription className="text-green-600">
                  Current status of the hostel allocation system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">All systems operational</span>
                </div>
                <p className="text-green-600 text-sm mt-2">Last updated: {new Date().toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
