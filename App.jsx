import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Baby, Camera, BookOpen, CheckSquare, Activity, Clock, ListChecks, Sparkles, ChevronRight, Plus, X } from 'lucide-react';

const PregnancyJourneyApp = () => {
  const dueDate = new Date('2026-10-01');
  const currentWeek = 4;
  
  const [activeTab, setActiveTab] = useState('home');
  const [symptoms, setSymptoms] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [kicks, setKicks] = useState([]);
  const [contractions, setContractions] = useState([]);
  const [todos, setTodos] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  
  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const keys = ['symptoms', 'photos', 'appointments', 'kicks', 'contractions', 'todos', 'journalEntries'];
        for (const key of keys) {
          const result = await window.storage.get(key);
          if (result) {
            const data = JSON.parse(result.value);
            switch(key) {
              case 'symptoms': setSymptoms(data); break;
              case 'photos': setPhotos(data); break;
              case 'appointments': setAppointments(data); break;
              case 'kicks': setKicks(data); break;
              case 'contractions': setContractions(data); break;
              case 'todos': setTodos(data); break;
              case 'journalEntries': setJournalEntries(data); break;
            }
          }
        }
      } catch (error) {
        console.log('Loading stored data...');
      }
    };
    loadData();
  }, []);
  
  // Save data to storage
  const saveData = async (key, data) => {
    try {
      await window.storage.set(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const weekData = {
    4: {
      size: "poppy seed",
      sizeEmoji: "🌱",
      development: "Your little one is just implanting in the uterine wall. The amniotic sac and placenta are forming.",
      momBody: "You might not feel much yet, but hormones are already starting to change. Some early signs might include tender breasts or fatigue.",
      tips: "Start taking prenatal vitamins if you haven't already. Stay hydrated and get plenty of rest.",
      image: "🌸"
    }
  };
  
  const currentWeekData = weekData[currentWeek] || weekData[4];
  
  const daysUntilDue = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
  const weeksUntilDue = Math.floor(daysUntilDue / 7);
  
  const addSymptom = (symptom) => {
    const newSymptoms = [...symptoms, { ...symptom, id: Date.now(), date: new Date().toISOString() }];
    setSymptoms(newSymptoms);
    saveData('symptoms', newSymptoms);
  };
  
  const addPhoto = (photo) => {
    const newPhotos = [...photos, { ...photo, id: Date.now(), date: new Date().toISOString() }];
    setPhotos(newPhotos);
    saveData('photos', newPhotos);
  };
  
  const addAppointment = (appointment) => {
    const newAppointments = [...appointments, { ...appointment, id: Date.now() }];
    setAppointments(newAppointments);
    saveData('appointments', newAppointments);
  };
  
  const addJournalEntry = (entry) => {
    const newEntries = [...journalEntries, { ...entry, id: Date.now(), date: new Date().toISOString() }];
    setJournalEntries(newEntries);
    saveData('journalEntries', newEntries);
  };
  
  const addTodo = (todo) => {
    const newTodos = [...todos, { ...todo, id: Date.now(), completed: false }];
    setTodos(newTodos);
    saveData('todos', newTodos);
  };
  
  const toggleTodo = (id) => {
    const newTodos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(newTodos);
    saveData('todos', newTodos);
  };
  
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef5e7 0%, #fce4ec 50%, #f3e5f5 100%)',
      fontFamily: '"Crimson Pro", "Georgia", serif',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        right: '-5%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(255,182,193,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        left: '-5%',
        width: '35%',
        height: '35%',
        background: 'radial-gradient(circle, rgba(230,190,255,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem 2rem',
          boxShadow: '0 2px 20px rgba(255,182,193,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255,182,193,0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                color: '#d4757d',
                margin: 0,
                fontWeight: '600',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Heart fill="#d4757d" color="#d4757d" size={32} />
                Natasha's Pregnancy Journey
              </h1>
              <div style={{
                textAlign: 'right',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                borderRadius: '20px',
                boxShadow: '0 4px 15px rgba(255,182,193,0.2)'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#ad1457', marginBottom: '0.25rem', fontWeight: '500' }}>Week</div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d4757d', lineHeight: 1 }}>{currentWeek}</div>
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(to right, #d4757d, #f48fb1)',
              height: '6px',
              borderRadius: '3px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${(currentWeek / 40) * 100}%`,
                background: 'linear-gradient(to right, #ad1457, #d4757d)',
                boxShadow: '0 0 10px rgba(212,117,125,0.5)',
                transition: 'width 0.5s ease'
              }} />
            </div>
            
            <div style={{ 
              marginTop: '0.75rem', 
              fontSize: '0.95rem', 
              color: '#8d6e63',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: '500' }}>📅 Due: October 2026</span>
              <span style={{ fontWeight: '600', color: '#d4757d' }}>{weeksUntilDue} weeks to go ✨</span>
            </div>
          </div>
        </header>
        
        {/* Navigation */}
        <nav style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem 2rem',
          boxShadow: '0 2px 15px rgba(255,182,193,0.1)',
          position: 'sticky',
          top: '120px',
          zIndex: 99,
          borderBottom: '1px solid rgba(255,182,193,0.15)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto', flexWrap: 'wrap' }}>
            {[
              { id: 'home', label: 'Home', icon: Sparkles },
              { id: 'symptoms', label: 'Symptoms', icon: Activity },
              { id: 'photos', label: 'Photos', icon: Camera },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'journal', label: 'Journal', icon: BookOpen },
              { id: 'checklist', label: 'To-Do', icon: CheckSquare },
              { id: 'kicks', label: 'Kick Counter', icon: Heart },
              { id: 'contractions', label: 'Contractions', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeTab === tab.id 
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
                  transform: activeTab === tab.id ? 'translateY(-2px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(212,117,125,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent';
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
        <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
          {activeTab === 'home' && (
            <div style={{ 
              animation: 'fadeIn 0.5s ease-in',
              display: 'grid',
              gap: '2rem'
            }}>
              {/* Welcome Message */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                border: '1px solid rgba(255,182,193,0.2)',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  color: '#d4757d', 
                  margin: '0 0 0.75rem 0',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  Welcome, Natasha! ✨
                </h2>
                <p style={{ 
                  color: '#8d6e63', 
                  margin: 0,
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  This is your special place to document every precious moment of your pregnancy journey. 
                  From first symptoms to baby's first kicks, capture it all here. 💕
                </p>
              </div>
              
              {/* Hero Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
                border: '1px solid rgba(255,182,193,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  fontSize: '200px',
                  opacity: 0.1,
                  transform: 'rotate(-15deg)'
                }}>
                  {currentWeekData.image}
                </div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      fontSize: '4rem',
                      animation: 'float 3s ease-in-out infinite'
                    }}>
                      {currentWeekData.sizeEmoji}
                    </div>
                    <div>
                      <h2 style={{ 
                        fontSize: '2.5rem', 
                        color: '#d4757d', 
                        margin: '0 0 0.5rem 0',
                        fontWeight: '600'
                      }}>
                        Week {currentWeek}
                      </h2>
                      <p style={{ 
                        fontSize: '1.5rem', 
                        color: '#8d6e63', 
                        margin: 0,
                        fontStyle: 'italic'
                      }}>
                        Baby is the size of a {currentWeekData.size}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(255,182,193,0.15) 0%, rgba(248,187,208,0.15) 100%)',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,182,193,0.2)'
                    }}>
                      <h3 style={{ color: '#d4757d', marginTop: 0, fontSize: '1.25rem', marginBottom: '1rem' }}>
                        👶 Baby's Development
                      </h3>
                      <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>
                        {currentWeekData.development}
                      </p>
                    </div>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(230,190,255,0.15) 0%, rgba(225,190,231,0.15) 100%)',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(230,190,255,0.2)'
                    }}>
                      <h3 style={{ color: '#9c27b0', marginTop: 0, fontSize: '1.25rem', marginBottom: '1rem' }}>
                        💕 Your Body
                      </h3>
                      <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>
                        {currentWeekData.momBody}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    marginTop: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(255,245,157,0.3) 0%, rgba(255,213,79,0.3) 100%)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,213,79,0.3)'
                  }}>
                    <h3 style={{ color: '#f57c00', marginTop: 0, fontSize: '1.25rem', marginBottom: '1rem' }}>
                      ✨ This Week's Tips
                    </h3>
                    <p style={{ color: '#5d4037', lineHeight: '1.6', margin: 0 }}>
                      {currentWeekData.tips}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {[
                  { title: 'Log Symptoms', icon: Activity, color: '#d4757d', action: () => openModal('symptom') },
                  { title: 'Add Photo', icon: Camera, color: '#f48fb1', action: () => openModal('photo') },
                  { title: 'New Appointment', icon: Calendar, color: '#ba68c8', action: () => openModal('appointment') },
                  { title: 'Journal Entry', icon: BookOpen, color: '#ff8a65', action: () => openModal('journal') }
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.action}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                      border: `2px solid ${action.color}40`,
                      borderRadius: '20px',
                      padding: '2rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s backwards`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = `0 8px 30px ${action.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,117,125,0.1)';
                    }}
                  >
                    <action.icon size={40} color={action.color} style={{ marginBottom: '1rem' }} />
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#5d4037' }}>
                      {action.title}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Recent Activity */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(243,229,245,0.95) 100%)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
                border: '1px solid rgba(255,182,193,0.3)'
              }}>
                <h2 style={{ color: '#d4757d', marginTop: 0, fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                  📋 Recent Activity
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {journalEntries.slice(-3).reverse().map(entry => (
                    <div key={entry.id} style={{
                      background: 'rgba(255,255,255,0.6)',
                      padding: '1rem',
                      borderRadius: '12px',
                      borderLeft: '4px solid #d4757d'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#8d6e63', marginBottom: '0.5rem' }}>
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div style={{ color: '#5d4037' }}>{entry.content}</div>
                    </div>
                  ))}
                  {journalEntries.length === 0 && (
                    <p style={{ color: '#8d6e63', fontStyle: 'italic', textAlign: 'center' }}>
                      Natasha, your journey is just beginning! Start documenting your precious moments here. 💕
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'symptoms' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4757d', fontSize: '2rem', margin: 0 }}>Symptom Tracker</h2>
                <button
                  onClick={() => openModal('symptom')}
                  style={{
                    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Plus size={20} />
                  Log Symptom
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {symptoms.map(symptom => (
                  <div key={symptom.id} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                    border: '1px solid rgba(255,182,193,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ color: '#d4757d', margin: 0, fontSize: '1.25rem' }}>{symptom.type}</h3>
                      <span style={{ 
                        background: `${symptom.severity === 'mild' ? '#c8e6c9' : symptom.severity === 'moderate' ? '#fff9c4' : '#ffccbc'}`,
                        color: `${symptom.severity === 'mild' ? '#2e7d32' : symptom.severity === 'moderate' ? '#f57f17' : '#d84315'}`,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {symptom.severity}
                      </span>
                    </div>
                    <p style={{ color: '#5d4037', margin: '0 0 0.5rem 0' }}>{symptom.notes}</p>
                    <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                      {new Date(symptom.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </div>
                  </div>
                ))}
                {symptoms.length === 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '3rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    color: '#8d6e63',
                    fontStyle: 'italic'
                  }}>
                    Natasha, track how you're feeling each day. Tap "Log Symptom" to get started!
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'photos' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4757d', fontSize: '2rem', margin: 0 }}>Photo Timeline</h2>
                <button
                  onClick={() => openModal('photo')}
                  style={{
                    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Plus size={20} />
                  Add Photo
                </button>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {photos.map(photo => (
                  <div key={photo.id} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                    padding: '1rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                    border: '1px solid rgba(255,182,193,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                      height: '200px',
                      borderRadius: '12px',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4757d',
                      fontSize: '3rem'
                    }}>
                      📸
                    </div>
                    <div style={{ color: '#5d4037', fontWeight: '600', marginBottom: '0.25rem' }}>
                      Week {photo.week}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                      {new Date(photo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    {photo.notes && (
                      <div style={{ fontSize: '0.875rem', color: '#5d4037', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        {photo.notes}
                      </div>
                    )}
                  </div>
                ))}
                {photos.length === 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    background: 'rgba(255,255,255,0.6)',
                    padding: '3rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    color: '#8d6e63',
                    fontStyle: 'italic'
                  }}>
                    Natasha, capture your beautiful bump progression! Add your first photo to begin your timeline. 📸
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4757d', fontSize: '2rem', margin: 0 }}>Appointments</h2>
                <button
                  onClick={() => openModal('appointment')}
                  style={{
                    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Plus size={20} />
                  Add Appointment
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(apt => (
                  <div key={apt.id} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                    border: '1px solid rgba(255,182,193,0.3)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ color: '#d4757d', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{apt.title}</h3>
                      <div style={{ color: '#5d4037', marginBottom: '0.25rem' }}>{apt.location}</div>
                      <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                        {new Date(apt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                      </div>
                    </div>
                    <Calendar size={32} color="#d4757d" />
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '3rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    color: '#8d6e63',
                    fontStyle: 'italic'
                  }}>
                    No appointments scheduled yet. Add your first appointment!
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'journal' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4757d', fontSize: '2rem', margin: 0 }}>Memory Journal</h2>
                <button
                  onClick={() => openModal('journal')}
                  style={{
                    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Plus size={20} />
                  New Entry
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {journalEntries.slice().reverse().map(entry => (
                  <div key={entry.id} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                    border: '1px solid rgba(255,182,193,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ color: '#d4757d', margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>{entry.title}</h3>
                        <div style={{ fontSize: '0.875rem', color: '#8d6e63' }}>
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '3rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    color: '#8d6e63',
                    fontStyle: 'italic'
                  }}>
                    Dear Natasha, this is your sacred space for thoughts, feelings, and memories. Start writing your heart out! 💝
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'checklist' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#d4757d', fontSize: '2rem', margin: 0 }}>Pregnancy Checklist</h2>
                <button
                  onClick={() => openModal('todo')}
                  style={{
                    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Plus size={20} />
                  Add Task
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {todos.map(todo => (
                  <div key={todo.id} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(212,117,125,0.1)',
                    border: '1px solid rgba(255,182,193,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    opacity: todo.completed ? 0.6 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        accentColor: '#d4757d'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        color: '#5d4037',
                        fontSize: '1.1rem',
                        textDecoration: todo.completed ? 'line-through' : 'none'
                      }}>
                        {todo.task}
                      </div>
                      {todo.category && (
                        <span style={{
                          display: 'inline-block',
                          marginTop: '0.5rem',
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(212,117,125,0.15)',
                          color: '#d4757d',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {todo.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {todos.length === 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '3rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    color: '#8d6e63',
                    fontStyle: 'italic'
                  }}>
                    No tasks yet. Add your first to-do!
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'kicks' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <h2 style={{ color: '#d4757d', fontSize: '2rem', marginBottom: '2rem' }}>Kick Counter</h2>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
                border: '1px solid rgba(255,182,193,0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👶</div>
                <p style={{ color: '#8d6e63', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Kick counting usually starts around week 28. This feature will help you track your baby's movements!
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,245,157,0.3) 0%, rgba(255,213,79,0.3) 100%)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,213,79,0.3)',
                  marginTop: '1.5rem'
                }}>
                  <p style={{ color: '#5d4037', margin: 0, lineHeight: '1.6' }}>
                    💡 Tip: Most providers recommend counting 10 movements within 2 hours. You'll be able to track this soon!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'contractions' && (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              <h2 style={{ color: '#d4757d', fontSize: '2rem', marginBottom: '2rem' }}>Contraction Timer</h2>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(212,117,125,0.15)',
                border: '1px solid rgba(255,182,193,0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏱️</div>
                <p style={{ color: '#8d6e63', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  The contraction timer will help you track timing and frequency when labor begins!
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,245,157,0.3) 0%, rgba(255,213,79,0.3) 100%)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,213,79,0.3)',
                  marginTop: '1.5rem'
                }}>
                  <p style={{ color: '#5d4037', margin: 0, lineHeight: '1.6' }}>
                    💡 Tip: When contractions are 5 minutes apart, lasting 60 seconds, for at least 1 hour, it's time to call your provider!
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in'
          }}
          onClick={closeModal}
          >
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
              borderRadius: '24px',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
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
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212,117,125,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <X size={24} color="#d4757d" />
                </button>
              </div>
              
              <ModalForm 
                type={modalType} 
                onSubmit={(data) => {
                  if (modalType === 'symptom') addSymptom(data);
                  else if (modalType === 'photo') addPhoto(data);
                  else if (modalType === 'appointment') addAppointment(data);
                  else if (modalType === 'journal') addJournalEntry(data);
                  else if (modalType === 'todo') addTodo(data);
                  closeModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

const ModalForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };
  
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '12px',
    border: '2px solid rgba(212,117,125,0.2)',
    fontSize: '1rem',
    fontFamily: 'inherit',
    marginBottom: '1rem',
    background: 'rgba(255,255,255,0.8)',
    transition: 'border-color 0.2s ease'
  };
  
  const labelStyle = {
    display: 'block',
    color: '#5d4037',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '1rem'
  };
  
  const buttonStyle = {
    background: 'linear-gradient(135deg, #d4757d 0%, #f48fb1 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    width: '100%',
    boxShadow: '0 4px 15px rgba(212,117,125,0.3)',
    transition: 'transform 0.2s ease',
    fontFamily: 'inherit'
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {type === 'symptom' && (
        <>
          <div>
            <label style={labelStyle}>Symptom Type</label>
            <input
              type="text"
              placeholder="e.g., Nausea, Fatigue, Headache"
              style={inputStyle}
              value={formData.type || ''}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Severity</label>
            <select
              style={inputStyle}
              value={formData.severity || 'mild'}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              placeholder="Any additional details..."
              style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
            />
          </div>
        </>
      )}
      
      {type === 'photo' && (
        <>
          <div>
            <label style={labelStyle}>Week Number</label>
            <input
              type="number"
              placeholder="Current week"
              style={inputStyle}
              value={formData.week || ''}
              onChange={(e) => setFormData({...formData, week: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              placeholder="Add a memory or note about this photo..."
              style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
            />
          </div>
          <div style={{
            background: 'rgba(255,245,157,0.3)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,213,79,0.3)',
            marginBottom: '1rem'
          }}>
            <p style={{ color: '#5d4037', margin: 0, fontSize: '0.875rem' }}>
              💡 Photo upload placeholder - In a full app, you'd upload your bump photo here!
            </p>
          </div>
        </>
      )}
      
      {type === 'appointment' && (
        <>
          <div>
            <label style={labelStyle}>Appointment Title</label>
            <input
              type="text"
              placeholder="e.g., First Prenatal Visit, Ultrasound"
              style={inputStyle}
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Date & Time</label>
            <input
              type="datetime-local"
              style={inputStyle}
              value={formData.date || ''}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input
              type="text"
              placeholder="Doctor's office or hospital"
              style={inputStyle}
              value={formData.location || ''}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
        </>
      )}
      
      {type === 'journal' && (
        <>
          <div>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              placeholder="Give this entry a title..."
              style={inputStyle}
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Your Thoughts</label>
            <textarea
              placeholder="Write about how you're feeling, special moments, or anything on your mind..."
              style={{...inputStyle, minHeight: '150px', resize: 'vertical'}}
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
        </>
      )}
      
      {type === 'todo' && (
        <>
          <div>
            <label style={labelStyle}>Task</label>
            <input
              type="text"
              placeholder="What do you need to do?"
              style={inputStyle}
              value={formData.task || ''}
              onChange={(e) => setFormData({...formData, task: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Category (optional)</label>
            <select
              style={inputStyle}
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#d4757d'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,117,125,0.2)'}
            >
              <option value="">Select a category...</option>
              <option value="First Trimester">First Trimester</option>
              <option value="Second Trimester">Second Trimester</option>
              <option value="Third Trimester">Third Trimester</option>
              <option value="Nursery">Nursery</option>
              <option value="Shopping">Shopping</option>
              <option value="Medical">Medical</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      )}
      
      <button 
        type="submit" 
        style={buttonStyle}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        Save
      </button>
    </form>
  );
};

export default PregnancyJourneyApp;