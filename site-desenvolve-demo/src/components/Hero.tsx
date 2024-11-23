import { Button } from "@/components/ui/button";
import logosJunto from "@/assets/logosjunto.png";
import { Instagram, Facebook, Globe } from "lucide-react";
import TypingTitle from "./TypingTitle";
import ScrollArrow from "@/components/ScrollArrow";

const Hero = () => {
  
  const scrollToContato = () => {
    const target = document.getElementById("contato");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      
      
      <div className="relative z-10 container mx-auto px-6 py-20 pb-32 sm:pb-20 text-center animate-slide-up">
        
        

        <TypingTitle />

        <p className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto mb-12 font-normal">
          Impulsionando o crescimento econômico dos municípios paulistas
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* rolamento */}
          <Button
            size="lg"
            variant="hero"
            className="text-lg px-10 py-7 font-bold"
            onClick={scrollToContato}
          >
            ENTRE EM CONTATO
          </Button>

          <Button
            size="lg"
            variant="hero"
            className="text-lg px-10 py-7 font-bold"
          >
            TAXAS E LIMITES
          </Button>
        </div>
      </div>

      {/* Social Links */}
      <div
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 
          md:left-auto md:right-8 md:translate-x-0 
          z-20 flex gap-4
        "
      >
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
        >
          <Globe className="w-6 h-6 text-white" />
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
        >
          <Instagram className="w-6 h-6 text-white" />
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
        >
          <Facebook className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Seta animada */}
      <ScrollArrow />

    </section>
  );
};

export default Hero;
