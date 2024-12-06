"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { useState } from "react"
import { AddTripModal } from "./add-trip-modal"

export function TripSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-gray-700 rounded-lg hover:bg-gray-800/50"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusCircle className="h-12 w-12 text-blue-600 mb-4" />
        <span>Add New Trip</span>
      </Button>

      <AddTripModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  )
}

