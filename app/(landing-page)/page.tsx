import { YELLOW } from "@/constants";
import { EggIcon } from "lucide-react";
import LandingPageHeader from "./_components/header";

const LandingPage = () => {
  return (
    <div className="container">
      <LandingPageHeader />

      {/* TODO: add more content */}

      <footer className="text-foreground body-font">
        <div className="container px-5 py-8 mx-auto flex items-center justify-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-foreground">
            <EggIcon color={YELLOW} fill={YELLOW} size={24} />
            <span className="ml-3 text-xl">Andami</span>
          </a>
          <p className="text-sm text-foreground sm:ml-6 sm:mt-0 mt-4">
            © 2024 Andami —
            <a
              href="https://twitter.com/andami"
              className="text-foreground ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @andami
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
