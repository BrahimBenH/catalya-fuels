'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AlertCircle, CheckCircle, Upload, Power } from 'lucide-react'

// Mock data for charts
const dailyProductionData = [
  { date: 'Jan 1', fuel: 450, gas: 120, char: 80 },
  { date: 'Jan 2', fuel: 520, gas: 110, char: 90 },
  { date: 'Jan 3', fuel: 480, gas: 130, char: 85 },
  { date: 'Jan 4', fuel: 590, gas: 140, char: 95 },
  { date: 'Jan 5', fuel: 620, gas: 125, char: 100 },
  { date: 'Jan 6', fuel: 550, gas: 135, char: 88 },
  { date: 'Jan 7', fuel: 680, gas: 145, char: 105 },
]

const monthlyStats = [
  { month: 'January', fuel: 3870, gas: 870, char: 643 },
  { month: 'February', fuel: 3060, gas: 1398, char: 221 },
  { month: 'March', fuel: 2000, gas: 9800, char: 229 },
  { month: 'April', fuel: 2780, gas: 3908, char: 200 },
  { month: 'May', fuel: 1890, gas: 4800, char: 221 },
]

const outputDistribution = [
  { name: 'Pyrolysis Oil', value: 65, color: '#1e40af' },
  { name: 'Gas', value: 20, color: '#0ea5e9' },
  { name: 'Char', value: 15, color: '#0d9488' },
]

export default function MonitoringPage() {
  const [machineStatus] = useState({
    isRunning: true,
    temperature: 650,
    maxTemp: 800,
    pressure: 2.5,
    plasticProcessed: 2450,
    fuelProduced: 1250,
    efficiency: 94,
  })

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Machine Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time status and production statistics
        </p>
      </div>

      {/* Machine Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Operating Status */}
        <Card className="border-primary/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-background">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Operating Status</span>
              {machineStatus.isRunning ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {machineStatus.isRunning ? 'Running' : 'Offline'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {machineStatus.isRunning ? '✓ Machine is operational' : '⚠ Machine is offline'}
            </p>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {machineStatus.temperature}°C
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: `${(machineStatus.temperature / machineStatus.maxTemp) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {machineStatus.maxTemp}°C max
            </p>
          </CardContent>
        </Card>

        {/* Pressure */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {machineStatus.pressure} bar
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Optimal range: 2.0-3.0 bar
            </p>
          </CardContent>
        </Card>

        {/* Efficiency */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {machineStatus.efficiency}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Above target range
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Plastic Processed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {machineStatus.plasticProcessed} kg
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Fuel Produced Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {machineStatus.fuelProduced} liters
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Estimated value: $375
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Production</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Stats</TabsTrigger>
          <TabsTrigger value="distribution">Output Distribution</TabsTrigger>
        </TabsList>

        {/* Daily Production Chart */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Production (Last 7 Days)</CardTitle>
              <CardDescription>Fuel, gas, and char production over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyProductionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fuel" stackId="a" fill="#8b5cf6" name="Fuel (L)" />
                  <Bar dataKey="gas" stackId="a" fill="#06b6d4" name="Gas (m³)" />
                  <Bar dataKey="char" stackId="a" fill="#f59e0b" name="Char (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Stats Chart */}
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Production Summary</CardTitle>
              <CardDescription>Production trends over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="fuel" stroke="#8b5cf6" name="Fuel (L)" />
                  <Line type="monotone" dataKey="gas" stroke="#06b6d4" name="Gas (m³)" />
                  <Line type="monotone" dataKey="char" stroke="#f59e0b" name="Char (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Output Distribution */}
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Output Distribution</CardTitle>
              <CardDescription>Proportion of different outputs from pyrolysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={outputDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {outputDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 min-w-64">
                  {outputDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Machine Images and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Gallery & Controls</CardTitle>
          <CardDescription>Photos and operational controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-muted rounded-lg aspect-video flex items-center justify-center border border-border"
              >
                <div className="text-center space-y-2">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Machine Photo {i}</p>
                  <p className="text-xs text-muted-foreground">Upload image</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="font-semibold text-foreground">Machine Controls</h3>
            <div className="flex gap-3">
              <Button className="flex-1" disabled={!machineStatus.isRunning}>
                <Power className="w-4 h-4 mr-2" />
                Stop Machine
              </Button>
              <Button variant="outline" className="flex-1" disabled={machineStatus.isRunning}>
                <Power className="w-4 h-4 mr-2" />
                Start Machine
              </Button>
            </div>
            {machineStatus.isRunning && (
              <p className="text-xs text-green-600 bg-green-50 rounded p-2">
                Machine is currently running. All systems operational.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
