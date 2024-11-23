import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import {
  Mail,
  MessageCircle,
  TrendingUp,
  Leaf,
  Building2,
  DollarSign,
  CheckCircle2,
  FileText,
  BookOpen,
  Video,
  ClipboardList,
  Search,
  Send,
  Check,
  ShieldCheck
} from "lucide-react";

import TypingOnScroll from "@/components/TypingOnScroll";
import InfoBadge from "@/components/InfoBadge";
import { StatsCounter } from "@/components/StatsCounter";
import { ResourceCard } from "@/components/ResourceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { FinancingCard } from "@/components/FinancingCard";

const InfoSection = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("e-mail");
    toast({
      title: "E-mail copiado!",
      description: "(e-mail) foi copiado.",
    });
  };

  return (
    <section
      id="contato"
      className="py-20 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-6">

        {/* GRID PRINCIPAL */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE — FLEX PARA ORDER FUNCIONAR */}
          <div className="flex flex-col gap-12 max-w-md mx-auto w-full">

            
            <div className="order-1 lg:order-1 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-3xl p-12 backdrop-blur-sm w-full">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="space-y-0">

                  <div className="flex items-center gap-4">

                    {/* FOTO CORRIGIDA*/}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-md shrink-0">
                      
                    </div>

                    <div>
                      <h4 className="font-bold text-xl">Nome Completo</h4>
                      <p className="text-muted-foreground">
                        Gerente do Setor
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Entre em contato para tirar dúvidas, solicitar simulações
                      ou receber qualquer suporte necessário:
                    </p>

                    <Button
                      variant="outline"
                      className="w-full gap-3 h-12"
                      onClick={handleCopyEmail}
                    >
                      <Mail className="w-5 h-5" /> E-MAIL
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full gap-3 h-12"
                      onClick={() =>
                        window.open("https://wa.me/SEU_NUMERO_AQUI", "_blank")
                      }
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </Button>
                  </div>

                </div>
              </div>
            </div>

            {/* 2 — NOSSO IMPACTO */}
            <div className="order-2 lg:order-2 space-y-6 pt-2 w-full">
              <h3 className="text-2xl font-bold">Nosso Impacto</h3>

              <StatsCounter icon={Building2} value={645} label="Municípios Atendidos" />
              <StatsCounter
                icon={DollarSign}
                value={1240}
                prefix="R$ "
                suffix="B"
                label="Bilhões Investidos"
              />
              <StatsCounter icon={CheckCircle2} value={1250} label="Projetos Aprovados" />
            </div>

            {/* 3 — RECURSOS ÚTEIS — LÁ EMBAIXO NO MOBILE */}
            <div className="order-4 lg:order-3 space-y-6 pt-6 w-full">
              <div>
                <h2 className="text-2xl font-bold">Recursos Úteis</h2>
                <p className="text-muted-foreground">
                  Documentos e materiais importantes
                </p>
              </div>

              <div className="grid gap-5">
                <ResourceCard
                  icon={FileText}
                  title="Guia Completo"
                  description="Manual com todas as etapas do processo"
                  link=""
                />

                <ResourceCard
                  icon={BookOpen}
                  title="Documentos"
                  description="Kit de documentos necessários para Análise de Crédito feita pela STN."
                  downloadText="Baixar KIT"
                  link=""
                />

                <ResourceCard
                  icon={Video}
                  title="Playlist de Projetos"
                  description="Transformando municípios paulistas."
                  downloadText="Assistir Agora"
                  link="https://youtube.com/playlist?list=PLRWcQRbm-spfIN65RwhT5OKYnLrLkisWA"
                />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-12 order-3 lg:order-none">

            <div className="space-y-4 animate-fade-in">
              <TypingOnScroll
                as="h2"
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                <>
                  Transforme seu município em um{" "}
                  <span className="gradient-text">caso de sucesso</span>
                </>
              </TypingOnScroll>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Se você é um gestor público e procura recursos para tirar seus projetos do papel e transformar sua cidade em uma história de sucesso.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Junte-se a esse movimento de transformação e progresso e faça a diferença na vida de milhares de pessoas em todo o estado de São Paulo.
              </p>
            </div>

            <div className="space-y-6">
              <FinancingCard
                icon={Leaf}
                title="Linha Municípios Sustentáveis"
                description="A Linha Municípios Sustentáveis financia investimentos destinados a projetos sustentáveis que proporcionem redução da emissão de CO² e minimizem o impacto ambiental nas atividades da administração pública."
                link=""
              />

              <FinancingCard
                icon={TrendingUp}
                title="Linha de Apoio a Investimentos Municipais"
                description="A Linha de Apoio a Investimentos Municipais financia infraestrutura e modernização da administração pública, garantindo melhorias por meio de investimentos eficientes."
                link=""
              />
            </div>

            {/* COMO FUNCIONA */}
            <div className="space-y-6 pt-6">
              <h2 className="text-3xl font-bold">Como Funciona</h2>
              <p className="text-muted-foreground">
                Siga estes 5 passos para obter seu financiamento:
              </p>

              <ProcessStep
                stepNumber={1}
                icon={Search}
                title="Análise Prévia"
                description="Nossa equipe avalia a viabilidade do projeto."
              />

              <ProcessStep
                stepNumber={2}
                icon={Send}
                title="Entrar com Pedido"
                description="Você pode enviar o pedido pelo site ou com nossa ajuda."
              />

              <ProcessStep
                stepNumber={3}
                icon={ClipboardList}
                title="Checklist"
                description="Enviamos um checklist claro para organizar documentos."
              />

              <ProcessStep
                stepNumber={4}
                icon={ShieldCheck}
                title="Análise da STN"
                description="Formalizamos o PVL para análise do Tesouro Nacional."
              />

              <ProcessStep
                stepNumber={5}
                icon={Check}
                title="Aprovação e Liberação"
                description="Após aprovação, ocorre contrato e liberação do recurso."
                isLast
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;
