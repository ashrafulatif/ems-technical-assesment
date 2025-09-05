import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "../components/layout/AppWrapper";
import { EventsProvider } from "@/context/EventsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EMS-Event Management System",
  description: "A comprehensive platform for managing events seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EventsProvider>
          <AppWrapper>{children}</AppWrapper>
        </EventsProvider>
      </body>
    </html>
  );
}
