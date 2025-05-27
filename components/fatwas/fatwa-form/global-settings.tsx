"use client"
import { cn } from "@/lib/utils"
import type { GlobalSettings } from "./types"

const selectStyles = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
)

interface GlobalSettingsProps {
  settings: GlobalSettings
  onSettingsChange: (settings: GlobalSettings) => void
}

export function GlobalSettingsForm({ settings, onSettingsChange }: GlobalSettingsProps) {
  const updateSetting = <K extends keyof GlobalSettings>(key: K, value: GlobalSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold mb-4 text-blue-900">Global Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuestionSelect value={settings.question} onChange={(value) => updateSetting("question", value)} />
        <CategorySelect value={settings.category} onChange={(value) => updateSetting("category", value)} />
        <ScholarSelect value={settings.scholar} onChange={(value) => updateSetting("scholar", value)} />
      </div>
      <div className="mt-3 text-sm text-blue-700">
        <p>
          <strong>Note:</strong> These should be valid ObjectId references from your database. In a production app,
          these would be populated from API calls to your backend.
        </p>
      </div>
    </div>
  )
}

interface QuestionSelectProps {
  value: string
  onChange: (value: string) => void
}

function QuestionSelect({ value, onChange }: QuestionSelectProps) {
  // Sample ObjectIds - replace with actual data from your API
  const sampleQuestions = [
    { id: "507f1f77bcf86cd799439011", title: "Prayer timing during travel" },
    { id: "507f1f77bcf86cd799439012", title: "Fasting rules for pregnant women" },
    { id: "507f1f77bcf86cd799439013", title: "Business partnership in Islam" },
    { id: "507f1f77bcf86cd799439014", title: "Marriage contract requirements" },
  ]

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Question Reference</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectStyles}>
        <option value="">Select Question</option>
        {sampleQuestions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or enter ObjectId manually"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectStyles, "mt-2 text-xs")}
      />
    </div>
  )
}

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

function CategorySelect({ value, onChange }: CategorySelectProps) {
  // Sample ObjectIds - replace with actual data from your API
  const sampleCategories = [
    { id: "507f1f77bcf86cd799439021", name: "Fiqh" },
    { id: "507f1f77bcf86cd799439022", name: "Aqeedah" },
    { id: "507f1f77bcf86cd799439023", name: "Hadith" },
    { id: "507f1f77bcf86cd799439024", name: "Tafseer" },
  ]

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Category</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectStyles}>
        <option value="">Select Category</option>
        {sampleCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or enter ObjectId manually"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectStyles, "mt-2 text-xs")}
      />
    </div>
  )
}

interface ScholarSelectProps {
  value: string
  onChange: (value: string) => void
}

function ScholarSelect({ value, onChange }: ScholarSelectProps) {
  // Sample ObjectIds - replace with actual data from your API
  const sampleScholars = [
    { id: "507f1f77bcf86cd799439031", name: "Dr. Ahmad Ali" },
    { id: "507f1f77bcf86cd799439032", name: "Sheikh Muhammad Hassan" },
    { id: "507f1f77bcf86cd799439033", name: "Maulana Abdul Rahman" },
    { id: "507f1f77bcf86cd799439034", name: "Dr. Fatima Khan" },
  ]

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Scholar</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectStyles}>
        <option value="">Select Scholar</option>
        {sampleScholars.map((scholar) => (
          <option key={scholar.id} value={scholar.id}>
            {scholar.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or enter ObjectId manually"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectStyles, "mt-2 text-xs")}
      />
    </div>
  )
}
