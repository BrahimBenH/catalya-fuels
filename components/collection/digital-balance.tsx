'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Weight, Check, RotateCcw } from 'lucide-react'

interface DigitalBalanceProps {
  value: string
  onChange: (value: string) => void
  onConfirm?: () => void
}

export default function DigitalBalance({ value, onChange, onConfirm }: DigitalBalanceProps) {
  const [displayValue, setDisplayValue] = useState<string>('0.0')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (value) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setDisplayValue(value)
        setIsAnimating(false)
      }, 300)
      return () => clearTimeout(timeout)
    } else {
      setDisplayValue('0.0')
    }
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  const handleReset = () => {
    onChange('')
    setDisplayValue('0.0')
  }

  const numValue = parseFloat(value) || 0

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Weight className="w-5 h-5 text-primary" />
          Digital Balance
        </CardTitle>
        <CardDescription>Enter the weight of plastic waste in kilograms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Digital Display */}
        <div className="bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary rounded-lg p-6 text-center space-y-2">
          <div className="text-xs font-semibold text-primary/70 uppercase tracking-widest">Weight Reading</div>
          <div className={`text-5xl font-mono font-bold text-primary transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {displayValue}
          </div>
          <div className="text-sm text-primary/60">kg</div>
          <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/40 to-primary transition-all duration-300"
              style={{ width: `${Math.min((numValue / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <Label htmlFor="weight-input" className="text-sm font-semibold">Manual Entry</Label>
          <div className="flex gap-2">
            <Input
              id="weight-input"
              type="text"
              inputMode="decimal"
              placeholder="0.0"
              value={value}
              onChange={handleInputChange}
              className="font-mono text-lg"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="hover:border-primary hover:text-primary transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex gap-4 pt-2">
          <div className="flex-1 bg-primary/5 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Current Weight</div>
            <div className="text-xl font-bold text-primary mt-1">{numValue.toFixed(2)} kg</div>
          </div>
          <div className="flex-1 bg-primary/5 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Status</div>
            <div className="text-xl font-bold text-primary mt-1">{numValue > 0 ? '✓ Ready' : '○ Empty'}</div>
          </div>
        </div>

        {/* Confirm Button */}
        {onConfirm && (
          <Button
            onClick={onConfirm}
            disabled={!value || numValue === 0}
            className="w-full"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirm Weight
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
