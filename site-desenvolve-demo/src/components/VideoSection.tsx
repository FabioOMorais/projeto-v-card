import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import cityDusk from "@/assets/city-dusk.jpg";

// HoverVideoCard
import { HoverVideoCard } from "@/components/HoverVideoCard";

interface VideoItem {
  title: string;
  municipality?: string;
  videoId: string;
}

const videos: VideoItem[] = [
  {
    title: "Esgoto",
    municipality: "Rio das Pedras",
    videoId: "B-H2sCjrfKE",
  },
  {
    title: "Iluminação LED",
    municipality: "Olímpia",
    videoId: "jqh_M_xinbw",
  },
  {
    title: "Aterro Sanitário",
    municipality: "Pederneiras",
    videoId: "-fF_LyMs79s",
  },
  {
    title: "Energia Solar",
    municipality: "Monções",
    videoId: "LWpAky47_ww",
  },
  {
    title: "Saúde Pública",
    municipality: "São Caetano do Sul",
    videoId: "W-EH7dvUN0o",
  },
  {
    title: "Desenvolvendo seu Município",
    municipality: "Vídeo Institucional",
    videoId: "L4rwFGwB0A0",
  },
];

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={cityDusk} alt="Paisagem urbana" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14 space-y-4 max-w-3xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            DESENVOLVENDO <br />
            <span className="gradient-text">SEU MUNICÍPIO</span>
          </h2>

          <p className="text-lg md:text-x text-white/70">
            Conheça alguns dos projetos que estão transformando cidades
          </p>

        </div>

        {/* GRID DE VIDEOS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <HoverVideoCard
              key={index}
              title={video.title}
              municipality={video.municipality}
              videoId={video.videoId}
              onClick={() => setSelectedVideo(video.videoId)}
            />
          ))}
        </div>

        {/* MODAL */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black border-none">

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 z-50 p-2 bg-white/10 hover:bg-white/20 
                         rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {selectedVideo && (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default VideoSection;
