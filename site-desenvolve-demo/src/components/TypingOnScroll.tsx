import { useEffect, useRef, useState, ReactNode, cloneElement, isValidElement } from "react";

interface TypingOnScrollProps {
  children: ReactNode;
  speed?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

// Função recursiva para extrair TEXTO PURO de qualquer JSX
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (isValidElement(node)) {
    return extractText(node.props.children);
  }

  return "";
}

// Função recursiva para RECONSTRUIR o JSX substituindo apenas o texto pela parte digitada
function rebuildTree(node: ReactNode, typed: string): ReactNode {
  if (typeof node === "string") {
    return typed.slice(0, node.length);
  }

  if (Array.isArray(node)) {
    let used = 0;
    return node.map((child) => {
      const text = extractText(child);
      const portion = typed.slice(used, used + text.length);
      used += text.length;
      return rebuildTree(child, portion);
    });
  }

  if (isValidElement(node)) {
    const text = extractText(node);
    const portion = typed.slice(0, text.length);

    return cloneElement(node, {
      children: rebuildTree(node.props.children, portion),
    });
  }

  return node;
}

export default function TypingOnScroll({
  children,
  speed = 35,
  as: Tag = "h2",
  className = "",
}: TypingOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typed, setTyped] = useState("");

  const fullText = extractText(children);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTyped(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, fullText, speed]);

  return (
    <div ref={ref}>
      <Tag className={className}>
        {isVisible ? rebuildTree(children, typed) : ""}
      </Tag>
    </div>
  );
}
