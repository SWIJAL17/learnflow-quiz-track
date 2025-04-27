import NavBar from "@/components/NavBar";
import CourseCard from "@/components/CourseCard";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HelpCircle, CheckCircle, Trophy, GraduationCap } from "lucide-react";

// Mock data
const featuredCourses = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state, and props.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Web Development",
    duration: "3h 45m",
    level: "Beginner" as const,
    rating: 4.8,
    lessons: 12,
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    description: "Take your Python skills to the next level with advanced concepts and techniques.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    category: "Programming",
    duration: "5h 20m",
    level: "Intermediate" as const,
    rating: 4.6,
    lessons: 18,
  },
  {
    id: "3",
    title: "UX/UI Design Fundamentals",
    description: "Master the principles of user experience and interface design.",
    thumbnail: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    category: "Design",
    duration: "4h 10m",
    level: "Beginner" as const,
    rating: 4.9,
    lessons: 15,
  },
];

const recentQuizzes = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Test your knowledge of React basics including JSX, components, and props.",
    category: "Web Development",
    timeLimit: "15 min",
    questionsCount: 10,
  },
  {
    id: "2",
    title: "Python Basics",
    description: "Check your understanding of Python syntax, data types, and functions.",
    category: "Programming",
    timeLimit: "20 min",
    questionsCount: 15,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-400 text-white py-16 rounded">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              Unlock Your Potential with LearnFlow
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "150ms" }}>
              Explore courses, test your knowledge with quizzes, and track your progress all in one place.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/courses">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Browse Courses
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="text-black border-white hover:bg-gray-100">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Why Learn with Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-elearning-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-elearning-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Courses</h3>
              <p className="text-gray-600">Expert-led courses designed to help you master new skills quickly.</p>
            </div>
            <div className="text-center">
              <div className="bg-elearning-secondary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="h-8 w-8 text-elearning-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
              <p className="text-gray-600">Test your knowledge with engaging quizzes and get instant feedback.</p>
            </div>
            <div className="text-center">
              <div className="bg-elearning-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-elearning-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your learning journey and earn achievements along the way.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="text-elearning-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Quizzes Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Practice with Quizzes</h2>
            <Link to="/quizzes" className="text-elearning-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn anytime, grow every time. Your future is just one click away.</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of students who are building valuable skills and advancing their careers. Learn from experts, grow with confidence, and take the next step toward your goals.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-elearning-primary hover:bg-gray-100 ">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">LearnFlow</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Courses</a>
              <a href="#" className="hover:text-white">Pricing</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LearnFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
