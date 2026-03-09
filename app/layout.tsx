import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "created by me",
    openGraph: {
      title: "NoteHub",
      description: "Create your notes with NoteHub",
      url: `https://notehub.com`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub"
        },
      ],
      type: 'article',
    },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main>
          {children}
          </main>
          {modal}
          <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
