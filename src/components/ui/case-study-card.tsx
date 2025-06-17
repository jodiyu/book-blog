import React from "react"; 

import { cn } from "@/lib/utils";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image"; // Decides between text or image
  onClick?: ()=> void; // Added onClick prop to handle modal opening
}

// ContentCard Component for rendering text + image
const ContentCard: React.FC<CaseStudyCardProps> = ({ title, category, image, logo }) => {
  return (
    <div
      className="relative flex h-full flex-col items-start justify-between rounded-lg p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {image && <div className="opacity-70rounded-lg absolute inset-0 bg-black" />}

      <div className="relative z-10">
        {category && <div className="text-xs text-gray-200">{category}</div>}

        {title && (
          <div className="mr-2 text-lg font-bold leading-tight tracking-wide text-red-300">
            {title}
          </div>
        )}
      </div>
      {logo && ( // Check if image exists
        <img src={logo} alt={title} className="z-10 h-9 rounded-lg" />
      )}
    </div>
  );
};

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image }) => {
  return (
    <div
      className="relative flex w-full flex-col items-start justify-between rounded-lg p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

const HoverRevealSlip = ({ show }: { show: React.ReactNode }) => {
  return (
// w-52
    <div className={cn("hover-card relative h-60 w-52 [perspective:1000px]")}>
    {/*  w-48 */}
      <div className={cn("absolute inset-0 h-full w-48 rounded-lg bg-gray-50 shadow-md")}></div>
      
      <div
        className={cn(
          "card-container relative z-50 h-full w-48 origin-left transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        )}
      >
        <div className={cn("h-full w-full rounded-lg bg-white shadow-md absolute flex w-full h-full [backface-visibility:hidden]")}>
          {show}
        </div>
      </div>
      
      <div
        className={cn(
          "slide-tab z-1 absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-green-600 pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out [backface-visibility:hidden]"
        )}
      >
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9">CLICK TO read</div>
      </div>
      
      <style jsx>{`
        .hover-card:hover .card-container {
          transform: rotateY(-30deg);
        }
        .hover-card:hover .slide-tab {
          transform: translateX(0) rotate(5deg);
        }
      `}</style>
    </div>
  );
};

// Main CaseStudyCard Component
export default function CaseStudyCard({
  title,
  category,
  link,
  image,
  logo,
  type,
  onClick
}: CaseStudyCardProps) {
  return (
    <div className="flex gap-8">
      <div className="cursor-pointer" onClick={onClick}>
        <HoverRevealSlip
          show={
            type === "content" ? (
              <ContentCard title={title} category={category} image={image} logo={logo} />
            ) : (
              <SimpleImageCard image={image} title={title} />
            )
          }
        />
      </div>
    </div>
  );
}
