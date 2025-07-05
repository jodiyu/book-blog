import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  book: {
    title: string;
    author: string;
    quote?: string | null;
    review?: string | null;
  };
  onClose: () => void;
};

export default function BookModal({ book, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[80vh] flex flex-col">
        {/* Title and Author */}
        <div className="mb-1">
          <DialogTitle className="text-xl font-semibold mb-1">{book.title}</DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-500">by {book.author}</p>
        </div>

        {/* Scrollable Review Section */}
        <div className="overflow-y-auto scrollbar-hide pr-2 mb-4 space-y-2 text-m flex-1">
          {book.quote && <blockquote className="italic text-gray-700 dark:text-gray-300">“{book.quote}”</blockquote>}
          {book.review && <p className="whitespace-pre-line">{book.review}</p>}
        </div>

        {/* Close Button*/}
        <div className="mt-auto pt-2 ">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
