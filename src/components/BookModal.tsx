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
          <DialogTitle className="text-xl mb-1 font-georgia">{book.title}</DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-500 font-georgia">by {book.author}</p>
        </div>

        {/* Scrollable Review Section */}
        <div className="overflow-y-auto scrollbar-hide pr-2 mb-4 space-y-2 text-m flex-1 font-georgia">
          {book.quote && <blockquote className="italic text-zinc-00 dark:text-zinc-400">“{book.quote}”</blockquote>}
          {book.review && (
              <p
                className="whitespace-pre-line indent-8"
                dangerouslySetInnerHTML={{
                  __html: book.review
                    .replace(/~(.*?)~/g, "<em>$1</em>"),
                }}
              />
            )}       
        </div>

        {/* Close Button*/}
        <div className="mt-auto pt-2 ">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
