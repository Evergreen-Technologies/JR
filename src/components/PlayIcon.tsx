import React from "react";
import Image from "next/image";
import Play from "../../public/play.svg";

const PlayIcon = () => {
  return (
    <div>
      <span>
        <Image src={Play} alt="Play" className="h-10 w-10" />
      </span>
    </div>
  );
};

export default PlayIcon;
