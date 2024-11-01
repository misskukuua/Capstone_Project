// client/auth/callback/loading.jsx
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <h2 className="text-xl text-center text-gray-600">Authenticating...</h2>
        </div>
      </div>
    </div>
  )
}