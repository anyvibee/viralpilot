import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata={title:'ViralPilot — Instagram Growth OS',description:'AI-powered organic Instagram growth analytics for creators and brands.',}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
