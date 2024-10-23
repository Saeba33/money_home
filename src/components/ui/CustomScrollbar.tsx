import React, { useEffect, useState } from "react";

const CustomScrollbar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="custom-scrollbar">
      <div
        className="custom-scrollbar-thumb"
        style={{
          height: `${scrollPercentage}%`,
        }}
      />
    </div>
  );
};

export default CustomScrollbar;
