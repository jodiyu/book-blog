'use client';

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Heart, Shell, UserRound, BookOpen, Syringe, Sword } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { CalendarIcon } from "lucide-react"



// Icon mapping
const iconMap = {
  Heart,
  Shell,
  UserRound,
  BookOpen,
  Syringe,
  Sword,
};

interface CardProps {
  show: React.ReactNode;
  reveal: React.ReactNode;
  color: string;
  isFlipped: boolean;
  onFlip: () => void;
}

interface Book {
  title: string;
  dateRead: string;
  author: string;
}

interface CardDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  font: string;
  bookList: Book[];
  iconName: string;
  color: string;    
}

interface FlippingCardProps {
  list: CardDetailsProps[];
}



const Card = ({ show, reveal, color, isFlipped, onFlip }: CardProps) => {
  const common = "absolute flex w-full h-full  [backface-visibility:hidden]";
  return (
    <div className={cn(
      "group h-60 w-48 [perspective:1000px]",
    )} onClick={onFlip}>
      <div
        className={cn(
          "relative h-full transition-all delay-75 duration-500 ease-linear [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(-180deg)]" : ""
        )}
      >
        <div className={cn("bg-background", common)}>{show}</div>
        <div
          className={cn("[transform:rotateY(180deg)]", common)}
          style={{
            backgroundColor: color,
          }}
        >
          {reveal}
        </div>
      </div>
    </div>
  );
};

const CardDetails = ({ title, font, bookList, iconName, color }: CardDetailsProps) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]; 
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

  return (
    <Card
      show={
        <div className="flex w-full flex-col border-[1px] border-black/15 dark:border-white/40 bg-background px-3 py-4 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 shadow-sm">
          <span className="border-t-2 border-black dark:border-white pt-1 group-hover:border-accent-foreground transition-colors duration-200">{font}</span>
          <span className="mt-4 border-b-2 border-black dark:border-white px-1 font-times text-8xl group-hover:border-accent-foreground transition-colors duration-200">{title}</span>
          <div className="mt-12 flex items-center justify-between">
            {IconComponent && <IconComponent size={18} className="transition-colors duration-200" />}
          </div>
        </div>
      }
      reveal={
  <div className="flex w-full h-full flex-col overflow-hidden py-4 text-sm px-4"> 

    <ul className="text-white flex-1 list-inside">
      {bookList.map((book, i) => (
        <li key={i}>
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer hover:bg-primary/30">
              {book.title}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{book.title}</h4>
                <h4 className="text-xs">Author: {book.author}</h4>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Year read: { book.dateRead }
                </span>
              </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </li>
      ))}
    </ul>
    <div className="flex-1"></div>  {/* Wraps nothing to push everything to the bottom */}
    <div>
        <Marquee className="font-times text-5xl text-white mb-1x" applyMask={false}>
        {font.split(" ")[0]}
        </Marquee>
    </div>

  </div>
}
        color={color}
        isFlipped={isFlipped}
        onFlip={handleFlip}

    />
  );
};

export default function FlippingCard({ list }: FlippingCardProps) {
  return (
    <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-2">
      {list.map((item, index) => (
        <CardDetails
          key={`card_${index}`}
          title={item.title}
          font={item.font}
          bookList={item.bookList}
          iconName={item.iconName}
          color={item.color}
        />
      ))}
    </div>
  );
}
