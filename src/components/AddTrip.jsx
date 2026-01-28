import * as React from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "../hooks/use-media-query"

import { tripAPI } from "../service/trip.api"
import { useAsync } from "@/hooks/useAsync"

export default function AddTrip() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const navigate = useNavigate()

  const { run, loading, error } = useAsync(tripAPI.create)

  const handleCreate = async (title) => {
    const res = await run({ title })
    setOpen(false)
    navigate(`/trip/${res.data._id}/dashboard`)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="button1 text-white">Add Trip</button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new trip</DialogTitle>
            <DialogDescription>
              Give your trip a name to get started
            </DialogDescription>
          </DialogHeader>

          <TripForm
            onSubmit={handleCreate}
            loading={loading}
            error={error}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // Mobile (Drawer)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Trip</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create new trip</DrawerTitle>
          <DrawerDescription>
            Give your trip a name to get started
          </DrawerDescription>
        </DrawerHeader>

        <TripForm
          className="px-4"
          onSubmit={handleCreate}
          loading={loading}
          error={error}
        />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function TripForm({ className, onSubmit, loading, error }) {
  const [title, setTitle] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-6", className)}
    >
      <div className="grid gap-3">
        <Label>Trip Name</Label>
        <Input
          placeholder="Japan Trip"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-rose-500">{error}</p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Trip"}
      </Button>
    </form>
  )
}
