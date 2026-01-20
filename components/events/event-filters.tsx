"use client";

import { useQueryStates } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CITIES, EVENT_TYPES, PERIODS } from "@/lib/data/events";
import { eventsSearchParamsConfig } from "@/lib/search-params/events";
import { cn } from "@/lib/utils";

export function EventFilters() {
  const [filters, setFilters] = useQueryStates(eventsSearchParamsConfig, {
    shallow: false,
  });

  const toggleCity = (cityId: string) => {
    const current = filters.villes;
    const newVilles = current.includes(cityId)
      ? current.filter((v) => v !== cityId)
      : [...current, cityId];
    setFilters({ villes: newVilles });
  };

  const toggleType = (typeId: string) => {
    setFilters({ type: filters.type === typeId ? "" : typeId });
  };

  const togglePeriode = (periodeId: string) => {
    setFilters({ periode: filters.periode === periodeId ? "" : periodeId });
  };

  const toggleRemote = (checked: boolean) => {
    setFilters({ remote: checked });
  };

  return (
    <div className="hidden md:block mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Villes */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Villes :</span>
          <div className="flex gap-2">
            {CITIES.map((city) => (
              <Badge
                key={city.id}
                variant={filters.villes.includes(city.id) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  filters.remote && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !filters.remote && toggleCity(city.id)}
              >
                {city.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Type :</span>
          <div className="flex gap-2">
            {EVENT_TYPES.map((type) => (
              <Badge
                key={type.id}
                variant={filters.type === type.id ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleType(type.id)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Remote checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="remote"
            checked={filters.remote}
            onCheckedChange={toggleRemote}
          />
          <Label htmlFor="remote" className="text-sm cursor-pointer">
            Uniquement en ligne
          </Label>
        </div>

        {/* Période */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Période :</span>
          <div className="flex gap-2">
            {PERIODS.map((periode) => (
              <Badge
                key={periode.id}
                variant={filters.periode === periode.id ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => togglePeriode(periode.id)}
              >
                {periode.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
