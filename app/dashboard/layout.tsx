import Link from 'next/link'
import Image from 'next/image'
import { Droplet, BarChart3, Truck, Home, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Catalya Fuels" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-primary hidden sm:inline">Catalya Fuels</span>
            <span className="text-xs font-semibold text-primary/70 sm:hidden">Dashboard</span>
          </Link>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
          <div className="p-6 space-y-8">
            <div>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Navigation</h2>
              <nav className="space-y-2">
                <Link href="/dashboard/collection">
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                    <span>
                      <Droplet className="w-4 h-4" />
                      Collection
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard/monitoring">
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                    <span>
                      <BarChart3 className="w-4 h-4" />
                      Monitoring
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard/tracking">
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                    <span>
                      <Truck className="w-4 h-4" />
                      Tracking
                    </span>
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
