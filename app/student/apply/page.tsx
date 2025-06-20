"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getHostelsByGender, getAvailableRooms, type Room } from "@/lib/hostel-data"
import { Search } from "lucide-react"

export default function HostelApplicationPage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">("")
  const [availableHostels, setAvailableHostels] = useState<any[]>([])
  const [selectedHostel, setSelectedHostel] = useState("")
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [searchRoom, setSearchRoom] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    gender: "",
    hostelPreference: "",
    roomTypePreference: "",
    specialRequests: "",
    medicalConditions: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (selectedGender) {
      const hostels = getHostelsByGender(selectedGender)
      setAvailableHostels(hostels)
      setFormData({ ...formData, gender: selectedGender })
    }
  }, [selectedGender])

  useEffect(() => {
    if (selectedGender && selectedHostel) {
      const rooms = getAvailableRooms(selectedGender, selectedHostel)
      setAvailableRooms(rooms)
      setFilteredRooms(rooms)
    }
  }, [selectedGender, selectedHostel])

  useEffect(() => {
    if (searchRoom) {
      const filtered = availableRooms.filter(
        (room) => room.number.includes(searchRoom) || room.hostelName.toLowerCase().includes(searchRoom.toLowerCase()),
      )
      setFilteredRooms(filtered)
    } else {
      setFilteredRooms(availableRooms)
    }
  }, [searchRoom, availableRooms])

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    if (!selectedRoom) {
      toast({
        title: "Error",
        description: "Please select a room",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save application status and room details
    localStorage.setItem("applicationStatus", "pending")
    localStorage.setItem(
      "pendingRoom",
      JSON.stringify({
        hostel: selectedRoom.hostelName,
        room: selectedRoom.number,
        bedSpace: `Bed ${selectedRoom.occupiedBeds + 1}`,
        isEnsuite: selectedRoom.isEnsuite,
      }),
    )

    toast({
      title: "Application Submitted",
      description: "Your hostel application has been submitted successfully!",
    })

    router.push("/student")
  }

  const nextStep = () => {
    if (step === 1 && (!formData.gender || !selectedHostel)) {
      toast({
        title: "Error",
        description: "Please select your gender and preferred hostel",
        variant: "destructive",
      })
      return
    }
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hostel Application Form</h1>
          <p className="text-gray-600">Complete this form to apply for hostel accommodation</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>Please provide accurate information for your hostel application</CardDescription>
            <div className="flex justify-between mt-4">
              <Badge variant={step === 1 ? "default" : "outline"}>1. Personal Details</Badge>
              <Badge variant={step === 2 ? "default" : "outline"}>2. Room Selection</Badge>
              <Badge variant={step === 3 ? "default" : "outline"}>3. Confirmation</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Hostel Preferences</h3>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value: "male" | "female") => {
                          setSelectedGender(value)
                          setAvailableHostels(getHostelsByGender(value))
                          setFormData({ ...formData, gender: value, hostelPreference: "" })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedGender && (
                      <div className="space-y-2">
                        <Label htmlFor="hostelPreference">Preferred Hostel</Label>
                        <Select
                          onValueChange={(value) => {
                            setSelectedHostel(value)
                            setFormData({ ...formData, hostelPreference: value })
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select preferred hostel" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableHostels.map((hostel) => (
                              <SelectItem key={hostel.id} value={hostel.id}>
                                {hostel.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="roomTypePreference">Room Type Preference</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, roomTypePreference: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-bed-ensuite">2-Bed Ensuite</SelectItem>
                          <SelectItem value="4-bed-ensuite">4-Bed Ensuite</SelectItem>
                          <SelectItem value="6-bed-ensuite">6-Bed Ensuite</SelectItem>
                          <SelectItem value="4-bed-no-ensuite">4-Bed (No Ensuite)</SelectItem>
                          <SelectItem value="6-bed-no-ensuite">6-Bed (No Ensuite)</SelectItem>
                          <SelectItem value="any">Any Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Special Requirements</h3>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special accommodation requests (e.g., ground floor, near bathroom, etc.)"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea
                        id="medicalConditions"
                        placeholder="Any medical conditions that may affect room allocation (optional)"
                        value={formData.medicalConditions}
                        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          required
                          placeholder="Full name of emergency contact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          required
                          placeholder="+234 123 456 7890"
                          value={formData.emergencyPhone}
                          onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next: Select Room
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Room Selection</h3>
                  <p className="text-sm text-gray-600">
                    Select your preferred room from the available options in{" "}
                    {selectedHostel && availableHostels.find((h) => h.id === selectedHostel)?.name}
                  </p>

                  {/* Room Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Room</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Room number..."
                        value={searchRoom}
                        onChange={(e) => setSearchRoom(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Room Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                    {filteredRooms.map((room) => (
                      <Card
                        key={room.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedRoom?.id === room.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => handleRoomSelect(room)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{room.hostelName}</CardTitle>
                              <CardDescription>Room {room.number}</CardDescription>
                            </div>
                            <Badge variant={room.isEnsuite ? "default" : "secondary"}>
                              {room.isEnsuite ? "Ensuite" : "Shared"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Capacity:</span>
                              <span>{room.capacity} beds</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Available:</span>
                              <span className="font-medium text-green-600">
                                {room.capacity - room.occupiedBeds} beds
                              </span>
                            </div>

                            {/* Bed visualization */}
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-1">Bed spaces:</p>
                              <div className="flex space-x-1">
                                {Array.from({ length: room.capacity }).map((_, index) => (
                                  <div
                                    key={index}
                                    className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs ${
                                      index < room.occupiedBeds
                                        ? "bg-red-100 border-red-300 text-red-600"
                                        : "bg-green-100 border-green-300 text-green-600"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {filteredRooms.length === 0 && (
                      <div className="col-span-2 text-center py-12">
                        <p className="text-gray-500">No rooms available with the current filters.</p>
                      </div>
                    )}
                  </div>

                  {selectedRoom && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Selected Room</h4>
                      <p className="text-blue-700">
                        {selectedRoom.hostelName}, Room {selectedRoom.number}, Bed {selectedRoom.occupiedBeds + 1}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep} disabled={!selectedRoom}>
                      Next: Confirm Application
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Application Summary</h3>

                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Gender</p>
                        <p className="text-sm">{formData.gender === "male" ? "Male" : "Female"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Preferred Hostel</p>
                        <p className="text-sm">{availableHostels.find((h) => h.id === selectedHostel)?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Room Type Preference</p>
                        <p className="text-sm">{formData.roomTypePreference}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Emergency Contact</p>
                        <p className="text-sm">{formData.emergencyContact}</p>
                      </div>
                    </div>

                    {selectedRoom && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Selected Room</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Hostel</p>
                            <p className="text-sm">{selectedRoom.hostelName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Room Number</p>
                            <p className="text-sm">{selectedRoom.number}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Bed Space</p>
                            <p className="text-sm">Bed {selectedRoom.occupiedBeds + 1}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Room Type</p>
                            <p className="text-sm">{selectedRoom.isEnsuite ? "Ensuite" : "Shared Bathroom"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          terms and conditions
                        </a>{" "}
                        of the hostel accommodation
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isLoading || !formData.agreeTerms}>
                      {isLoading ? "Submitting Application..." : "Submit Application"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
