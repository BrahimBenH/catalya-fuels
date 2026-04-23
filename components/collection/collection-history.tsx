'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Empty } from '@/components/ui/empty'
import { format } from 'date-fns'

interface CollectionEntry {
  id: string
  name: string
  weight: number
  type: string
  timestamp: Date
  status: 'verified' | 'pending'
}

interface CollectionHistoryProps {
  type: 'individual' | 'company'
}

export default function CollectionHistory({ type }: CollectionHistoryProps) {
  const [entries, setEntries] = useState<CollectionEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = () => {
    try {
      const storedData = localStorage.getItem('collection_submissions')
      if (storedData) {
        const parsed = JSON.parse(storedData)
        // Filter by entryType inside the parsed object
        const filtered = parsed
          .filter((item: any) => 
            type === 'individual' ? item.type === 'individual' : item.entryType === 'company'
          )
          .map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }))
          // Sort newest first
          .sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime())
        
        setEntries(filtered)
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()

    // Listen for the custom event to refetch when new submission occurs
    window.addEventListener('collection_submission_updated', fetchEntries)

    return () => {
      window.removeEventListener('collection_submission_updated', fetchEntries)
    }
  }, [type])

  if (loading) {
    return <div className="text-center py-6 text-muted-foreground">Loading...</div>
  }

  if (entries.length === 0) {
    return (
      <Empty
        heading="No submissions yet"
        description={
          type === 'individual'
            ? "Start contributing by submitting your plastic waste"
            : "No company submissions recorded yet"
        }
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {type === 'company' && <TableHead>Type</TableHead>}
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.name}</TableCell>
              {type === 'company' && <TableCell>{entry.type}</TableCell>}
              <TableCell className="text-right">{entry.weight.toFixed(1)}</TableCell>
              <TableCell>{format(entry.timestamp, 'MMM dd, yyyy HH:mm')}</TableCell>
              <TableCell>
                <Badge variant={entry.status === 'verified' ? 'default' : 'secondary'}>
                  {entry.status === 'verified' ? 'Verified' : 'Pending'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
