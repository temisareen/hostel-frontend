export interface Room {
  id: string
  number: string
  capacity: number
  isEnsuite: boolean
  occupiedBeds: number
  occupants: string[]
  gender: "male" | "female"
  hostelName: string
}

export interface Hostel {
  id: string
  name: string
  gender: "male" | "female"
  roomTypes: {
    capacity: number
    isEnsuite: boolean
    count: number
  }[]
  totalRooms: number
}

export const hostels: Hostel[] = [
  // Boys Hostels
  {
    id: "levi",
    name: "Levi Hall",
    gender: "male",
    roomTypes: [{ capacity: 4, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "integrity",
    name: "Integrity Hall",
    gender: "male",
    roomTypes: [{ capacity: 4, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "joseph",
    name: "Joseph Hall",
    gender: "male",
    roomTypes: [{ capacity: 6, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "joshua",
    name: "Joshua Hall",
    gender: "male",
    roomTypes: [{ capacity: 6, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "elisha",
    name: "Elisha Hall",
    gender: "male",
    roomTypes: [{ capacity: 6, isEnsuite: false, count: 200 }],
    totalRooms: 200,
  },
  // Girls Hostels
  {
    id: "deborah",
    name: "Deborah Hall",
    gender: "female",
    roomTypes: [
      { capacity: 4, isEnsuite: true, count: 67 },
      { capacity: 2, isEnsuite: true, count: 67 },
      { capacity: 6, isEnsuite: false, count: 66 },
    ],
    totalRooms: 200,
  },
  {
    id: "rebecca",
    name: "Rebecca Hall",
    gender: "female",
    roomTypes: [
      { capacity: 6, isEnsuite: true, count: 67 },
      { capacity: 4, isEnsuite: true, count: 67 },
      { capacity: 2, isEnsuite: true, count: 66 },
    ],
    totalRooms: 200,
  },
  {
    id: "mercy",
    name: "Mercy Hall",
    gender: "female",
    roomTypes: [
      { capacity: 6, isEnsuite: true, count: 100 },
      { capacity: 4, isEnsuite: true, count: 100 },
    ],
    totalRooms: 200,
  },
  {
    id: "esme",
    name: "Esme Hall",
    gender: "female",
    roomTypes: [{ capacity: 6, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "mary",
    name: "Mary Hall",
    gender: "female",
    roomTypes: [{ capacity: 6, isEnsuite: false, count: 200 }],
    totalRooms: 200,
  },
  {
    id: "susan",
    name: "Susan Hall",
    gender: "female",
    roomTypes: [
      { capacity: 6, isEnsuite: false, count: 100 },
      { capacity: 4, isEnsuite: false, count: 100 },
    ],
    totalRooms: 200,
  },
  {
    id: "dorcas",
    name: "Dorcas Hall",
    gender: "female",
    roomTypes: [{ capacity: 6, isEnsuite: true, count: 200 }],
    totalRooms: 200,
  },
]

// Generate sample room data
export function generateRooms(): Room[] {
  const rooms: Room[] = []

  hostels.forEach((hostel) => {
    let roomNumber = 1

    hostel.roomTypes.forEach((roomType) => {
      for (let i = 0; i < roomType.count; i++) {
        const room: Room = {
          id: `${hostel.id}-${roomNumber}`,
          number: `${roomNumber.toString().padStart(3, "0")}`,
          capacity: roomType.capacity,
          isEnsuite: roomType.isEnsuite,
          occupiedBeds: Math.floor(Math.random() * (roomType.capacity + 1)),
          occupants: [],
          gender: hostel.gender,
          hostelName: hostel.name,
        }

        // Generate random occupant names for occupied beds
        for (let j = 0; j < room.occupiedBeds; j++) {
          room.occupants.push(`Student ${Math.floor(Math.random() * 1000)}`)
        }

        rooms.push(room)
        roomNumber++
      }
    })
  })

  return rooms
}

export function getAvailableRooms(gender: "male" | "female", hostelId?: string): Room[] {
  const allRooms = generateRooms()
  return allRooms.filter((room) => {
    const matchesGender = room.gender === gender
    const hasSpace = room.occupiedBeds < room.capacity
    const matchesHostel = !hostelId || room.id.startsWith(hostelId)
    return matchesGender && hasSpace && matchesHostel
  })
}

export function getHostelsByGender(gender: "male" | "female"): Hostel[] {
  return hostels.filter((hostel) => hostel.gender === gender)
}
