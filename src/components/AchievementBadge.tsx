
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const AchievementBadge = ({
  title,
  description,
  icon,
  unlocked,
}: AchievementBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`w-20 h-20 flex items-center justify-center ${
            unlocked ? "bg-gradient-to-br from-elearning-primary to-elearning-secondary" : "bg-gray-200"
          } rounded-full cursor-pointer`}>
            <CardContent className="p-0 flex items-center justify-center">
              <div className={`${unlocked ? "text-white" : "text-gray-400"}`}>
                {icon}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-bold">{title}</p>
            <p className="text-sm">{description}</p>
            {!unlocked && <p className="text-xs text-gray-500 mt-1">Locked</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
