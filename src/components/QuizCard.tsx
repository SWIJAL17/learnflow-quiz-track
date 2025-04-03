
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  timeLimit: string;
  questionsCount: number;
  completed?: boolean;
  score?: number;
}

const QuizCard = ({
  id,
  title,
  description,
  category,
  timeLimit,
  questionsCount,
  completed = false,
  score,
}: QuizCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{title}</h3>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-1 text-elearning-secondary" />
            <span>{questionsCount} questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-elearning-secondary" />
            <span>{timeLimit}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-gray-100 mt-auto">
        {completed ? (
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2 fill-green-100" />
              <span className="font-medium">Completed</span>
            </div>
            <span className="font-bold text-elearning-primary">{score}%</span>
          </div>
        ) : (
          <Link to={`/quizzes/${id}`} className="w-full">
            <Button className="w-full">Start Quiz</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
