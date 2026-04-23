'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Truck, Building2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Mock data for distributions
const mockDistributions = [
  {
    id: '001',
    partner: 'Municipality of Central District',
    type: 'Municipality',
    fuelQuantity: 500,
    date: '2024-01-15',
    status: 'delivered',
  },
  {
    id: '002',
    partner: 'Green Energy Solutions Ltd',
    type: 'Company',
    fuelQuantity: 300,
    date: '2024-01-14',
    status: 'delivered',
  },
  {
    id: '003',
    partner: 'City Transportation Authority',
    type: 'Municipality',
    fuelQuantity: 450,
    date: '2024-01-13',
    status: 'in-transit',
  },
]

const mockPartners = [
  {
    id: 'p001',
    name: 'Municipality of Central District',
    type: 'Municipality',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed@central-municipality.gov',
    phone: '+212 5XX XXX XXX',
    location: 'Downtown',
    totalReceived: 1500,
    status: 'active',
  },
  {
    id: 'p002',
    name: 'Green Energy Solutions Ltd',
    type: 'Company',
    contactPerson: 'Maria Garcia',
    email: 'maria@greenenergy.com',
    phone: '+212 5XX XXX XXX',
    location: 'Industrial Zone',
    totalReceived: 800,
    status: 'active',
  },
  {
    id: 'p003',
    name: 'City Transportation Authority',
    type: 'Municipality',
    contactPerson: 'Karim Bennani',
    email: 'karim@transport.gov',
    phone: '+212 5XX XXX XXX',
    location: 'Main Terminal',
    totalReceived: 600,
    status: 'active',
  },
]

export default function TrackingPage() {
  const [distributions] = useState(mockDistributions)
  const [partners] = useState(mockPartners)
  const [newPartnerName, setNewPartnerName] = useState('')
  const [newPartnerType, setNewPartnerType] = useState('')
  const [showNewPartnerDialog, setShowNewPartnerDialog] = useState(false)

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add to database
    console.log('[v0] New partner:', { newPartnerName, newPartnerType })
    setNewPartnerName('')
    setNewPartnerType('')
    setShowNewPartnerDialog(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>
      case 'in-transit':
        return <Badge className="bg-blue-500">In Transit</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Fuel Distribution Tracking</h1>
        <p className="text-muted-foreground">
          Manage fuel deliveries and track partnerships with municipalities and organizations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">2,250 L</p>
            <p className="text-xs text-muted-foreground mt-1">Across all partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{partners.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Municipalities & companies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {distributions.filter(d => d.status === 'in-transit').length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">In transit to partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">750 L</p>
            <p className="text-xs text-muted-foreground mt-1">Distributed this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="distributions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        {/* Distributions Tab */}
        <TabsContent value="distributions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Delivery History</CardTitle>
                <CardDescription>Track all fuel distributions and shipments</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Distribution
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record New Distribution</DialogTitle>
                    <DialogDescription>
                      Add a new fuel distribution record
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner">Select Partner</Label>
                      <Select>
                        <SelectTrigger id="partner">
                          <SelectValue placeholder="Choose a partner" />
                        </SelectTrigger>
                        <SelectContent>
                          {partners.map(p => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Fuel Quantity (Liters)</Label>
                      <Input id="quantity" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Add any additional information" />
                    </div>
                    <Button className="w-full">Record Distribution</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delivery ID</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead className="text-right">Quantity (L)</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {distributions.map(dist => (
                      <TableRow key={dist.id}>
                        <TableCell className="font-mono text-sm">{dist.id}</TableCell>
                        <TableCell>{dist.partner}</TableCell>
                        <TableCell className="text-right">{dist.fuelQuantity}</TableCell>
                        <TableCell>{new Date(dist.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(dist.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Partnership Database</CardTitle>
                <CardDescription>Manage relationships with municipalities and organizations</CardDescription>
              </div>
              <Dialog open={showNewPartnerDialog} onOpenChange={setShowNewPartnerDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Partner
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Partnership</DialogTitle>
                    <DialogDescription>
                      Register a new municipality or organization as a fuel distribution partner
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddPartner} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="partnerName">Organization Name</Label>
                      <Input
                        id="partnerName"
                        placeholder="Full name of the organization"
                        value={newPartnerName}
                        onChange={(e) => setNewPartnerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnerType">Type</Label>
                      <Select value={newPartnerType} onValueChange={setNewPartnerType}>
                        <SelectTrigger id="partnerType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="municipality">Municipality</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person</Label>
                      <Input id="contactName" placeholder="Name of main contact" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="contact@organization.com" />
                    </div>
                    <Button className="w-full">Create Partnership</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {partners.map(partner => (
                  <Card key={partner.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {partner.type === 'Municipality' ? (
                              <Building2 className="w-4 h-4 text-primary" />
                            ) : (
                              <Truck className="w-4 h-4 text-primary" />
                            )}
                            <CardTitle className="text-base">{partner.name}</CardTitle>
                          </div>
                          <Badge variant="secondary" className="w-fit">{partner.type}</Badge>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Contact Person</p>
                        <p className="font-medium text-foreground">{partner.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground break-all">{partner.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Fuel Received</p>
                        <p className="font-bold text-lg text-foreground">{partner.totalReceived} L</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Information Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All partnership agreements and fuel distributions are tracked here. Ensure accuracy of delivery records for compliance reporting.
        </AlertDescription>
      </Alert>
    </div>
  )
}
