import { NextResponse } from 'next/server'
import { analyze } from '@/lib/analyzer'
export async function POST(req: Request){try{const body=await req.json();const input=String(body?.input||'');if(!input.trim()) return NextResponse.json({error:'Username or URL is required'},{status:400});return NextResponse.json(analyze(input))}catch{return NextResponse.json({error:'Invalid request'},{status:400})}}
