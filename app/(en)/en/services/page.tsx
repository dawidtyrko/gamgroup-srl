import { redirect } from "next/navigation";
import { href } from "@/lib/routes";

// "Servizi" has no page of its own: it opens the first service.
export default function Page() {
  redirect(href("servizio:erp", "en"));
}
