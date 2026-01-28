'use client'

import { useState } from 'react'
import {
  Heart,
  Calendar,
  Camera,
  BookOpen,
  CheckSquare,
  Activity,
  Clock,
  Sparkles,
  Plus,
  X,
  Home,
  MoreHorizontal,
} from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import ModalForm from './ModalForm'
import type {
  Symptom,
  Photo,
  Appointment,
  JournalEntry,
  Todo,
  WeekData,
  ModalType,
  TabId,
} from '@/types'

const weekData: Record<number, WeekData> = {
  4: {
    size: 'poppy seed',
    sizeEmoji: '🌱',
    development:
      'Your little one is just implanting in the uterine wall. The amniotic sac and placenta are forming.',
    momBody:
      "You might not feel much yet, but hormones are already starting to change. Some early signs might include tender breasts or fatigue.",
    tips: "Start taking prenatal vitamins if you haven't already. Stay hydrated and get plenty of rest.",
    image: '🌸',
  },
}

export default function PregnancyJourneyApp() {
  const dueDate = new Date('2026-10-01')
  const currentWeek = 4

  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [symptoms, setSymptoms] = useLocalStorage<Symptom[]>('symptoms', [])
  const [photos, setPhotos] = useLocalStorage<Photo[]>('photos', [])
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', [])
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('journalEntries', [])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('')

  const currentWeekData = weekData[currentWeek] || weekData[4]

  const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const weeksUntilDue = Math.floor(daysUntilDue / 7)

  const addSymptom = (symptom: Record<string, unknown>) => {
    const newSymptom: Symptom = {
      id: Date.now(),
      type: symptom.type as string,
      severity: (symptom.severity as 'mild' | 'moderate' | 'severe') || 'mild',
      notes: symptom.notes as string | undefined,
      date: new Date().toISOString(),
    }
    setSymptoms([...symptoms, newSymptom])
  }

  const addPhoto = (photo: Record<string, unknown>) => {
    const newPhoto: Photo = {
      id: Date.now(),
      week: parseInt(photo.week as string),
      notes: photo.notes as string | undefined,
      date: new Date().toISOString(),
    }
    setPhotos([...photos, newPhoto])
  }

  const addAppointment = (appointment: Record<string, unknown>) => {
    const newAppointment: Appointment = {
      id: Date.now(),
      title: appointment.title as string,
      date: appointment.date as string,
      location: appointment.location as string,
    }
    setAppointments([...appointments, newAppointment])
  }

  const addJournalEntry = (entry: Record<string, unknown>) => {
    const newEntry: JournalEntry = {
      id: Date.now(),
      title: entry.title as string,
      content: entry.content as string,
      date: new Date().toISOString(),
    }
    setJournalEntries([...journalEntries, newEntry])
  }

  const addTodo = (todo: Record<string, unknown>) => {
    const newTodo: Todo = {
      id: Date.now(),
      task: todo.task as string,
      category: todo.category as string | undefined,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const openModal = (type: ModalType) => {
    setModalType(type)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
  }

  const handleModalSubmit = (data: Record<string, unknown>) => {
    if (modalType === 'symptom') addSymptom(data)
    else if (modalType === 'photo') addPhoto(data)
    else if (modalType === 'appointment') addAppointment(data)
    else if (modalType === 'journal') addJournalEntry(data)
    else if (modalType === 'todo') addTodo(data)
    closeModal()
  }

  const tabs = [
    { id: 'home' as TabId, label: 'Home', shortLabel: 'Home', icon: Home },
    { id: 'symptoms' as TabId, label: 'Symptoms', shortLabel: 'Symptoms', icon: Activity },
    { id: 'photos' as TabId, label: 'Photos', shortLabel: 'Photos', icon: Camera },
    { id: 'appointments' as TabId, label: 'Appointments', shortLabel: 'Appts', icon: Calendar },
    { id: 'journal' as TabId, label: 'Journal', shortLabel: 'Journal', icon: BookOpen },
    { id: 'checklist' as TabId, label: 'To-Do', shortLabel: 'To-Do', icon: CheckSquare },
    { id: 'kicks' as TabId, label: 'Kick Counter', shortLabel: 'Kicks', icon: Heart },
    { id: 'contractions' as TabId, label: 'Contractions', shortLabel: 'Timer', icon: Clock },
  ]

  // Bottom nav shows 5 tabs max, with "More" for overflow
  const bottomNavTabs = tabs.slice(0, 4)
  const moreTabs = tabs.slice(4)
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef5e7 0%, #fce4ec 50%, #f3e5f5 100%)',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: 'fixed',
          top: '-10%',
          right: '-5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(255,182,193,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-10%',
          left: '-5%',
          width: '35%',
          height: '35%',
          background: 'radial-gradient(circle, rgba(230,190,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header
          className="mobile-header"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            boxShadow: '0 2px 20px rgba(255,182,193,0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(255,182,193,0.2)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                  color: '#d4757d',
                  margin: 0,
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  lineHeight: 1.2,
                }}
              >
                <Heart fill="#d4757d" color="#d4757d" style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(24px, 4vw, 32px)', flexShrink: 0 }} />
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="hide-mobile" style={{ display: 'inline' }}>Natasha&apos;s Pregnancy Journey</span>
                  <span className="show-mobile-only" style={{ display: 'none' }}>Natasha&apos;s Journey</span>
                </span>
              </h1>
              <div
                className="week-badge"
                style={{
                  textAlign: 'right',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(255,182,193,0.2)',
                  minWidth: '70px',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
                    color: '#ad1457',
                    marginBottom: '0.125rem',
                    fontWeight: '500',
                  }}
                >
                  Week
                </div>
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#d4757d', lineHeight: 1 }}>
                  {currentWeek}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(to right, #d4757d, #f48fb1)',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${(currentWeek / 40) * 100}%`,
                  background: 'linear-gradient(to right, #ad1457, #d4757d)',
                  boxShadow: '0 0 10px rgba(212,117,125,0.5)',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>

            <div
              style={{
                marginTop: '0.75rem',
                fontSize: '0.95rem',
                color: '#8d6e63',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontWeight: '500' }}>Due: October 2026</span>
              <span style={{ fontWeight: '600', color: '#d4757d' }}>{weeksUntilDue} weeks to go</span>
            </div>
          </div>
        </header>

        {/* Navigation - Hidden on mobile, shown on desktop */}
        <nav
          className="top-nav"
          style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '0.75rem 2rem',
            boxShadow: '0 2px 15px rgba(255,182,193,0.1)',
            position: 'sticky',
            top: '120px',
            zIndex: 99,
            borderBottom: '1px solid rgba(255,182,193,0.15)',
          }}
        >
          <div
            className="nav-scroll"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              flexWrap: 'wrap',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background:
                    activeTab === tab.id
                      ? 'linear-gradient(135deg, #f48fb1 0%, #d4757d 100%)'
                      : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#8d6e63',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(212,117,125,0.3)' : 'none',
                  transform: activeTab === tab.id ? 'translateY(-2px)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(212,117,125,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="mobile-main" style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
          {activeTab === 'home' && (
            <HomeTab
              currentWeek={currentWeek}
              currentWeekData={currentWeekData}
              journalEntries={journalEntries}
              openModal={openModal}
            />
          )}

          {activeTab === 'symptoms' && (
            <SymptomsTab symptoms={symptoms} openModal={openModal} />
          )}

          {activeTab === 'photos' && <PhotosTab photos={photos} openModal={openModal} />}

          {activeTab === 'appointments' && (
            <AppointmentsTab appointments={appointments} openModal={openModal} />
          )}

          {activeTab === 'journal' && (
            <JournalTab journalEntries={journalEntries} openModal={openModal} />
          )}

          {activeTab === 'checklist' && (
            <ChecklistTab todos={todos} toggleTodo={toggleTodo} openModal={openModal} />
          )}

          {activeTab === 'kicks' && <KicksTab />}

          {activeTab === 'contractions' && <ContractionsTab />}
        </main>

        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            className="animate-fadeIn mobile-modal-overlay"
            onClick={closeModal}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
              className="animate-slideUp mobile-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <h3 style={{ color: '#d4757d', margin: 0, fontSize: '1.75rem' }}>
                  {modalType === 'symptom' && 'Log Symptom'}
                  {modalType === 'photo' && 'Add Photo'}
                  {modalType === 'appointment' && 'New Appointment'}
                  {modalType === 'journal' && 'Journal Entry'}
                  {modalType === 'todo' && 'Add Task'}
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(212,117,125,0.1)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <X size={24} color="#d4757d" />
                </button>
              </div>

              <ModalForm type={modalType} onSubmit={handleModalSubmit} />
            </div>
          </div>
        )}

        {/* Bottom Navigation - Mobile Only */}
        <nav className="bottom-nav">
          {bottomNavTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setShowMoreMenu(false)
              }}
              className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon
                size={22}
                color={activeTab === tab.id ? '#d4757d' : '#8d6e63'}
                fill={activeTab === tab.id && tab.id === 'home' ? '#d4757d' : 'none'}
              />
              <span className="bottom-nav-label">{tab.shortLabel}</span>
            </button>
          ))}

          {/* More button for overflow tabs */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`bottom-nav-item ${moreTabs.some(t => t.id === activeTab) ? 'active' : ''}`}
            >
              <MoreHorizontal
                size={22}
                color={moreTabs.some(t => t.id === activeTab) ? '#d4757d' : '#8d6e63'}
              />
              <span className="bottom-nav-label">More</span>
            </button>

            {/* More menu popup */}
            {showMoreMenu && (
              <>
                <div
                  className="backdrop-overlay"
                  onClick={() => setShowMoreMenu(false)}
                />
                <div className="more-menu animate-slideUp">
                  {moreTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setShowMoreMenu(false)
                      }}
                      className={`more-menu-item ${activeTab === tab.id ? 'active' : ''}`}
                    >
                      <tab.icon size={18} color={activeTab === tab.id ? '#d4757d' : '#8d6e63'} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

// Tab Components
function HomeTab({
  currentWeek,
  currentWeekData,
  journalEntries,
  openModal,
}: {
  currentWeek: number
  currentWeekData: WeekData
  journalEntries: JournalEntry[]
  openModal: (type: ModalType) => void
}) {
  const quickActions = [
    { title: 'Log Symptoms', icon: Activity, color: '#d4757d', action: () => openModal('symptom') },
    { title: 'Add Photo', icon: Camera, color: '#f48fb1', action: () => openModal('photo') },
    {
      title: 'New Appointment',
      icon: Calendar,
      color: '#ba68c8',
      action: () => openModal('appointment'),
    },
    { title: 'Journal Entry', icon: BookOpen, color: '#ff8a65', action: () => openModal('journal') },
  ]

  return (
    <div className="animate-fadeIn" style={{ display: 'grid', gap: 'clamp(1rem, 3vw, 2rem)' }}>
      {/* Welcome Message */}
      <div
        className="mobile-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
          border: '1px solid rgba(255,182,193,0.2)',
          marginBottom: 'clamp(0.5rem, 2vw, 2rem)',
          textAlign: 'center',
        }}
      >
        <h2
          className="section-title"
          style={{
            color: '#d4757d',
            margin: '0 0 0.75rem 0',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
          }}
        >
          Welcome, Natasha!
        </h2>
        <p style={{ color: '#8d6e63', margin: 0, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.6' }}>
          This is your special place to document every precious moment of your pregnancy journey.
          From first symptoms to baby&apos;s first kicks, capture it all here.
        </p>
      </div>

      {/* Hero Card */}
      <div
        className="mobile-hero-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
          border: '1px solid rgba(255,182,193,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            fontSize: '200px',
            opacity: 0.1,
            transform: 'rotate(-15deg)',
          }}
        >
          {currentWeekData.image}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div className="animate-float" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
              {currentWeekData.sizeEmoji}
            </div>
            <div>
              <h2
                className="week-title"
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  color: '#d4757d',
                  margin: '0 0 0.5rem 0',
                  fontWeight: '600',
                }}
              >
                Week {currentWeek}
              </h2>
              <p className="baby-size-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#8d6e63', margin: 0, fontStyle: 'italic' }}>
                Baby is the size of a {currentWeekData.size}
              </p>
            </div>
          </div>

          <div
            className="info-cards-grid"
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,182,193,0.15) 0%, rgba(248,187,208,0.15) 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,182,193,0.2)',
              }}
            >
              <h3
                style={{
                  color: '#d4757d',
                  marginTop: 0,
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                Baby&apos;s Development
              </h3>
              <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>
                {currentWeekData.development}
              </p>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(230,190,255,0.15) 0%, rgba(225,190,231,0.15) 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(230,190,255,0.2)',
              }}
            >
              <h3
                style={{
                  color: '#9c27b0',
                  marginTop: 0,
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                Your Body
              </h3>
              <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>
                {currentWeekData.momBody}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              background:
                'linear-gradient(135deg, rgba(255,245,157,0.3) 0%, rgba(255,213,79,0.3) 100%)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,213,79,0.3)',
            }}
          >
            <h3
              style={{
                color: '#f57c00',
                marginTop: 0,
                fontSize: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              This Week&apos;s Tips
            </h3>
            <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>{currentWeekData.tips}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="quick-actions-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(0.75rem, 2vw, 1.5rem)',
        }}
      >
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.action}
            className={`animate-fadeInUp delay-${(idx + 1) * 100} tap-highlight`}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
              border: `2px solid ${action.color}40`,
              borderRadius: 'clamp(12px, 3vw, 20px)',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
              fontFamily: 'inherit',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = `0 8px 30px ${action.color}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,117,125,0.1)'
            }}
          >
            <action.icon size={32} color={action.color} style={{ marginBottom: '0.75rem', minWidth: '32px', minHeight: '32px' }} />
            <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '600', color: '#5d4037' }}>
              {action.title}
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className="mobile-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(243,229,245,0.95) 100%)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
          border: '1px solid rgba(255,182,193,0.3)',
        }}
      >
        <h2
          className="section-title"
          style={{ color: '#d4757d', marginTop: 0, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', marginBottom: '1.5rem' }}
        >
          Recent Activity
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {journalEntries
            .slice(-3)
            .reverse()
            .map((entry) => (
              <div
                key={entry.id}
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  padding: '1rem',
                  borderRadius: '12px',
                  borderLeft: '4px solid #d4757d',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#8d6e63', marginBottom: '0.5rem' }}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div style={{ color: '#5d4037' }}>{entry.content}</div>
              </div>
            ))}
          {journalEntries.length === 0 && (
            <p style={{ color: '#8d6e63', fontStyle: 'italic', textAlign: 'center' }}>
              Natasha, your journey is just beginning! Start documenting your precious moments here.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function SymptomsTab({
  symptoms,
  openModal,
}: {
  symptoms: Symptom[]
  openModal: (type: ModalType) => void
}) {
  return (
    <div className="animate-fadeIn">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>Symptom Tracker</h2>
        <ActionButton onClick={() => openModal('symptom')}>
          <Plus size={20} />
          Log Symptom
        </ActionButton>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {symptoms.map((symptom) => (
          <div
            key={symptom.id}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
              border: '1px solid rgba(255,182,193,0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '0.75rem',
              }}
            >
              <h3 style={{ color: '#d4757d', margin: 0, fontSize: '1.25rem' }}>{symptom.type}</h3>
              <span
                style={{
                  background: `${
                    symptom.severity === 'mild'
                      ? '#c8e6c9'
                      : symptom.severity === 'moderate'
                      ? '#fff9c4'
                      : '#ffccbc'
                  }`,
                  color: `${
                    symptom.severity === 'mild'
                      ? '#2e7d32'
                      : symptom.severity === 'moderate'
                      ? '#f57f17'
                      : '#d84315'
                  }`,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}
              >
                {symptom.severity}
              </span>
            </div>
            <p style={{ color: '#5d4037', margin: '0 0 0.5rem 0' }}>{symptom.notes}</p>
            <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
              {new Date(symptom.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
          </div>
        ))}
        {symptoms.length === 0 && (
          <EmptyState>
            Natasha, track how you&apos;re feeling each day. Tap &quot;Log Symptom&quot; to get started!
          </EmptyState>
        )}
      </div>
    </div>
  )
}

function PhotosTab({
  photos,
  openModal,
}: {
  photos: Photo[]
  openModal: (type: ModalType) => void
}) {
  return (
    <div className="animate-fadeIn">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>Photo Timeline</h2>
        <ActionButton onClick={() => openModal('photo')}>
          <Plus size={20} />
          Add Photo
        </ActionButton>
      </div>

      <div
        className="photo-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
              padding: '1rem',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
              border: '1px solid rgba(255,182,193,0.3)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                height: '200px',
                borderRadius: '12px',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d4757d',
                fontSize: '3rem',
              }}
            >
              📸
            </div>
            <div style={{ color: '#5d4037', fontWeight: '600', marginBottom: '0.25rem' }}>
              Week {photo.week}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
              {new Date(photo.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            {photo.notes && (
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#5d4037',
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                }}
              >
                {photo.notes}
              </div>
            )}
          </div>
        ))}
        {photos.length === 0 && (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState>
              Natasha, capture your beautiful bump progression! Add your first photo to begin your
              timeline.
            </EmptyState>
          </div>
        )}
      </div>
    </div>
  )
}

function AppointmentsTab({
  appointments,
  openModal,
}: {
  appointments: Appointment[]
  openModal: (type: ModalType) => void
}) {
  return (
    <div className="animate-fadeIn">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>Appointments</h2>
        <ActionButton onClick={() => openModal('appointment')}>
          <Plus size={20} />
          Add Appointment
        </ActionButton>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {appointments
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((apt) => (
            <div
              key={apt.id}
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                border: '1px solid rgba(255,182,193,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ color: '#d4757d', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                  {apt.title}
                </h3>
                <div style={{ color: '#5d4037', marginBottom: '0.25rem' }}>{apt.location}</div>
                <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                  {new Date(apt.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </div>
              </div>
              <Calendar size={32} color="#d4757d" />
            </div>
          ))}
        {appointments.length === 0 && (
          <EmptyState>No appointments scheduled yet. Add your first appointment!</EmptyState>
        )}
      </div>
    </div>
  )
}

function JournalTab({
  journalEntries,
  openModal,
}: {
  journalEntries: JournalEntry[]
  openModal: (type: ModalType) => void
}) {
  return (
    <div className="animate-fadeIn">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>Memory Journal</h2>
        <ActionButton onClick={() => openModal('journal')}>
          <Plus size={20} />
          New Entry
        </ActionButton>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {journalEntries
          .slice()
          .reverse()
          .map((entry) => (
            <div
              key={entry.id}
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                border: '1px solid rgba(255,182,193,0.3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <h3 style={{ color: '#d4757d', margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>
                    {entry.title}
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <BookOpen size={24} color="#d4757d" />
              </div>
              <p style={{ color: '#5d4037', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>
                {entry.content}
              </p>
            </div>
          ))}
        {journalEntries.length === 0 && (
          <EmptyState>
            Dear Natasha, this is your sacred space for thoughts, feelings, and memories. Start
            writing your heart out!
          </EmptyState>
        )}
      </div>
    </div>
  )
}

function ChecklistTab({
  todos,
  toggleTodo,
  openModal,
}: {
  todos: Todo[]
  toggleTodo: (id: number) => void
  openModal: (type: ModalType) => void
}) {
  return (
    <div className="animate-fadeIn">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>Pregnancy Checklist</h2>
        <ActionButton onClick={() => openModal('todo')}>
          <Plus size={20} />
          Add Task
        </ActionButton>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
              border: '1px solid rgba(255,182,193,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              opacity: todo.completed ? 0.6 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                accentColor: '#d4757d',
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: '#5d4037',
                  fontSize: '1.1rem',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.task}
              </div>
              {todo.category && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(212,117,125,0.15)',
                    color: '#d4757d',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  {todo.category}
                </span>
              )}
            </div>
          </div>
        ))}
        {todos.length === 0 && <EmptyState>No tasks yet. Add your first to-do!</EmptyState>}
      </div>
    </div>
  )
}

function KicksTab() {
  return (
    <div className="animate-fadeIn">
      <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>Kick Counter</h2>
      <div
        className="mobile-hero-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
          padding: '3rem',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
          border: '1px solid rgba(255,182,193,0.3)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>👶</div>
        <p style={{ color: '#8d6e63', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
          Kick counting usually starts around week 28. This feature will help you track your
          baby&apos;s movements!
        </p>
        <TipBox>
          Tip: Most providers recommend counting 10 movements within 2 hours. You&apos;ll be able to track
          this soon!
        </TipBox>
      </div>
    </div>
  )
}

function ContractionsTab() {
  return (
    <div className="animate-fadeIn">
      <h2 className="section-title" style={{ color: '#d4757d', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>Contraction Timer</h2>
      <div
        className="mobile-hero-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
          padding: '3rem',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
          border: '1px solid rgba(255,182,193,0.3)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>⏱️</div>
        <p style={{ color: '#8d6e63', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
          The contraction timer will help you track timing and frequency when labor begins!
        </p>
        <TipBox>
          Tip: When contractions are 5 minutes apart, lasting 60 seconds, for at least 1 hour,
          it&apos;s time to call your provider!
        </TipBox>
      </div>
    </div>
  )
}

// Shared Components
function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="tap-highlight mobile-action-btn"
      style={{
        background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
        transition: 'transform 0.2s ease',
        fontFamily: 'inherit',
        minHeight: '44px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {children}
    </button>
  )
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.6)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        borderRadius: 'clamp(12px, 2vw, 16px)',
        textAlign: 'center',
        color: '#8d6e63',
        fontStyle: 'italic',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      }}
    >
      {children}
    </div>
  )
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255,245,157,0.3) 0%, rgba(255,213,79,0.3) 100%)',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        borderRadius: 'clamp(12px, 2vw, 16px)',
        border: '1px solid rgba(255,213,79,0.3)',
        marginTop: 'clamp(1rem, 3vw, 1.5rem)',
      }}
    >
      <p style={{ color: '#5d4037', margin: 0, lineHeight: '1.6', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>{children}</p>
    </div>
  )
}
