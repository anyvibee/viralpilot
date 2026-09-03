import { NextResponse } from 'next/server'
export async function GET(){return NextResponse.json({ok:true,service:'viralpilot',version:'1.1.0',timestamp:new Date().toISOString()})}
