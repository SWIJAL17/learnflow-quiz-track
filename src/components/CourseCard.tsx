
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  lessons: number;
}

const CourseCard = ({
  id,
  title,
  description,
  thumbnail,
  category,
  duration,
  level,
  rating,
  lessons,
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link to={`/courses/${id}`}>
      <Card className="course-card h-full flex flex-col">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-3 right-3">{category}</Badge>
        </div>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{description}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Badge variant="outline" className={`${getLevelColor(level)}`}>
              {level}
            </Badge>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between border-t border-gray-100 mt-auto">
          <div className="flex items-center">
            <Book className="h-4 w-4 mr-1 text-elearning-primary" />
            <span className="text-sm">{lessons} lessons</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
