import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Providers from "~/components/Provider";
export const metadata: Metadata = {
  title: "CivicNet",
  description: "Report issues, get solutions – swiftly.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
