
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOption: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: (selected: string) => void;
  onPrevious: () => void;
  showResults: boolean;
  selectedOption?: string;
  isFirst: boolean;
  isLast: boolean;
}

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  showResults,
  selectedOption,
  isFirst,
  isLast,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<string>(selectedOption || "");

  const handleOptionChange = (value: string) => {
    if (!showResults) {
      setSelected(value);
    }
  };

  const handleNext = () => {
    onNext(selected);
  };

  const getOptionStyle = (optionId: string) => {
    if (!showResults) return "";
    
    if (optionId === question.correctOption) {
      return "bg-green-50 border-green-300";
    }
    
    if (optionId === selected && optionId !== question.correctOption) {
      return "bg-red-50 border-red-300";
    }
    
    return "";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {questionNumber} of {totalQuestions}</CardTitle>
          <div className="text-sm text-gray-500">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-elearning-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-medium mb-6">{question.text}</div>
        <RadioGroup value={selected} onValueChange={handleOptionChange} className="space-y-3">
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className={cn(
                "border rounded-lg p-4 transition-all hover:border-elearning-primary",
                selected === option.id && !showResults && "border-elearning-primary bg-elearning-primary/5",
                getOptionStyle(option.id)
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id} 
                  disabled={showResults}
                  className={showResults && option.id === question.correctOption ? "text-green-500" : ""}
                />
                <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                  {option.text}
                </Label>
                {showResults && option.id === question.correctOption && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {showResults && selected === option.id && option.id !== question.correctOption && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={isFirst}
          className="flex items-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected && !showResults}
          className="flex items-center"
        >
          {isLast && !showResults ? "Submit" : "Next"}
          {!isLast && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
