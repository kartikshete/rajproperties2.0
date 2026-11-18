import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Code-split pages for high performance on mobile devices
const HomePage = lazy(() => import('./pages/HomePage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Apple-style subtle route loading indicator
function RouteFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#1D1D1F]/20 border-t-[#0071E3] rounded-full animate-spin" />
    </div>
  );
}

// Auto-scroll to top on route change or handle hash navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* 8 Dedicated SEO Location Pages */}
          <Route path="/locations/:slug" element={<LocationPage />} />

          {/* 404 Not Found Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
