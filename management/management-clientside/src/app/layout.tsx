'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanelMenubar from "./LeftPanelMenubar";
import TopNavbar from "./TopNavbar";
import MainContent from "./MainContent";
import Drawer from "@mui/material/Drawer";
import { set } from "date-fns";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [topBarOpen, setTopBarOpen] = useState<boolean| null>(null);

  useEffect(() => {
    // Set initial state based on screen size
    if (isDesktop) {
      setTopBarOpen(false);
    } else {
      setTopBarOpen(true);
    }
  }, [isDesktop]);

  // Update topBarOpen state when screen size changes

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {topBarOpen !== null && (
          isDesktop && !topBarOpen ? (
            <LeftPanelMenubar onCollapse={() => { setTopBarOpen(true) }} />
          ) : (
            <>
              {topBarOpen ? (
                <TopNavbar onExpand={() => { if (!isDesktop) { setDrawerOpen(true); setTopBarOpen(false) } else setTopBarOpen(false) }} />
              ) : null}
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => { setDrawerOpen(false); setTopBarOpen(true)}}
                ModalProps={{ keepMounted: true }}
              >
                <LeftPanelMenubar onCollapse={() => setDrawerOpen(false)} />
              </Drawer>
            </>
          )
        )}
        { topBarOpen !== null && <MainContent sidebarOpen={(isDesktop && topBarOpen === false)} topBarOpen={topBarOpen}>{children}</MainContent> } 
      </body>
    </html>
  );
}
