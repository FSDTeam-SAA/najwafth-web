'use client'

import React, { useState } from 'react'
import {
  User,
  Lock,
  History,
  Info,
  ShieldCheck,
  FileText,
  Globe,
  LogOut,
  ChevronRight,
  Pencil,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import LanguageSelection from './LanguageSelection'
import LogoutModal from './LogoutModal'
import Image from 'next/image'

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile')
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogoutConfirm = async () => {
    setIsLogoutModalOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  // Navigation Items from image_cbf169.png
  const navItems = [
    { id: 'Edit Profile', icon: <User size={18} />, label: 'Edit Profile' },
    {
      id: 'Change Password',
      icon: <Lock size={18} />,
      label: 'Change Password',
    },
    {
      id: 'Order History',
      icon: <History size={18} />,
      label: 'Order History',
    },
    { id: 'About Us', icon: <Info size={18} />, label: 'About Us' },
    {
      id: 'Privacy Policy',
      icon: <ShieldCheck size={18} />,
      label: 'Privacy Policy',
    },
    {
      id: 'Terms & Conditions',
      icon: <FileText size={18} />,
      label: 'Terms & Conditions',
    },
    { id: 'Language', icon: <Globe size={18} />, label: 'Language' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your Profile</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Sidebar - Based on image_cbf169.png */}
          <aside className="lg:w-1/3 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* Profile Header Card */}
            <div className="relative">
              <div className="h-24 bg-[#76b9f0]"></div>
              <div className="flex flex-col items-center -mt-12 pb-6">
                <div className="relative">
                  <Image
                    width={96} // 24 * 4 = 96px
                    height={96}
                    src="https://i.pravatar.cc/150?u=madiha"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                  />
                  <button className="absolute bottom-0 right-0 bg-[#6392b9] text-white p-1.5 rounded-full border-2 border-white">
                    <Pencil size={12} />
                  </button>
                </div>
                <h2 className="mt-3 font-semibold text-lg text-blue-400">
                  Madiha Lata
                </h2>
                <p className="text-xs text-gray-400">bessieedwards@gmail.com</p>
              </div>
            </div>

            {/* Sidebar Routes */}
            <nav className="px-4 pb-4">
              <div className="space-y-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'text-blue-400 bg-blue-50/50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          activeTab === item.id
                            ? 'text-blue-400'
                            : 'text-gray-400'
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={
                        activeTab === item.id
                          ? 'text-blue-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}

                {/* Log Out Button - Integration point */}
                <button
                  onClick={() => setIsLogoutModalOpen(true)} // Modal open korbe
                  className="cursor-pointer w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LogOut
                      size={18}
                      className="text-gray-400 group-hover:text-red-500"
                    />
                    <span className="text-sm font-medium">Log Out</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-red-500"
                  />
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-2/3 border border-gray-100 rounded-xl p-8 min-h-150">
            {activeTab === 'Edit Profile' && <EditProfile />}
            {activeTab === 'Change Password' && (
              <div className="text-gray-400">
                <ChangePassword />
              </div>
            )}
            {activeTab === 'Language' && (
              <div className="text-gray-400">
                <LanguageSelection />{' '}
              </div>
            )}
            {activeTab === 'Order History' && (
              <div className="text-gray-400">Order History Component</div>
            )}
            {/* Add other components here */}
          </main>
        </div>
      </div>

      {/* --- INTEGRATED MODAL START --- */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  )
}

export default ProfileLayout
