import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  image?: string;
  onClick?: ()=> void; // Added onClick prop to handle modal opening
  setIsLoading?: (loading: boolean) => void; // Loading state to deal with image loading with 'click to read' component
}

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image, title, setIsLoading }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  if (!image) return null;
  
  return (
    <div className="relative flex w-full h-full flex-col items-start justify-between rounded-lg overflow-hidden">
        {/* Skeleton loader - shows while image is loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 z-10" />
        )}
        <Image
          src={image}
          alt={title || "Image"}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className={cn(
            "object-cover transition-opacity duration-500 relative z-30",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => {
            setImageLoaded(true);
            setIsLoading?.(false);
          }}
          onError={() => {
            setImageLoaded(true);
            setIsLoading?.(false);
          }}
        />
    </div>
  );
};

const HoverRevealSlip = ({ show, image, isLoading }: { show: React.ReactNode; image?: string; isLoading?:boolean }) => {
  const [showTab, setShowTab] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      // Delay showing the tab by 500ms after image loads or else appears in front of image bug
      const timer = setTimeout(() => {
        setShowTab(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowTab(false);
    }
  }, [isLoading]);

  return (
    <div className={cn("hover-card relative h-56 w-44 [perspective:1000px]")}>
    
      {/* Back cover with same image as front cover */}
      <div className={cn("absolute inset-0 h-full w-40 rounded-lg shadow-md overflow-hidden")}>
        {image && (
          <>
            <Image
              src={image}
              alt="Book back cover"
              fill
              sizes="160px"
              className="object-cover"
            />
            {/* Overlay to differentiate back from front */}
            <div className="absolute inset-0 bg-black/20 rounded-lg" />
          </>
        )}
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
          "slide-tab absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-black dark:bg-white pl-2 pt-2 text-xs font-bold text-white dark:text-black transition-all duration-500",
          showTab ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
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
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <div className="flex gap-8">
      <div className="cursor-pointer" onClick={onClick}>
        <HoverRevealSlip
          image={image} // Pass the image to the back cover
          isLoading={isLoading}
          show={
              <SimpleImageCard image={image} title={title} setIsLoading={setIsLoading}/>
          }
        />
      </div>
    </div>
  );
}