import { ArrowRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FinancingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

export const FinancingCard = ({
  icon: Icon,
  title,
  description,
  link,
  linkText = "Taxas e Condições",
}: FinancingCardProps) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-xl hover:shadow-xl transition-all duration-300">

      {/* HEADER — RESPONSIVE FIX */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:items-center">

        {/* Ícone */}
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Título */}
        <h3 className="text-2xl font-bold text-foreground leading-tight text-center sm:text-left">
          {title}
        </h3>
      </div>

      {/* Descrição */}
      <p className="text-muted-foreground leading-relaxed mb-6 text-center sm:text-left">
        {description}
      </p>

      {/* Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary font-semibold group transition-all text-center sm:text-left"
      >
        {linkText}
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </a>
    </Card>
  );
};
