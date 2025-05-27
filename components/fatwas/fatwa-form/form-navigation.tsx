"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react"

interface FormNavigationProps {
  isFirstStep: boolean
  isLastStep: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export function FormNavigation({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between pt-6">
      <PreviousButton disabled={isFirstStep || isSubmitting} onClick={onPrevious} />
      {isLastStep ? (
        <SubmitButton onClick={onSubmit} isSubmitting={isSubmitting} />
      ) : (
        <NextButton onClick={onNext} disabled={isSubmitting} />
      )}
    </div>
  )
}

interface PreviousButtonProps {
  disabled: boolean
  onClick: () => void
}

function PreviousButton({ disabled, onClick }: PreviousButtonProps) {
  return (
    <Button type="button" variant="outline" onClick={onClick} disabled={disabled} className="flex items-center gap-2">
      <ChevronLeft className="w-4 h-4" />
      Previous
    </Button>
  )
}

interface NextButtonProps {
  onClick: () => void
  disabled?: boolean
}

function NextButton({ onClick, disabled }: NextButtonProps) {
  return (
    <Button type="button" onClick={onClick} disabled={disabled} className="flex items-center gap-2">
      Next
      <ChevronRight className="w-4 h-4" />
    </Button>
  )
}

interface SubmitButtonProps {
  onClick: () => void
  isSubmitting: boolean
}

function SubmitButton({ onClick, isSubmitting }: SubmitButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Check className="w-4 h-4" />
          Submit Fatwa
        </>
      )}
    </Button>
  )
}
