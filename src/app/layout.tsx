import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Provider } from "@/provider/provider";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans", // Setting as the default sans variable
});

export const metadata: Metadata = {
  title: "FlowX - Workflow Automation",
  description: "Visual workflow automation for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} antialiased`}>
        <Provider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
