"use client";
import React from "react";

export default function MainContent({ children, sidebarOpen, topBarOpen }: { children: React.ReactNode, sidebarOpen: boolean, topBarOpen: boolean }) {
  // Assume desktop for this example; you can add isDesktop prop if needed
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 600 : true;
  const marginLeft = sidebarOpen ? 250 : 0;
  const marginTop = topBarOpen ? 56 : 0;
  return (
    <div
      className="main-content"
      style={{
        marginLeft,
        marginTop,
        transition: "margin 0.3s",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
} 