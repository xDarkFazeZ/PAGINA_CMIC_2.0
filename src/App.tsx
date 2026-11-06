import { cmicClasses } from './styles/recipes';
import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PWAUpdateNotifier from './components/PWAUpdateNotifier';
import ReactGA from "react-ga4";

// Componentes siempre necesarios (no lazy)
import ScrollProgress from "./components/scrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Convenios from "./components/convenios";
import Afiliados from "./components/afiliados";
import BurbujaWhatsapp from "./components/burbujaWhatsapp";

// ✅ Importación directa (sin React.lazy / sin Suspense)
import ItcHighlight from "./components/itc-highlight";
import IcicHighlight from "./components/icic-highlight";
import NoticiasGlobales from "./components/noticiasGlobales";

import Icic from "./pages/icic";
import Itc from "./pages/itc";
import Nosotros from "./pages/nosotros";
import ConveniosBuscador from "./pages/conveniosBuscador";
import MaestriaDetalle from "./pages/maestriaDetalle";
import Servicios from "./pages/servicios";
import CursosICIC from "./pages/cursosICIC";
import AsociadoProveedor from "./pages/asociadoProveedor";
import Afiliacion2025 from "./pages/afiliacion2025";
import AsociadoEstudiantil2025 from "./pages/asociadoEstudiantil";

// ✅ NUEVA PÁGINA UNIFICADA DE NOTICIAS
import Noticias from "../src/pages/noticias";

// ---------- Error Boundary pequeño y reutilizable ----------
class Boundary extends React.Component<React.PropsWithChildren, {hasError: boolean; err: unknown}> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(err: unknown) {
    return { hasError: true, err };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log opcional (Sentry / consola)
    // console.error("[Boundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={cmicClasses("route-fallback")} role="alert" style={{ padding: "1rem" }}>
          <h3>Ocurrió un problema al cargar esta sección.</h3>
          <p>Intenta recargar la página.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------- GA4 defensivo ----------
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isProd = import.meta.env.PROD;

try {
  if (isProd && MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID, { gaOptions: { anonymize_ip: true } });
  }
} catch (e) {
  // console.warn("[GA init error]", e);
}

// --------- Memo wrappers para evitar renders innecesarios aquí ---------
const MemoHeader = React.memo(Header);
const MemoFooter = React.memo(Footer);
const MemoHero = React.memo(Hero);
const MemoAfiliados = React.memo(Afiliados);
const MemoConvenios = React.memo(Convenios);
const MemoItcHighlight = React.memo(ItcHighlight);
const MemoIcicHighlight = React.memo(IcicHighlight);
const MemoNoticiasGlobales = React.memo(NoticiasGlobales);

const App = () => {
  const location = useLocation();
  const prevPathRef = useRef("");

  // Pageview solo cuando la ruta REAL cambie (performance + métricas limpias)
  useEffect(() => {
    if (!isProd || !MEASUREMENT_ID) return;
    const path = location.pathname + location.search;
    if (prevPathRef.current === path) return;
    prevPathRef.current = path;
    try {
      ReactGA.send({ hitType: "pageview", page: path });
    } catch (e) {
      // console.warn("[GA send error]", e);
    }
  }, [location]);

  return (
    <>
      {/* Si quieres, puedes comentar ScrollProgress también */}
      <ScrollProgress height={3} />
      <ScrollToTop />

      <MemoHeader />

      <main role="main" className={cmicClasses(location.pathname === '/' ? 'site-home' : undefined)}>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <Boundary>
                {/* ✅ Sin Scene: render plano, sin efectos de scroll */}
                <MemoHero />
                <MemoAfiliados />
                <MemoConvenios />
                <MemoItcHighlight />
                <MemoIcicHighlight />
                <Boundary>
                  <MemoNoticiasGlobales />
                </Boundary>
              </Boundary>
            }
          />

          {/* Servicios */}
          <Route path="/servicios" element={<Boundary><Servicios /></Boundary>} />
          <Route path="/servicios/asociado-proveedor" element={<Boundary><AsociadoProveedor /></Boundary>} />

          {/* Redirecciones temporales */}
          <Route path="/afiliacion-2025" element={<Boundary><Afiliacion2025 /></Boundary>} />
          <Route path="/asociado-estudiantil-2025" element={<Boundary><AsociadoEstudiantil2025 /></Boundary>} />

          {/* Otras páginas */}
          <Route path="/icic" element={<Boundary><Icic /></Boundary>} />
          <Route path="/cursosICIC" element={<Boundary><CursosICIC /></Boundary>} />
          <Route path="/itc" element={<Boundary><Itc /></Boundary>} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/maestria/:nombre" element={<Boundary><MaestriaDetalle /></Boundary>} />

          {/* Convenios */}
          <Route path="/convenios" element={<Boundary><ConveniosBuscador /></Boundary>} />

          {/* Duplicada por compatibilidad directa */}
          <Route path="/asociado-proveedor" element={<Boundary><AsociadoProveedor /></Boundary>} />

          {/* ✅ NOTICIAS UNIFICADAS - RUTA PRINCIPAL */}
          <Route path="/noticias" element={<Boundary><Noticias /></Boundary>} />

          {/* ✅ REDIRECCIONES PARA MANTENER COMPATIBILIDAD */}
          <Route path="/noticiasFacebook" element={<Boundary><Noticias /></Boundary>} />
          <Route path="/noticiasPrensa" element={<Boundary><Noticias /></Boundary>} />
          <Route path="/noticias/cmic" element={<Boundary><Noticias /></Boundary>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <MemoFooter />
      <BurbujaWhatsapp />
      <PWAUpdateNotifier />
    </>
  );
};

const NotFound = React.memo(() => (
  <div style={{ padding: "2rem", textAlign: "center", minHeight: "50vh" }}>
    <h2 aria-live="polite">Página no encontrada</h2>
    <p>La página que buscas no existe.</p>
  </div>
));

export default App;
