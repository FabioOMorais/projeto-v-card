import { LucideIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  downloadText?: string;
  link?: string; // suporte links
}

export const ResourceCard = ({ 
  icon: Icon, 
  title, 
  description,
  downloadText = "Baixar PDF",
  link
}: ResourceCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">

      <div className="flex items-start gap-4 mb-3">
        {/* Ícone */}
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        {/* Títulos e descrição */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1 tracking-wide">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Botão com link (se existir) */}
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block"
        >
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-center gap-2 text-primary hover:text-primary hover:bg-primary/10"
          >
            <Download className="w-4 h-4" />
            {downloadText}
          </Button>
        </a>
      ) : (
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-center gap-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Download className="w-4 h-4" />
          {downloadText}
        </Button>
      )}

    </div>
  );
};
