import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { OpenSource } from "@/components/sections/open-source";
import { Stack } from "@/components/sections/stack";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <OpenSource />
      <Stack />
      <Resume />
      <Contact />
    </>
  );
}
