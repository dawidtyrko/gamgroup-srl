import type { Dict, FaqId } from "./i18n/types";

/**
 * Resolves FAQ ids to dictionary entries, silently dropping ids the dictionary
 * doesn't have. Lives in lib/ (not in the UI module) so the JSON-LD builder can
 * use it without pulling in React components.
 */
export function pickFaq(dict: Dict, ids: FaqId[]) {
  return ids.flatMap((id) => dict.faq.find((f) => f.id === id) ?? []);
}
