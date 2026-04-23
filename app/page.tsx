import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Droplet, Recycle, Zap, TrendingUp, Users, Award, Leaf, Shield, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Catalya Fuels" width={120} height={40} className="h-10 w-auto object-contain" />
            <span className="text-xl font-bold text-primary hidden sm:inline">Catalya Fuels</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard/collection">
              <Button className="hover:shadow-lg transition-shadow">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex">
              <Image src="/logo.png" alt="Catalya Fuels" width={240} height={80} className="h-20 w-auto object-contain" />
            </div>
            <h1 className="text-6xl sm:text-7xl font-bold text-primary text-balance">
              Turning Waste Into Power
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Convert plastic waste into sustainable fuel using advanced pyrolysis technology. Join a movement transforming environmental challenges into economic opportunities for citizens, communities, and nations.
            </p>
            <div className="flex justify-center gap-4 flex-wrap pt-4">
              <Link href="/dashboard/collection">
                <Button size="lg" className="hover:shadow-xl transition-shadow">
                  Access Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="hover:border-primary hover:text-primary transition-colors">
                Explore Technology
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Pyrolysis Mechanism */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">How Pyrolysis Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our innovative process breaks down plastic waste into valuable fuel components through controlled thermal decomposition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-4">
                    1
                  </div>
                  <CardTitle>Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plastic waste is collected from citizens through community bins and from corporate partners.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-4">
                    2
                  </div>
                  <CardTitle>Sorting & Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Collected plastic is sorted and cleaned to remove contaminants before processing.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-4">
                    3
                  </div>
                  <CardTitle>Pyrolysis Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plastic is heated to 400-800°C in an oxygen-free environment, breaking molecular bonds into fuel components.
                  </p>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-4">
                    4
                  </div>
                  <CardTitle>Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Processed fuel is distributed to municipalities and partner organizations for use.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Pyrolysis Details */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">The Pyrolysis Mechanism</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">What Happens</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Plastic polymers are broken down into smaller hydrocarbon molecules</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Process occurs in an oxygen-free (anaerobic) environment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Temperature is carefully controlled between 400-800°C</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Produces three main outputs: pyrolysis oil, gas, and char</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Key Benefits</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <Recycle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Converts non-recyclable plastic into valuable fuel</span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Reduces landfill waste by up to 90%</span>
                    </li>
                    <li className="flex gap-3">
                      <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Creates economic value from waste materials</span>
                    </li>
                    <li className="flex gap-3">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Reduces carbon emissions compared to virgin fuel production</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Program */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Community Bin Program</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide dedicated collection bins to citizens, making it easy to participate in the circular economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-primary" />
                    Easy Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Free collection bins delivered to your home. Simply collect plastic waste and we handle the rest.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Earn Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get credited for every kilogram of plastic you contribute. Points can be redeemed for benefits.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of citizens creating a cleaner environment and sustainable future for all.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Benefits Research */}
      <section className="border-b border-border bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Real-World Impact & Benefits</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Research shows our pyrolysis technology creates significant benefits across economic, environmental, and social dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* For Citizens */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" />
                    For Citizens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Economic Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Earn rewards for plastic contributions</li>
                      <li>• Generate supplementary household income</li>
                      <li>• Access to community recycling programs</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Environmental Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Direct reduction in landfill waste</li>
                      <li>• Lower household carbon footprint</li>
                      <li>• Healthier local environment</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Social Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Community engagement & pride</li>
                      <li>• Environmental awareness education</li>
                      <li>• Collective action for sustainability</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* For Local Government */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Shield className="w-5 h-5" />
                    For Local Government
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Operational Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 30-40% reduction in landfill costs</li>
                      <li>• Sustainable fuel supply</li>
                      <li>• Waste management efficiency</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Environmental Impact</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 50-90% waste diversion rate</li>
                      <li>• Reduced methane emissions from landfills</li>
                      <li>• Compliance with environmental regulations</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Strategic Benefits</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Achievement of sustainability goals</li>
                      <li>• Community reputation enhancement</li>
                      <li>• Economic resilience through local fuel</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* For National Economy */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <BarChart3 className="w-5 h-5" />
                    For National Economy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Economic Growth</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Job creation in waste processing</li>
                      <li>• Reduced fuel import dependency</li>
                      <li>• New industry development</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Energy Security</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Renewable fuel source development</li>
                      <li>• Energy independence increase</li>
                      <li>• Cost reduction in fuel imports</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Climate & Health</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Significant CO2 reduction targets</li>
                      <li>• Improved air quality</li>
                      <li>• Public health cost savings</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Statistics */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Research-Backed Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">90%</p>
                  <p className="text-sm text-muted-foreground mt-2">Landfill waste reduction potential</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">30-40%</p>
                  <p className="text-sm text-muted-foreground mt-2">Cost savings on waste management</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">70%</p>
                  <p className="text-sm text-muted-foreground mt-2">Lower carbon emissions vs virgin fuel</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">5-8x</p>
                  <p className="text-sm text-muted-foreground mt-2">Return on investment (5 years)</p>
                </div>
              </div>
            </div>

            {/* Machine Technology Details */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Advanced Pyrolysis Technology</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">How It Works</h4>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary min-w-6">1.</span>
                      <span><strong>Feedstock Preparation:</strong> Sorted plastic waste is shredded and dried to remove contaminants</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary min-w-6">2.</span>
                      <span><strong>Thermal Decomposition:</strong> Heated to 400-800°C in oxygen-free reactor vessel</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary min-w-6">3.</span>
                      <span><strong>Molecular Breakdown:</strong> Long polymer chains break into smaller hydrocarbons</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary min-w-6">4.</span>
                      <span><strong>Condensation & Separation:</strong> Vapors condense into pyrolysis oil; gases captured separately</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary min-w-6">5.</span>
                      <span><strong>Quality Control:</strong> Output refined and tested for fuel specifications</span>
                    </li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">Outputs & Applications</h4>
                  <div className="space-y-3">
                    <div className="bg-primary/5 border border-primary/20 rounded p-4">
                      <p className="font-semibold text-foreground">Pyrolysis Oil (70%)</p>
                      <p className="text-sm text-muted-foreground mt-1">High-energy fuel for industrial heating, power generation, and vehicle fuel blending</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded p-4">
                      <p className="font-semibold text-foreground">Pyrolysis Gas (20%)</p>
                      <p className="text-sm text-muted-foreground mt-1">Combustible gas for furnace heating, reducing energy input requirements</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded p-4">
                      <p className="font-semibold text-foreground">Pyrolysis Char (10%)</p>
                      <p className="text-sm text-muted-foreground mt-1">Activated carbon for water filtration, soil amendments, and industrial uses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                At Catalya Fuels, we believe in creating a sustainable future through innovation and community collaboration. Our mission is to:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Eliminate Plastic Waste</h4>
                    <p className="text-sm text-muted-foreground">Convert non-recyclable plastic into valuable resources</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Empower Communities</h4>
                    <p className="text-sm text-muted-foreground">Reward citizens and organizations for responsible waste management</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Support Municipalities</h4>
                    <p className="text-sm text-muted-foreground">Partner with local governments to create sustainable fuel sources</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Drive Environmental Change</h4>
                    <p className="text-sm text-muted-foreground">Reduce landfill waste and carbon emissions globally</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Our Vision</p>
                <p className="text-2xl font-bold text-foreground">
                  A world where plastic waste is no longer an environmental burden, but a valuable resource for sustainable energy.
                </p>
              </div>
              <div className="pt-6 border-t border-border space-y-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Tons of plastic processed annually</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">50,000+</p>
                  <p className="text-sm text-muted-foreground">Community members engaged</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">Municipal partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Make an Impact?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join us in transforming plastic waste into sustainable fuel. Access our dashboard to start tracking your contribution.
          </p>
          <Link href="/dashboard/collection">
            <Button size="lg" variant="secondary">
              Access Dashboard Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Image src="/logo.png" alt="Catalya Fuels" width={120} height={40} className="h-10 w-auto object-contain" />
              <p className="text-sm text-muted-foreground">Turning Waste Into Power</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><Link href="#" className="hover:text-primary transition-colors">Technology</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Impact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Catalya Fuels. Turning waste into power for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
