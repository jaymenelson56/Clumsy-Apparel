import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Navigation from '@/components/Navigation';
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.onThemeUpdated((isDark) => {
        document.documentElement.classList.toggle("dark-mode", isDark);
      });
    }
  }, []);
  return (<>
    <Navigation />
    <Component {...pageProps} />
  </>
  )
}
