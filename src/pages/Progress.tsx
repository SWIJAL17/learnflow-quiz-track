
import { useState } from "react";
import NavBar from "@/components/NavBar";
import ProgressChart from "@/components/ProgressChart";
import AchievementBadge from "@/components/AchievementBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Sparkles, BookOpen, GraduationCap, Verified, Target, Zap, CheckCircle, BarChart, Clock } from "lucide-react";

// Mock data
const courseProgressData = [
  { name: "React", progress: 68 },
  { name: "Python", progress: 45 },
  { name: "UX/UI", progress: 92 },
  { name: "ML", progress: 25 },
  { name: "Cyber", progress: 10 },
];

const quizScoresData = [
  { name: "React", progress: 84 },
  { name: "JS", progress: 92 },
  { name: "ML", progress: 76 },
];

const activeCourses = [
  {
    id: "1",
    title: "Introduction to React",
    progress: 68,
    lastAccessed: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    progress: 45,
    lastAccessed: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "3",
    title: "UX/UI Design Fundamentals",
    progress: 92,
    lastAccessed: "Yesterday",
    thumbnail: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
  },
];

const achievements = [
  {
    title: "First Course Completed",
    description: "Completed your first course",
    icon: <Trophy className="h-8 w-8" />,
    unlocked: true,
  },
  {
    title: "Quiz Master",
    description: "Score 90% or higher on 3 quizzes",
    icon: <Award className="h-8 w-8" />,
    unlocked: true,
  },
  {
    title: "Fast Learner",
    description: "Complete a course in under 1 week",
    icon: <Zap className="h-8 w-8" />,
    unlocked: true,
  },
  {
    title: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: <Target className="h-8 w-8" />,
    unlocked: false,
  },
  {
    title: "Course Explorer",
    description: "Enroll in 5 different courses",
    icon: <Sparkles className="h-8 w-8" />,
    unlocked: false,
  },
  {
    title: "Consistency Champion",
    description: "Log in for 7 consecutive days",
    icon: <Verified className="h-8 w-8" />,
    unlocked: false,
  },
];

const completedCourses = [
  {
    id: "4",
    title: "JavaScript Fundamentals",
    completedOn: "June 15, 2023",
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "5",
    title: "CSS Mastery",
    completedOn: "April 22, 2023",
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
];

const CompletedCourseCard = ({ course }: { course: any }) => (
  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
    <img
      src={course.thumbnail}
      alt={course.title}
      className="w-16 h-16 object-cover rounded"
    />
    <div className="flex-grow">
      <h3 className="font-medium">{course.title}</h3>
      <div className="text-sm text-gray-500">Completed on {course.completedOn}</div>
    </div>
    {course.certificate && (
      <div className="flex items-center text-elearning-primary">
        <GraduationCap className="h-5 w-5 mr-1" />
        <span className="text-sm">Certificate</span>
      </div>
    )}
  </div>
);

const ActiveCourseCard = ({ course }: { course: any }) => (
  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
    <img
      src={course.thumbnail}
      alt={course.title}
      className="w-16 h-16 object-cover rounded"
    />
    <div className="flex-grow">
      <h3 className="font-medium">{course.title}</h3>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>{course.progress}% complete</span>
          <span>Last accessed {course.lastAccessed}</span>
        </div>
        <Progress value={course.progress} className="h-2" />
      </div>
    </div>
  </div>
);

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Learning Progress</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <BookOpen className="h-6 w-6 text-elearning-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Enrolled Courses</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Completed Courses</div>
                      <div className="text-2xl font-bold">2</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                      <BarChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Average Quiz Score</div>
                      <div className="text-2xl font-bold">84%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-full mr-4">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Achievements</div>
                      <div className="text-2xl font-bold">3/6</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressChart data={courseProgressData} />
              <ProgressChart data={quizScoresData} />
            </div>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Completed Lesson: Introduction to React Hooks</h3>
                      <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Earned Achievement: Quiz Master</h3>
                      <p className="text-sm text-gray-500">2 days ago at 1:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Completed Quiz: JavaScript Advanced with 92% score</h3>
                      <p className="text-sm text-gray-500">4 days ago at 11:20 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-6">
            {/* Active Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-elearning-primary" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCourses.map((course) => (
                    <ActiveCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Completed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedCourses.map((course) => (
                    <CompletedCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <AchievementBadge
                        title={achievement.title}
                        description={achievement.description}
                        icon={achievement.icon}
                        unlocked={achievement.unlocked}
                      />
                      <h3 className="mt-2 text-sm font-medium line-clamp-1">{achievement.title}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Progress</span>
                      <span>{Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%</span>
                    </div>
                    <Progress value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {achievements.filter(a => !a.unlocked).map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-gray-200 rounded-full p-2">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressPage;
