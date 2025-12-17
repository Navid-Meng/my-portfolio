import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Community from "@/components/sections/Community";
import GravityFooter from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#f5f1eb] dark:bg-black">
      <Hero />
      <div className="w-full">
        <TechStack />
      </div>
      <div className="w-full">
        <Community />
      </div>
      <GravityFooter />
    </main>
  );
}
