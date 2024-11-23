import { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
  isLast?: boolean;
}

export const ProcessStep = ({ 
  icon: Icon, 
  title, 
  description, 
  stepNumber,
  isLast = false 
}: ProcessStepProps) => {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
          {stepNumber}
        </div>

        {!isLast && (
          <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-primary to-border mt-2" />
        )}
      </div>
      
      <div className="flex-1 pb-8">
        <div className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success-light/50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-success" />
            </div>
            <h4 className="font-semibold text-foreground">{title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed ml-11">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
