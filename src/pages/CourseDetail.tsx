
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe, BookOpen, BarChart, Award, CheckCircle, Play, File, Download } from "lucide-react";

// Mock course data
const coursesData = {
  "1": {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state, and props. This course will teach you everything you need to know to start building React applications. You'll learn about JSX, component lifecycle, hooks, and more.",
    longDescription: "React is a popular JavaScript library for building user interfaces. In this comprehensive course, you'll learn React from the ground up. Starting with the basics, we'll cover components, JSX, props, and state. Then we'll dive into more advanced topics like hooks, context API, and performance optimization. By the end of this course, you'll have the skills to build robust React applications and understand the core concepts behind this powerful library.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Web Development",
    duration: "3h 45m",
    level: "Beginner",
    rating: 4.8,
    lessons: 12,
    students: 4567,
    lastUpdated: "March 2023",
    language: "English",
    instructorName: "Alex Johnson",
    instructorTitle: "Senior Frontend Developer",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorBio: "Alex has been working with React for over 5 years and has taught over 50,000 students online. He currently works as a Senior Frontend Developer at a leading tech company.",
    modules: [
      {
        id: "m1",
        title: "Getting Started with React",
        lessons: [
          { id: "l1", title: "Introduction to React", duration: "10:15", isCompleted: true },
          { id: "l2", title: "Setting Up Your Development Environment", duration: "15:30", isCompleted: true },
          { id: "l3", title: "Your First React Component", duration: "12:45", isCompleted: false },
        ]
      },
      {
        id: "m2",
        title: "React Fundamentals",
        lessons: [
          { id: "l4", title: "JSX Syntax", duration: "14:20", isCompleted: false },
          { id: "l5", title: "Props and State", duration: "18:15", isCompleted: false },
          { id: "l6", title: "Handling Events", duration: "11:50", isCompleted: false },
        ]
      },
      {
        id: "m3",
        title: "React Hooks",
        lessons: [
          { id: "l7", title: "Introduction to Hooks", duration: "16:40", isCompleted: false },
          { id: "l8", title: "useState Hook", duration: "13:25", isCompleted: false },
          { id: "l9", title: "useEffect Hook", duration: "15:10", isCompleted: false },
        ]
      },
      {
        id: "m4",
        title: "Building a Complete Project",
        lessons: [
          { id: "l10", title: "Project Setup", duration: "12:35", isCompleted: false },
          { id: "l11", title: "Creating Components", duration: "22:15", isCompleted: false },
          { id: "l12", title: "Finishing Touches", duration: "17:40", isCompleted: false },
        ]
      }
    ],
    currentLesson: { id: "l3", title: "Your First React Component", module: "Getting Started with React" },
    progress: 17,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    whatYouWillLearn: [
      "Understand React components and JSX",
      "Master state management in React",
      "Learn to use React hooks effectively",
      "Create reusable components",
      "Handle forms and user input",
      "Implement routing with React Router",
      "Build a complete React application from scratch"
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState("content");
  
  // Check if course exists
  if (!courseId || !coursesData[courseId as keyof typeof coursesData]) {
    return (
      <div className="min-h-screen bg-elearning-background">
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const course = coursesData[courseId as keyof typeof coursesData];
  const completedLessons = course.modules.flatMap(m => m.lessons).filter(l => l.isCompleted).length;
  const totalLessons = course.modules.flatMap(m => m.lessons).length;
  
  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      
      {/* Course Header & Video */}
      <section className="bg-white border-b">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8 py-6">
            <div className="w-full lg:w-2/3">
              <VideoPlayer 
                src={course.videoUrl} 
                thumbnail={course.thumbnail}
                title={course.currentLesson.title}
              />
              <div className="mt-4">
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.currentLesson.title} - {course.currentLesson.module}</p>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {course.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart className="h-4 w-4 mr-1" />
                    {course.level}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-1" />
                    {course.language}
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex-grow">
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{course.progress}% complete</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Play className="mr-2 h-4 w-4" />
                    Next Lesson
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Course Content</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{completedLessons}/{totalLessons} lessons completed</span>
                  <span>{course.duration} total</span>
                </div>
                <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
              </div>
              <Accordion type="multiple" className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem value={module.id} key={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full text-left pr-2">
                        <span>{module.title}</span>
                        <span className="text-sm text-gray-500">
                          {module.lessons.filter(l => l.isCompleted).length}/{module.lessons.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Play className="h-4 w-4 text-elearning-primary flex-shrink-0" />
                            )}
                            <span className="flex-grow">{lesson.title}</span>
                            <span className="text-gray-500 text-sm">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="content">About</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-700 mb-8">{course.longDescription}</p>
                
                <h3 className="text-lg font-bold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-elearning-primary mb-2" />
                    <div className="text-2xl font-bold">{course.lessons}</div>
                    <div className="text-gray-600">Lessons</div>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-8 w-8 text-elearning-primary mb-2" />
                    <div className="text-2xl font-bold">{course.duration}</div>
                    <div className="text-gray-600">Duration</div>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Award className="h-8 w-8 text-elearning-primary mb-2" />
                    <div className="text-2xl font-bold">{course.level}</div>
                    <div className="text-gray-600">Level</div>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <BarChart className="h-8 w-8 text-elearning-primary mb-2" />
                    <div className="text-2xl font-bold">{course.students.toLocaleString()}</div>
                    <div className="text-gray-600">Students</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={course.instructorAvatar} alt={course.instructorName} />
                      <AvatarFallback>{course.instructorName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold text-center">{course.instructorName}</h3>
                    <p className="text-gray-600 text-center">{course.instructorTitle}</p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                    <p className="text-gray-700">{course.instructorBio}</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-elearning-primary" />
                        <span>15 Courses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-elearning-primary" />
                        <span>50,000+ Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-elearning-primary" />
                        <span>4.8 Average Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">Course Resources</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <File className="h-6 w-6 text-elearning-primary mr-3" />
                      <div>
                        <h4 className="font-medium">Course Slides</h4>
                        <p className="text-sm text-gray-500">PDF, 2.5 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <File className="h-6 w-6 text-elearning-primary mr-3" />
                      <div>
                        <h4 className="font-medium">Exercise Files</h4>
                        <p className="text-sm text-gray-500">ZIP, 15.8 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <File className="h-6 w-6 text-elearning-primary mr-3" />
                      <div>
                        <h4 className="font-medium">Cheat Sheet</h4>
                        <p className="text-sm text-gray-500">PDF, 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
