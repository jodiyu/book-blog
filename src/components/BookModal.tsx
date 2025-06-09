
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
      <DialogContent className="max-w-md">
        <DialogTitle className="text-xl font-semibold">{book.title}</DialogTitle>
        <div>
          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
          {book.quote && <blockquote className="italic mb-2">“{book.quote}”</blockquote>}
          {book.review && <p>{book.review}</p>}
        </div>
        <div className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
