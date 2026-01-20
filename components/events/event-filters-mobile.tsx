"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CITIES, EVENT_TYPES, PERIODS } from "@/lib/data/events";
import { eventsSearchParamsConfig } from "@/lib/search-params/events";
import { cn } from "@/lib/utils";

export function EventFiltersMobile() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useQueryStates(eventsSearchParamsConfig, {
    shallow: false,
  });

  // Local state for pending changes
  const [localFilters, setLocalFilters] = useState(filters);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLocalFilters(filters);
    }
    setOpen(isOpen);
  };

  const toggleCity = (cityId: string) => {
    const current = localFilters.villes;
    const newVilles = current.includes(cityId)
      ? current.filter((v) => v !== cityId)
      : [...current, cityId];
    setLocalFilters({ ...localFilters, villes: newVilles });
  };

  const toggleType = (typeId: string) => {
    setLocalFilters({
      ...localFilters,
      type: localFilters.type === typeId ? "" : typeId,
    });
  };

  const togglePeriode = (periodeId: string) => {
    setLocalFilters({
      ...localFilters,
      periode: localFilters.periode === periodeId ? "" : periodeId,
    });
  };

  const toggleRemote = (checked: boolean) => {
    setLocalFilters({ ...localFilters, remote: checked });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    setOpen(false);
  };

  const resetFilters = () => {
    const reset = { villes: [], type: "", remote: false, periode: "" };
    setLocalFilters(reset);
  };

  const hasActiveFilters =
    filters.villes.length > 0 ||
    filters.type !== "" ||
    filters.remote ||
    filters.periode !== "";

  return (
    <div className="md:hidden mb-6">
      <Sheet open={open} onOpenChange={handleOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Actifs
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filtrer les events</SheetTitle>
          </SheetHeader>

          <div className="py-6 space-y-6">
            {/* Villes */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Villes</span>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <Badge
                    key={city.id}
                    variant={
                      localFilters.villes.includes(city.id) ? "default" : "outline"
                    }
                    className={cn(
                      "cursor-pointer transition-colors",
                      localFilters.remote && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !localFilters.remote && toggleCity(city.id)}
                  >
                    {city.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Type</span>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((type) => (
                  <Badge
                    key={type.id}
                    variant={localFilters.type === type.id ? "default" : "outline"}
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
                id="remote-mobile"
                checked={localFilters.remote}
                onCheckedChange={toggleRemote}
              />
              <Label htmlFor="remote-mobile" className="text-sm cursor-pointer">
                Uniquement en ligne
              </Label>
            </div>

            {/* Période */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Période</span>
              <div className="flex flex-wrap gap-2">
                {PERIODS.map((periode) => (
                  <Badge
                    key={periode.id}
                    variant={
                      localFilters.periode === periode.id ? "default" : "outline"
                    }
                    className="cursor-pointer transition-colors"
                    onClick={() => togglePeriode(periode.id)}
                  >
                    {periode.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter className="flex-row gap-2">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Réinitialiser
            </Button>
            <Button onClick={applyFilters} className="flex-1">
              Appliquer
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
