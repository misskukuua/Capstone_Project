// client/auth/callback/page.jsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      // Handle error case
      router.push('/login?error=auth_failed')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <h2 className="text-xl text-center text-gray-600">Processing authentication...</h2>
        </div>
      </div>
    </div>
  )
}