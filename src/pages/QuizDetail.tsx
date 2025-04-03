
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import QuizQuestion, { Question } from "@/components/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle, ChevronLeft, Clock, HelpCircle, Trophy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock quiz data
const quizzesData = {
  "1": {
    id: "1",
    title: "React Fundamentals",
    description: "Test your knowledge of React basics including JSX, components, and props.",
    instructions: "This quiz contains 5 multiple-choice questions about React fundamentals. Select the best answer for each question. You'll see your results at the end of the quiz.",
    category: "Web Development",
    timeLimit: "15 min",
    questionsCount: 5,
    questions: [
      {
        id: "q1",
        text: "What is JSX in React?",
        options: [
          { id: "a", text: "JavaScript XML - A syntax extension that allows writing HTML in React" },
          { id: "b", text: "JavaScript Extra - A library for adding extra functionality to JavaScript" },
          { id: "c", text: "Java Syntax Extension - A way to use Java in React applications" },
          { id: "d", text: "JavaScript Experience - A framework for improving developer experience" }
        ],
        correctOption: "a"
      },
      {
        id: "q2",
        text: "Which of the following is used to pass data from parent to child components?",
        options: [
          { id: "a", text: "State" },
          { id: "b", text: "Props" },
          { id: "c", text: "Context" },
          { id: "d", text: "Refs" }
        ],
        correctOption: "b"
      },
      {
        id: "q3",
        text: "What function is used to update state in a React functional component?",
        options: [
          { id: "a", text: "this.setState()" },
          { id: "b", text: "useState()" },
          { id: "c", text: "The setter function returned by useState()" },
          { id: "d", text: "updateState()" }
        ],
        correctOption: "c"
      },
      {
        id: "q4",
        text: "Which of these is NOT a React hook?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useState" },
          { id: "c", text: "useHistory" },
          { id: "d", text: "useComponent" }
        ],
        correctOption: "d"
      },
      {
        id: "q5",
        text: "What is the virtual DOM in React?",
        options: [
          { id: "a", text: "A server-side rendering technology" },
          { id: "b", text: "A lightweight copy of the actual DOM that React uses for performance optimization" },
          { id: "c", text: "A browser extension for React development" },
          { id: "d", text: "The actual DOM rendered by the browser" }
        ],
        correctOption: "b"
      }
    ]
  }
};

const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // Check if quiz exists
  if (!quizId || !quizzesData[quizId as keyof typeof quizzesData]) {
    return (
      <div className="min-h-screen bg-elearning-background">
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <p className="mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/quizzes")}>Browse Quizzes</Button>
        </div>
      </div>
    );
  }

  const quiz = quizzesData[quizId as keyof typeof quizzesData];
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };
  
  const handleNext = (selectedOption: string) => {
    const updatedAnswers = { ...userAnswers, [quiz.questions[currentQuestionIndex].id]: selectedOption };
    setUserAnswers(updatedAnswers);
    
    if (currentQuestionIndex === quiz.questions.length - 1) {
      // Last question, show results
      setShowResults(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = () => {
    if (!showResults) return 0;
    
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctOption) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / quiz.questions.length) * 100);
  };
  
  const handleFinishQuiz = () => {
    const score = calculateScore();
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}% on the "${quiz.title}" quiz.`,
    });
    navigate("/quizzes");
  };
  
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-elearning-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            className="mb-6 flex items-center" 
            onClick={() => navigate("/quizzes")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Quizzes
          </Button>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-elearning-secondary mr-2" />
                  <span>{quiz.questionsCount} questions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-elearning-secondary mr-2" />
                  <span>{quiz.timeLimit} time limit</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-elearning-accent mr-2" />
                  <span>Achievement unlocked on completion</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
                <p className="text-blue-700">{quiz.instructions}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    
    return (
      <div className="min-h-screen bg-elearning-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Quiz Results</CardTitle>
              <CardDescription>{quiz.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Circle */}
              <div className="flex justify-center my-8">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center border-8 ${
                  passed ? "border-green-500" : "border-red-500"
                } text-center`}>
                  <div>
                    <div className="text-4xl font-bold">{score}%</div>
                    <div className="text-gray-500">Score</div>
                  </div>
                </div>
              </div>
              
              {/* Result Message */}
              <div className={`text-center p-4 rounded-lg ${
                passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                <div className="flex justify-center mb-2">
                  {passed ? (
                    <CheckCircle className="h-8 w-8" />
                  ) : (
                    <X className="h-8 w-8" />
                  )}
                </div>
                <p className="font-medium">
                  {passed ? "Congratulations! You passed the quiz." : "You didn't pass this time, but you can try again."}
                </p>
                <p className="text-sm mt-1">
                  {passed 
                    ? "You've demonstrated a good understanding of the material." 
                    : "Review the material and try again when you're ready."}
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold">{quiz.questions.length}</div>
                  <div className="text-gray-500">Total Questions</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold">
                    {quiz.questions.filter((q) => userAnswers[q.id] === q.correctOption).length}
                  </div>
                  <div className="text-gray-500">Correct Answers</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold">
                    {quiz.questions.filter((q) => userAnswers[q.id] !== q.correctOption).length}
                  </div>
                  <div className="text-gray-500">Incorrect Answers</div>
                </div>
              </div>
              
              {/* Achievement */}
              {passed && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-bold text-lg text-yellow-800">Achievement Unlocked!</h3>
                  <p className="text-yellow-700">React Fundamentals Master</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleStartQuiz}>
                Try Again
              </Button>
              <Button onClick={handleFinishQuiz}>
                Finish
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-elearning-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        </div>
        
        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          showResults={false}
          selectedOption={userAnswers[currentQuestion.id]}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === quiz.questions.length - 1}
        />
      </div>
    </div>
  );
};

export default QuizDetail;
