'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle authentication error from search params
  useEffect(() => {
    const authError = searchParams.get('error')
    if (authError === 'auth_failed') {
      setError('Authentication failed. Please try again.')
    }
  }, [searchParams])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }
  
      // If login is successful, store the token, username, and email
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username); // Save username
      localStorage.setItem('userEmail', data.user.email);   // Save email
  
      // Redirect to a dashboard or home page
      router.push('/dashboard');
  
    } catch (err) {
      setError(err.message);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5001/api/auth/google'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <img src="/icons/logo.png" alt="Logo" className="h-20" />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-6">Login to proceed</h2>

        {/* Display error if exists */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            type="email" 
            name="email" 
            placeholder="E-mail" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <Input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onCheckedChange={setShowPassword}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">Show password</label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#D917EB] hover:bg-purple-600 text-white py-2 rounded-md"
          >
            Login
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <a href="/signup" className="text-purple-500 hover:underline">Sign Up</a>
        </p>

        <div className="mt-6 text-center text-gray-500">
          <span className="bg-white px-2">or</span>
          <hr className="my-2" />
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          <span>Login with Gmail</span>
        </Button>
      </div>
    </div>
  )
}
