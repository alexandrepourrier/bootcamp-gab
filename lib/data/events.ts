import type { Event } from "@/lib/supabase/types";

export interface EventFilters {
  villes: string[];
  type: string | null;
  remote: boolean;
  periode: string | null;
}

/**
 * Extrait la ville normalisée depuis la location
 */
function extractCity(location: string | null): string | null {
  if (!location) return null;
  const normalized = location.toLowerCase();
  if (normalized.includes("lille")) return "lille";
  if (normalized.includes("paris")) return "paris";
  if (normalized.includes("lyon")) return "lyon";
  return null;
}

/**
 * Filtre les events selon les critères
 */
export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  return events.filter((event) => {
    // Filtre remote : si coché, uniquement les events en ligne
    if (filters.remote && !event.is_remote) {
      return false;
    }

    // Filtre villes (ignoré si remote est coché)
    if (!filters.remote && filters.villes.length > 0) {
      const eventCity = extractCity(event.location);
      if (!eventCity || !filters.villes.includes(eventCity)) {
        return false;
      }
    }

    // Filtre type
    if (filters.type && event.event_type !== filters.type) {
      return false;
    }

    // Filtre période
    if (filters.periode === "a-venir") {
      const isPast = event.is_past || new Date(event.event_date) < new Date();
      if (isPast) return false;
    } else if (filters.periode === "replays") {
      const isPast = event.is_past || new Date(event.event_date) < new Date();
      if (!isPast || !event.replay_url) return false;
    }

    return true;
  });
}

/**
 * Trie et sépare les events en upcoming et past
 */
export function sortEvents(events: Event[]): {
  upcoming: Event[];
  past: Event[];
} {
  const now = new Date();

  const upcoming: Event[] = [];
  const past: Event[] = [];

  for (const event of events) {
    const isPast = event.is_past || new Date(event.event_date) < now;
    if (isPast) {
      past.push(event);
    } else {
      upcoming.push(event);
    }
  }

  // Upcoming : du plus proche au plus lointain
  upcoming.sort(
    (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  );

  // Past : du plus récent au plus ancien
  past.sort(
    (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );

  return { upcoming, past };
}

/**
 * Constantes pour les filtres
 */
export const CITIES = [
  { id: "lille", label: "Lille" },
  { id: "paris", label: "Paris" },
  { id: "lyon", label: "Lyon" },
] as const;

export const EVENT_TYPES = [
  { id: "meetup", label: "Meetup" },
  { id: "webinar", label: "Webinar" },
  { id: "workshop", label: "Workshop" },
] as const;

export const PERIODS = [
  { id: "a-venir", label: "À venir" },
  { id: "replays", label: "Replays disponibles" },
] as const;
