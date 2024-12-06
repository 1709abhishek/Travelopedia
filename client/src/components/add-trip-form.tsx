"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from 'lucide-react'
import { useState } from "react"

export function AddTripForm() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      destination: formData.get("destination"),
      country: formData.get("country"),
      description: formData.get("description"),
      duration: formData.get("duration"),
      date: formData.get("date"),
    }

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create trip")
      }

      // Reset form and show success message
      event.currentTarget.reset()
    } catch (error) {
      console.error("Error creating trip:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Add New Trip</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" name="destination" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input id="duration" name="duration" type="number" min="1" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Start Date</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="date"
                name="date"
                type="date"
                className="flex-1"
                required
              />
              <Calendar className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding Trip..." : "Add Trip"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

