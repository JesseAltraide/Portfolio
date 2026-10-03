import { Experience } from "./components/Experience";
import { FloatingNav } from "./components/FloatingNav";
import { Footer } from "./components/Footer";
import { GlowBackground } from "./components/GlowBackground";
import { Hero } from "./components/Hero";
import { ProjectTabs } from "./components/ProjectTabs";
import { SkillsStack } from "./components/SkillsStack";

export default function App() {
  return (
    <main>
      <GlowBackground />
      <FloatingNav />
      <Hero />
      <ProjectTabs />
      <Experience />
      <SkillsStack />
      <Footer />
    </main>
  );
}
