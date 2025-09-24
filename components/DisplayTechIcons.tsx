import { cn, getTechLogos } from "@/lib/utils";
import React from "react";
import Image from "next/image";


const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const teckIcons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {teckIcons
        .slice(0, 3)

        .map(({ tech, url }, idx) => {
          return (<div className={cn(" relative group bg-dark-300 rounded-full p-2 flex-center" , idx >= 1 && "-ml-3")} key={idx}>
            <span className="tech-tooltip">
                {tech}

            </span>
            <Image
            alt={tech}
            src={url}
            width={100}
            height={100}
            className="size-5"
             />

          </div>);
        })}
    </div>
  );
};

export default DisplayTechIcons;
