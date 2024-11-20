import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface DailyHistoryProps {
  byDay: {
    [date: string]: number;
  };
}

export const DailyHistory = ({ byDay }: DailyHistoryProps) => {
  const sortedDays = Object.entries(byDay).sort(([a], [b]) => b.localeCompare(a));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Histórico por Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedDays.map(([date, count]) => (
            <div key={date} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {format(parseISO(date), "dd 'de' MMMM", { locale: ptBR })}
                </span>
              </div>
              <span className="text-sm font-bold">{count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
