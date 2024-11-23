import { Clock } from "lucide-react";

const InfoBadge = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-xl p-6 border border-primary/20 shadow-sm">
      <div className="flex items-start gap-4">

        {/* Ícone animado */}
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 animate-pulse">
          <Clock className="w-6 h-6 text-white" />
        </div>

        {/* Texto */}
        <div>
          <h4 className="font-semibold text-foreground mb-1 text-lg">
            Atendimento Disponível
          </h4>

          <p className="text-sm text-muted-foreground mb-2">
            Segunda a Sexta: 9h às 18h
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-primary">
              Online agora
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoBadge;
