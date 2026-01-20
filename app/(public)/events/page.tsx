import type { Metadata } from "next";
import { Suspense } from "react";
import { Calendar, Play } from "lucide-react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { EventCard } from "@/components/events/event-card";
import { EventFilters } from "@/components/events/event-filters";
import { EventFiltersMobile } from "@/components/events/event-filters-mobile";
import { EventEmptyState } from "@/components/events/event-empty-state";
import {
  getEvents,
  filterEvents,
  sortEvents,
  type EventFilters as EventFiltersType,
} from "@/lib/data/events";
import { eventsSearchParamsCache } from "@/lib/search-params/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB.",
};

interface EventsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const { villes, type, remote, periode } = eventsSearchParamsCache.parse(params);

  const filters: EventFiltersType = {
    villes,
    type: type || null,
    remote,
    periode: periode || null,
  };

  const allEvents = getEvents();
  const filteredEvents = filterEvents(allEvents, filters);
  const { upcoming, past } = sortEvents(filteredEvents);

  return (
    <NuqsAdapter>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mb-12">
          <h1 className="font-heading text-3xl font-bold mb-4">Events</h1>
          <p className="text-lg text-muted-foreground">
            Meetups, webinars et workshops avec des experts GenAI. Participe en
            direct ou regarde les replays.
          </p>
        </div>

        <Suspense fallback={null}>
          <EventFilters />
          <EventFiltersMobile />
        </Suspense>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Prochains events
          </h2>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EventEmptyState message="Aucun event à venir pour ces critères." />
          )}
        </section>

        {/* Past Events / Replays */}
        <section>
          <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Events passés
          </h2>
          {past.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EventEmptyState message="Aucun event passé pour ces critères." />
          )}
        </section>
      </div>
    </NuqsAdapter>
  );
}
