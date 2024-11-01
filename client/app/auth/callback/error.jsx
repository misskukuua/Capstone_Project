// client/auth/callback/error.jsx
'use client'
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
 
export default function Error({
  error,
  reset,
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl text-center text-gray-800 font-semibold">Authentication Failed</h2>
          <p className="text-gray-600 text-center">Something went wrong during authentication.</p>
          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/login')}
              variant="outline"
            >
              Return to Login
            </Button>
            <Button
              onClick={() => reset()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}