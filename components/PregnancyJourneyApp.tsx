'use client'

import { useState, useMemo, CSSProperties } from 'react'
import { BookOpen, Plus, Calendar, Sparkles, ChevronLeft, Trash2, Edit3 } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { JournalEntry, Mood, PregnancyConfig } from '../types'
import { MOODS, WEEKLY_PROMPTS, WEEK_INFO } from '../types'

const colors = {
  rose50: '#fff1f2',
  rose100: '#ffe4e6',
  rose200: '#fecdd3',
  rose300: '#fda4af',
  rose400: '#fb7185',
  rose500: '#f43f5e',
  rose600: '#e11d48',
  rose700: '#be123c',
  rose800: '#9f1239',
  rose900: '#881337',
  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber200: '#fde68a',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber700: '#b45309',
  amber800: '#92400e',
  amber900: '#78350f',
  white: '#ffffff',
}

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

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: `linear-gradient(to bottom, ${colors.rose50}, ${colors.amber50})`,
  },
  header: {
    padding: '3rem 1.5rem 1.5rem',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  greeting: {
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: '1.5rem',
    color: colors.rose900,
    margin: 0,
  },
  subtext: {
    color: colors.rose600,
    fontSize: '0.875rem',
    margin: 0,
  },
  weekEmoji: {
    width: '3.5rem',
    height: '3.5rem',
    background: colors.white,
    borderRadius: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  weekCard: {
    background: colors.white,
    borderRadius: '1.5rem',
    padding: '1.25rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: `1px solid ${colors.rose100}`,
  },
  weekLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  weekLabelText: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: colors.amber600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  weekTitle: {
    color: colors.rose900,
    fontWeight: 500,
    margin: 0,
  },
  weekMilestone: {
    color: colors.rose600,
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  section: {
    padding: '0 1.5rem',
    marginBottom: '1.5rem',
  },
  writeButton: {
    width: '100%',
    background: colors.rose600,
    color: colors.white,
    borderRadius: '1rem',
    padding: '1.25rem',
    boxShadow: '0 4px 6px rgba(225, 29, 72, 0.3)',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  writeButtonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  writeButtonText: {
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
  writeButtonPrompt: {
    color: colors.rose200,
    fontSize: '0.875rem',
  },
  writeButtonIcon: {
    width: '3rem',
    height: '3rem',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: '1.125rem',
    color: colors.rose900,
    margin: 0,
  },
  viewAllButton: {
    color: colors.rose600,
    fontSize: '0.875rem',
    fontWeight: 500,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  emptyState: {
    background: colors.white,
    borderRadius: '1rem',
    padding: '1.5rem',
    textAlign: 'center' as const,
    border: `1px solid ${colors.rose100}`,
  },
  emptyIcon: {
    color: colors.rose300,
    marginBottom: '0.75rem',
  },
  emptyTitle: {
    color: colors.rose900,
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
  emptyText: {
    color: colors.rose500,
    fontSize: '0.875rem',
  },
  entryCard: {
    width: '100%',
    background: colors.white,
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '0.75rem',
    textAlign: 'left' as const,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    border: `1px solid ${colors.rose100}`,
    cursor: 'pointer',
  },
  entryContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  entryTitle: {
    fontWeight: 500,
    color: colors.rose900,
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  entryPreview: {
    color: colors.rose500,
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  entryMeta: {
    color: colors.rose400,
    fontSize: '0.75rem',
    marginTop: '0.5rem',
  },
  moodBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    border: '1px solid',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    paddingBottom: '2rem',
  },
  statCard: {
    background: colors.white,
    borderRadius: '1rem',
    padding: '1rem',
    border: `1px solid ${colors.rose100}`,
  },
  statLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  },
  statLabelText: {
    fontSize: '0.75rem',
    color: colors.rose500,
  },
  statValue: {
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontSize: '1.5rem',
    color: colors.rose900,
    margin: 0,
  },
}

export default function PregnancyJourneyApp() {
  const [config] = useLocalStorage<PregnancyConfig>('pregnancy-config', {
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
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.greeting}>Hello, Natasha</h1>
            <p style={styles.subtext}>Week {currentWeek} • {daysUntilDue} days to go</p>
          </div>
          <div style={styles.weekEmoji}>{weekInfo.emoji}</div>
        </div>

        <div style={styles.weekCard}>
          <div style={styles.weekLabel}>
            <Sparkles size={16} color={colors.amber500} />
            <span style={styles.weekLabelText}>This Week</span>
          </div>
          <p style={styles.weekTitle}>Baby is the size of a {weekInfo.size}</p>
          <p style={styles.weekMilestone}>{weekInfo.milestone}</p>
        </div>
      </header>

      <section style={styles.section}>
        <button style={styles.writeButton} onClick={() => setView('write')}>
          <div style={styles.writeButtonContent}>
            <div>
              <p style={styles.writeButtonText}>Write Today&apos;s Entry</p>
              <p style={styles.writeButtonPrompt}>{todayPrompt}</p>
            </div>
            <div style={styles.writeButtonIcon}>
              <Plus size={24} />
            </div>
          </div>
        </button>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Recent Entries</h2>
          {entries.length > 0 && (
            <button style={styles.viewAllButton} onClick={() => setView('timeline')}>
              View All
            </button>
          )}
        </div>

        {recentEntries.length === 0 ? (
          <div style={styles.emptyState}>
            <BookOpen size={40} style={styles.emptyIcon} />
            <p style={styles.emptyTitle}>Your journal awaits</p>
            <p style={styles.emptyText}>Start capturing your pregnancy journey</p>
          </div>
        ) : (
          <div>
            {recentEntries.map(entry => (
              <button
                key={entry.id}
                style={styles.entryCard}
                onClick={() => { setSelectedEntry(entry); setView('read') }}
              >
                <div style={styles.entryContent}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={styles.entryTitle}>{entry.title || 'Untitled'}</p>
                    <p style={styles.entryPreview}>{entry.content.slice(0, 60)}...</p>
                    <p style={styles.entryMeta}>Week {entry.week} • {formatDate(entry.createdAt)}</p>
                  </div>
                  <span style={{
                    ...styles.moodBadge,
                    background: MOODS[entry.mood].color.split(' ')[0].replace('bg-', ''),
                  }}>
                    {MOODS[entry.mood].emoji}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section style={styles.section}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>
              <BookOpen size={16} color={colors.rose400} />
              <span style={styles.statLabelText}>Total Entries</span>
            </div>
            <p style={styles.statValue}>{entries.length}</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>
              <Calendar size={16} color={colors.rose400} />
              <span style={styles.statLabelText}>Current Week</span>
            </div>
            <p style={styles.statValue}>{currentWeek}</p>
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
    <div style={styles.container}>
      <header style={{
        padding: '3rem 1.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
        >
          <ChevronLeft size={24} color={colors.rose600} />
        </button>
        <h1 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: '1.125rem', color: colors.rose900 }}>
          {editingEntry ? 'Edit Entry' : 'New Entry'}
        </h1>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          style={{
            padding: '0.5rem 1rem',
            background: content.trim() ? colors.rose600 : colors.rose300,
            color: colors.white,
            borderRadius: '0.75rem',
            border: 'none',
            fontWeight: 500,
            cursor: content.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Save
        </button>
      </header>

      <div style={{ padding: '0 1.5rem 2rem' }}>
        {usePrompt && !editingEntry && (
          <div style={{
            background: colors.amber50,
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: `1px solid ${colors.amber200}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color={colors.amber600} />
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: colors.amber700 }}>
                Week {currentWeek} Prompt
              </span>
            </div>
            <p style={{ color: colors.amber900, fontStyle: 'italic' }}>&ldquo;{prompt}&rdquo;</p>
            <button 
              onClick={() => setUsePrompt(false)}
              style={{
                color: colors.amber600,
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Write freely instead
            </button>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.rose700, display: 'block', marginBottom: '0.75rem' }}>
            How are you feeling?
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(Object.keys(MOODS) as Mood[]).map(m => (
              <button
                key={m}
                onClick={() => setMood(m)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  border: mood === m ? '2px solid' : '1px solid',
                  borderColor: mood === m ? colors.rose400 : colors.rose200,
                  background: mood === m ? colors.rose100 : colors.white,
                  color: colors.rose600,
                  cursor: 'pointer',
                }}
              >
                {MOODS[m].emoji} {MOODS[m].label}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title (optional)"
          style={{
            width: '100%',
            background: colors.white,
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: colors.rose900,
            border: `1px solid ${colors.rose200}`,
            marginBottom: '1rem',
            fontSize: '1rem',
            outline: 'none',
          }}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          rows={12}
          autoFocus
          style={{
            width: '100%',
            background: colors.white,
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: colors.rose900,
            border: `1px solid ${colors.rose200}`,
            fontSize: '1rem',
            outline: 'none',
            resize: 'none',
            lineHeight: 1.6,
          }}
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
    <div style={styles.container}>
      <header style={{
        padding: '3rem 1.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
        >
          <ChevronLeft size={24} color={colors.rose600} />
        </button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={onEdit}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          >
            <Edit3 size={20} color={colors.rose600} />
          </button>
          <button 
            onClick={onDelete}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          >
            <Trash2 size={20} color={colors.rose400} />
          </button>
        </div>
      </header>

      <div style={{ padding: '0 1.5rem 2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-flex',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            background: colors.rose100,
            color: colors.rose700,
            border: `1px solid ${colors.rose300}`,
          }}>
            {MOODS[entry.mood].emoji} {MOODS[entry.mood].label}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: '1.5rem',
          color: colors.rose900,
          marginBottom: '0.5rem',
        }}>
          {entry.title || 'Untitled'}
        </h1>
        <p style={{ color: colors.rose500, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Week {entry.week} • {formatDate(entry.createdAt)}
        </p>

        {entry.prompt && (
          <div style={{
            background: colors.amber50,
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: `1px solid ${colors.amber200}`,
          }}>
            <p style={{ color: colors.amber800, fontSize: '0.875rem', fontStyle: 'italic' }}>
              &ldquo;{entry.prompt}&rdquo;
            </p>
          </div>
        )}

        <div style={{
          background: colors.white,
          borderRadius: '1rem',
          padding: '1.25rem',
          border: `1px solid ${colors.rose100}`,
        }}>
          <p style={{
            color: colors.rose800,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.7,
          }}>
            {entry.content}
          </p>
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
    <div style={styles.container}>
      <header style={{
        padding: '3rem 1.5rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
      }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
        >
          <ChevronLeft size={24} color={colors.rose600} />
        </button>
        <h1 style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: '1.25rem',
          color: colors.rose900,
          marginLeft: '0.5rem',
        }}>
          Your Journey
        </h1>
      </header>

      <div style={{ padding: '0 1.5rem 2rem' }}>
        {weeks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <BookOpen size={48} color={colors.rose300} style={{ marginBottom: '1rem' }} />
            <p style={{ color: colors.rose500 }}>No entries yet</p>
          </div>
        ) : (
          <div>
            {weeks.map(week => (
              <div key={week} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: colors.rose600,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}>
                    {week}
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, color: colors.rose900, margin: 0 }}>Week {week}</p>
                    <p style={{ color: colors.rose500, fontSize: '0.75rem', margin: 0 }}>
                      {groupedByWeek[week].length} entries
                    </p>
                  </div>
                </div>
                <div style={{
                  marginLeft: '1.25rem',
                  paddingLeft: '1.25rem',
                  borderLeft: `2px solid ${colors.rose200}`,
                }}>
                  {groupedByWeek[week].map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => onSelectEntry(entry)}
                      style={{
                        width: '100%',
                        background: colors.white,
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '0.75rem',
                        textAlign: 'left',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.rose100}`,
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 500, color: colors.rose900, margin: 0 }}>
                            {entry.title || 'Untitled'}
                          </p>
                          <p style={{ color: colors.rose400, fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            {formatDate(entry.createdAt)}
                          </p>
                        </div>
                        <span style={{ fontSize: '1.125rem' }}>{MOODS[entry.mood].emoji}</span>
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
