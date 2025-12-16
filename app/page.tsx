import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 dark:bg-black">
      <Hero />
      <div className="w-full">
        <TechStack />
      </div>
      <div className="h-[20vh] w-full flex items-center justify-center text-zinc-400">
        <p>More sections coming soon...</p>
      </div>
    </main>
  );
}
