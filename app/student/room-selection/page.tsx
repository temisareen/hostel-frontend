"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAvailableRooms, getHostelsByGender, type Room } from "@/lib/hostel-data"
import { Search, Users, Bed, Droplets } from "lucide-react"

export default function RoomSelectionPage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("male")
  const [selectedHostel, setSelectedHostel] = useState("")
  const [searchRoom, setSearchRoom] = useState("")
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const rooms = getAvailableRooms(selectedGender, selectedHostel)
    setAvailableRooms(rooms)
    setFilteredRooms(rooms)
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

  const handleConfirmSelection = async () => {
    if (!selectedRoom) return

    // Simulate room booking
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update local storage with room assignment
    localStorage.setItem(
      "assignedRoom",
      JSON.stringify({
        hostel: selectedRoom.hostelName,
        room: selectedRoom.number,
        bedSpace: `Bed ${selectedRoom.occupiedBeds + 1}`,
        isEnsuite: selectedRoom.isEnsuite,
      }),
    )

    localStorage.setItem("applicationStatus", "approved")

    toast({
      title: "Room Selected Successfully!",
      description: `You have been assigned to ${selectedRoom.hostelName}, Room ${selectedRoom.number}`,
    })

    router.push("/student")
  }

  const hostels = getHostelsByGender(selectedGender)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Room Selection</h1>
          <p className="text-gray-600">Choose your preferred room from available options</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Narrow down your room options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={selectedGender} onValueChange={(value: "male" | "female") => setSelectedGender(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hostel">Hostel</Label>
                  <Select value={selectedHostel} onValueChange={setSelectedHostel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All hostels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Hostels</SelectItem>
                      {hostels.map((hostel) => (
                        <SelectItem key={hostel.id} value={hostel.id}>
                          {hostel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search">Search Room</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Room number or hostel..."
                      value={searchRoom}
                      onChange={(e) => setSearchRoom(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Room Details */}
            {selectedRoom && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Selected Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{selectedRoom.hostelName}</p>
                      <p className="text-sm text-gray-600">Room {selectedRoom.number}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{selectedRoom.capacity} beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{selectedRoom.capacity - selectedRoom.occupiedBeds} available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">{selectedRoom.isEnsuite ? "Ensuite" : "Shared bathroom"}</span>
                    </div>
                    <Button onClick={handleConfirmSelection} className="w-full">
                      Confirm Selection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Room Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Showing {filteredRooms.length} available rooms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                        <span className="font-medium text-green-600">{room.capacity - room.occupiedBeds} beds</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Occupied by:</span>
                        <span className="text-gray-600">
                          {room.occupiedBeds > 0 ? `${room.occupiedBeds} students` : "None"}
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
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No rooms available with the current filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedHostel("")
                    setSearchRoom("")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
