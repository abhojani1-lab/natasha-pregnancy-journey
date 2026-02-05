'use client'

import { useState, useMemo } from 'react'
import { BookOpen, Plus, Calendar, Sparkles, ChevronLeft, Trash2, Edit3 } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { JournalEntry, Mood, PregnancyConfig } from '@/types'
import { MOODS, WEEKLY_PROMPTS, WEEK_INFO } from '@/types'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function calculateWeek(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  const diffTime = due.getTime() - now.getTime()
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  return Math.max(4, Math.min(40, 40 - diffWeeks))
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function getRandomPrompt(week: number): string {
  const prompts = WEEKLY_PROMPTS[week] || WEEKLY_PROMPTS.default
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export default function PregnancyJourneyApp() {
  const [config, setConfig] = useLocalStorage<PregnancyConfig>('pregnancy-config', {
    dueDate: '2026-10-01',
    startDate: new Date().toISOString(),
  })
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', [])
  const [view, setView] = useState<'home' | 'write' | 'read' | 'timeline'>('home')
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)

  const currentWeek = useMemo(() => calculateWeek(config.dueDate), [config.dueDate])
  const weekInfo = WEEK_INFO[currentWeek] || WEEK_INFO[20]
  const todayPrompt = useMemo(() => getRandomPrompt(currentWeek), [currentWeek])

  const sortedEntries = useMemo(() => 
    [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [entries]
  )

  const recentEntries = sortedEntries.slice(0, 5)

  const daysUntilDue = useMemo(() => {
    const due = new Date(config.dueDate)
    const now = new Date()
    return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }, [config.dueDate])

  const handleSaveEntry = (entry: Partial<JournalEntry>) => {
    if (editingEntry) {
      setEntries(prev => prev.map(e => 
        e.id === editingEntry.id 
          ? { ...e, ...entry, updatedAt: new Date().toISOString() }
          : e
      ))
      setEditingEntry(null)
    } else {
      const newEntry: JournalEntry = {
        id: generateId(),
        date: new Date().toISOString().split('T')[0],
        week: currentWeek,
        title: entry.title || '',
        content: entry.content || '',
        mood: entry.mood || 'good',
        prompt: entry.prompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setEntries(prev => [...prev, newEntry])
    }
    setView('home')
  }

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(e => e.id !== id))
      setSelectedEntry(null)
      setView('home')
    }
  }

  if (view === 'write') {
    return (
      <WriteView 
        currentWeek={currentWeek}
        prompt={editingEntry?.prompt || todayPrompt}
        onSave={handleSaveEntry}
        onBack={() => { setView('home'); setEditingEntry(null) }}
        editingEntry={editingEntry}
      />
    )
  }

  if (view === 'read' && selectedEntry) {
    return (
      <ReadView 
        entry={selectedEntry}
        onBack={() => { setSelectedEntry(null); setView('home') }}
        onEdit={() => { setEditingEntry(selectedEntry); setView('write') }}
        onDelete={() => handleDeleteEntry(selectedEntry.id)}
      />
    )
  }

  if (view === 'timeline') {
    return (
      <TimelineView 
        entries={sortedEntries}
        onSelectEntry={(entry) => { setSelectedEntry(entry); setView('read') }}
        onBack={() => setView('home')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif text-rose-900">Hello, Natasha</h1>
            <p className="text-rose-600 text-sm">Week {currentWeek} • {daysUntilDue} days to go</p>
          </div>
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">
            {weekInfo.emoji}
          </div>
        </div>

        {/* Week Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-rose-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">This Week</span>
          </div>
          <p className="text-rose-900 font-medium">
            Baby is the size of a {weekInfo.size}
          </p>
          <p className="text-rose-600 text-sm mt-1">{weekInfo.milestone}</p>
        </div>
      </header>

      {/* Quick Write */}
      <section className="px-6 mb-6">
        <button 
          onClick={() => setView('write')}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl p-5 shadow-lg transition-all active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-medium mb-1">Write Today&apos;s Entry</p>
              <p className="text-rose-200 text-sm">{todayPrompt}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
          </div>
        </button>
      </section>

      {/* Recent Entries */}
      <section className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg text-rose-900">Recent Entries</h2>
          {entries.length > 0 && (
            <button 
              onClick={() => setView('timeline')}
              className="text-rose-600 text-sm font-medium"
            >
              View All
            </button>
          )}
        </div>

        {recentEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-rose-100">
            <BookOpen className="w-10 h-10 text-rose-300 mx-auto mb-3" />
            <p className="text-rose-900 font-medium mb-1">Your journal awaits</p>
            <p className="text-rose-500 text-sm">Start capturing your pregnancy journey</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => { setSelectedEntry(entry); setView('read') }}
                className="w-full bg-white rounded-2xl p-4 text-left shadow-sm border border-rose-100 hover:border-rose-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-rose-900 truncate">{entry.title || 'Untitled'}</p>
                    <p className="text-rose-500 text-sm truncate mt-0.5">{entry.content.slice(0, 60)}...</p>
                    <p className="text-rose-400 text-xs mt-2">Week {entry.week} • {formatDate(entry.createdAt)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs border ${MOODS[entry.mood].color}`}>
                    {MOODS[entry.mood].emoji}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-rose-100">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-rose-500">Total Entries</span>
            </div>
            <p className="text-2xl font-serif text-rose-900">{entries.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-rose-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-rose-500">Current Week</span>
            </div>
            <p className="text-2xl font-serif text-rose-900">{currentWeek}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function WriteView({ 
  currentWeek, 
  prompt, 
  onSave, 
  onBack,
  editingEntry 
}: { 
  currentWeek: number
  prompt: string
  onSave: (entry: Partial<JournalEntry>) => void
  onBack: () => void
  editingEntry?: JournalEntry | null
}) {
  const [title, setTitle] = useState(editingEntry?.title || '')
  const [content, setContent] = useState(editingEntry?.content || '')
  const [mood, setMood] = useState<Mood>(editingEntry?.mood || 'good')
  const [usePrompt, setUsePrompt] = useState(!editingEntry)

  const handleSubmit = () => {
    if (!content.trim()) return
    onSave({
      title: title.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      content: content.trim(),
      mood,
      prompt: usePrompt ? prompt : undefined,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-rose-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-serif text-lg text-rose-900">
          {editingEntry ? 'Edit Entry' : 'New Entry'}
        </h1>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </header>

      <div className="px-6 pb-8">
        {/* Prompt Card */}
        {usePrompt && !editingEntry && (
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-700">Week {currentWeek} Prompt</span>
            </div>
            <p className="text-amber-900 italic">&ldquo;{prompt}&rdquo;</p>
            <button 
              onClick={() => setUsePrompt(false)}
              className="text-amber-600 text-xs mt-2 underline"
            >
              Write freely instead
            </button>
          </div>
        )}

        {/* Mood Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-rose-700 mb-3 block">How are you feeling?</label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MOODS) as Mood[]).map(m => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                  mood === m 
                    ? MOODS[m].color + ' border-2' 
                    : 'bg-white border-rose-200 text-rose-600'
                }`}
              >
                {MOODS[m].emoji} {MOODS[m].label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title (optional)"
          className="w-full bg-white rounded-xl px-4 py-3 text-rose-900 placeholder-rose-300 border border-rose-200 focus:border-rose-400 focus:outline-none mb-4"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          rows={12}
          className="w-full bg-white rounded-xl px-4 py-3 text-rose-900 placeholder-rose-300 border border-rose-200 focus:border-rose-400 focus:outline-none resize-none"
          autoFocus
        />
      </div>
    </div>
  )
}

function ReadView({ 
  entry, 
  onBack, 
  onEdit, 
  onDelete 
}: { 
  entry: JournalEntry
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-rose-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 text-rose-600">
            <Edit3 className="w-5 h-5" />
          </button>
          <button onClick={onDelete} className="p-2 text-rose-400">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-6 pb-8">
        <div className="mb-4">
          <span className={`inline-flex px-3 py-1 rounded-xl text-sm border ${MOODS[entry.mood].color}`}>
            {MOODS[entry.mood].emoji} {MOODS[entry.mood].label}
          </span>
        </div>

        <h1 className="text-2xl font-serif text-rose-900 mb-2">{entry.title || 'Untitled'}</h1>
        <p className="text-rose-500 text-sm mb-6">Week {entry.week} • {formatDate(entry.createdAt)}</p>

        {entry.prompt && (
          <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
            <p className="text-amber-800 text-sm italic">&ldquo;{entry.prompt}&rdquo;</p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 border border-rose-100">
          <p className="text-rose-800 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
        </div>
      </div>
    </div>
  )
}

function TimelineView({ 
  entries, 
  onSelectEntry, 
  onBack 
}: { 
  entries: JournalEntry[]
  onSelectEntry: (entry: JournalEntry) => void
  onBack: () => void
}) {
  const groupedByWeek = entries.reduce((acc, entry) => {
    const week = entry.week
    if (!acc[week]) acc[week] = []
    acc[week].push(entry)
    return acc
  }, {} as Record<number, JournalEntry[]>)

  const weeks = Object.keys(groupedByWeek).map(Number).sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      <header className="px-6 pt-12 pb-6 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-rose-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-serif text-xl text-rose-900 ml-2">Your Journey</h1>
      </header>

      <div className="px-6 pb-8">
        {weeks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <p className="text-rose-500">No entries yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {weeks.map(week => (
              <div key={week}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {week}
                  </div>
                  <div>
                    <p className="font-medium text-rose-900">Week {week}</p>
                    <p className="text-rose-500 text-xs">{groupedByWeek[week].length} entries</p>
                  </div>
                </div>
                <div className="ml-5 pl-5 border-l-2 border-rose-200 space-y-3">
                  {groupedByWeek[week].map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => onSelectEntry(entry)}
                      className="w-full bg-white rounded-xl p-4 text-left shadow-sm border border-rose-100 hover:border-rose-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-rose-900 truncate">{entry.title || 'Untitled'}</p>
                          <p className="text-rose-400 text-xs mt-1">{formatDate(entry.createdAt)}</p>
                        </div>
                        <span className="text-lg">{MOODS[entry.mood].emoji}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
