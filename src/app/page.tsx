import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/features/hero/components/hero-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { ContactSection } from "@/features/contact/components/contact-section";



import { headers } from "next/headers"
  //const headersList = headers();
  //const countryCode = headersList.get('x-vercel-ip-country');

export default async function Home() {

  const headersList = await headers();
const countryCode = headersList.get();
//const isFromVenezuela = countryCode === "VE";
    console.log("SAPO", headersList)
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
