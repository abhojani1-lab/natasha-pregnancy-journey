'use client'

import { useState, FormEvent } from 'react'
import type { ModalType } from '@/types'

interface ModalFormProps {
  type: ModalType
  onSubmit: (data: Record<string, unknown>) => void
}

export default function ModalForm({ type, onSubmit }: ModalFormProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({})
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '12px',
    border: '2px solid rgba(212,117,125,0.2)',
    fontSize: '1rem',
    fontFamily: 'inherit',
    marginBottom: '1rem',
    background: 'rgba(255,255,255,0.8)',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#5d4037',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  }

  const buttonStyle: React.CSSProperties = {
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
    fontFamily: 'inherit',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#d4757d'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(212,117,125,0.2)'
  }

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
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Severity</label>
            <select
              style={inputStyle}
              value={formData.severity || 'mild'}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={(e) => setFormData({ ...formData, week: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              placeholder="Add a memory or note about this photo..."
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div
            style={{
              background: 'rgba(255,245,157,0.3)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,213,79,0.3)',
              marginBottom: '1rem',
            }}
          >
            <p style={{ color: '#5d4037', margin: 0, fontSize: '0.875rem' }}>
              Photo upload placeholder - In a full app, you&apos;d upload your bump photo here!
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Date & Time</label>
            <input
              type="datetime-local"
              style={inputStyle}
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Your Thoughts</label>
            <textarea
              placeholder="Write about how you're feeling, special moments, or anything on your mind..."
              style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Category (optional)</label>
            <select
              style={inputStyle}
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        Save
      </button>
    </form>
  )
}
