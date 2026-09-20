import { LanguageProvider } from "./i18n/LanguageProvider";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PortfolioSections } from "./components/PortfolioSections";

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <PortfolioSections />
      </main>
    </LanguageProvider>
  );
}