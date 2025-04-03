
import { useState } from "react";
import NavBar from "@/components/NavBar";
import QuizCard from "@/components/QuizCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock quiz data
const quizzesData = [
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
  {
    id: "3",
    title: "UX/UI Principles",
    description: "Test your knowledge of user experience and interface design principles.",
    category: "Design",
    timeLimit: "15 min",
    questionsCount: 12,
  },
  {
    id: "4",
    title: "Machine Learning Concepts",
    description: "Validate your understanding of basic machine learning algorithms.",
    category: "Data Science",
    timeLimit: "25 min",
    questionsCount: 15,
    completed: true,
    score: 84,
  },
  {
    id: "5",
    title: "Cybersecurity Basics",
    description: "Test your knowledge of cybersecurity fundamentals and best practices.",
    category: "Security",
    timeLimit: "20 min",
    questionsCount: 15,
  },
  {
    id: "6",
    title: "JavaScript Advanced",
    description: "Challenge yourself with advanced JavaScript concepts and patterns.",
    category: "Web Development",
    timeLimit: "30 min",
    questionsCount: 20,
    completed: true,
    score: 92,
  },
  {
    id: "7",
    title: "SQL Fundamentals",
    description: "Test your SQL query writing and database concept knowledge.",
    category: "Databases",
    timeLimit: "25 min",
    questionsCount: 15,
  },
  {
    id: "8",
    title: "Frontend Web Development",
    description: "Comprehensive quiz covering HTML, CSS, and JavaScript concepts.",
    category: "Web Development",
    timeLimit: "40 min",
    questionsCount: 25,
  },
];

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categories = Array.from(new Set(quizzesData.map((quiz) => quiz.category)));
  
  const filteredQuizzes = quizzesData.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || quiz.category === categoryFilter;
    const matchesStatus = statusFilter === "" || 
                        (statusFilter === "completed" && quiz.completed) ||
                        (statusFilter === "not-completed" && !quiz.completed);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      
      {/* Header */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
          <p className="text-gray-600 max-w-3xl">
            Test your knowledge with our interactive quizzes. Complete quizzes to track your progress and identify areas for improvement.
          </p>
        </div>
      </section>
      
      {/* Search and Filters */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search quizzes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="not-completed">Not Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setStatusFilter("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Quizzes Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                  setStatusFilter("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
