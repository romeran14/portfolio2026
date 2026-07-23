import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/features/hero/components/hero-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { headers } from "next/headers";
import { userIsVen } from "@/lib/utils/geo";


export default async function Home() {

  const headersList = await headers();
  const isVen = userIsVen(headersList);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection isVen={isVen} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
