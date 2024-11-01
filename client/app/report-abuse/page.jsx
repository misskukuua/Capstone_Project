'use client';

import { useState } from 'react';
import { ChevronLeft, Menu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Sidebar from '@/components/Sidebar';

export default function ReportAbuseComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    typeOfAbuse: '',
    address: '',
    contact: '',
    age: ''
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5001/api/abuse-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          typeOfAbuse: formData.typeOfAbuse,
          address: formData.address,
          contact: formData.contact,
          age: parseInt(formData.age)
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setFeedback({
          type: 'success',
          message: 'Report submitted successfully. We will contact you soon.'
        });
        setFormData({
          fullName: '',
          email: '',
          typeOfAbuse: '',
          address: '',
          contact: '',
          age: ''
        });
      } else {
        throw new Error(data.message || 'Error submitting report');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback({
        type: 'error',
        message: 'Error submitting report. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Reusable Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className='mt-40' />

        {/* Report Abuse Form */}
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-5xl font-bold text-red-500 mb-4 sm:mb-0">Report Abuse</h2>
            <Button className="bg-red-500 py-10 hover:bg-red-600 text-white">
              Emergency Contact <br/> +250786436776
            </Button>
          </div>

          {/* Feedback Alert */}
          {feedback.message && (
            <Alert className={`mb-6 ${feedback.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle className={feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {feedback.type === 'success' ? 'Success' : 'Error'}
              </AlertTitle>
              <AlertDescription className={feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {feedback.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="focus:ring-purple-500"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="focus:ring-purple-500"
            />
            <Input
              name="typeOfAbuse"
              type="text"
              placeholder="Type Of Abuse"
              required
              value={formData.typeOfAbuse}
              onChange={handleChange}
              className="focus:ring-purple-500"
            />
            <Textarea
              name="address"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
              className="focus:ring-purple-500"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                name="contact"
                type="tel"
                placeholder="Contact"
                className="flex-1 focus:ring-purple-500"
                required
                value={formData.contact}
                onChange={handleChange}
              />
              <Input
                name="age"
                type="number"
                placeholder="Age"
                className="w-full sm:w-32 focus:ring-purple-500"
                required
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-[85px] bg-[#D917EB] hover:bg-purple-600 text-white py-2 text-lg"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}