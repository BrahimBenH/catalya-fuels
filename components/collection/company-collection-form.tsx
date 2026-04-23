'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Check } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const COMPANY_TYPES = [
  'Manufacturing',
  'Retail',
  'Municipality',
  'Waste Management',
  'Logistics',
  'Food & Beverage',
  'Other',
]

export default function CompanyCollectionForm() {
  const [companyName, setCompanyName] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [weight, setWeight] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!companyName.trim()) {
      setError('Please enter company name')
      return
    }

    if (!companyType) {
      setError('Please select company type')
      return
    }

    if (!weight.trim() || isNaN(parseFloat(weight))) {
      setError('Please enter a valid weight in kg')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // TODO: Replace with actual API call to save to database
      console.log('[v0] Company submission:', {
        companyName,
        companyType,
        weight: parseFloat(weight),
        contactPerson,
        notes,
        timestamp: new Date().toISOString(),
      })

      setSuccess(true)
      setCompanyName('')
      setCompanyType('')
      setWeight('')
      setContactPerson('')
      setNotes('')

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium">
          Company Name
        </Label>
        <Input
          id="companyName"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Company Type */}
      <div className="space-y-2">
        <Label htmlFor="companyType" className="text-sm font-medium">
          Company Type
        </Label>
        <Select value={companyType} onValueChange={setCompanyType} disabled={loading}>
          <SelectTrigger id="companyType">
            <SelectValue placeholder="Select company type" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_TYPES.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contact Person */}
      <div className="space-y-2">
        <Label htmlFor="contactPerson" className="text-sm font-medium">
          Contact Person
        </Label>
        <Input
          id="contactPerson"
          placeholder="Name of contact person (optional)"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Weight */}
      <div className="space-y-3">
        <Label htmlFor="weight" className="text-sm font-medium">
          Weight (kg)
        </Label>
        <div className="space-y-2">
          <Input
            id="weight"
            type="number"
            placeholder="Enter total weight in kilograms"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
            min="0"
            disabled={loading}
          />

          {/* Electronic Balance Visualization */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <p className="text-xs text-muted-foreground text-center uppercase tracking-widest">
              Digital Scale Display
            </p>
            <div className="bg-black rounded text-green-400 font-mono text-center py-6 text-3xl border border-green-400">
              {weight && !isNaN(parseFloat(weight)) ? `${parseFloat(weight).toFixed(1)} kg` : '0.0 kg'}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Calibrated Electronic Balance
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Add any additional information about this delivery"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-800">
          <Check className="h-4 w-4" />
          <AlertDescription>Company submission recorded successfully!</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Collection'}
      </Button>
    </form>
  )
}
