import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface HoverVideoCardProps {
  title: string;
  municipality?: string;
  videoId: string;
  onClick: () => void;
}

export const HoverVideoCard = ({
  title,
  municipality,
  videoId,
  onClick,
}: HoverVideoCardProps) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth > 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <Card
      className="group overflow-hidden bg-white/10 border-white/20 backdrop-blur-md 
                 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-xl"
      onClick={onClick}
    >
      {/* VIDEO / THUMB AREA */}
      <div className="relative aspect-video overflow-hidden">

        {/* Thumbnail oficial do YouTube */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500
          ${isDesktop ? "group-hover:opacity-0" : ""}`}
        />

        {/* Autoplay no hover (somente desktop) */}
        {isDesktop && (
          <iframe
            className="absolute inset-0 w-full h-full opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
            allow="autoplay"
          />
        )}

        {/* Gradiente + Play Icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                        opacity-100 transition-all duration-300" />

        <div className="absolute inset-0 flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </div>
        </div>
      </div>

      {/* TEXT AREA */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-white">{title}</h3>

        {municipality && (
          <p className="text-primary font-medium mt-1">{municipality}</p>
        )}
      </div>
    </Card>
  );
};
