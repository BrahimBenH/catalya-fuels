# Catalya Fuels - Plastic Waste to Fuel Conversion Platform

A comprehensive dashboard system for managing plastic waste collection, pyrolysis processing, and fuel distribution using advanced technology.

## Project Overview

Catalya Fuels is a React/Next.js-based platform that enables organizations to:
- Collect plastic waste from individuals and companies
- Monitor pyrolysis machine status and production metrics
- Track fuel distribution to partner municipalities and organizations

## Features

### Home Page
- Educational content about the pyrolysis mechanism
- Explanation of the community bin program
- Mission and vision statement
- Call-to-action buttons to access the dashboard

### Collection Dashboard
Manage plastic waste collection from two types of contributors:

#### Individual Collectors (Chiffoniers)
- Face verification using camera capture or photo upload
- Weight input with electronic balance visualization
- Automatic timestamp recording
- History tracking of all submissions

#### Company Collections
- Company information and type selection
- Contact person tracking
- Weight input with digital scale display
- Notes and additional information fields
- History of all company submissions

### Monitoring Dashboard
Real-time machine status and production analytics:

- **Machine Status Cards**
  - Operating status (running/offline)
  - Current temperature with visual progress
  - Pressure monitoring
  - System efficiency percentage

- **Production Metrics**
  - Daily plastic processed
  - Fuel produced today
  - Estimated economic value

- **Production Charts**
  - Daily production (last 7 days)
  - Monthly statistics
  - Output distribution (pyrolysis oil, gas, char)

- **Machine Controls**
  - Gallery for machine photos
  - Start/stop controls
  - Real-time status updates

### Tracking Dashboard
Fuel distribution and partnership management:

- **Distribution Tracking**
  - Record new fuel distributions
  - Track delivery status (delivered, in-transit, pending)
  - Historical records of all deliveries

- **Partnership Management**
  - Database of municipalities and partner organizations
  - Contact information and details
  - Total fuel received tracking
  - Partnership status monitoring
  - Add new partners

- **Key Metrics**
  - Total fuel distributed
  - Number of active partnerships
  - Pending deliveries
  - Monthly distribution volumes

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Styling**: Tailwind CSS with semantic tokens

### Backend
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Vercel Blob (for images)
- **Authentication**: Supabase Auth (integrated but not yet configured)

## Project Structure

```
app/
├── layout.tsx                 # Root layout with metadata
├── globals.css               # Global styles and design tokens
├── page.tsx                  # Home page
└── dashboard/
    ├── layout.tsx            # Dashboard layout with sidebar
    ├── collection/
    │   └── page.tsx          # Collection dashboard
    ├── monitoring/
    │   └── page.tsx          # Monitoring dashboard
    └── tracking/
        └── page.tsx          # Tracking dashboard

components/
├── ui/                       # shadcn/ui components
└── collection/
    ├── individual-collection-form.tsx
    ├── company-collection-form.tsx
    └── collection-history.tsx
```

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   POSTGRES_URL=your-database-url
   ```

### Running the Application

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### Individual Collection Form
- Camera access for face verification
- Photo upload fallback
- Weight input with digital scale visualization
- Form validation and error handling
- Success feedback

### Company Collection Form
- Dropdown selection for company types
- Contact person tracking
- Digital scale visualization
- Multi-field form with textarea for notes
- Error handling and validation

### Collection History
- Table view of recent submissions
- Badge status indicators
- Responsive design
- Empty state when no data

### Monitoring Charts
- Bar charts for daily production
- Line charts for monthly trends
- Pie chart for output distribution
- Interactive tooltips and legends

### Partner Cards
- Visual organization type indicators
- Contact information display
- Total fuel received tracking
- Status badges

## Data Models

### Individual Collection
```
{
  id: string,
  name: string,
  weight: number (kg),
  facePhotoUrl: string,
  timestamp: Date,
  status: 'verified' | 'pending'
}
```

### Company Collection
```
{
  id: string,
  companyName: string,
  companyType: string,
  contactPerson: string,
  weight: number (kg),
  notes: string,
  timestamp: Date,
  status: 'verified' | 'pending'
}
```

### Fuel Distribution
```
{
  id: string,
  partnerId: string,
  fuelQuantity: number (liters),
  date: Date,
  status: 'pending' | 'in-transit' | 'delivered'
}
```

### Partnership
```
{
  id: string,
  name: string,
  type: 'Municipality' | 'Company' | 'NGO',
  contactPerson: string,
  email: string,
  phone: string,
  location: string,
  totalReceived: number (liters),
  status: 'active' | 'inactive'
}
```

## Future Enhancements

- [ ] Supabase database integration and API routes
- [ ] User authentication and role-based access
- [ ] Real face recognition API integration
- [ ] Image upload to Vercel Blob
- [ ] Real-time data updates with WebSockets
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] Integration with IoT sensors for machine data
- [ ] Multi-language support
- [ ] Payment integration for rewards redemption

## Design System

### Color Scheme
- **Primary**: Teal/Cyan (oklch(0.45 0.2 170)) - Represents sustainability and innovation
- **Background**: White/Light Gray
- **Foreground**: Dark Gray/Black
- **Accent**: Primary Teal
- **Destructive**: Red (for alerts and warnings)

### Typography
- **Font Family**: Geist (sans-serif) for body and headings
- **Geist Mono** for code and numeric displays

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive prefixes
- Flexible grid layouts
- Touch-friendly interface elements

## Deployment

The application is optimized for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with automatic CI/CD

## License

This project is created for Catalya Fuels.

## Support

For questions or issues, please reach out to the development team.
