import { Game } from "@/components/game/game";
import { TextVersion } from "@/components/game/text-version";

export default function Home() {
  return (
    <main>
      <TextVersion />
      <Game />
    </main>
  );
}
