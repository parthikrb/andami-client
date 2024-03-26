import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPageHeader = () => {
  return (
    <div className="bg-background text-foreground w-full h-16 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Andami</h1>
      <div className="sm:block hidden">
        <Button asChild>
          <Link href="/sign-in" className="mr-4">
            Get started
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPageHeader;
