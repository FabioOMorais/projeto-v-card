import { useState, useEffect } from "react";

export default function TypingTitle() {
  const line1 = "DESENVOLVIMENTO";
  const line2 = "PARA SEU MUNICÍPIO";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    let i = 0;

    const typeLine1 = setInterval(() => {
      setText1(line1.slice(0, i + 1));
      i++;
      if (i === line1.length) {
        clearInterval(typeLine1);
        setTimeout(typeSecondLine, 300);
      }
    }, 120);

    const typeSecondLine = () => {
      let j = 0;
      const interval2 = setInterval(() => {
        setText2(line2.slice(0, j + 1));
        j++;
        if (j === line2.length) clearInterval(interval2);
      }, 90);
    };
  }, []);

  return (
    <h1 className="
      text-3xl                       /* MOBILE (reduzido) */
      sm:text-4xl                    /* SMALL SCREENS */
      md:text-6xl                    /* TABLET/NOTEBOOK */
      lg:text-7xl                    /* DESKTOP */
      font-bold leading-tight mb-6 gradient-text
    ">
      {text1}
      <br />
      {text2}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
