import { cmicClasses } from '../styles/recipes';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight, FaArrowUpRightFromSquare, FaChevronDown, FaXmark } from 'react-icons/fa6';
import logoImage from '../lib/imagen2.png';
import icicLogo from '../lib/icic-logo.webp';
import itcLogo from '../lib/itc-logo.webp';
import ficLogo from '../lib/fic-logo.webp';
import cmicNacionalLogo from '../lib/cmic_nacional.png';
import codigoEtica from '../pdf/codigodeetica.pdf';
import estatutos from '../pdf/estatutos.pdf';

const DESKTOP_QUERY = '(min-width: 841px)';
const CLOSED_SUBMENUS = { cmic: false, icic: false, nos: false };
type MenuKey = keyof typeof CLOSED_SUBMENUS;
interface NavItem { to?: string; href?: string; download?: string; label: string }
const SUBMENU_CONFIG: Record<MenuKey, NavItem[]> = {
  cmic: [
    { to: '/servicios', label: 'Servicios CMIC' },
    { to: '/convenios', label: 'Convenios y beneficios' },
    { to: '/asociado-estudiantil-2025', label: 'Asociado Estudiantil 2025' },
    { to: '/afiliacion-2025', label: '¡Afíliate a la CMIC!' },
    { to: '/servicios/asociado-proveedor', label: 'Asociado Proveedor' },
  ],
  nos: [
    { to: '/nosotros', label: 'Nuestra Delegación' },
    { href: codigoEtica, download: 'CMIC-Codigo-de-Etica.pdf', label: 'Código de Ética (PDF)' },
    { href: estatutos, download: 'CMIC-Estatutos.pdf', label: 'Estatutos (PDF)' },
  ],
  icic: [
    { to: '/icic', label: 'Conoce ICIC' },
    { to: '/cursosICIC', label: 'Cursos y capacitación' },
  ],
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

interface MenuItemProps {
  type: MenuKey;
  label: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onLinkClick: () => void;
  currentPath: string;
}
const MenuItem = React.memo(function MenuItem({ type, label, isOpen, onOpen, onClose, onToggle, onLinkClick, currentPath }: MenuItemProps) {
  const items = SUBMENU_CONFIG[type];
  const hasCurrentPage = items.some(item => item.to === currentPath);
  return (
    <li className={cmicClasses(`has-submenu ${isOpen ? 'open' : ''}`)} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button type="button" className={cmicClasses(`as-link ${hasCurrentPage ? 'current-section' : ''}`)}
        aria-expanded={isOpen} aria-controls={`submenu-${type}`} onClick={onToggle}>
        {label}<span className={cmicClasses("caret")} aria-hidden="true"><FaChevronDown /></span>
      </button>
      <div id={`submenu-${type}`} className={cmicClasses(`submenu ${isOpen ? 'show' : ''}`)} hidden={!isOpen}>
        {items.map(item => item.to ? (
          <Link key={item.to} to={item.to} onClick={onLinkClick} aria-current={currentPath === item.to ? 'page' : undefined}>
            {item.label}
          </Link>
        ) : (
          <a key={item.href} href={item.href} download={item.download} type="application/pdf"
            onClick={onLinkClick} target="_blank" rel="noopener noreferrer">
            {item.label}<FaArrowUpRightFromSquare aria-hidden="true" className={cmicClasses("submenu-file-icon")} />
          </a>
        ))}
      </div>
    </li>
  );
});

const LOGOS = [
  { href: 'https://cmic.org/', src: cmicNacionalLogo, alt: 'CMIC Nacional' },
  { to: '/icic', src: icicLogo, alt: 'ICIC' },
  { to: '/itc', src: itcLogo, alt: 'ITC' },
  { href: 'https://www.fic.org.mx/#!/-inicio/', src: ficLogo, alt: 'FIC' },
];
function LogosStrip({ mobile = false, onLinkClick }: { mobile?: boolean; onLinkClick: () => void }) {
  const links = LOGOS.map(logo => {
    const content = <img src={logo.src} alt={logo.alt} className={cmicClasses(mobile ? '' : 'brandmark')} loading="lazy" decoding="async" />;
    return logo.to ? (
      <Link key={logo.alt} to={logo.to} onClick={onLinkClick} aria-label={`Ir a ${logo.alt}`}>{content}</Link>
    ) : (
      <a key={logo.alt} href={logo.href} onClick={onLinkClick} target="_blank" rel="noopener noreferrer"
        aria-label={`Ir a ${logo.alt} (se abre en nueva pestaña)`}>{content}</a>
    );
  });
  return mobile ? (
    <div className={cmicClasses("brand-grid-mobile")}>
      <p className={cmicClasses("mobile-section-label")}>Nuestra red de instituciones</p>
      <div className={cmicClasses("brand-grid")} aria-label="Instituciones CMIC">{links}</div>
    </div>
  ) : <li className={cmicClasses("logos-li")} aria-label="Logos de dependencias">{links}</li>;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 50);
  const [submenus, setSubmenus] = useState(CLOSED_SUBMENUS);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // All mobile-only side effects use the same breakpoint-aware state.
  const mobileMenuOpen = isOpen && !isDesktop;
  const timersRef = useRef<Partial<Record<MenuKey, ReturnType<typeof setTimeout>>>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  const clearHoverTimers = useCallback(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
  }, []);
  const closeAllSubmenus = useCallback(() => setSubmenus(CLOSED_SUBMENUS), []);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    closeAllSubmenus();
    hamburgerRef.current?.focus({ preventScroll: true });
  }, [closeAllSubmenus]);
  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
    closeAllSubmenus();
    if (!mobileMenuOpen) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [mobileMenuOpen, closeAllSubmenus]);

  useEffect(() => {
    setIsOpen(false);
    closeAllSubmenus();
    clearHoverTimers();
  }, [isDesktop, location.pathname, closeAllSubmenus, clearHoverTimers]);
  useEffect(() => clearHoverTimers, [clearHoverTimers]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!document.body.classList.contains('menu-open')) setIsScrolled(window.scrollY > 50);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, []);

  // Preserve the scroll position, including on iOS. Cleanup also runs on resize.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const saved = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    const rootOverflow = root.style.overflow;
    body.classList.add('menu-open');
    Object.assign(body.style, { position: 'fixed', top: `-${scrollY}px`, width: '100%', overflow: 'hidden' });
    root.style.overflow = 'hidden';
    return () => {
      body.classList.remove('menu-open');
      Object.assign(body.style, saved);
      root.style.overflow = rootOverflow;
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.toggleAttribute('inert', !isDesktop && !mobileMenuOpen);
    if (!mobileMenuOpen) return;
    const focusFrame = requestAnimationFrame(() => {
      // Resolve the opening visibility style before trying to move focus.
      closeRef.current?.getBoundingClientRect();
      closeRef.current?.focus({ preventScroll: true });
    });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
      if (event.key !== 'Tab') return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        .filter(element => element.getClientRects().length > 0);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!panel.contains(document.activeElement)) { event.preventDefault(); closeRef.current?.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKey);
    };
  }, [mobileMenuOpen, isDesktop, closeMenu]);

  const hover = (menu: MenuKey, open: boolean) => {
    if (!isDesktop) return;
    clearTimeout(timersRef.current[menu]);
    const update = () => setSubmenus(previous => ({ ...previous, [menu]: open }));
    if (reducedMotion) update();
    else timersRef.current[menu] = setTimeout(update, open ? 100 : 160);
  };
  const menuItem = (type: MenuKey, label: string) => (
    <MenuItem type={type} label={label} isOpen={submenus[type]} currentPath={location.pathname}
      onOpen={() => hover(type, true)} onClose={() => hover(type, false)}
      onToggle={() => {
        clearTimeout(timersRef.current[type]);
        setSubmenus(previous => ({ ...(!isDesktop ? CLOSED_SUBMENUS : previous), [type]: !previous[type] }));
      }} onLinkClick={handleLinkClick} />
  );

  return (
    <header className={cmicClasses(`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`)}>
      <div className={cmicClasses("logo-container")}>
        <Link to="/" onClick={handleLinkClick} aria-label="CMIC Aguascalientes — inicio" tabIndex={mobileMenuOpen ? -1 : undefined}>
          <img src={logoImage} alt="CMIC Aguascalientes" className={cmicClasses("logo")} />
        </Link>
      </div>
      <button ref={hamburgerRef} className={cmicClasses("hamburger")} onClick={() => setIsOpen(previous => !previous)}
        aria-label="Abrir menú de navegación" aria-expanded={mobileMenuOpen} aria-controls="nav-menu"
        tabIndex={mobileMenuOpen ? -1 : undefined} type="button">
        <span className={cmicClasses("hamburger-lines")} aria-hidden="true"><span className={cmicClasses("bar")} /><span className={cmicClasses("bar")} /><span className={cmicClasses("bar")} /></span>
        <span className={cmicClasses("hamburger-label")}>Menú</span>
      </button>

      <div id="nav-menu" className={cmicClasses(`nav-menu ${mobileMenuOpen ? 'active' : ''}`)} ref={panelRef}
        onTransitionEnd={event => {
          if (event.target === panelRef.current && mobileMenuOpen && !panelRef.current.contains(document.activeElement)) {
            closeRef.current?.focus({ preventScroll: true });
          }
        }}
        role={isDesktop ? undefined : 'dialog'} aria-modal={mobileMenuOpen ? true : undefined}
        aria-label={isDesktop ? undefined : 'Menú de navegación'} aria-hidden={!isDesktop && !mobileMenuOpen}>
        {!isDesktop && (
          <div className={cmicClasses("mobile-panel-heading")}>
            <div className={cmicClasses("d-flex align-items-center justify-content-between gap-3")}>
              <Link to="/" onClick={handleLinkClick} className={cmicClasses("mobile-panel-brand")} aria-label="CMIC Aguascalientes — inicio">
                <img src={logoImage} alt="CMIC Aguascalientes" />
              </Link>
              <button ref={closeRef} type="button" className={cmicClasses("mobile-close tw:grid tw:place-items-center tw:size-11 tw:shrink-0 tw:rounded-full")} onClick={closeMenu} aria-label="Cerrar menú de navegación">
                <FaXmark aria-hidden="true" />
              </button>
            </div>
            <p className={cmicClasses("mobile-panel-eyebrow")}>CMIC · AGUASCALIENTES</p>
            <h2 className={cmicClasses("tw:text-2xl tw:font-semibold tw:tracking-tight")}>Construimos conexiones.</h2>
            <p className={cmicClasses("mobile-panel-description tw:text-base tw:leading-relaxed")}>Servicios, formación y oportunidades para crecer contigo.</p>
          </div>
        )}
        <nav aria-label="Navegación principal">
          {!isDesktop && <p className={cmicClasses("mobile-section-label")}>Explora CMIC</p>}
          <ul className={cmicClasses("main-nav-list")}>
            <li><Link to="/" onClick={handleLinkClick} aria-current={location.pathname === '/' ? 'page' : undefined}>Inicio</Link></li>
            {menuItem('cmic', 'CMIC')}
            <li><Link to="/noticias" onClick={handleLinkClick} aria-current={location.pathname.startsWith('/noticias') ? 'page' : undefined}>Noticias</Link></li>
            {menuItem('nos', 'Nosotros')}
            {menuItem('icic', 'ICIC')}
            <li><Link to="/itc" onClick={handleLinkClick} aria-current={location.pathname.startsWith('/itc') || location.pathname.startsWith('/maestria/') ? 'page' : undefined}>ITC</Link></li>
            {isDesktop && <LogosStrip onLinkClick={handleLinkClick} />}
          </ul>
        </nav>
        {!isDesktop && (
          <div className={cmicClasses("mobile-panel-footer tw:mt-auto")}>
            <Link to="/afiliacion-2025" onClick={handleLinkClick} className={cmicClasses("mobile-join d-flex align-items-center justify-content-between")}>
              Forma parte de CMIC <FaArrowRight aria-hidden="true" />
            </Link>
            <LogosStrip mobile onLinkClick={handleLinkClick} />
          </div>
        )}
      </div>
      {mobileMenuOpen && <div className={cmicClasses("menu-overlay")} onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}
