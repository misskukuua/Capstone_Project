// pages/resources.js
"use client";
import SidebarComponent from '@/components/Sidebar';
import { useState } from 'react';

const resourcesData = [
  {
    author: "University of Minnesota",
    title: "Resilience in Children Exposed to Trauma, Disaster and War",
    link: "https://www.coursera.org/learn/resilience-in-children",
    image: "/images/minnesota.png", 
  },
  {
    author: "Utrecht University",
    title: "Understanding child development: from synapse to society",
    link: "https://www.coursera.org/learn/child-development",
    image: "/images/utrecht.png",
  },
  {
    author: "TEDx Talks",
    title: "Healing Adult Survivors of Child Abuse | Fire-Brown | TEDxGreenville",
    link: "https://www.youtube.com/watch?v=5viOYkM4CRE",
    image: "/images/tedx.png",
  },
  {
    author: "TEDx Talks",
    title: "Surviving Trauma: Without Forgiveness, Can We Still Heal? | Tara Walker Lyons",
    link: "https://www.youtube.com/watch?v=Gj46FEzDfDQ",
    image: "/images/tedx.png",
  },
  {
    author: "Center for Disease",
    title: "What are child abuse and neglect?",
    link: "https://www.youtube.com/watch?v=6kcKX2In0B0",
    image: "/images/cdc.png",
  },
  {
    author: "World Health Organization",
    title: "Adolescent Mental Health",
    link: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health",
    image: "/images/who.png",
  },
  {
    author: "Seattle Children",
    title: "Your Child's Mental Health",
    link: "https://www.seattlechildrens.org/health-safety/mental-health-resources/",
    image: "/images/seattle.png",
  },
  {
    author: "The Kids Mental Health Foundation",
    title: "National Children's Mental Health Resources",
    link: "https://kidsmentalhealthfoundation.org/mental-health-resources/national-state-resources",
    image: "/images/tmk.png",
  },
  {
    author: "Childhelp",
    title: "PARENTAL SUPPORT BOOKS",
    link: "https://www.childhelphotline.org/parent-resources-books/",
    image: "/images/childhelp.png",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter resources based on the search query
  const filteredResources = resourcesData.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarComponent />
      
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex flex-col items-center w-full sm:w-auto mb-4 sm:mb-0">
            <img src="/icons/logo.png" alt="Logo" className="sm:hidden" />
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 pl-10 border border-gray-300 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="ml-4">
            <i className="fas fa-circle text-gray-800"></i>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Our Resources</h1>
        <p className="text-gray-600 mb-8">
          Explore a selection of valuable resources focused on mental health, trauma recovery, and child development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src={resource.image} alt={resource.title} className="w-full h-48 object-cover" />
                <span className="absolute top-2 left-2 bg-[#D917EB] text-white text-xs font-semibold px-2 py-1 rounded">New</span>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-purple-600 font-semibold">By {resource.author}</span>
                  <img src="/images/user_image.png" alt="Author's profile picture" className="w-8 h-8 rounded-full ml-auto" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h2>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-[#D917EB] underline">
                  Read Article
                </a>
              </div>

            </div>
          ))}
                        <div className='mt-40' />

        </div>
      </div>
      <div className='mt-20' />
    </div>
  );
}
