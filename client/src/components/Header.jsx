import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Compass, Home, Map, Menu, PenTool, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/header.css"

export default function Header() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/create-itinerary", label: "Create Itinerary", icon: PenTool },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/blogs", label: "Blogs", icon: BookOpen },
    { to: "/my-journey", label: "My Journey", icon: Map },
    { to: "/account", label: "Account", icon: User },
    { to: "/log-trip", label: "Log Trip", icon: PenTool },
  ]

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white site-name">
          Travelopedia
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="hover:text-gray-300 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}