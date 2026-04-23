'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Camera, Trash2, Check, Upload, Weight } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'

export default function IndividualCollectionForm() {
  const [fullName, setFullName] = useState('')
  const [weight, setWeight] = useState('')
  const [facePhotoUrl, setFacePhotoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      }).then(mediaStream => {
        stream = mediaStream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      }).catch(err => {
        setError('Unable to access camera')
      })
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      setCameraActive(false)
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setCameraActive(false)
    }
  }, [showCamera])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        setFacePhotoUrl(imageData)
        setShowCamera(false)
        handleStopCamera()
      }
    }
  }

  const stopMediaTracks = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
    setCameraActive(false)
  }

  const handleStopCamera = () => {
    stopMediaTracks()
    setShowCamera(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFacePhotoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!fullName.trim()) {
      setError('Please enter your name')
      return
    }

    if (!weight.trim() || isNaN(parseFloat(weight))) {
      setError('Please enter a valid weight in kg')
      return
    }

    if (!facePhotoUrl) {
      setError('Please capture or upload a photo')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // TODO: Replace with actual API call to save to database
      console.log('[v0] Individual submission:', {
        fullName,
        weight: parseFloat(weight),
        timestamp: new Date().toISOString(),
        facePhotoUrl: '(stored in database)',
      })

      setSuccess(true)
      setFullName('')
      setWeight('')
      setFacePhotoUrl(null)
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Face Recognition Section */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Face Verification</Label>
        
        {facePhotoUrl ? (
          <Card className="p-4 space-y-3">
            <div className="relative w-full">
              <img
                src={facePhotoUrl}
                alt="Captured face"
                className="w-full h-auto rounded-lg border border-border"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
                <Check className="w-4 h-4" />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setFacePhotoUrl(null)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Photo
            </Button>
          </Card>
        ) : null}

        {!facePhotoUrl && (
          <div className="space-y-2">
            {!showCamera ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="bg-black rounded-lg overflow-hidden flex justify-center items-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </div>
                <canvas
                  ref={canvasRef}
                  className="hidden"
                  width={320}
                  height={240}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={capturePhoto}
                    disabled={!cameraActive}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleStopCamera}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        )}
      </div>

      {/* Weight Input with Balance Visualization */}
      <div className="space-y-3">
        <Label htmlFor="weight" className="text-sm font-medium">
          Weight (kg)
        </Label>
        <div className="space-y-2">
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight in kilograms"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
            min="0"
            disabled={loading}
          />
          
          {/* Electronic Balance Visualization */}
          <div className="bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary rounded-lg p-4 space-y-3">
            <p className="text-xs text-primary font-semibold text-center uppercase tracking-widest">
              Digital Scale Display
            </p>
            <div className="bg-gradient-to-b from-primary to-primary/80 rounded text-white font-mono text-center py-6 text-3xl border-2 border-primary shadow-lg">
              {weight && !isNaN(parseFloat(weight)) ? `${parseFloat(weight).toFixed(1)} kg` : '0.0 kg'}
            </div>
            <div className="text-xs text-primary/60 text-center font-medium">
              Calibrated Electronic Balance
            </div>
          </div>
        </div>
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
          <AlertDescription>Submission recorded successfully!</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Collection'}
      </Button>
    </form>
  )
}
