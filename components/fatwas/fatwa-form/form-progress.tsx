import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Globe, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Language } from "./types"

interface FormProgressProps {
  currentStep: number
  languages: Language[]
  progress: number
}

export function FormProgress({ currentStep, languages, progress }: FormProgressProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Submit a New Fatwa</h2>
        <Badge variant="outline" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Multi-language
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {currentStep + 1} of {languages.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Language Steps */}
      <div className="flex justify-center space-x-4 mt-4">
        {languages.map((lang, index) => (
          <StepIndicator key={lang.code} language={lang} index={index} currentStep={currentStep} />
        ))}
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  language: Language
  index: number
  currentStep: number
}

function StepIndicator({ language, index, currentStep }: StepIndicatorProps) {
  const isActive = index === currentStep
  const isCompleted = index < currentStep
  const isPending = index > currentStep

  return (
    <div
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
        isActive && "bg-primary text-primary-foreground",
        isCompleted && "bg-green-100 text-green-800",
        isPending && "bg-gray-100 text-gray-600",
      )}
    >
      <span className="text-lg">{language.flag}</span>
      <span className="font-medium">{language.name}</span>
      {isCompleted && <Check className="w-4 h-4" />}
    </div>
  )
}
