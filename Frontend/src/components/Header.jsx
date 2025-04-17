import { Link } from "react-router-dom";
import { useState } from "react";
import { User, LogOut, Map } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <>
     <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="mr-2 rounded-full bg-emerald-100 p-2">
              <Map className="size-5 text-emerald-600" />
            </div>
          </Link>
        </div>

        {/* Center - Website Name */}
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <h1 className="text-xl font-semibold text-gray-800">TravelSage</h1>
        </div>

        {/* Right - Profile Menu */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-600">US</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex cursor-pointer items-center">
                    <User className="mr-2 size-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/history" className="flex cursor-pointer items-center">
                    <Map className="mr-2 size-4" />
                    <span>Past Trip Plans</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator  />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => setIsLoggedIn(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;