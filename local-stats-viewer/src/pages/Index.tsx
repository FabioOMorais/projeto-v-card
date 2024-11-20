import { useStats } from "@/hooks/useStats";
import { StatCard } from "@/components/dashboard/StatCard";
import { DeviceList } from "@/components/dashboard/DeviceList";
import { BrowserList } from "@/components/dashboard/BrowserList";
import { DailyHistory } from "@/components/dashboard/DailyHistory";
import { BarChart3, Calendar, Clock, TrendingUp, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const Index = () => {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground">Carregando estatísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-destructive">Erro ao carregar dados</h1>
          <p className="text-sm text-muted-foreground">
            Verifique se o servidor está rodando em http://localhost:3000/api/stats
          </p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const lastAccessFormatted = format(
    parseISO(stats.lastAccess),
    "dd/MM/yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard de Acessos
          </h1>
          <p className="text-muted-foreground">
            Visualização em tempo real das estatísticas de acesso
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <StatCard
            title="Total de Acessos"
            value={stats.total}
            icon={Users}
            description="Todos os acessos registrados"
          />
          <StatCard
            title="Acessos Hoje"
            value={stats.today}
            icon={Calendar}
            description="Acessos no dia atual"
          />
          <StatCard
            title="Média por Dia"
            value={stats.averagePerDay.toFixed(1)}
            icon={TrendingUp}
            description="Média de acessos diários"
          />
          <StatCard
            title="Último Acesso"
            value={lastAccessFormatted}
            icon={Clock}
            description="Acesso mais recente"
          />
          <StatCard
            title="Horário de Pico Hoje"
            value={stats.peakHourToday}
            icon={BarChart3}
            description="Horário com mais acessos"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <DeviceList devices={stats.byDevice} />
          <BrowserList browsers={stats.byBrowser} />
          <DailyHistory byDay={stats.byDay} />
        </div>
      </div>
    </div>
  );
};

export default Index;
