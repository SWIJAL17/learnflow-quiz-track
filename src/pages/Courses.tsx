
import { useState } from "react";
import NavBar from "@/components/NavBar";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const coursesData = [
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
  {
    id: "4",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and techniques.",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Data Science",
    duration: "6h 30m",
    level: "Intermediate" as const,
    rating: 4.7,
    lessons: 20,
  },
  {
    id: "5",
    title: "Cybersecurity Fundamentals",
    description: "Learn the basics of cybersecurity and how to protect your systems.",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Security",
    duration: "4h 45m",
    level: "Beginner" as const,
    rating: 4.5,
    lessons: 14,
  },
  {
    id: "6",
    title: "DevOps for Beginners",
    description: "Learn the basics of DevOps practices and tools.",
    thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "DevOps",
    duration: "5h 15m",
    level: "Beginner" as const,
    rating: 4.4,
    lessons: 16,
  },
  {
    id: "7",
    title: "Advanced JavaScript Techniques",
    description: "Master advanced JavaScript concepts like closures, prototypes, and async programming.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Web Development",
    duration: "7h 20m",
    level: "Advanced" as const,
    rating: 4.9,
    lessons: 24,
  },
  {
    id: "8",
    title: "Mobile App Design",
    description: "Learn to design beautiful and functional mobile applications.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Design",
    duration: "4h 30m",
    level: "Intermediate" as const,
    rating: 4.7,
    lessons: 15,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all-categories");
  const [levelFilter, setLevelFilter] = useState("all-levels");
  const [currentTab, setCurrentTab] = useState("all");

  const categories = Array.from(new Set(coursesData.map((course) => course.category)));
  
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all-categories" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all-levels" || course.level === levelFilter;
    const matchesTab = currentTab === "all" || 
                      (currentTab === "beginner" && course.level === "Beginner") ||
                      (currentTab === "intermediate" && course.level === "Intermediate") ||
                      (currentTab === "advanced" && course.level === "Advanced");
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      
      {/* Header */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our collection of high-quality courses designed to help you master new skills and advance your career.
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
                  placeholder="Search courses..."
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
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all-categories");
                setLevelFilter("all-levels");
                setCurrentTab("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Course Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-8 grid grid-cols-4 sm:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="beginner" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No beginner courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="intermediate" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No intermediate courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="advanced" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No advanced courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Courses;
