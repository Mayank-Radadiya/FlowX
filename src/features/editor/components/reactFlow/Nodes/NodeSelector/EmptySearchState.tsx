import { Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptySearchState = ({ searchQuery }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
      <Search className="size-5 text-muted-foreground" />
    </div>
    <h3 className="mt-4 text-sm font-medium text-foreground">No nodes found</h3>
    <p className="mt-1 text-xs text-muted-foreground">
      No results for &ldquo;{searchQuery}&rdquo;. Try a different search term.
    </p>
  </div>
);

export default EmptySearchState;
