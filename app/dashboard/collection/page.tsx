'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import IndividualCollectionForm from '@/components/collection/individual-collection-form'
import CompanyCollectionForm from '@/components/collection/company-collection-form'
import CollectionHistory from '@/components/collection/collection-history'

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState('individuals')

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Collection Management</h1>
        <p className="text-muted-foreground">
          Track and manage plastic waste collection from individuals and companies
        </p>
      </div>

      {/* Tabs for Individuals and Companies */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="individuals">Individual Collectors</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        {/* Individuals Tab */}
        <TabsContent value="individuals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Submission
                  </CardTitle>
                  <CardDescription>Add a new individual collection entry</CardDescription>
                </CardHeader>
                <CardContent>
                  <IndividualCollectionForm />
                </CardContent>
              </Card>
            </div>

            {/* History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Collection History</CardTitle>
                  <CardDescription>Recent submissions from individual collectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <CollectionHistory type="individual" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Submission
                  </CardTitle>
                  <CardDescription>Add a new company collection entry</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyCollectionForm />
                </CardContent>
              </Card>
            </div>

            {/* History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Collection History</CardTitle>
                  <CardDescription>Recent submissions from companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <CollectionHistory type="company" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Statistics</CardTitle>
          <CardDescription>Overview of today&apos;s collection activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Weight Today</p>
              <p className="text-2xl font-bold text-foreground">0 kg</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Individual Submissions</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Company Submissions</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Weight per Submission</p>
              <p className="text-2xl font-bold text-foreground">0 kg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
