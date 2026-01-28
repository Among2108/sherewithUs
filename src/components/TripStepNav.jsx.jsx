import React from "react"
import { useNavigate, useParams } from "react-router-dom"

const STEPS = ["dashboard", "manage", "summary"]

export default function TripStepNav({ step }) {
  const navigate = useNavigate()
  const { tripId } = useParams()

  const idx = STEPS.indexOf(step)
  const canBack = idx > 0
  const canNext = idx < STEPS.length - 1

  const goTo = (nextStep) => {
    if (!nextStep) return
    navigate(`/trip/${tripId}/${nextStep}`)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => goTo(STEPS[idx - 1])}
        disabled={!canBack}
        className="h-10 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>

      <div className="text-sm text-muted-foreground">
        Step {idx + 1} / {STEPS.length}
      </div>

      <button
        type="button"
        onClick={() => goTo(STEPS[idx + 1])}
        disabled={!canNext}
        className="h-10 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
