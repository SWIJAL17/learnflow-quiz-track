
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, BookOpen, GraduationCap } from "lucide-react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-elearning-primary" />
              <span className="ml-2 text-xl font-bold text-elearning-primary">LearnFlow</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link to="/courses" className="px-3 py-2 rounded-md text-sm font-medium text-elearning-text hover:bg-gray-50">
                Courses
              </Link>
              <Link to="/quizzes" className="px-3 py-2 rounded-md text-sm font-medium text-elearning-text hover:bg-gray-50">
                Quizzes
              </Link>
              {isLoggedIn && (
                <Link to="/progress" className="px-3 py-2 rounded-md text-sm font-medium text-elearning-text hover:bg-gray-50">
                  My Progress
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative rounded-md shadow-sm hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-elearning-primary focus:border-elearning-primary sm:text-sm"
                  placeholder="Search courses..."
                />
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <Button className="ml-3 flex items-center" variant="ghost">
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
