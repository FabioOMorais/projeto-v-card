import { useQuery } from "@tanstack/react-query";
import { StatsData } from "@/types/stats";

const fetchStats = async (): Promise<StatsData> => {
  const response = await fetch("http://localhost:3000/api/stats");
  if (!response.ok) {
    throw new Error("Erro ao buscar estatísticas");
  }
  return response.json();
};

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });
};
