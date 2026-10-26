import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FrameGrid from "@/components/FrameGrid";
import AboutTeaser from "@/components/AboutTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FrameGrid />
        <AboutTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
