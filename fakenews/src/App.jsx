import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Verify from './pages/Verify';
import History from './pages/History';
import Trending from './pages/Trending';
import About from './pages/About';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';

// Lazy load components for better performance
const LazySettings = React.lazy(() => import('./pages/Settings'));
const LazyPrivacy = React.lazy(() => import('./pages/Privacy'));
const LazyTerms = React.lazy(() => import('./pages/Terms'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="verify" element={<Verify />} />
              <Route path="history" element={<History />} />
              <Route path="trending" element={<Trending />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={<Profile />} />
              <Route 
                path="settings" 
                element={
                  <Suspense fallback={<LoadingSpinner variant="page" message="Loading settings..." />}>
                    <LazySettings />
                  </Suspense>
                } 
              />
              <Route 
                path="privacy" 
                element={
                  <Suspense fallback={<LoadingSpinner variant="page" message="Loading privacy policy..." />}>
                    <LazyPrivacy />
                  </Suspense>
                } 
              />
              <Route 
                path="terms" 
                element={
                  <Suspense fallback={<LoadingSpinner variant="page" message="Loading terms..." />}>
                    <LazyTerms />
                  </Suspense>
                } 
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;