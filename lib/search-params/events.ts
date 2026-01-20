import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
} from "nuqs/server";

export const eventsSearchParamsConfig = {
  villes: parseAsArrayOf(parseAsString).withDefault([]),
  type: parseAsString.withDefault(""),
  remote: parseAsBoolean.withDefault(false),
  periode: parseAsString.withDefault(""),
};

export const eventsSearchParamsCache = createSearchParamsCache(
  eventsSearchParamsConfig
);
