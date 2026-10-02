import type { Metadata } from "next";
import { Fira_Sans, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-fira-sans",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MCR Palestine Film Festival",
    template: "%s | MCR Palestine Film Festival",
  },
  description:
    "Manchester's celebration of Palestinian cinema — stories that matter, screened across the city.",
  metadataBase: new URL("https://mcrpalff.org"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MCR Palestine Film Festival",
    title: "MCR Palestine Film Festival",
    description:
      "Manchester's celebration of Palestinian cinema — stories that matter, screened across the city.",
    url: "https://mcrpalff.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCR Palestine Film Festival",
    description:
      "Manchester's celebration of Palestinian cinema — stories that matter, screened across the city.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${firaSans.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MCR Palestine Film Festival",
              url: "https://mcrpalff.org",
              sameAs: [],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
