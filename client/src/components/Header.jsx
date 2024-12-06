import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Compass,
  Home,
  Map,
  Menu,
  PenTool,
  User,
  Users,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/signup", label: "Create Account", icon: UserRoundPlus },
    { to: "/signin", label: "Sign In", icon: LogIn },
    { to: "/create-itinerary", label: "Create Trip", icon: PenTool },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/blogs", label: "Blogs", icon: BookOpen },
    { to: "/log-trip", label: "Your Trips", icon: PenTool },
    { to: "/my-journey", label: "My Journey", icon: Map },
    { to: "/account", label: "Account", icon: User },
    { to: "/about_us", label: "About Us", icon: Users },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (isAuthenticated) {
      return item.to !== "/signin" && item.to !== "/signup";
    } else {
      return (
        item.to === "/" ||
        item.to === "/signin" ||
        item.to === "/signup" ||
        item.to === "/about_us"
      );
    }
  });

  return (
    <nav className="bg-gray-800 text-white py-2 px-4 fixed w-full top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-white travelopedia-name">
          Travelopedia
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          <ul>
            {filteredNavItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="px-3 py-2 rounded-md text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full p-0 bg-gray-800 border-l border-gray-700"
          >
            <div className="flex flex-col py-4">
              <ul>
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Header;
