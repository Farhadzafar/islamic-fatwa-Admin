"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormProgress } from "./form-progress"
import { GlobalSettingsForm } from "./global-settings"
import { LanguageFormStep } from "./language-form-step"
import { FormNavigation } from "./form-navigation"
import { type FatwaFormData, type GlobalSettings, fatwaSchema, languages, defaultFormData } from "./types"

// API endpoint configuration
const API_BASE_URL = "https://final-year-backend-project.onrender.com"
const SUBMIT_ENDPOINT = `${API_BASE_URL}/add`

export default function MultiStepFatwaForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [languageData, setLanguageData] = useState<{
    en: FatwaFormData
    ps: FatwaFormData
    ar: FatwaFormData
  }>({
    en: { ...defaultFormData },
    ps: { ...defaultFormData },
    ar: { ...defaultFormData },
  })
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    question: "",
    category: "",
    scholar: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const currentLanguage = languages[currentStep]
  const progress = ((currentStep + 1) / languages.length) * 100
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === languages.length - 1

  const form = useForm<FatwaFormData>({
    resolver: zodResolver(fatwaSchema),
    defaultValues: languageData[currentLanguage.code],
  })

  const handleNext = async () => {
    const isValid = await form.trigger()
    if (isValid) {
      saveCurrentFormData()
      navigateToNextStep()
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      saveCurrentFormData()
      navigateToPreviousStep()
    }
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (isValid) {
      setIsSubmitting(true)
      setSubmitStatus({ type: null, message: "" })

      try {
        const currentFormData = form.getValues()
        const updatedLanguageData = {
          ...languageData,
          [currentLanguage.code]: currentFormData,
        }

        // Validate global settings
        if (!globalSettings.question || !globalSettings.category || !globalSettings.scholar) {
          setSubmitStatus({
            type: "error",
            message: "Please fill in all global settings (Question, Category, Scholar)",
          })
          setIsSubmitting(false)
          return
        }

        // Transform data to match your MongoDB schema exactly
        const submissionData = {
          title: {
            ps: updatedLanguageData.ps.title,
            en: updatedLanguageData.en.title,
            ar: updatedLanguageData.ar.title,
          },
          description: {
            ps: updatedLanguageData.ps.description,
            en: updatedLanguageData.en.description,
            ar: updatedLanguageData.ar.description,
          },
          madhab: {
            ps: updatedLanguageData.ps.madhab,
            en: updatedLanguageData.en.madhab,
            ar: updatedLanguageData.ar.madhab,
          },
          question: globalSettings.question, // ObjectId reference
          category: globalSettings.category, // ObjectId reference
          scholar: globalSettings.scholar, // ObjectId reference
          // Optional fields with defaults
          likes: [],
          views: 0,
          helpful: 0,
          reportError: [],
        }

        console.log("Submitting to API:", SUBMIT_ENDPOINT)
        console.log("Payload:", submissionData)

        // Submit to your external API
        const response = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(submissionData),
        })

        const result = await response.json()

        if (response.ok) {
          setSubmitStatus({
            type: "success",
            message: "Fatwa submitted successfully!",
          })
          console.log("API Response:", result)

          // Reset form after successful submission
          setTimeout(() => {
            resetForm()
          }, 2000)
        } else {
          throw new Error(result.message || result.error || `HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        console.error("Submission error:", error)
        setSubmitStatus({
          type: "error",
          message: `Failed to submit fatwa: ${error instanceof Error ? error.message : "Network error"}`,
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
    setLanguageData({
      en: { ...defaultFormData },
      ps: { ...defaultFormData },
      ar: { ...defaultFormData },
    })
    setGlobalSettings({
      question: "",
      category: "",
      scholar: "",
    })
    setSubmitStatus({ type: null, message: "" })
    form.reset(defaultFormData)
  }

  const saveCurrentFormData = () => {
    const formData = form.getValues()
    setLanguageData((prev) => ({
      ...prev,
      [currentLanguage.code]: formData,
    }))
  }

  const navigateToNextStep = () => {
    if (!isLastStep) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      const nextLanguage = languages[nextStep]
      form.reset(languageData[nextLanguage.code])
    }
  }

  const navigateToPreviousStep = () => {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep)
    const prevLanguage = languages[prevStep]
    form.reset(languageData[prevLanguage.code])
  }

  const onFormSubmit = (values: FatwaFormData) => {
    handleSubmit()
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <FormProgress currentStep={currentStep} languages={languages} progress={progress} />
        </CardHeader>

        <CardContent>
          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {submitStatus.type === "success" ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                    ✓
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
                    ✕
                  </div>
                )}
                <span className="font-medium">{submitStatus.message}</span>
              </div>
            </div>
          )}

          {isFirstStep && <GlobalSettingsForm settings={globalSettings} onSettingsChange={setGlobalSettings} />}

          <LanguageFormStep form={form} language={currentLanguage} onSubmit={onFormSubmit} />

          <FormNavigation
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          {/* API Endpoint Info */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">API Endpoint:</span>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs">{SUBMIT_ENDPOINT}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
