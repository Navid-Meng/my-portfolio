import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-zinc-50 dark:bg-black">
      <Hero />
      <div className="h-[200vh] w-full flex items-center justify-center text-zinc-400">
        <p>Scroll down to test navbar effect</p>
      </div>
    </main>
  );
}
