import { redirect } from "next/navigation";

// /start is the only live page right now. Anything landing on the root gets
// pushed into the funnel rather than hitting a placeholder.
export default function Home() {
  redirect("/start");
}
