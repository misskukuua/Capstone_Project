import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { X, Menu } from 'lucide-react';
import { getProfile } from '@/utils/api';
import api from '@/utils/api';

export default function SidebarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null); // State to hold profile data
  const router = useRouter(); // Get the current route

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { src: '/icons/home.svg', label: 'Dashboard', href: '/dashboard' },
    { src: '/icons/message.svg', label: 'Community Space', href: '/community' },
    { src: '/icons/counselor.svg', label: 'Connect With Counselor', href: '/counselors' },
    { src: '/icons/resources.svg', label: 'Resources', href: '/resources', },
    { src: '/icons/report-abuse.png', label: 'Report Abuse', href: '/report-abuse' },
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const profileData = await getProfile(username);
          setProfile(profileData); // Set both 'username' and 'userEmail'
        } else {
          console.warn('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, []);
  

  // Logout functionality
  const handleLogout = async () => {
    try {
      // Clear all relevant data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Clear the username
      localStorage.removeItem('userEmail'); // Clear the user email
  
      // Redirect to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <>
      {/* Hamburger icon for small screens */}
      <header className="bg-white shadow-sm p-4 lg:hidden">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4" aria-label="Toggle sidebar">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Sidebar and Overlay for small screens */}
      <aside
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-80 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-auto flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-4">
          <img src="/icons/logo.png" className="text-2xl" alt="Logo" />
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <nav className="mt-6 flex-grow">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 ${
                router.pathname === item.href
                  ? 'bg-[#EADFF7] text-[#D917EB]' // Light pink-purple color for active page
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <Image src={item.src} alt={item.label} width={24} height={24} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/profile"
          className={`flex items-center px-6 py-3 ${
            router.pathname === '/profile'
              ? 'bg-[#EADFF7] text-[#D917EB]' // Light pink-purple color for active page
              : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
          }`}
        >
          <Image src="/icons/settings.svg" alt="Settings" width={24} height={24} className="mr-3" />
          Settings
        </Link>

        <div className="w-80 border-t mt-4">
          <div className="flex items-center space-x-4 p-4">
            <div className="flex items-center">
              <Image src="/images/user_image.png?height=40&width=40" alt="User" width={40} height={40} className="rounded-full" />
              <div className="ml-6">
                <p className="text-sm font-medium">{profile?.username || 'Loading Username...'}</p> {/* Display profile name */}
                <p className="text-xs text-gray-500">{profile?.email || 'Loading email...'}</p> {/* Display profile email */}
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-600 hover:text-purple-700 py-10">
              <Image src="/icons/logout.svg" alt="logout" width={20} height={20} className="ml-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay when the sidebar is open */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* The overlay background */}
          <div className="flex-grow bg-black bg-opacity-50" onClick={toggleSidebar}></div>
        </div>
      )}
    </>
  );
}
