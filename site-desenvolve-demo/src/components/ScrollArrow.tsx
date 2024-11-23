import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const ScrollArrow = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const lastSection = document.getElementById("last-section");

    if (!lastSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // última seção na tela → some
          setVisible(false);
        } else {
          // voltou a subir → aparece
          setVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(lastSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`
        fixed bottom-10 left-1/2 -translate-x-1/2 z-50
        transition-opacity duration-500
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <ChevronDown
        className="w-10 h-10 text-white animate-bounce-slow opacity-80"
      />
    </div>
  );
};

export default ScrollArrow;