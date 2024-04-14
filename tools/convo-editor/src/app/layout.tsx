import type { Metadata } from "next";
import "./_styles/globals.scss";

export const metadata: Metadata = {
  title: "Convo Editor",
  description: "Conversation Editor for Ser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
