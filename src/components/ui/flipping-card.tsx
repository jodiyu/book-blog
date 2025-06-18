import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

interface CardProps {
  show: React.ReactNode;
  reveal: React.ReactNode;
}

interface CardDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  font: string;
  bookList: string[];
  icon: React.ReactNode;
}

interface FlippingCardProps {
  list: CardDetailsProps[];
}

const Card = ({ show, reveal }: CardProps) => {
  const common = "absolute flex w-full h-full  [backface-visibility:hidden]";
  const colorsILike = ["#92a452", "#79ced1", "#ca932a", "#cb310e", "#b33139", "#a2527b", "#5fac4e","#d61b50", "#5ba6ed","#1e646f","#49de03","#5a215a","#0e643d","#175f76","#b2a6ff"];
  const color = colorsILike[Math.floor(Math.random() * colorsILike.length)];
  //const color = `#${(((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")}`; // Random color generator
  console.log("color", color);
  return (
    <div className={cn("group h-60 w-48 [perspective:1000px]")}>
      <div
        className={cn(
          "relative h-full transition-all delay-75 duration-500 ease-linear [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)]",
        )}
      >
        <div className={cn("bg-white", common)}>{show}</div>
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

const CardDetails = ({ title, font, bookList, icon }: CardDetailsProps) => {
  return (
    <Card
      show={
        <div className="flex w-full flex-col border-[1px] border-black/15 px-3 py-4 text-sm">
          <span className="border-t-2 border-black pt-1">{font}</span>

          <span className="mt-4 border-b-2 border-black px-1 font-serif text-8xl">{title}</span>
          <div className="mt-12 flex items-center justify-between">
            {icon}
          </div>
        </div>
      }
      reveal={
  <div className="flex w-full h-full flex-col overflow-hidden py-4 text-sm px-4"> 

    <ul className="text-white flex-1 list-inside">
      {bookList.map((book, i) => (
        <li key={i}>{book}</li>
      ))}
    </ul>
    <div className="flex-1"></div>  {/* Wraps nothing to push everything to the bottom */}
    <div>
        <Marquee className="font-serif text-5xl text-white mb-1x" applyMask={false}>
        {font.split(" ")[0]}
        </Marquee>
    </div>

    <div className="flex items-center justify-end pt-2">
      {icon}
    </div>
  </div>
}

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
          icon={item.icon}
        />
      ))}
    </div>
  );
}
