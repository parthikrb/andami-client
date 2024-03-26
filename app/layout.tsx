import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import { ThemeProvider } from "../providers/theme-provider";
import QueryProvider from "@/providers/query-client-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Andami",
  description: "Making sense of the team sentiment",
};

const font = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={font.className} suppressHydrationWarning>
        <head />
        <body>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <SpeedInsights />
              <Analytics />
            </ThemeProvider>
            <Toaster />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
