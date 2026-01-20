import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventEmptyStateProps {
  message?: string;
}

export function EventEmptyState({
  message = "Aucun event trouvé pour ces critères.",
}: EventEmptyStateProps) {
  return (
    <div className="rounded-lg border border-border/50 p-8 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button variant="outline" asChild>
        <Link href="#newsletter">Se tenir informé</Link>
      </Button>
    </div>
  );
}
