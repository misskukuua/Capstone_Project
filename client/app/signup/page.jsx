'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    console.log('Submitting form with data:', formData);
  
    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          age: parseInt(formData.age),
        }),
      });
  
      const data = await response.json();
  
      console.log('Server response:', data);
  
      if (!response.ok) {
        console.error('Response error:', data);
        throw new Error(data.message || 'Something went wrong');
      }
  
      // If signup was successful, store the token and redirect
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
  
    } catch (err) {
      console.error('Error occurred during submission:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <img src="/icons/logo.png" alt="Logo" className="h-24" />
        </div>
        <h2 className="text-xl text-center text-gray-600 mb-6">Create account to proceed</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            type="text" 
            name="username"
            placeholder="UserName" 
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <Input 
            type={showPassword ? "text" : "password"} 
            name="confirmPassword"
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Input 
            type="number" 
            name="age"
            placeholder="Age" 
            value={formData.age}
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
            Sign Up
          </Button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a>
        </p>
        
        <div className="mt-6 text-center text-gray-500">
          <span className="bg-white px-2">or</span>
          <hr className="my-2" />
        </div>
        
        <Button
          variant="outline"
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
          <span>Sign Up with Gmail</span>
        </Button>
      </div>
    </div>
  );
}