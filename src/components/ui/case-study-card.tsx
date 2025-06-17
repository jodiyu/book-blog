import React from "react"; 
import { cn } from "@/lib/utils";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  image?: string;
  onClick?: ()=> void; // Added onClick prop to handle modal opening
}

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image }) => {
  return (
    <div
      className="relative flex w-full h-full flex-col items-start justify-between rounded-lg p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

const HoverRevealSlip = ({ show, image }: { show: React.ReactNode; image?: string }) => {
  return (
    <div className={cn("hover-card relative h-56 w-44 [perspective:1000px]")}>
    
      {/* Back cover with same image as front cover */}
      <div 
        className={cn("absolute inset-0 h-full w-40 rounded-lg shadow-md")}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay to differentiate back from front */}
        <div className="absolute inset-0 bg-black/20 rounded-lg" />
      </div>
      
      <div
        className={cn(
          "card-container relative z-50 h-full w-40 origin-left transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        )}
      >
        <div className={cn("absolute inset-0 h-full w-full rounded-lg shadow-md flex [backface-visibility:hidden]")}>
          {show}
        </div>
      </div>
      
      <div
        className={cn(
          "slide-tab z-1 absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-black dark:bg-white pl-2 pt-2 text-xs font-bold text-white dark:text-black transition-transform duration-300 ease-in-out [backface-visibility:hidden]"
        )}
      >
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9">Click to read</div>
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
  image,
  onClick
}: CaseStudyCardProps) {
  return (
    <div className="flex gap-8">
      <div className="cursor-pointer" onClick={onClick}>
        <HoverRevealSlip
          image={image} // Pass the image to the back cover
          show={
              <SimpleImageCard image={image} title={title} />
          }
        />
      </div>
    </div>
  );
}