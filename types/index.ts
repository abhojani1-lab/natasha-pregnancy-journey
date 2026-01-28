export interface Symptom {
  id: number
  type: string
  severity: 'mild' | 'moderate' | 'severe'
  notes?: string
  date: string
}

export interface Photo {
  id: number
  week: number
  notes?: string
  date: string
}

export interface Appointment {
  id: number
  title: string
  date: string
  location: string
}

export interface JournalEntry {
  id: number
  title: string
  content: string
  date: string
}

export interface Todo {
  id: number
  task: string
  category?: string
  completed: boolean
}

export interface Kick {
  id: number
  date: string
  count: number
}

export interface Contraction {
  id: number
  startTime: string
  duration: number
  intensity?: 'mild' | 'moderate' | 'strong'
}

export interface WeekData {
  size: string
  sizeEmoji: string
  development: string
  momBody: string
  tips: string
  image: string
}

export type ModalType = 'symptom' | 'photo' | 'appointment' | 'journal' | 'todo' | ''

export type TabId = 'home' | 'symptoms' | 'photos' | 'appointments' | 'journal' | 'checklist' | 'kicks' | 'contractions'
