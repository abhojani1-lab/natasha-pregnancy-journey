export interface JournalEntry {
  id: string
  date: string
  week: number
  title: string
  content: string
  mood: Mood
  prompt?: string
  photoUrl?: string
  createdAt: string
  updatedAt: string
}

export type Mood = 'amazing' | 'good' | 'okay' | 'tired' | 'anxious' | 'emotional'

export const MOODS: Record<Mood, { emoji: string; label: string; color: string }> = {
  amazing: { emoji: '✨', label: 'Amazing', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  good: { emoji: '😊', label: 'Good', color: 'bg-green-100 text-green-700 border-green-300' },
  okay: { emoji: '🙂', label: 'Okay', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  tired: { emoji: '😴', label: 'Tired', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  anxious: { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  emotional: { emoji: '🥹', label: 'Emotional', color: 'bg-pink-100 text-pink-700 border-pink-300' },
}

export const WEEKLY_PROMPTS: Record<number | 'default', string[]> = {
  4: [
    "How did you feel when you found out?",
    "What are your hopes for this journey?",
    "Who was the first person you told?",
  ],
  5: [
    "What changes have you noticed in your body?",
    "What are you most excited about?",
    "How are you taking care of yourself today?",
  ],
  6: [
    "What food cravings or aversions do you have?",
    "How are you feeling emotionally?",
    "What do you want your baby to know?",
  ],
  7: [
    "What brings you comfort right now?",
    "Have you thought about names?",
    "What's your biggest hope for your little one?",
  ],
  8: [
    "How are you feeling about becoming a parent?",
    "What traditions do you want to create?",
    "Write a letter to your future self.",
  ],
  // Default prompts for other weeks
  default: [
    "How are you feeling today?",
    "What was the highlight of your day?",
    "What are you grateful for?",
    "Write a message to your baby.",
    "What are you looking forward to?",
  ],
}

export interface PregnancyConfig {
  dueDate: string
  startDate: string
  babyName?: string
}

export const WEEK_INFO: Record<number, { size: string; emoji: string; milestone: string }> = {
  4: { size: 'poppy seed', emoji: '🌱', milestone: 'Implantation begins' },
  5: { size: 'sesame seed', emoji: '🫘', milestone: 'Heart begins to form' },
  6: { size: 'lentil', emoji: '🫛', milestone: 'Heartbeat may be detectable' },
  7: { size: 'blueberry', emoji: '🫐', milestone: 'Brain growing rapidly' },
  8: { size: 'raspberry', emoji: '🍇', milestone: 'Tiny fingers forming' },
  9: { size: 'grape', emoji: '🍇', milestone: 'All organs developing' },
  10: { size: 'kumquat', emoji: '🍊', milestone: 'Officially a fetus!' },
  11: { size: 'fig', emoji: '🫒', milestone: 'Fingernails forming' },
  12: { size: 'lime', emoji: '🍋', milestone: 'Reflexes developing' },
  13: { size: 'peach', emoji: '🍑', milestone: 'Entering second trimester' },
  14: { size: 'lemon', emoji: '🍋', milestone: 'Can make facial expressions' },
  15: { size: 'apple', emoji: '🍎', milestone: 'Can sense light' },
  16: { size: 'avocado', emoji: '🥑', milestone: 'May feel first movements' },
  17: { size: 'pear', emoji: '🍐', milestone: 'Skeleton hardening' },
  18: { size: 'bell pepper', emoji: '🫑', milestone: 'Ears fully formed' },
  19: { size: 'mango', emoji: '🥭', milestone: 'Senses developing' },
  20: { size: 'banana', emoji: '🍌', milestone: 'Halfway there!' },
  21: { size: 'carrot', emoji: '🥕', milestone: 'Eyebrows visible' },
  22: { size: 'papaya', emoji: '🍈', milestone: 'Grip getting stronger' },
  23: { size: 'grapefruit', emoji: '🍊', milestone: 'Hearing improving' },
  24: { size: 'corn', emoji: '🌽', milestone: 'Face fully formed' },
  25: { size: 'cauliflower', emoji: '🥦', milestone: 'Responding to voice' },
  26: { size: 'lettuce', emoji: '🥬', milestone: 'Eyes can open' },
  27: { size: 'cabbage', emoji: '🥬', milestone: 'Entering third trimester' },
  28: { size: 'eggplant', emoji: '🍆', milestone: 'Can dream!' },
  29: { size: 'butternut squash', emoji: '🎃', milestone: 'Brain growing fast' },
  30: { size: 'coconut', emoji: '🥥', milestone: 'Getting stronger' },
  31: { size: 'pineapple', emoji: '🍍', milestone: 'All senses working' },
  32: { size: 'squash', emoji: '🎃', milestone: 'Practice breathing' },
  33: { size: 'celery', emoji: '🥬', milestone: 'Bones hardening' },
  34: { size: 'cantaloupe', emoji: '🍈', milestone: 'Lungs maturing' },
  35: { size: 'honeydew', emoji: '🍈', milestone: 'Brain connections forming' },
  36: { size: 'romaine lettuce', emoji: '🥬', milestone: 'Getting into position' },
  37: { size: 'winter melon', emoji: '🍈', milestone: 'Full term soon!' },
  38: { size: 'leek', emoji: '🥬', milestone: 'Organs ready' },
  39: { size: 'watermelon', emoji: '🍉', milestone: 'Full term!' },
  40: { size: 'pumpkin', emoji: '🎃', milestone: 'Ready to meet you!' },
}
