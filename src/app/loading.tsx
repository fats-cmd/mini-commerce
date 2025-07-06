'use client'
import Loader from "@/components/Logos/Loader";

import React from "react";

export default function Loading() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
      <Loader />
      {show && (
        <span className="mt-4 text-gray-700 text-lg animate-pulse">Loading products...</span>
      )}
    </div>
  );
}
// This component is used to show a loading state while the page is being loaded.
// It displays a centered loader component that animates to indicate loading progress.