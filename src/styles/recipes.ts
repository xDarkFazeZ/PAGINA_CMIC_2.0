/** Tailwind recipes for the existing CMIC markup and interactive states.
 * Keep utility names literal so Tailwind can discover them during production builds.
 * Classes used by DOM observers and accessibility logic remain as stable hooks.
 */
const recipes: Record<string, string> = {
  // pwa-update
  "pwa-update-notification": [
    String.raw`tw:fixed tw:[bottom:20px] tw:[right:20px] tw:[background:linear-gradient(135deg,_#ffffff_0%,_#f8fafc_100%)] tw:[border-left:4px_solid_var(--colorPrincipal)] tw:[border-radius:var(--radius-xl)] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[box-shadow:var(--shadow-xl)] tw:[z-index:10000] tw:[max-width:380px] tw:overflow-hidden tw:[transform:translateY(100px)] tw:[opacity:0] tw:[transition:all_0.6s_cubic-bezier(0.34,_1.56,_0.64,_1)]`,
    String.raw`tw:[&.animate-in]:[transform:translateY(0)] tw:[&.animate-in]:[opacity:1]`,
    String.raw`tw:[&.animate-out]:[transform:translateY(-100px)] tw:[&.animate-out]:[opacity:0]`,
    String.raw`tw:[&:hover]:[box-shadow:var(--shadow-2xl)] tw:[&:hover]:[transform:translateY(-2px)]`,
    String.raw`tw:max-768:[bottom:10px] tw:max-768:[right:10px] tw:max-768:[left:10px] tw:max-768:[max-width:none]`,
    String.raw`tw:contrast-high:[border:2px_solid_currentColor]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transform:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[opacity:1]`,
  ].join(' '),
  // pwa-update
  "update-content": [
    String.raw`tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem]`,
    String.raw`tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-bottom:1.5rem] tw:[&_p]:[line-height:1.5] tw:[&_p]:[font-size:0.95rem]`,
    String.raw`tw:[&_>_*]:[transform:translateY(20px)] tw:[&_>_*]:[opacity:0] tw:[&_>_*]:[transition:all_0.4s_ease-out]`,
    String.raw`tw:[.animate-in_&_>_*]:[transform:translateY(0)] tw:[.animate-in_&_>_*]:[opacity:1]`,
    String.raw`tw:[.animate-in_&_p]:[transition-delay:0.2s]`,
    String.raw`tw:motion-reduce:[&_>_*]:[animation:none]! tw:motion-reduce:[&_>_*]:[transform:none]! tw:motion-reduce:[&_>_*]:[transition:none]!`,
  ].join(' '),
  // pwa-update
  "update-header": [
    String.raw`tw:flex tw:items-center tw:[row-gap:0.75rem] tw:[column-gap:0.75rem] tw:[margin-bottom:1rem] tw:relative`,
    String.raw`tw:[&_h3]:[color:var(--colorTitulo)] tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:0] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[font-family:var(--titulos)] tw:[&_h3]:[font-size:1.1rem] tw:[&_h3]:[flex:1]`,
    String.raw`tw:[.animate-in_&]:[transition-delay:0.1s]`,
  ].join(' '),
  // pwa-update
  "update-icon": [
    String.raw`tw:[font-size:1.5rem] tw:[transform:scale(0)] tw:[transition:transform_0.7s_cubic-bezier(0.34,_1.56,_0.64,_1)]`,
    String.raw`tw:[.animate-in_&]:[transform:scale(1)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transform:none]! tw:motion-reduce:[transition:none]!`,
  ].join(' '),
  // pwa-update
  "close-btn": [
    String.raw`tw:[background:#f3f3f3] tw:[border:none] tw:[font-size:1.6rem] tw:[color:var(--colorTitulo)] tw:cursor-pointer tw:[padding-top:0.25rem] tw:[padding-right:0.25rem] tw:[padding-bottom:0.25rem] tw:[padding-left:0.25rem] tw:[border-radius:999px] tw:[width:40px] tw:[height:40px] tw:flex tw:items-center tw:justify-center tw:[transition:var(--transition)] tw:absolute tw:[top:12px] tw:[right:16px] tw:[z-index:10]`,
    String.raw`tw:[&:hover]:[background:#eaeaea] tw:[&:hover]:[color:var(--colorTitulo)]`,
  ].join(' '),
  // pwa-update
  "update-actions": [
    String.raw`tw:flex tw:[row-gap:0.75rem] tw:[column-gap:0.75rem] tw:[margin-bottom:1rem]`,
    String.raw`tw:[.animate-in_&]:[transition-delay:0.3s]`,
    String.raw`tw:max-768:flex-col`,
  ].join(' '),
  // pwa-update
  "update-btn": [
    String.raw`tw:[flex:1]`,
  ].join(' '),
  // pwa-update
  "btn": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:0.75rem] tw:[column-gap:0.75rem] tw:[padding-top:clamp(0.875rem,_2vw,_1rem)] tw:[padding-right:clamp(1.5rem,_3vw,_2rem)] tw:[padding-bottom:clamp(0.875rem,_2vw,_1rem)] tw:[padding-left:clamp(1.5rem,_3vw,_2rem)] tw:[border:none] tw:[border-radius:var(--radius-lg)] tw:font-semibold tw:cursor-pointer tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:[font-size:clamp(0.875rem,_1.5vw,_1rem)] tw:[appearance:none] tw:text-center tw:no-underline tw:[min-height:44px] tw:justify-center tw:whitespace-nowrap`,
    String.raw`tw:max-768:justify-center tw:max-768:[width:100%]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[animation:none]! tw:motion-reduce:[transform:none]!`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px] tw:[&:focus-visible]:[border-radius:var(--radius-lg)]`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
    String.raw`tw:print:hidden!`,
    String.raw`tw:max-770:[width:100%] tw:max-770:[max-width:300px] tw:max-770:[margin-top:0] tw:max-770:[margin-right:auto] tw:max-770:[margin-bottom:0] tw:max-770:[margin-left:auto]`,
    String.raw`tw:max-640:[width:100%] tw:max-640:[max-width:280px]`,
    String.raw`tw:max-360:[padding-top:0.75rem] tw:max-360:[padding-right:1rem] tw:max-360:[padding-bottom:0.75rem] tw:max-360:[padding-left:1rem] tw:max-360:[font-size:0.875rem]`,
  ].join(' '),
  // pwa-update
  "btn-primary": [
    String.raw`tw:[&.btn-primary]:[background:var(--colorPrincipal)] tw:[&.btn-primary]:[color:white] tw:[&.btn-primary]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
  ].join(' '),
  // pwa-update
  "btn-secondary": [
    String.raw`tw:[&.btn-secondary]:[background:#fff] tw:[&.btn-secondary]:[color:var(--colorTitulo)] tw:[&.btn-secondary]:[border:1.5px_solid_var(--border)] tw:[&.btn-secondary]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:[&:hover]:[background:var(--colorFondo)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
  ].join(' '),
  // pwa-update
  "update-progress": [
    String.raw`tw:[height:3px] tw:[background:var(--border)] tw:[border-radius:2px] tw:overflow-hidden`,
    String.raw`tw:[.animate-in_&]:[transition-delay:0.4s]`,
  ].join(' '),
  // pwa-update
  "progress-bar": [
    String.raw`tw:[height:100%] tw:[background:linear-gradient(90deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[width:100%] tw:[border-radius:2px] tw:[animation:cmic-progressAnimation_8s_linear_forwards]`,
    String.raw`tw:motion-reduce:[animation:none]`,
  ].join(' '),
  // header
  "header": [
    String.raw`tw:flex tw:items-center tw:justify-between tw:[padding-top:5px] tw:[padding-right:20px] tw:[padding-bottom:5px] tw:[padding-left:20px] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:fixed tw:[width:100%] tw:[top:0] tw:[left:0] tw:[box-shadow:0_2px_10px_rgba(0,_0,_0,_.1)] tw:[z-index:1000] tw:[font-family:var(--titulos)] tw:[font-size:1rem] tw:[height:var(--site-header-height,_100px)] tw:[transition:all_.3s_ease] tw:[opacity:1]! tw:[transform:none]!`,
    String.raw`tw:[&.scrolled]:[padding-top:5px] tw:[&.scrolled]:[padding-right:20px] tw:[&.scrolled]:[padding-bottom:5px] tw:[&.scrolled]:[padding-left:20px] tw:[&.scrolled]:[background:var(--colorOscuro)] tw:[&.scrolled]:[-webkit-backdrop-filter:blur(10px)] tw:[&.scrolled]:[backdrop-filter:blur(10px)] tw:[&.scrolled]:[box-shadow:0_4px_20px_rgba(0,_0,_0,_.3)]`,
    String.raw`tw:max-1280:[padding-top:5px] tw:max-1280:[padding-right:16px] tw:max-1280:[padding-bottom:5px] tw:max-1280:[padding-left:16px]`,
    String.raw`tw:max-1150:[padding-top:5px] tw:max-1150:[padding-right:14px] tw:max-1150:[padding-bottom:5px] tw:max-1150:[padding-left:14px]`,
    String.raw`tw:[&_:is(a,_button):focus-visible]:[outline:2px_solid_#e9bda0] tw:[&_:is(a,_button):focus-visible]:[outline-offset:3px]`,
    String.raw`tw:max-840:[height:var(--site-header-height,_76px)] tw:max-840:[padding-top:8px] tw:max-840:[padding-right:20px] tw:max-840:[padding-bottom:8px] tw:max-840:[padding-left:20px] tw:max-840:[background:var(--colorPrincipal)] tw:max-840:[backdrop-filter:none] tw:max-840:[-webkit-backdrop-filter:none]`,
    String.raw`tw:max-840:[&.scrolled]:[height:var(--site-header-height,_76px)] tw:max-840:[&.scrolled]:[padding-top:8px] tw:max-840:[&.scrolled]:[padding-right:20px] tw:max-840:[&.scrolled]:[padding-bottom:8px] tw:max-840:[&.scrolled]:[padding-left:20px] tw:max-840:[&.scrolled]:[background:var(--colorPrincipal)] tw:max-840:[&.scrolled]:[backdrop-filter:none] tw:max-840:[&.scrolled]:[-webkit-backdrop-filter:none]`,
    String.raw`tw:max-840:[&.menu-open]:[background:var(--colorPrincipal)]`,
    String.raw`tw:[&_a]:[font-family:var(--enlaces)]`,
    String.raw`tw:[&_button]:[font-family:var(--enlaces)]`,
  ].join(' '),
  // header
  "header-large-mobile-logo": String.raw`tw:max-1024:[&.header_.logo-container]:[height:76px] tw:max-1024:[&.header_.logo]:[height:96px] tw:max-1024:[&.header_.logo]:[width:auto] tw:max-1024:[&.header_.logo]:[max-width:calc(100vw_-_100px)] tw:max-1024:[&.header_.logo]:[margin-top:-8px] tw:max-1024:[&.header.scrolled_.logo]:[height:96px] tw:max-640:[&.header_.logo-container]:[height:68px] tw:max-640:[&.header_.logo]:[height:86px] tw:max-640:[&.header.scrolled_.logo]:[height:86px]`,
  "logo-container": [
    String.raw`tw:[height:60px] tw:[z-index:1001] tw:[transition:var(--transition)] tw:[opacity:1]! tw:[transform:none]! tw:visible!`,
    String.raw`tw:[&.hidden]:[opacity:0] tw:[&.hidden]:invisible`,
    String.raw`tw:max-840:[.header_&]:block tw:max-840:[.header_&]:[height:58px]`,
  ].join(' '),
  // header
  "logo": [
    String.raw`tw:[height:90px] tw:[margin-top:-8px] tw:[margin-left:-20px] tw:[transition:var(--transition)] tw:[opacity:1]! tw:[transform:none]! tw:visible!`,
    String.raw`tw:[.header.scrolled_&]:[height:90px] tw:[.header.scrolled_&]:[margin-top:-8px]`,
    String.raw`tw:max-1280:[height:78px] tw:max-1280:[margin-left:-10px]`,
    String.raw`tw:max-1150:[height:80px] tw:max-1150:[margin-left:-6px]`,
    String.raw`tw:max-840:[.header_&]:block tw:max-840:[.header_&]:[width:auto] tw:max-840:[.header_&]:[height:68px] tw:max-840:[.header_&]:[margin-top:-5px] tw:max-840:[.header_&]:[margin-right:0] tw:max-840:[.header_&]:[margin-bottom:0] tw:max-840:[.header_&]:[margin-left:-12px] tw:max-840:[.header_&]:object-contain`,
    String.raw`tw:max-840:[.header.scrolled_&]:block tw:max-840:[.header.scrolled_&]:[width:auto] tw:max-840:[.header.scrolled_&]:[height:68px] tw:max-840:[.header.scrolled_&]:[margin-top:-5px] tw:max-840:[.header.scrolled_&]:[margin-right:0] tw:max-840:[.header.scrolled_&]:[margin-bottom:0] tw:max-840:[.header.scrolled_&]:[margin-left:-12px] tw:max-840:[.header.scrolled_&]:object-contain`,
  ].join(' '),
  // header
  "logos-li": [
    String.raw`tw:flex tw:items-center tw:[row-gap:12px] tw:[column-gap:12px] tw:[margin-left:8px]`,
    String.raw`tw:max-1280:[margin-left:0] tw:max-1280:[row-gap:10px] tw:max-1280:[column-gap:10px]`,
    String.raw`tw:max-1150:hidden`,
  ].join(' '),
  // header
  "brandmark": [
    String.raw`tw:[.logos-li_&]:[height:22px] tw:[.logos-li_&]:[width:auto] tw:[.logos-li_&]:block tw:[.logos-li_&]:[transition:filter_.2s,_opacity_.2s,_transform_.08s]`,
    String.raw`tw:[.header.scrolled_.logos-li_&]:[height:20px] tw:[.header.scrolled_.logos-li_&]:[opacity:.95]`,
    String.raw`tw:[.logos-li_&:hover]:[transform:translateY(-1px)]`,
    String.raw`tw:max-1280:[.logos-li_&]:[height:20px]`,
  ].join(' '),
  // header
  "cmic-nacional-logo": [
    String.raw`tw:[.header.scrolled_.logos-li_&]:[filter:brightness(0.9)_invert(1)_sepia(0)_saturate(1)_hue-rotate(0deg)] tw:[.header.scrolled_.logos-li_&]:[opacity:0.9]`,
  ].join(' '),
  // header
  "cmic-nacional": [
    String.raw`tw:[.logos-li_&]:[filter:brightness(0)_invert(1)]`,
  ].join(' '),
  // header
  "nav-menu": [
    String.raw`tw:[&_ul]:flex tw:[&_ul]:list-none tw:[&_ul]:[row-gap:25px] tw:[&_ul]:[column-gap:25px] tw:[&_ul]:items-center`,
    String.raw`tw:[&_ul_li]:[margin-right:25px]`,
    String.raw`tw:[&_ul_li:last-child]:[margin-right:0]`,
    String.raw`tw:[&_ul_li_a]:[color:#fff] tw:[&_ul_li_a]:no-underline tw:[&_ul_li_a]:[font-size:18px] tw:[&_ul_li_a]:font-medium tw:[&_ul_li_a]:[padding-top:8px] tw:[&_ul_li_a]:[padding-right:10px] tw:[&_ul_li_a]:[padding-bottom:8px] tw:[&_ul_li_a]:[padding-left:10px] tw:[&_ul_li_a]:[border-radius:4px] tw:[&_ul_li_a]:[transition:var(--transition)] tw:[&_ul_li_a]:relative tw:[&_ul_li_a]:inline-flex tw:[&_ul_li_a]:items-center tw:[&_ul_li_a]:[row-gap:.45rem] tw:[&_ul_li_a]:[column-gap:.45rem] tw:[&_ul_li_a]:whitespace-nowrap`,
    String.raw`tw:[&_ul_li_a:hover]:[background:rgba(255,_255,_255,_.1)]`,
    String.raw`tw:[&_ul_li_a::after]:[content:""] tw:[&_ul_li_a::after]:absolute tw:[&_ul_li_a::after]:[bottom:-5px] tw:[&_ul_li_a::after]:[left:50%] tw:[&_ul_li_a::after]:[width:0] tw:[&_ul_li_a::after]:[height:2px] tw:[&_ul_li_a::after]:[background:#fff] tw:[&_ul_li_a::after]:[transition:var(--transition)] tw:[&_ul_li_a::after]:[transform:translateX(-50%)]`,
    String.raw`tw:[&_ul_li_a:hover::after]:[width:80%]`,
    String.raw`tw:max-1280:[&_ul]:[row-gap:18px] tw:max-1280:[&_ul]:[column-gap:18px]`,
    String.raw`tw:max-1280:[&_ul_li_a]:[font-size:17px] tw:max-1280:[&_ul_li_a]:[padding-top:8px] tw:max-1280:[&_ul_li_a]:[padding-right:10px] tw:max-1280:[&_ul_li_a]:[padding-bottom:8px] tw:max-1280:[&_ul_li_a]:[padding-left:10px]`,
    String.raw`tw:max-1150:[&_ul]:[row-gap:14px] tw:max-1150:[&_ul]:[column-gap:14px]`,
    String.raw`tw:max-1150:[&_ul_li]:[margin-right:14px]`,
    String.raw`tw:max-1150:[&_ul_li:last-child]:[margin-right:0]`,
    String.raw`tw:max-1150:[&_ul_li_a]:[font-size:16px] tw:max-1150:[&_ul_li_a]:[padding-top:6px] tw:max-1150:[&_ul_li_a]:[padding-right:9px] tw:max-1150:[&_ul_li_a]:[padding-bottom:6px] tw:max-1150:[&_ul_li_a]:[padding-left:9px]`,
    String.raw`tw:[.header_&_a]:[font-family:var(--enlaces)]`,
    String.raw`tw:max-840:[.header_&]:fixed tw:max-840:[.header_&]:[top:0] tw:max-840:[.header_&]:[right:auto] tw:max-840:[.header_&]:[bottom:0] tw:max-840:[.header_&]:[left:0] tw:max-840:[.header_&]:[z-index:1002] tw:max-840:[.header_&]:[width:min(390px,_calc(100vw_-_28px))] tw:max-840:[.header_&]:[height:100dvh] tw:max-840:[.header_&]:[padding-top:max(20px,_env(safe-area-inset-top))] tw:max-840:[.header_&]:[padding-right:24px] tw:max-840:[.header_&]:[padding-bottom:max(24px,_env(safe-area-inset-bottom))] tw:max-840:[.header_&]:[padding-left:24px] tw:max-840:[.header_&]:flex tw:max-840:[.header_&]:flex-col tw:max-840:[.header_&]:[color:#292225] tw:max-840:[.header_&]:[background:#fffcf8] tw:max-840:[.header_&]:[border-right:1px_solid_#ffffff80] tw:max-840:[.header_&]:[border-radius:0_24px_24px_0] tw:max-840:[.header_&]:[box-shadow:12px_0_60px_#16090e33] tw:max-840:[.header_&]:overflow-x-hidden tw:max-840:[.header_&]:overflow-y-auto tw:max-840:[.header_&]:[overscroll-behavior:contain] tw:max-840:[.header_&]:[scrollbar-width:thin] tw:max-840:[.header_&]:[scrollbar-color:#bcb0b4_transparent] tw:max-840:[.header_&]:invisible tw:max-840:[.header_&]:[transform:translateX(-105%)] tw:max-840:[.header_&]:[transition:transform_.28s_ease,_visibility_.28s]`,
    String.raw`tw:max-840:[.header_&.active]:[transform:translateX(0)] tw:max-840:[.header_&.active]:visible`,
    String.raw`tw:max-360:[.header_&]:[padding-right:18px] tw:max-360:[.header_&]:[padding-left:18px]`,
    String.raw`tw:motion-reduce:[.header_&]:[transition:none]`,
  ].join(' '),
  // header
  "hamburger": [
    String.raw`tw:hidden tw:flex-col tw:[row-gap:5px] tw:[column-gap:5px] tw:cursor-pointer tw:[padding-top:5px] tw:[padding-right:5px] tw:[padding-bottom:5px] tw:[padding-left:5px] tw:[z-index:1001] tw:[background:transparent] tw:[border:none] tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[opacity:.8]`,
    String.raw`tw:max-840:[.header_&]:inline-flex tw:max-840:[.header_&]:items-center tw:max-840:[.header_&]:flex-row tw:max-840:[.header_&]:justify-center tw:max-840:[.header_&]:[row-gap:10px] tw:max-840:[.header_&]:[column-gap:10px] tw:max-840:[.header_&]:[min-width:92px] tw:max-840:[.header_&]:[min-height:44px] tw:max-840:[.header_&]:[padding-top:10px] tw:max-840:[.header_&]:[padding-right:12px] tw:max-840:[.header_&]:[padding-bottom:10px] tw:max-840:[.header_&]:[padding-left:12px] tw:max-840:[.header_&]:[border:1px_solid_#ffffff40] tw:max-840:[.header_&]:[border-radius:12px] tw:max-840:[.header_&]:[background:#ffffff0d] tw:max-840:[.header_&]:[color:white] tw:max-840:[.header_&]:[font-family:var(--enlaces)]`,
    String.raw`tw:max-840:[.header_&:hover]:[background:#ffffff1a] tw:max-840:[.header_&:hover]:[opacity:1]`,
  ].join(' '),
  // header
  "bar": [
    String.raw`tw:[width:25px] tw:[height:3px] tw:[background:#fff] tw:[border-radius:5px] tw:[transition:var(--transition)]`,
    String.raw`tw:[.hamburger.active_&:nth-child(1)]:[transform:translateY(8px)_rotate(45deg)]`,
    String.raw`tw:[.hamburger.active_&:nth-child(2)]:[opacity:0]`,
    String.raw`tw:[.hamburger.active_&:nth-child(3)]:[transform:translateY(-8px)_rotate(-45deg)]`,
    String.raw`tw:max-840:[.header_&]:[width:19px] tw:max-840:[.header_&]:[height:2px]`,
  ].join(' '),
  // header
  "menu-overlay": [
    String.raw`tw:fixed tw:[top:0] tw:[right:0] tw:[bottom:0] tw:[left:0] tw:[z-index:998] tw:[background:rgba(0,_0,_0,_.7)] tw:[backdrop-filter:blur(8px)] tw:[animation:cmic-overlayFadeIn_.3s_ease-out]`,
    String.raw`tw:min-841:[.header_&]:hidden`,
    String.raw`tw:max-840:[.header_&]:fixed tw:max-840:[.header_&]:[top:0] tw:max-840:[.header_&]:[right:0] tw:max-840:[.header_&]:[bottom:0] tw:max-840:[.header_&]:[left:0] tw:max-840:[.header_&]:[z-index:1001] tw:max-840:[.header_&]:[background:#17090db3] tw:max-840:[.header_&]:[-webkit-backdrop-filter:blur(5px)] tw:max-840:[.header_&]:[backdrop-filter:blur(5px)] tw:max-840:[.header_&]:[animation:cmic-overlayFadeIn_.2s_ease-out]`,
    String.raw`tw:motion-reduce:[.header_&]:[animation:none]`,
  ].join(' '),
  // header
  "has-submenu": [
    String.raw`tw:relative`,
  ].join(' '),
  // header
  "as-link": [
    String.raw`tw:[background:transparent] tw:[border:0] tw:[color:#fff] tw:[font-size:18px] tw:font-medium tw:[padding-top:8px] tw:[padding-right:10px] tw:[padding-bottom:8px] tw:[padding-left:10px] tw:[border-radius:4px] tw:[transition:var(--transition)] tw:[font-family:var(--titulos)] tw:cursor-pointer tw:relative tw:inline-flex tw:items-center tw:[row-gap:.45rem] tw:[column-gap:.45rem] tw:whitespace-nowrap`,
    String.raw`tw:[&:hover]:[background:rgba(255,_255,_255,_.1)]`,
    String.raw`tw:[&::after]:[content:""] tw:[&::after]:absolute tw:[&::after]:[bottom:-5px] tw:[&::after]:[left:50%] tw:[&::after]:[width:0] tw:[&::after]:[height:2px] tw:[&::after]:[transform:translateX(-50%)] tw:[&::after]:[transition:var(--transition)]`,
    String.raw`tw:max-1280:[font-size:17px] tw:max-1280:[padding-top:8px] tw:max-1280:[padding-right:10px] tw:max-1280:[padding-bottom:8px] tw:max-1280:[padding-left:10px]`,
    String.raw`tw:max-1150:[font-size:16px] tw:max-1150:[padding-top:6px] tw:max-1150:[padding-right:9px] tw:max-1150:[padding-bottom:6px] tw:max-1150:[padding-left:9px]`,
    String.raw`tw:[.header_&]:[font-family:var(--enlaces)]`,
    String.raw`tw:max-840:[.header_.main-nav-list_>_li_>_&]:[width:100%] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[min-height:48px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:flex tw:max-840:[.header_.main-nav-list_>_li_>_&]:items-center tw:max-840:[.header_.main-nav-list_>_li_>_&]:justify-between tw:max-840:[.header_.main-nav-list_>_li_>_&]:[padding-top:12px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[padding-right:14px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[padding-bottom:12px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[padding-left:14px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[border:1px_solid_transparent] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[border-radius:12px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[color:#34292e] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[background:transparent] tw:max-840:[.header_.main-nav-list_>_li_>_&]:[font-size:15px] tw:max-840:[.header_.main-nav-list_>_li_>_&]:font-semibold tw:max-840:[.header_.main-nav-list_>_li_>_&]:[line-height:1.5] tw:max-840:[.header_.main-nav-list_>_li_>_&]:text-left tw:max-840:[.header_.main-nav-list_>_li_>_&]:whitespace-normal tw:max-840:[.header_.main-nav-list_>_li_>_&]:[transition:background_.18s,_color_.18s]`,
    String.raw`tw:max-840:[.header_&::after]:hidden`,
    String.raw`tw:max-840:[.header_.has-submenu.open_>_&]:[background:#f3e7e3] tw:max-840:[.header_.has-submenu.open_>_&]:[color:#720000]`,
  ].join(' '),
  // header
  "caret": [
    String.raw`tw:[margin-left:4px] tw:[font-size:.9em] tw:[line-height:1] tw:[transform-origin:50%_55%]`,
    String.raw`tw:[.header_&]:[transition:transform_.2s_ease]`,
    String.raw`tw:[.header_.has-submenu.open_>_.as-link_&]:[transform:rotate(180deg)]`,
    String.raw`tw:max-840:[.header_&]:[width:24px] tw:max-840:[.header_&]:[height:24px] tw:max-840:[.header_&]:grid tw:max-840:[.header_&]:[place-items:center] tw:max-840:[.header_&]:[border:1px_solid_#dfd3d1] tw:max-840:[.header_&]:[border-radius:50%] tw:max-840:[.header_&]:[font-size:10px]`,
    String.raw`tw:motion-reduce:[.header_&]:[transition:none]`,
  ].join(' '),
  // header
  "submenu": [
    String.raw`tw:absolute tw:[top:100%]! tw:[left:0] tw:[min-width:260px] tw:[padding-top:8px] tw:[padding-right:8px] tw:[padding-bottom:8px] tw:[padding-left:8px] tw:[border-radius:8px] tw:[background:var(--colorOscuro)] tw:[box-shadow:0_10px_24px_rgba(0,_0,_0,_.24)] tw:hidden tw:[z-index:1002] tw:[border:1px_solid_rgba(255,_255,_255,_.08)]`,
    String.raw`tw:[&::before]:[content:""] tw:[&::before]:absolute tw:[&::before]:[top:-8px] tw:[&::before]:[left:0] tw:[&::before]:[right:0] tw:[&::before]:[height:8px] tw:[&::before]:[background:transparent]`,
    String.raw`tw:[.has-submenu.open>&]:grid tw:[.has-submenu.open>&]:[row-gap:4px] tw:[.has-submenu.open>&]:[column-gap:4px]`,
    String.raw`tw:[&_a]:[color:#fff] tw:[&_a]:no-underline tw:[&_a]:[font-size:16px] tw:[&_a]:font-medium tw:[&_a]:[padding-top:10px] tw:[&_a]:[padding-right:12px] tw:[&_a]:[padding-bottom:10px] tw:[&_a]:[padding-left:12px] tw:[&_a]:[border-radius:6px] tw:[&_a]:[transition:var(--transition)] tw:[&_a]:[font-family:var(--titulos)]`,
    String.raw`tw:[&_a:hover]:[background:rgba(255,_255,_255,_.1)]`,
    String.raw`tw:[&_a::after]:[content:""] tw:[&_a::after]:absolute tw:[&_a::after]:[bottom:6px] tw:[&_a::after]:[left:12px] tw:[&_a::after]:[width:0] tw:[&_a::after]:[height:2px] tw:[&_a::after]:[background:#fff] tw:[&_a::after]:[transition:var(--transition)]`,
    String.raw`tw:[&_a:hover::after]:[width:calc(100%_-_24px)]`,
    String.raw`tw:[.header_&[hidden]]:hidden`,
    String.raw`tw:max-840:[.header_&_a::after]:hidden`,
    String.raw`tw:max-840:[.header_&]:static tw:max-840:[.header_&]:[min-width:0] tw:max-840:[.header_&]:[margin-top:6px] tw:max-840:[.header_&]:[margin-right:0] tw:max-840:[.header_&]:[margin-bottom:8px] tw:max-840:[.header_&]:[margin-left:14px] tw:max-840:[.header_&]:[padding-top:0] tw:max-840:[.header_&]:[padding-right:0] tw:max-840:[.header_&]:[padding-bottom:0] tw:max-840:[.header_&]:[padding-left:12px] tw:max-840:[.header_&]:[border:0] tw:max-840:[.header_&]:[border-left:2px_solid_#e8d7d1] tw:max-840:[.header_&]:[border-radius:0] tw:max-840:[.header_&]:[background:transparent] tw:max-840:[.header_&]:[box-shadow:none]`,
    String.raw`tw:max-840:[.header_&::before]:hidden`,
    String.raw`tw:max-840:[.header_.has-submenu.open_>_&]:grid tw:max-840:[.header_.has-submenu.open_>_&]:[row-gap:2px] tw:max-840:[.header_.has-submenu.open_>_&]:[column-gap:2px]`,
    String.raw`tw:max-840:[.header_&_a]:flex tw:max-840:[.header_&_a]:justify-between tw:max-840:[.header_&_a]:[row-gap:8px] tw:max-840:[.header_&_a]:[column-gap:8px] tw:max-840:[.header_&_a]:whitespace-normal tw:max-840:[.header_&_a]:[overflow-wrap:anywhere] tw:max-840:[.header_&_a]:[min-height:44px] tw:max-840:[.header_&_a]:[padding-top:10px] tw:max-840:[.header_&_a]:[padding-right:12px] tw:max-840:[.header_&_a]:[padding-bottom:10px] tw:max-840:[.header_&_a]:[padding-left:12px] tw:max-840:[.header_&_a]:[color:#615158] tw:max-840:[.header_&_a]:[font-size:13px] tw:max-840:[.header_&_a]:font-medium tw:max-840:[.header_&_a]:[line-height:1.5] tw:max-840:[.header_&_a]:[border-radius:8px]`,
    String.raw`tw:max-840:[.header_&_a:hover]:[background:#f3e7e3] tw:max-840:[.header_&_a:hover]:[color:#720000]`,
    String.raw`tw:max-840:[.header_&_a[aria-current="page"]]:[background:#f3e7e3] tw:max-840:[.header_&_a[aria-current="page"]]:[color:#720000]`,
  ].join(' '),
  // mobile-header
  "main-nav-list": [
    String.raw`tw:min-841:[.header_&]:[margin-top:0] tw:min-841:[.header_&]:[margin-right:0] tw:min-841:[.header_&]:[margin-bottom:0] tw:min-841:[.header_&]:[margin-left:0] tw:min-841:[.header_&]:[padding-top:0] tw:min-841:[.header_&]:[padding-right:0] tw:min-841:[.header_&]:[padding-bottom:0] tw:min-841:[.header_&]:[padding-left:0]`,
    String.raw`tw:max-840:[.header_&]:[margin-top:0] tw:max-840:[.header_&]:[margin-right:0] tw:max-840:[.header_&]:[margin-bottom:0] tw:max-840:[.header_&]:[margin-left:0] tw:max-840:[.header_&]:[padding-top:0] tw:max-840:[.header_&]:[padding-right:0] tw:max-840:[.header_&]:[padding-bottom:0] tw:max-840:[.header_&]:[padding-left:0] tw:max-840:[.header_&]:flex tw:max-840:[.header_&]:flex-col tw:max-840:[.header_&]:items-stretch tw:max-840:[.header_&]:[row-gap:4px] tw:max-840:[.header_&]:[column-gap:4px] tw:max-840:[.header_&]:list-none`,
    String.raw`tw:max-840:[.header_&_>_li]:[width:100%] tw:max-840:[.header_&_>_li]:[margin-top:0] tw:max-840:[.header_&_>_li]:[margin-right:0] tw:max-840:[.header_&_>_li]:[margin-bottom:0] tw:max-840:[.header_&_>_li]:[margin-left:0]`,
    String.raw`tw:max-840:[.header_&_>_li_>_a]:[width:100%] tw:max-840:[.header_&_>_li_>_a]:[min-height:48px] tw:max-840:[.header_&_>_li_>_a]:flex tw:max-840:[.header_&_>_li_>_a]:items-center tw:max-840:[.header_&_>_li_>_a]:justify-between tw:max-840:[.header_&_>_li_>_a]:[padding-top:12px] tw:max-840:[.header_&_>_li_>_a]:[padding-right:14px] tw:max-840:[.header_&_>_li_>_a]:[padding-bottom:12px] tw:max-840:[.header_&_>_li_>_a]:[padding-left:14px] tw:max-840:[.header_&_>_li_>_a]:[border:1px_solid_transparent] tw:max-840:[.header_&_>_li_>_a]:[border-radius:12px] tw:max-840:[.header_&_>_li_>_a]:[color:#34292e] tw:max-840:[.header_&_>_li_>_a]:[background:transparent] tw:max-840:[.header_&_>_li_>_a]:[font-size:15px] tw:max-840:[.header_&_>_li_>_a]:font-semibold tw:max-840:[.header_&_>_li_>_a]:[line-height:1.5] tw:max-840:[.header_&_>_li_>_a]:text-left tw:max-840:[.header_&_>_li_>_a]:whitespace-normal tw:max-840:[.header_&_>_li_>_a]:[transition:background_.18s,_color_.18s]`,
    String.raw`tw:max-840:[.header_&_>_li_>_a::after]:hidden`,
    String.raw`tw:max-840:[.header_&_>_li_>_:is(a:hover,_.as-link:hover)]:[background:#f3e7e3] tw:max-840:[.header_&_>_li_>_:is(a:hover,_.as-link:hover)]:[color:#720000]`,
    String.raw`tw:max-840:[.header_&_>_li_>_:is([aria-current="page"],_.current-section)]:[background:#f3e7e3] tw:max-840:[.header_&_>_li_>_:is([aria-current="page"],_.current-section)]:[color:#720000]`,
  ].join(' '),
  // mobile-header
  "mobile-panel-heading": [
    String.raw`tw:min-841:[.header_&]:hidden`,
    String.raw`tw:max-840:[margin-top:-20px] tw:max-840:[margin-right:-24px] tw:max-840:[margin-bottom:26px] tw:max-840:[margin-left:-24px] tw:max-840:[padding-top:20px] tw:max-840:[padding-right:24px] tw:max-840:[padding-bottom:26px] tw:max-840:[padding-left:24px] tw:max-840:[background:#720000] tw:max-840:[color:white]`,
    String.raw`tw:max-840:[&_h2]:[margin-top:0] tw:max-840:[&_h2]:[margin-right:0] tw:max-840:[&_h2]:[margin-bottom:10px] tw:max-840:[&_h2]:[margin-left:0] tw:max-840:[&_h2]:text-left tw:max-840:[&_h2]:[line-height:1.25] tw:max-840:[&_h2]:[color:white]`,
    String.raw`tw:max-360:[margin-right:-18px] tw:max-360:[margin-left:-18px] tw:max-360:[padding-right:18px] tw:max-360:[padding-left:18px]`,
  ].join(' '),
  // mobile-header
  "mobile-panel-footer": [
    String.raw`tw:min-841:[.header_&]:hidden`,
  ].join(' '),
  // mobile-header
  "submenu-file-icon": [
    String.raw`tw:[.header_&]:[flex-shrink:0] tw:[.header_&]:[width:.7em] tw:[.header_&]:[opacity:.65]`,
  ].join(' '),
  // mobile-header
  "whatsapp-bubble": [
    String.raw`tw:[body.menu-open_&]:invisible tw:[body.menu-open_&]:pointer-events-none`,
    String.raw`tw:fixed tw:[bottom:25px] tw:[right:25px] tw:[width:60px] tw:[height:60px] tw:[background:linear-gradient(135deg,_#25D366,_#128C7E)] tw:[border-radius:50%] tw:flex tw:items-center tw:justify-center tw:cursor-pointer tw:[box-shadow:0_4px_20px_rgba(37,_211,_102,_0.3)] tw:[transition:all_0.3s_ease] tw:[z-index:1000] tw:[animation:cmic-pulse_2s_infinite]`,
    String.raw`tw:[&:hover]:[transform:scale(1.1)] tw:[&:hover]:[box-shadow:0_6px_25px_rgba(37,_211,_102,_0.5)]`,
    String.raw`tw:max-768:[bottom:20px] tw:max-768:[right:20px] tw:max-768:[width:55px] tw:max-768:[height:55px]`,
  ].join(' '),
  // mobile-header
  "hamburger-lines": [
    String.raw`tw:max-840:[.header_&]:flex tw:max-840:[.header_&]:flex-col tw:max-840:[.header_&]:[row-gap:5px] tw:max-840:[.header_&]:[column-gap:5px]`,
  ].join(' '),
  // mobile-header
  "hamburger-label": [
    String.raw`tw:max-840:[.header_&]:[font-size:13px] tw:max-840:[.header_&]:font-semibold`,
  ].join(' '),
  // mobile-header
  "mobile-panel-brand": [
    String.raw`tw:max-840:inline-flex tw:max-840:[min-height:64px] tw:max-840:items-center`,
    String.raw`tw:max-840:[&_img]:[width:116px] tw:max-840:[&_img]:[height:84px] tw:max-840:[&_img]:object-contain tw:max-840:[&_img]:[margin-left:-12px]`,
  ].join(' '),
  // mobile-header
  "mobile-close": [
    String.raw`tw:max-840:[border:1px_solid_#ffffff40] tw:max-840:[color:#fff] tw:max-840:[background:#ffffff0d] tw:max-840:cursor-pointer tw:max-840:[font-size:22px] tw:max-840:[transition:background_.2s]`,
    String.raw`tw:max-840:[&:hover]:[background:#ffffff26]`,
  ].join(' '),
  // mobile-header
  "mobile-panel-eyebrow": [
    String.raw`tw:max-840:[margin-top:14px] tw:max-840:[margin-right:0] tw:max-840:[margin-bottom:12px] tw:max-840:[margin-left:0] tw:max-840:[color:#efcbc9] tw:max-840:[font:600_10px/1.5_var(--enlaces)] tw:max-840:[letter-spacing:.16em]`,
  ].join(' '),
  // mobile-header
  "mobile-panel-description": [
    String.raw`tw:max-840:[margin-top:0] tw:max-840:[margin-right:0] tw:max-840:[margin-bottom:0] tw:max-840:[margin-left:0] tw:max-840:[color:#f4deda] tw:max-840:[max-width:28ch]`,
  ].join(' '),
  // mobile-header
  "mobile-section-label": [
    String.raw`tw:max-840:[margin-top:0] tw:max-840:[margin-right:0] tw:max-840:[margin-bottom:12px] tw:max-840:[margin-left:0] tw:max-840:[font:600_10px/1.6_var(--enlaces)] tw:max-840:uppercase tw:max-840:[letter-spacing:.14em] tw:max-840:[color:#776870]`,
  ].join(' '),
  // mobile-header
  "mobile-join": [
    String.raw`tw:max-840:[.header_&]:[min-height:50px] tw:max-840:[.header_&]:[padding-top:13px] tw:max-840:[.header_&]:[padding-right:16px] tw:max-840:[.header_&]:[padding-bottom:13px] tw:max-840:[.header_&]:[padding-left:16px] tw:max-840:[.header_&]:[background:#720000] tw:max-840:[.header_&]:[color:#fff] tw:max-840:[.header_&]:[border:1px_solid_#720000] tw:max-840:[.header_&]:[border-radius:12px] tw:max-840:[.header_&]:[font-size:13px] tw:max-840:[.header_&]:font-semibold tw:max-840:[.header_&]:[box-shadow:0_4px_12px_#72000012]`,
    String.raw`tw:max-840:[.header_&:hover]:[background:#530000]`,
  ].join(' '),
  // mobile-header
  "brand-grid-mobile": [
    String.raw`tw:max-840:[.header_&]:[margin-top:26px] tw:max-840:[.header_&]:[padding-top:22px] tw:max-840:[.header_&]:[border-top:1px_solid_#e9ded8]`,
  ].join(' '),
  // mobile-header
  "brand-grid": [
    String.raw`tw:max-840:[.header_&]:grid tw:max-840:[.header_&]:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:max-840:[.header_&]:[row-gap:10px] tw:max-840:[.header_&]:[column-gap:10px]`,
    String.raw`tw:max-840:[.header_&_a]:[min-height:64px] tw:max-840:[.header_&_a]:flex tw:max-840:[.header_&_a]:items-center tw:max-840:[.header_&_a]:justify-center tw:max-840:[.header_&_a]:[padding-top:10px] tw:max-840:[.header_&_a]:[padding-right:14px] tw:max-840:[.header_&_a]:[padding-bottom:10px] tw:max-840:[.header_&_a]:[padding-left:14px] tw:max-840:[.header_&_a]:[background:#fff] tw:max-840:[.header_&_a]:[border:1px_solid_#eadfda] tw:max-840:[.header_&_a]:[border-radius:12px]`,
    String.raw`tw:max-840:[.header_&_img]:block tw:max-840:[.header_&_img]:[max-width:100%] tw:max-840:[.header_&_img]:[width:auto] tw:max-840:[.header_&_img]:[height:32px] tw:max-840:[.header_&_img]:object-contain`,
  ].join(' '),
  // App
  "site-home": [
    String.raw`tw:[padding-top:var(--site-header-height)] tw:[--home-section-space:clamp(2.5rem,5vw,4rem)]`,
    // Keep home section spacing in normal flow, without viewport-sized gaps or negative margins.
    String.raw`tw:[&_.affiliate-section]:[padding-block:var(--home-section-space)] tw:[&_.convenios.logos-only]:[min-height:0] tw:[&_.convenios.logos-only]:[margin-block:0] tw:[&_.convenios.logos-only]:[padding-block:var(--home-section-space)]`,
    String.raw`tw:[&_.courses-section]:[padding-top:var(--home-section-space)]! tw:[&_.courses-section]:[padding-bottom:1rem]! tw:[&_.courses-section]:[margin-block:0]! tw:[&_.see-more]:[margin-top:2rem]`,
    String.raw`tw:[&_.icic-highlight]:[margin-block:0] tw:[&_.icic-highlight]:[padding-top:clamp(3rem,5vw,4.5rem)] tw:[&_.icic-highlight]:[padding-bottom:var(--home-section-space)] tw:[&_.icic-header]:[margin-bottom:2.5rem] tw:[&_.icic-logo-container]:flex tw:[&_.icic-logo-container]:justify-center tw:[&_.icic-logo-container]:[margin:0_0_1rem]`,
    String.raw`tw:[&_.icic-logoHead]:block tw:[&_.icic-logoHead]:[width:clamp(180px,24vw,280px)] tw:[&_.icic-logoHead]:[height:auto] tw:[&_.icic-logoHead]:[padding:0] tw:[&_.icic-logoHead]:[margin:0_auto]! tw:[&_.icic-highlight_.section-title]:[margin-top:0] tw:[&_.icic-grid]:[gap:2rem]`,
    String.raw`tw:[&_.ng-wrapper]:[margin-block:0] tw:[&_.ng-wrapper]:[padding-block:var(--home-section-space)] tw:max-640:[&_.icic-header]:[margin-bottom:2rem] tw:max-640:[&_.icic-grid]:[gap:1.5rem]`,
    String.raw`tw:[&_.icic-gallery]:[gap:1rem] tw:[&_.icic-gallery_>_h3]:[margin-bottom:0] tw:[&_.icic-gallery_.carousel-container]:[height:auto] tw:[&_.icic-gallery_.carousel-container]:[aspect-ratio:auto] tw:[&_.icic-gallery_.carousel-slide]:items-start tw:[&_.icic-gallery_.carousel-image]:[object-position:top]`,
    String.raw`tw:[&_.affiliate-section]:overflow-hidden tw:[&_.affiliate-gallery]:[width:100vw] tw:[&_.affiliate-gallery]:[margin-inline:calc(50%_-_50vw)] tw:[&_.affiliate-gallery]:[padding-inline:0] tw:[&_.affiliate-gallery]:[grid-auto-columns:max(180px,22vw)] tw:[&_.affiliate-logo_img]:[transition:transform_.25s_ease] tw:[&_.affiliate-card:hover_.affiliate-logo_img]:[transform:scale(1.12)] tw:motion-reduce:[&_.affiliate-logo_img]:[transition:none]`,
    String.raw`tw:[&_.icic-gallery_.carousel-slide]:hidden tw:[&_.icic-gallery_.carousel-slide]:relative tw:[&_.icic-gallery_.carousel-slide]:[inset:auto] tw:[&_.icic-gallery_.carousel-slide.active]:flex tw:[&_.icic-gallery_.carousel-slide.active]:[animation:cmic-photo-reveal_.65s_ease-out_both] tw:motion-reduce:[&_.icic-gallery_.carousel-slide.active]:[animation:none] tw:[&_.icic-gallery_.carousel-slide]:[transform:none] tw:[&_.icic-gallery_.carousel-image]:[width:auto] tw:[&_.icic-gallery_.carousel-image]:[height:auto] tw:[&_.icic-gallery_.carousel-image]:[max-height:70vh] tw:[&_.icic-gallery_.carousel-image]:[max-width:100%] tw:[&_.icic-gallery_.button-container]:[margin-top:1rem]`,
  ].join(' '),
  // App
  "text-titulo": [
    String.raw`tw:[font-family:var(--titulos)]`,
    String.raw`tw:[.asociado-header_&]:[font-family:var(--titulos)] tw:[.asociado-header_&]:[color:var(--colorTitulo)] tw:[.asociado-header_&]:[font-size:2.2rem] tw:[.asociado-header_&]:font-extrabold tw:[.asociado-header_&]:[margin-bottom:.5rem]`,
    String.raw`tw:max-768:[.asociado-header_&]:[font-size:1.9rem]`,
  ].join(' '),
  // App
  "text-subtitulo": [
    String.raw`tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // App
  "text-normal": [
    String.raw`tw:[font-family:var(--texto)]`,
  ].join(' '),
  // App
  "bg-principal": [
    String.raw`tw:[background-color:var(--colorPrincipal)]`,
  ].join(' '),
  // App
  "bg-secundario": [
    String.raw`tw:[background-color:var(--colorSecundario)]`,
  ].join(' '),
  // App
  "reading-progress": [
    String.raw`tw:fixed tw:[top:0] tw:[left:0] tw:[height:3px] tw:[background:linear-gradient(_90deg,_var(--colorPrincipal),_color-mix(in_srgb,_var(--colorPrincipal)_50%,_#ffb3b3)_)] tw:[z-index:9999] tw:[transition:width_.12s_ease] tw:pointer-events-none`,
    String.raw`tw:motion-reduce:[transition:none]`,
  ].join(' '),
  // footer
  "footer": [
    String.raw`tw:[background-color:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:3rem] tw:[padding-right:2rem] tw:[padding-bottom:1rem] tw:[padding-left:2rem] tw:[margin-top:3rem]`,
    String.raw`tw:max-480:[padding-top:2rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem]`,
  ].join(' '),
  // footer
  "footer-contenido": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_250px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[font-family:var(--subtitulos)]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:text-center tw:max-768:[row-gap:2.5rem] tw:max-768:[column-gap:2.5rem]`,
  ].join(' '),
  // footer
  "footer-seccion": [
    String.raw`tw:[&_h3]:[font-size:1.5rem] tw:[&_h3]:[margin-bottom:1rem] tw:[&_h3]:[color:#fff] tw:[&_h3]:[border-bottom:2px_solid_var(--colorSecundario)] tw:[&_h3]:[padding-bottom:0.5rem] tw:[&_h3]:inline-block`,
    String.raw`tw:[&_p]:[margin-bottom:0.8rem]`,
    String.raw`tw:max-768:[&_h3]:block tw:max-768:[&_h3]:text-center tw:max-768:[&_h3]:[margin-top:0] tw:max-768:[&_h3]:[margin-right:auto] tw:max-768:[&_h3]:[margin-bottom:1rem] tw:max-768:[&_h3]:[margin-left:auto]`,
  ].join(' '),
  // footer
  "footer-contacto": [
    String.raw`tw:[&_p]:[margin-bottom:0.8rem]`,
    String.raw`tw:max-768:text-center`,
  ].join(' '),
  // footer
  "footer-enlaces": [
    String.raw`tw:list-none tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0]`,
    String.raw`tw:[&_li]:[margin-bottom:0.5rem]`,
    String.raw`tw:max-768:text-center`,
    String.raw`tw:max-768:[&_li]:inline-block tw:max-768:[&_li]:[margin-top:0] tw:max-768:[&_li]:[margin-right:0.5rem] tw:max-768:[&_li]:[margin-bottom:0.5rem] tw:max-768:[&_li]:[margin-left:0.5rem]`,
    String.raw`tw:max-480:grid tw:max-480:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:max-480:[row-gap:0.5rem] tw:max-480:[column-gap:0.5rem]`,
    String.raw`tw:max-480:[&_li]:[margin-top:0] tw:max-480:[&_li]:[margin-right:0] tw:max-480:[&_li]:[margin-bottom:0] tw:max-480:[&_li]:[margin-left:0] tw:max-480:[&_li]:text-center`,
    String.raw`tw:max-380:[grid-template-columns:1fr]`,
  ].join(' '),
  // footer
  "footer-enlace": [
    String.raw`tw:[color:var(--texto)] tw:no-underline tw:[transition:all_0.3s_cubic-bezier(0.25,_0.46,_0.45,_0.94)] tw:[background:none] tw:[border:none] tw:[font-family:inherit] tw:[font-size:1rem] tw:cursor-pointer tw:text-left tw:[padding-top:0.25rem] tw:[padding-right:0] tw:[padding-bottom:0.25rem] tw:[padding-left:0] tw:block tw:relative`,
    String.raw`tw:[&:hover]:[color:white] tw:[&:hover]:[transform:translateX(5px)] tw:[&:hover]:[outline:none]`,
    String.raw`tw:[&:focus]:[color:white] tw:[&:focus]:[transform:translateX(5px)] tw:[&:focus]:[outline:none]`,
    String.raw`tw:motion-reduce:[transition:none]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
    String.raw`tw:motion-reduce:[&:focus]:[transform:none]`,
    String.raw`tw:max-768:text-center tw:max-768:inline-block tw:max-768:[padding-top:0.4rem] tw:max-768:[padding-right:0.6rem] tw:max-768:[padding-bottom:0.4rem] tw:max-768:[padding-left:0.6rem] tw:max-768:[margin-top:0] tw:max-768:[margin-right:0] tw:max-768:[margin-bottom:0] tw:max-768:[margin-left:0] tw:max-768:[transform:none]!`,
    String.raw`tw:max-768:[&:hover]:[transform:none]! tw:max-768:[&:hover]:[background-color:rgba(255,_255,_255,_0.1)] tw:max-768:[&:hover]:[color:white]`,
    String.raw`tw:max-768:[&:focus]:[transform:none]! tw:max-768:[&:focus]:[background-color:rgba(255,_255,_255,_0.1)] tw:max-768:[&:focus]:[color:white]`,
  ].join(' '),
  // footer
  "contacto-link": [
    String.raw`tw:[color:var(--texto)] tw:no-underline tw:[transition:all_0.3s_ease] tw:inline-block tw:relative tw:[padding-top:0.1rem] tw:[padding-right:0] tw:[padding-bottom:0.1rem] tw:[padding-left:0]`,
    String.raw`tw:[&:hover]:[color:white] tw:[&:hover]:no-underline tw:[&:hover]:[outline:none]`,
    String.raw`tw:[&:focus]:[color:white] tw:[&:focus]:no-underline tw:[&:focus]:[outline:none]`,
    String.raw`tw:max-768:[&:hover]:[transform:none] tw:max-768:[&:hover]:[background-color:rgba(255,_255,_255,_0.1)]`,
    String.raw`tw:max-768:[&:focus]:[transform:none] tw:max-768:[&:focus]:[background-color:rgba(255,_255,_255,_0.1)]`,
  ].join(' '),
  // footer
  "footer-social-container": [
    String.raw`tw:flex tw:flex-col tw:items-start`,
    String.raw`tw:min-841:flex-row tw:min-841:items-center tw:min-841:[row-gap:1rem] tw:min-841:[column-gap:1rem]`,
    String.raw`tw:max-768:items-center`,
    String.raw`tw:max-820:items-center`,
    String.raw`tw:max-480:items-center`,
    String.raw`tw:max-380:items-center`,
  ].join(' '),
  // footer
  "footer-redes": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[margin-bottom:1rem] tw:justify-start tw:[margin-left:2px]`,
    String.raw`tw:[&_a]:flex tw:[&_a]:items-center tw:[&_a]:justify-center tw:[&_a]:[width:45px] tw:[&_a]:[height:45px] tw:[&_a]:[background-color:rgba(255,_255,_255,_0.1)] tw:[&_a]:[border-radius:50%] tw:[&_a]:[color:white] tw:[&_a]:[font-size:1.3rem] tw:[&_a]:no-underline tw:[&_a]:[transition:all_0.3s_cubic-bezier(0.25,_0.46,_0.45,_0.94)] tw:[&_a]:relative`,
    String.raw`tw:[&_a:hover]:[transform:translateY(-3px)_scale(1.05)] tw:[&_a:hover]:[box-shadow:0_5px_15px_rgba(0,_0,_0,_0.2)]`,
    String.raw`tw:motion-reduce:[&_a]:[transition:none]`,
    String.raw`tw:motion-reduce:[&_a:hover]:[transform:none]`,
    String.raw`tw:min-841:[margin-bottom:0]`,
    String.raw`tw:max-768:justify-center`,
    String.raw`tw:max-768:[&_a:hover]:[transform:none]!`,
    String.raw`tw:max-768:[&_a]:[box-shadow:0_2px_8px_rgba(0,_0,_0,_0.3)]`,
    String.raw`tw:max-820:justify-center tw:max-820:flex-wrap`,
    String.raw`tw:max-820:[&_a:hover]:[transform:none]!`,
    String.raw`tw:max-820:[&_a]:[box-shadow:0_2px_8px_rgba(0,_0,_0,_0.3)]`,
    String.raw`tw:max-480:flex-row tw:max-480:items-center tw:max-480:[row-gap:0.8rem] tw:max-480:[column-gap:0.8rem] tw:max-480:[margin-bottom:1rem]`,
    String.raw`tw:max-480:[&_a]:[margin-top:0] tw:max-480:[&_a]:[margin-right:0] tw:max-480:[&_a]:[margin-bottom:0] tw:max-480:[&_a]:[margin-left:0] tw:max-480:[&_a]:[box-shadow:0_2px_8px_rgba(0,_0,_0,_0.3)]`,
    String.raw`tw:max-480:[&_a:hover]:[transform:none]!`,
    String.raw`tw:max-380:[&_a]:[width:40px] tw:max-380:[&_a]:[height:40px] tw:max-380:[&_a]:[font-size:1.1rem]`,
  ].join(' '),
  // footer
  "social-link": [
    String.raw`tw:[&:focus]:[outline:2px_solid_white] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:[width:42px] tw:[height:42px] tw:grid tw:[place-items:center] tw:[background:#fff] tw:[border:1px_solid_#eee] tw:[border-radius:12px] tw:[box-shadow:0_2px_6px_rgba(0,_0,_0,_.06)] tw:[transition:transform_0.2s_ease,_box-shadow_0.2s_ease]`,
    String.raw`tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_4px_12px_rgba(0,_0,_0,_.1)]`,
  ].join(' '),
  // footer
  "facebook-link": [
    String.raw`tw:[&:hover]:[background-color:#3b5998]`,
    String.raw`tw:max-768:[background-color:#3b5998]!`,
    String.raw`tw:max-820:[background-color:#3b5998]!`,
    String.raw`tw:max-480:[background-color:#3b5998]!`,
  ].join(' '),
  // footer
  "instagram-link": [
    String.raw`tw:[&:hover]:[background:linear-gradient(45deg,_#f09433,_#e6683c,_#dc2743,_#cc2366,_#bc1888)]`,
    String.raw`tw:max-768:[background:linear-gradient(45deg,_#f09433,_#e6683c,_#dc2743,_#cc2366,_#bc1888)]!`,
    String.raw`tw:max-820:[background:linear-gradient(45deg,_#f09433,_#e6683c,_#dc2743,_#cc2366,_#bc1888)]!`,
    String.raw`tw:max-480:[background:linear-gradient(45deg,_#f09433,_#e6683c,_#dc2743,_#cc2366,_#bc1888)]!`,
  ].join(' '),
  // footer
  "footer-derechos": [
    String.raw`tw:text-center tw:[margin-top:3rem] tw:[padding-top:1.5rem] tw:[border-top:1px_solid_rgba(255,_255,_255,_0.1)]`,
  ].join(' '),
  // footer
  "footer-icic": [
    String.raw`tw:flex tw:justify-start tw:[margin-top:0] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[line-height:0]`,
    String.raw`tw:[&_img]:[width:120px] tw:[&_img]:[height:auto] tw:[&_img]:cursor-pointer tw:[&_img]:[transition:transform_0.3s_cubic-bezier(0.25,_0.46,_0.45,_0.94),_filter_0.3s_ease] tw:[&_img]:[margin-top:0] tw:[&_img]:[margin-right:0] tw:[&_img]:[margin-bottom:0] tw:[&_img]:[margin-left:0] tw:[&_img]:[padding-top:0] tw:[&_img]:[padding-right:0] tw:[&_img]:[padding-bottom:0] tw:[&_img]:[padding-left:0] tw:[&_img]:block`,
    String.raw`tw:[&_img:hover]:[transform:translateY(-3px)_scale(1.03)] tw:[&_img:hover]:[filter:drop-shadow(0_3px_6px_rgba(0,_0,_0,_0.2))]`,
    String.raw`tw:motion-reduce:[&_img]:[transition:none]`,
    String.raw`tw:motion-reduce:[&_img:hover]:[transform:none]`,
    String.raw`tw:min-841:[margin-top:0] tw:min-841:[align-self:center] tw:min-841:[line-height:0]`,
    String.raw`tw:min-841:[&_img]:[margin-left:10px]`,
    String.raw`tw:max-768:[&_img:hover]:[transform:none]!`,
    String.raw`tw:max-820:justify-center tw:max-820:[margin-top:1rem] tw:max-820:[line-height:0]`,
    String.raw`tw:max-820:[&_img]:[margin-top:0] tw:max-820:[&_img]:[margin-right:auto] tw:max-820:[&_img]:[margin-bottom:0] tw:max-820:[&_img]:[margin-left:auto]`,
    String.raw`tw:max-820:[&_img:hover]:[transform:none]!`,
    String.raw`tw:max-480:[margin-top:0.5rem] tw:max-480:[line-height:0]`,
    String.raw`tw:max-480:[&_img]:[width:100px]`,
    String.raw`tw:max-480:[&_img:hover]:[transform:none]!`,
    String.raw`tw:max-380:[&_img]:[width:80px]`,
  ].join(' '),
  // footer
  "icic-button": [
    String.raw`tw:[background:none] tw:[border:none] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:cursor-pointer tw:[transition:transform_0.3s_ease]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_white] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[transition:none]`,
  ].join(' '),
  // footer
  "sr-only": [
    String.raw`tw:absolute tw:[width:1px] tw:[height:1px] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:-1px] tw:[margin-right:-1px] tw:[margin-bottom:-1px] tw:[margin-left:-1px] tw:overflow-hidden tw:[clip:rect(0,_0,_0,_0)] tw:whitespace-nowrap tw:[border:0]`,
  ].join(' '),
  // hero
  "hero": [
    String.raw`tw:[--hero-pad-x:clamp(1rem,_3vw,_2rem)] tw:[--hero-pad-y:clamp(1.25rem,_4vh,_3rem)] tw:[--overlay:linear-gradient(180deg,_rgba(0,0,0,.55)_0%,_rgba(0,0,0,.35)_40%,_rgba(0,0,0,.55)_100%)] tw:relative tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:10px] tw:[margin-left:0] tw:[min-height:clamp(24rem,_calc(70svh_-_var(--site-header-height)),_38rem)] tw:flex tw:items-center tw:justify-center tw:text-center tw:[padding-top:calc(var(--hero-pad-y)_+_env(safe-area-inset-top))] tw:[padding-right:calc(var(--hero-pad-x)_+_env(safe-area-inset-right))] tw:[padding-bottom:calc(var(--hero-pad-y)_+_env(safe-area-inset-bottom))] tw:[padding-left:calc(var(--hero-pad-x)_+_env(safe-area-inset-left))] tw:[color:#fff] tw:[border-radius:0] tw:overflow-hidden tw:[background-color:#000] tw:[background-position:center] tw:[background-size:cover] tw:[background-repeat:no-repeat]`,
    String.raw`tw:[&::before]:[content:""] tw:[&::before]:absolute tw:[&::before]:[top:0] tw:[&::before]:[right:0] tw:[&::before]:[bottom:0] tw:[&::before]:[left:0] tw:[&::before]:[background:radial-gradient(1200px_500px_at_50%_-20%,_rgba(0,0,0,.45),_transparent_60%),_var(--overlay)] tw:[&::before]:[z-index:1] tw:[&::before]:pointer-events-none`,
    String.raw`tw:max-840:[min-height:clamp(15rem,_calc(65svh_-_var(--site-header-height)),_25rem)] tw:max-840:[--hero-pad-x:clamp(1.25rem,_4vw,_2rem)] tw:max-840:[--hero-pad-y:clamp(2rem,_5vh,_3rem)]`,
    String.raw`tw:landscape-520:[min-height:clamp(18rem,_88vh,_40rem)] tw:landscape-520:[padding-top:clamp(.75rem,_2vh,_1rem)] tw:landscape-520:[padding-right:clamp(.75rem,_2vh,_1rem)] tw:landscape-520:[padding-bottom:clamp(.75rem,_2vh,_1rem)] tw:landscape-520:[padding-left:clamp(.75rem,_2vh,_1rem)]`,
    String.raw`tw:retina:[&::before]:[background:radial-gradient(1200px_500px_at_50%_-20%,_rgba(0,0,0,.35),_transparent_60%),_linear-gradient(180deg,_rgba(0,0,0,.5)_0%,_rgba(0,0,0,.3)_40%,_rgba(0,0,0,.5)_100%)]`,
    String.raw`tw:touch:[-webkit-tap-highlight-color:transparent] tw:touch:[touch-action:manipulation]`,
  ].join(' '),
  // hero
  "hero-bg-image": [
    String.raw`tw:absolute tw:[top:0] tw:[right:0] tw:[bottom:0] tw:[left:0] tw:[width:100%] tw:[height:100%] tw:object-cover tw:object-center tw:[z-index:0] tw:[transform:translateZ(0)] tw:[backface-visibility:hidden] tw:[perspective:1000]`,
  ].join(' '),
  // hero
  "hero-contenido": [
    String.raw`tw:relative tw:[z-index:2] tw:[width:min(100%,_90rem)] tw:[max-width:min(900px,_92vw)] tw:[animation:cmic-fadeIn_.8s_ease]`,
    String.raw`tw:min-1440:[max-width:1000px]`,
    String.raw`tw:motion-reduce:[animation:none]`,
  ].join(' '),
  // hero
  "hero-titulo": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:font-extrabold tw:[letter-spacing:-0.01em] tw:[line-height:1.15] tw:[color:#fff] tw:[font-size:clamp(1.8rem,_3.8vw_+_.5rem,_3.6rem)] tw:[text-wrap:balance] tw:[text-shadow:0_2px_18px_rgba(0,0,0,.45),_0_1px_4px_rgba(0,0,0,.35)]`,
    String.raw`tw:[&::after]:[content:''] tw:[&::after]:block tw:[&::after]:[margin-top:clamp(1rem,_3vh,_1.5rem)] tw:[&::after]:[margin-right:auto] tw:[&::after]:[margin-bottom:0] tw:[&::after]:[margin-left:auto] tw:[&::after]:[width:clamp(72px,_14vw,_140px)] tw:[&::after]:[height:3px] tw:[&::after]:[background:linear-gradient(90deg,_transparent,_#ffffff,_transparent)] tw:[&::after]:[border-radius:2px] tw:[&::after]:[opacity:.9]`,
    String.raw`tw:landscape-520:[font-size:clamp(1.4rem,_3.2vw_+_.3rem,_2.4rem)]`,
  ].join(' '),
  // hero
  "hero-subtitulo": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[padding-top:.5rem] tw:[padding-right:1rem] tw:[padding-bottom:.5rem] tw:[padding-left:1rem] tw:[max-width:min(62ch,_90vw)] tw:font-medium tw:[line-height:1.5] tw:[color:#f3f3f3] tw:[font-size:clamp(1rem,_1.6vw_+_.3rem,_1.35rem)] tw:text-center tw:[text-wrap:pretty] tw:[background:linear-gradient(180deg,_rgba(0,0,0,.25),_rgba(0,0,0,.18))] tw:[border:1px_solid_rgba(255,255,255,.12)] tw:[border-radius:10px] tw:[backdrop-filter:blur(2px)_saturate(1.05)]`,
    String.raw`tw:landscape-520:[font-size:clamp(.9rem,_1.4vw_+_.25rem,_1.1rem)] tw:landscape-520:[padding-top:.4rem] tw:landscape-520:[padding-right:.75rem] tw:landscape-520:[padding-bottom:.4rem] tw:landscape-520:[padding-left:.75rem]`,
    String.raw`tw:max-360:[padding-top:.4rem] tw:max-360:[padding-right:.75rem] tw:max-360:[padding-bottom:.4rem] tw:max-360:[padding-left:.75rem]`,
  ].join(' '),
  // convenios
  "convenios": [
    String.raw`tw:[&.logos-only]:[background:var(--colorFondo)] tw:[&.logos-only]:[padding-top:clamp(1.5rem,_2vw,_3rem)] tw:[&.logos-only]:[padding-right:0] tw:[&.logos-only]:[padding-bottom:clamp(2rem,_4vw,_3rem)] tw:[&.logos-only]:[padding-left:0] tw:[&.logos-only]:relative tw:[&.logos-only]:[z-index:0] tw:[&.logos-only]:[margin-top:clamp(1.5rem,_3vw,_4rem)] tw:[&.logos-only]:[margin-bottom:-10rem]`,
    String.raw`tw:max-810:[&.logos-only]:[margin-top:300px] tw:max-810:[&.logos-only]:[margin-bottom:-30rem]`,
    String.raw`tw:max-640:[&.logos-only]:[margin-bottom:-300px] tw:max-640:[&.logos-only]:[margin-top:200px]`,
    String.raw`tw:landscape-480:[&.logos-only]:[margin-top:1rem] tw:landscape-480:[&.logos-only]:[margin-bottom:2rem]`,
    String.raw`tw:[background:var(--colorFondo)] tw:[min-height:100vh]`,
  ].join(' '),
  // convenios
  "convenios-head": [
    String.raw`tw:[width:min(96vw,_1200px)] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:1.25rem] tw:[margin-left:auto] tw:text-center`,
  ].join(' '),
  // convenios
  "convenios-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:font-extrabold tw:[letter-spacing:.2px] tw:[font-size:clamp(1.6rem,_2.3vw_+_1rem,_2.6rem)] tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:.35rem] tw:[margin-left:0]`,
  ].join(' '),
  // convenios
  "convenios-subtitle": [
    String.raw`tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:[opacity:.9] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[max-width:780px] tw:[line-height:1.55]`,
  ].join(' '),
  // convenios
  "convenios-strip": [
    String.raw`tw:relative tw:overflow-hidden tw:[width:100vw] tw:[margin-left:calc(50%_-_50vw)] tw:[margin-right:calc(50%_-_50vw)] tw:[padding-inline:0] tw:[-webkit-mask-image:linear-gradient(_to_right,_rgba(0,0,0,0)_0,_rgba(0,0,0,1)_56px,_rgba(0,0,0,1)_calc(100%_-_56px),_rgba(0,0,0,0)_100%_)] tw:[mask-image:linear-gradient(_to_right,_rgba(0,0,0,0)_0,_rgba(0,0,0,1)_56px,_rgba(0,0,0,1)_calc(100%_-_56px),_rgba(0,0,0,0)_100%_)] tw:[-webkit-mask-size:100%_100%] tw:[mask-size:100%_100%]`,
    String.raw`tw:[.convenios.no-fade_&]:[-webkit-mask-image:none] tw:[.convenios.no-fade_&]:[mask-image:none]`,
    String.raw`tw:no-mask:[&::before]:[content:""] tw:no-mask:[&::before]:absolute tw:no-mask:[&::before]:[top:0] tw:no-mask:[&::before]:[bottom:0] tw:no-mask:[&::before]:[width:56px] tw:no-mask:[&::before]:pointer-events-none tw:no-mask:[&::before]:[z-index:0] tw:no-mask:[&::before]:[left:0] tw:no-mask:[&::before]:[background:linear-gradient(90deg,_var(--fadeColor)_0%,_rgba(255,255,255,0)_100%)]`,
    String.raw`tw:no-mask:[&::after]:[content:""] tw:no-mask:[&::after]:absolute tw:no-mask:[&::after]:[top:0] tw:no-mask:[&::after]:[bottom:0] tw:no-mask:[&::after]:[width:56px] tw:no-mask:[&::after]:pointer-events-none tw:no-mask:[&::after]:[z-index:0] tw:no-mask:[&::after]:[right:0] tw:no-mask:[&::after]:[background:linear-gradient(270deg,_var(--fadeColor)_0%,_rgba(255,255,255,0)_100%)]`,
    String.raw`tw:max-640:[width:min(99vw,_var(--max-strip))] tw:max-640:[padding-inline:7vw]`,
  ].join(' '),
  // convenios
  "convenios-rail": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:var(--logo-gap)] tw:[column-gap:var(--logo-gap)] tw:[will-change:transform] tw:select-none tw:[-webkit-user-drag:none] tw:[padding-block:.25rem]`,
    String.raw`tw:motion-reduce:[animation:none]!`,
  ].join(' '),
  // convenios
  "convenio-logo": [
    String.raw`tw:[flex:0_0_auto] tw:inline-flex tw:items-center tw:justify-center tw:[min-height:var(--logo-h)] tw:[line-height:0] tw:relative tw:[isolation:isolate]`,
    String.raw`tw:[&_img]:block tw:[&_img]:[width:auto] tw:[&_img]:[height:auto] tw:[&_img]:[max-height:var(--logo-h)] tw:[&_img]:[max-width:var(--logo-max-w)] tw:[&_img]:object-contain tw:[&_img]:[image-rendering:auto] tw:[&_img]:[filter:grayscale(var(--filter-intensity))_saturate(.9)_brightness(.98)_contrast(.98)] tw:[&_img]:[opacity:.9] tw:[&_img]:[transform:translateZ(0)_scale(1)] tw:[&_img]:[transition:transform_var(--hover-duration)_var(--hover-ease),_filter_140ms_ease,_opacity_140ms_ease,_box-shadow_var(--hover-duration)_var(--hover-ease)] tw:[&_img]:[will-change:transform]`,
    String.raw`tw:can-hover:[&:hover_img]:[filter:grayscale(0)_saturate(1)_brightness(1)_contrast(1)] tw:can-hover:[&:hover_img]:[opacity:1] tw:can-hover:[&:hover_img]:[transform:translateZ(0)_scale(var(--hover-scale))] tw:can-hover:[&:hover_img]:[box-shadow:var(--hover-shadow)]`,
    String.raw`tw:can-hover:[&:focus-visible_img]:[filter:grayscale(0)_saturate(1)_brightness(1)_contrast(1)] tw:can-hover:[&:focus-visible_img]:[opacity:1] tw:can-hover:[&:focus-visible_img]:[transform:translateZ(0)_scale(var(--hover-scale))] tw:can-hover:[&:focus-visible_img]:[box-shadow:var(--hover-shadow)]`,
    String.raw`tw:can-hover:[&:hover]:[z-index:2]`,
    String.raw`tw:can-hover:[&:focus-within_img]:[transform:translateZ(0)_scale(var(--hover-scale))] tw:can-hover:[&:focus-within_img]:[filter:grayscale(0)_saturate(1)_brightness(1)_contrast(1)] tw:can-hover:[&:focus-within_img]:[opacity:1] tw:can-hover:[&:focus-within_img]:[box-shadow:var(--hover-shadow)]`,
    String.raw`tw:no-hover:[&:active_img]:[transform:translateZ(0)_scale(1.06)]`,
    String.raw`tw:motion-reduce:[&_img]:[transition:none]`,
  ].join(' '),
  // convenios
  "convenios-cta": [
    String.raw`tw:flex tw:justify-center tw:[margin-top:2rem] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem]`,
  ].join(' '),
  // convenios
  "btn-convenios-buscador": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[border:0] tw:[padding-top:.85rem] tw:[padding-right:2rem] tw:[padding-bottom:.85rem] tw:[padding-left:2rem] tw:[border-radius:8px] tw:[font-family:var(--subtitulos)] tw:font-semibold tw:[font-size:1rem] tw:cursor-pointer tw:[transition:background-color_.2s_ease] tw:[box-shadow:0_4px_12px_rgba(114,0,0,.2)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)]`,
  ].join(' '),
  // convenios
  "convenios-loading": [
    String.raw`tw:text-center tw:[padding-top:3rem] tw:[padding-right:1.5rem] tw:[padding-bottom:3rem] tw:[padding-left:1.5rem] tw:[font-size:1.05rem] tw:[color:var(--muted)] tw:[font-family:var(--texto)]`,
  ].join(' '),
  "home-action": String.raw`tw:inline-flex tw:items-center tw:justify-center tw:[gap:.65rem] tw:no-underline tw:[isolation:isolate] tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:4px]`,
  "affiliate-section": [
    String.raw`tw:[padding:5rem_1.5rem] tw:[background:#f7f7f5] tw:[border-block:1px_solid_#e9e7e3] tw:max-640:[padding:3rem_1rem]`,
  ].join(' '),
  "affiliate-inner": String.raw`tw:[max-width:1200px] tw:mx-auto tw:min-w-0`,
  "affiliate-heading": [
    String.raw`tw:text-center tw:[margin-bottom:2rem] tw:[&_h2]:[font-family:var(--titulos)] tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:[font-size:clamp(1.9rem,4vw,2.7rem)] tw:[&_h2]:[margin:.6rem_0_.75rem] tw:[&_p]:[font-family:var(--texto)] tw:[&_p]:[color:#626262] tw:[&_p]:[margin:0] tw:[&_p]:[line-height:1.6]`,
  ].join(' '),
  "affiliate-eyebrow": String.raw`tw:[font-family:var(--texto)] tw:[font-size:.7rem] tw:font-bold tw:[letter-spacing:.16em] tw:[color:var(--colorPrincipal)]`,
  "affiliate-gallery": [
    String.raw`tw:grid tw:[grid-template-rows:repeat(2,190px)] tw:[grid-auto-flow:column] tw:[grid-auto-columns:calc((100%_-_3rem)/4)] tw:[gap:1rem] tw:overflow-x-auto tw:[overscroll-behavior-x:contain] tw:[scrollbar-width:none] tw:[&::-webkit-scrollbar]:hidden tw:[padding:3px_3px_1rem] tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:4px] tw:max-1024:[grid-auto-columns:calc((100%_-_2rem)/3)] tw:max-640:[grid-auto-columns:calc((100%_-_1rem)/2.15)] tw:max-640:[grid-template-rows:repeat(2,160px)] tw:max-640:[gap:.75rem]`,
  ].join(' '),
  "affiliate-card": String.raw`tw:flex tw:flex-col tw:items-center tw:justify-center tw:min-w-0 tw:[padding:1.25rem] tw:[background:transparent] tw:[border:0] tw:[box-shadow:none] tw:[border-radius:14px] tw:max-640:[padding:1rem]`,
  "affiliate-logo": String.raw`tw:flex tw:items-center tw:justify-center tw:[height:105px] tw:w-full tw:[&_img]:[max-width:100%] tw:[&_img]:[max-height:100%] tw:[&_img]:object-contain tw:[&_.image-placeholder]:[min-height:0] tw:max-640:[height:80px]`,
  "affiliate-name": String.raw`tw:[font-family:var(--texto)] tw:[font-size:.75rem] tw:[color:#656565] tw:text-center tw:[margin-top:1rem] tw:[line-height:1.4] tw:[display:-webkit-box] tw:[-webkit-line-clamp:2] tw:[-webkit-box-orient:vertical] tw:overflow-hidden tw:[overflow-wrap:anywhere]`,
  "affiliate-footer": String.raw`tw:flex tw:justify-center tw:[margin-top:2rem]`,
  // afiliados
  "afiliados": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:2rem] tw:[padding-bottom:4rem] tw:[padding-left:2rem] tw:text-center tw:[margin-bottom:-100px] tw:[width:100%] tw:[max-width:100vw] tw:relative`,
    String.raw`tw:[&_h2]:[font-size:2.5rem] tw:[&_h2]:[margin-bottom:1.5rem] tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:[font-family:var(--titulos)]`,
    String.raw`tw:[&_p]:[font-size:1.2rem] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-bottom:4rem] tw:[&_p]:[font-family:var(--texto)] tw:[&_p]:[max-width:700px] tw:[&_p]:[margin-left:auto] tw:[&_p]:[margin-right:auto] tw:[&_p]:[line-height:1.6]`,
    String.raw`tw:max-1024:[padding-top:3.5rem] tw:max-1024:[padding-right:2rem] tw:max-1024:[padding-bottom:3.5rem] tw:max-1024:[padding-left:2rem]`,
    String.raw`tw:max-1024:[&_h2]:[font-size:2.2rem]`,
    String.raw`tw:max-1024:[&_p]:[font-size:1.1rem] tw:max-1024:[&_p]:[margin-bottom:3.5rem]`,
    String.raw`tw:max-768:[padding-top:3rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:3rem] tw:max-768:[padding-left:1.5rem]`,
    String.raw`tw:max-768:[&_h2]:[font-size:2rem] tw:max-768:[&_h2]:[margin-bottom:1.25rem]`,
    String.raw`tw:max-768:[&_p]:[font-size:1.1rem] tw:max-768:[&_p]:[margin-bottom:3rem]`,
    String.raw`tw:max-640:[padding-top:2.5rem] tw:max-640:[padding-right:1rem] tw:max-640:[padding-bottom:2.5rem] tw:max-640:[padding-left:1rem]`,
    String.raw`tw:max-480:[padding-top:2rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:2rem] tw:max-480:[padding-left:1rem]`,
    String.raw`tw:max-480:[&_h2]:[font-size:1.8rem]`,
    String.raw`tw:max-480:[&_p]:[font-size:1rem] tw:max-480:[&_p]:[margin-bottom:2.5rem]`,
  ].join(' '),
  // afiliados
  "afiliados-loading": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:2rem] tw:[padding-bottom:4rem] tw:[padding-left:2rem] tw:text-center tw:[font-size:1.3rem] tw:[color:var(--colorTexto)]`,
  ].join(' '),
  // afiliados
  "afiliados-error": [
    String.raw`tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem] tw:text-center tw:[font-size:1.3rem] tw:[color:#d32f2f] tw:[background:#ffebee] tw:[border-radius:8px] tw:[border:1px_solid_#ffcdd2] tw:[margin-top:2rem] tw:[margin-right:auto] tw:[margin-bottom:2rem] tw:[margin-left:auto] tw:[max-width:500px]`,
  ].join(' '),
  // afiliados
  "afiliados-empty": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:2rem] tw:[padding-bottom:4rem] tw:[padding-left:2rem] tw:text-center tw:[font-size:1.3rem] tw:[color:#666] tw:[font-style:italic]`,
  ].join(' '),
  // afiliados
  "loading-spinner": [
    String.raw`tw:[width:40px] tw:[height:40px] tw:[border:4px_solid_#f3f3f3] tw:[border-top:4px_solid_var(--colorPrincipal)] tw:[border-radius:50%] tw:[animation:cmic-spin_1s_linear_infinite] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:20px] tw:[margin-left:auto] tw:[border-left-color:var(--colorPrincipal)] tw:[border-left:4px_solid_var(--colorPrincipal)]`,
    String.raw`tw:motion-reduce:[animation:none] tw:motion-reduce:[border-left-color:transparent]`,
  ].join(' '),
  // afiliados
  "logos-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_280px),_1fr))] tw:[row-gap:3rem] tw:[column-gap:3rem] tw:[justify-items:center] tw:items-center tw:[max-width:2000px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:4rem] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:2rem] tw:[padding-bottom:0] tw:[padding-left:2rem]`,
    String.raw`tw:max-1400:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_240px),_1fr))] tw:max-1400:[row-gap:2.5rem] tw:max-1400:[column-gap:2.5rem] tw:max-1400:[padding-top:0] tw:max-1400:[padding-right:2rem] tw:max-1400:[padding-bottom:0] tw:max-1400:[padding-left:2rem]`,
    String.raw`tw:max-1200:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_240px),_1fr))] tw:max-1200:[row-gap:2.5rem] tw:max-1200:[column-gap:2.5rem] tw:max-1200:[padding-top:0] tw:max-1200:[padding-right:2rem] tw:max-1200:[padding-bottom:0] tw:max-1200:[padding-left:2rem]`,
    String.raw`tw:max-1024:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_220px),_1fr))] tw:max-1024:[row-gap:2.25rem] tw:max-1024:[column-gap:2.25rem] tw:max-1024:[padding-top:0] tw:max-1024:[padding-right:2rem] tw:max-1024:[padding-bottom:0] tw:max-1024:[padding-left:2rem]`,
    String.raw`tw:max-900:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_200px),_1fr))] tw:max-900:[row-gap:2rem] tw:max-900:[column-gap:2rem] tw:max-900:[padding-top:0] tw:max-900:[padding-right:1.5rem] tw:max-900:[padding-bottom:0] tw:max-900:[padding-left:1.5rem]`,
    String.raw`tw:max-768:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_180px),_1fr))] tw:max-768:[row-gap:1.75rem] tw:max-768:[column-gap:1.75rem] tw:max-768:[padding-top:0] tw:max-768:[padding-right:1rem] tw:max-768:[padding-bottom:0] tw:max-768:[padding-left:1rem]`,
    String.raw`tw:max-640:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_160px),_1fr))] tw:max-640:[row-gap:1.5rem] tw:max-640:[column-gap:1.5rem] tw:max-640:[padding-top:0] tw:max-640:[padding-right:0.5rem] tw:max-640:[padding-bottom:0] tw:max-640:[padding-left:0.5rem]`,
    String.raw`tw:max-480:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:max-480:[row-gap:1.25rem] tw:max-480:[column-gap:1.25rem] tw:max-480:[padding-top:0] tw:max-480:[padding-right:0] tw:max-480:[padding-bottom:0] tw:max-480:[padding-left:0]`,
    String.raw`tw:max-400:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:max-400:[row-gap:1rem] tw:max-400:[column-gap:1rem]`,
  ].join(' '),
  // afiliados
  "logo-item": [
    String.raw`tw:flex tw:justify-center tw:items-center tw:[transition:all_0.3s_ease] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[border-radius:12px] tw:[background:transparent]`,
    String.raw`tw:[&_img]:[max-width:100%] tw:[&_img]:[max-height:100%] tw:[&_img]:[width:auto] tw:[&_img]:[height:auto] tw:[&_img]:object-contain tw:[&_img]:[filter:grayscale(30%)] tw:[&_img]:[opacity:0.95] tw:[&_img]:[transition:all_0.3s_ease]`,
    String.raw`tw:[&:hover]:[transform:scale(1.08)]`,
    String.raw`tw:[&:hover_img]:[filter:grayscale(0%)] tw:[&:hover_img]:[opacity:1]`,
    String.raw`tw:max-1024:[padding-top:1.75rem] tw:max-1024:[padding-right:1.75rem] tw:max-1024:[padding-bottom:1.75rem] tw:max-1024:[padding-left:1.75rem]`,
    String.raw`tw:max-900:[padding-top:1.5rem] tw:max-900:[padding-right:1.5rem] tw:max-900:[padding-bottom:1.5rem] tw:max-900:[padding-left:1.5rem]`,
    String.raw`tw:max-768:[padding-top:1.25rem] tw:max-768:[padding-right:1.25rem] tw:max-768:[padding-bottom:1.25rem] tw:max-768:[padding-left:1.25rem]`,
    String.raw`tw:max-768:[&_img]:[filter:none]`,
    String.raw`tw:max-640:[padding-top:1rem] tw:max-640:[padding-right:1rem] tw:max-640:[padding-bottom:1rem] tw:max-640:[padding-left:1rem]`,
    String.raw`tw:max-480:[padding-top:0.875rem] tw:max-480:[padding-right:0.875rem] tw:max-480:[padding-bottom:0.875rem] tw:max-480:[padding-left:0.875rem]`,
    String.raw`tw:max-400:[padding-top:0.75rem] tw:max-400:[padding-right:0.75rem] tw:max-400:[padding-bottom:0.75rem] tw:max-400:[padding-left:0.75rem]`,
  ].join(' '),
  // afiliados
  "logo-item--regular": [
    String.raw`tw:[&.logo-item--regular]:[width:320px] tw:[&.logo-item--regular]:[height:240px]`,
    String.raw`tw:max-1400:[&.logo-item--regular]:[width:290px] tw:max-1400:[&.logo-item--regular]:[height:220px]`,
    String.raw`tw:max-1200:[&.logo-item--regular]:[width:190px] tw:max-1200:[&.logo-item--regular]:[height:120px]`,
    String.raw`tw:max-1024:[&.logo-item--regular]:[width:290px] tw:max-1024:[&.logo-item--regular]:[height:190px]`,
    String.raw`tw:max-900:[&.logo-item--regular]:[width:300px] tw:max-900:[&.logo-item--regular]:[height:150px]`,
    String.raw`tw:max-768:[&.logo-item--regular]:[width:250px] tw:max-768:[&.logo-item--regular]:[height:200px]`,
    String.raw`tw:max-640:[&.logo-item--regular]:[width:140px] tw:max-640:[&.logo-item--regular]:[height:150px]`,
    String.raw`tw:max-480:[&.logo-item--regular]:[width:150px] tw:max-480:[&.logo-item--regular]:[height:100px]`,
    String.raw`tw:max-400:[&.logo-item--regular]:[width:150px] tw:max-400:[&.logo-item--regular]:[height:100px]`,
  ].join(' '),
  // afiliados
  "logo-item--wide": [
    String.raw`tw:[&.logo-item--wide]:[width:380px] tw:[&.logo-item--wide]:[height:210px]`,
    String.raw`tw:max-1400:[&.logo-item--wide]:[width:240px] tw:max-1400:[&.logo-item--wide]:[height:105px]`,
    String.raw`tw:max-1200:[&.logo-item--wide]:[width:240px] tw:max-1200:[&.logo-item--wide]:[height:95px]`,
    String.raw`tw:max-1024:[&.logo-item--wide]:[width:220px] tw:max-1024:[&.logo-item--wide]:[height:95px]`,
    String.raw`tw:max-900:[&.logo-item--wide]:[width:300px] tw:max-900:[&.logo-item--wide]:[height:150px]`,
    String.raw`tw:max-768:[&.logo-item--wide]:[width:280px] tw:max-768:[&.logo-item--wide]:[height:180px]`,
    String.raw`tw:max-640:[&.logo-item--wide]:[width:160px] tw:max-640:[&.logo-item--wide]:[height:70px]`,
    String.raw`tw:max-480:[&.logo-item--wide]:[width:150px] tw:max-480:[&.logo-item--wide]:[height:65px]`,
    String.raw`tw:max-400:[&.logo-item--wide]:[width:140px] tw:max-400:[&.logo-item--wide]:[height:60px]`,
  ].join(' '),
  // afiliados
  "logo-item--ultrawide": [
    String.raw`tw:[&.logo-item--ultrawide]:[width:420px] tw:[&.logo-item--ultrawide]:[height:200px]`,
    String.raw`tw:max-1400:[&.logo-item--ultrawide]:[width:280px] tw:max-1400:[&.logo-item--ultrawide]:[height:285px]`,
    String.raw`tw:max-1200:[&.logo-item--ultrawide]:[width:280px] tw:max-1200:[&.logo-item--ultrawide]:[height:85px]`,
    String.raw`tw:max-1024:[&.logo-item--ultrawide]:[width:350px] tw:max-1024:[&.logo-item--ultrawide]:[height:200px]`,
    String.raw`tw:max-900:[&.logo-item--ultrawide]:[width:420px] tw:max-900:[&.logo-item--ultrawide]:[height:200px]`,
    String.raw`tw:max-768:[&.logo-item--ultrawide]:[width:380px] tw:max-768:[&.logo-item--ultrawide]:[height:170px]`,
    String.raw`tw:max-640:[&.logo-item--ultrawide]:[width:200px] tw:max-640:[&.logo-item--ultrawide]:[height:160px]`,
    String.raw`tw:max-480:[&.logo-item--ultrawide]:[width:180px] tw:max-480:[&.logo-item--ultrawide]:[height:155px]`,
    String.raw`tw:max-400:[&.logo-item--ultrawide]:[width:160px] tw:max-400:[&.logo-item--ultrawide]:[height:100px]`,
  ].join(' '),
  // afiliados
  "image-placeholder": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:flex tw:items-center tw:justify-center tw:[background:var(--colorFondo)] tw:[border-radius:10px] tw:[color:#999] tw:[font-weight:bold] tw:[font-size:1.5rem] tw:[border:1px_dashed_#dee2e6] tw:[font-style:italic] tw:[min-height:300px]`,
  ].join(' '),
  // afiliados
  "btn-nosotros": [
    String.raw`tw:[padding-top:1rem] tw:[padding-right:2rem] tw:[padding-bottom:1rem] tw:[padding-left:2rem] tw:[border:none] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[font-size:1.1rem] tw:cursor-pointer tw:[border-radius:10px] tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:[margin-top:1.5rem] tw:font-semibold tw:[margin-bottom:10rem]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-3px)] tw:[&:hover]:[box-shadow:0_6px_20px_rgba(114,_0,_0,_0.25)]`,
    String.raw`tw:max-768:[padding-top:0.9rem] tw:max-768:[padding-right:1.8rem] tw:max-768:[padding-bottom:0.9rem] tw:max-768:[padding-left:1.8rem] tw:max-768:[font-size:1.05rem]`,
    String.raw`tw:max-480:[padding-top:0.8rem] tw:max-480:[padding-right:1.6rem] tw:max-480:[padding-bottom:0.8rem] tw:max-480:[padding-left:1.6rem] tw:max-480:[font-size:1rem]`,
  ].join(' '),
  // burbujaWhatsapp
  "whatsapp-icon": [
    String.raw`tw:flex tw:items-center tw:justify-center tw:[font-size:18px]`,
    String.raw`tw:[&_svg]:[filter:brightness(0)_invert(1)]`,
    String.raw`tw:[&_img]:[filter:brightness(0)_invert(1)]`,
  ].join(' '),
  // burbujaWhatsapp
  "whatsapp-tooltip": [
    String.raw`tw:absolute tw:[right:70px] tw:[bottom:15px] tw:[background:#fff] tw:[color:#333] tw:[padding-top:10px] tw:[padding-right:15px] tw:[padding-bottom:10px] tw:[padding-left:15px] tw:[border-radius:8px] tw:[font-size:14px] tw:font-medium tw:[box-shadow:0_4px_15px_rgba(0,_0,_0,_0.1)] tw:[opacity:0] tw:[transform:translateX(10px)] tw:[transition:all_0.3s_ease] tw:pointer-events-none tw:whitespace-nowrap`,
    String.raw`tw:[.whatsapp-bubble:hover_&]:[opacity:1] tw:[.whatsapp-bubble:hover_&]:[transform:translateX(0)]`,
    String.raw`tw:max-768:hidden`,
  ].join(' '),
  // itc-highlight
  "courses-section": [
    String.raw`tw:[padding-top:3rem]! tw:[padding-right:clamp(1rem,_5vw,_4rem)] tw:[padding-bottom:3rem]! tw:[padding-left:clamp(1rem,_5vw,_4rem)] tw:text-center tw:[background:var(--colorFondo)] tw:relative tw:[z-index:100] tw:[font-family:var(--texto)] tw:[margin-top:0]! tw:[margin-right:0] tw:[margin-bottom:0]! tw:[margin-left:0] tw:[contain:layout_style_paint]`,
    String.raw`tw:max-768:[margin-top:0]! tw:max-768:[margin-bottom:0]! tw:max-768:[padding-top:2rem]! tw:max-768:[padding-bottom:2rem]!`,
    String.raw`tw:tablet:[padding-top:2.5rem] tw:tablet:[padding-bottom:3rem]`,
    String.raw`tw:min-1200:[padding-top:3rem] tw:min-1200:[padding-bottom:4rem]`,
    String.raw`tw:max-767:[padding-top:1.75rem] tw:max-767:[padding-right:1rem] tw:max-767:[padding-bottom:1.75rem] tw:max-767:[padding-left:1rem]`,
    String.raw`tw:max-640:[padding-top:1.5rem] tw:max-640:[padding-right:0.875rem] tw:max-640:[padding-bottom:1.5rem] tw:max-640:[padding-left:0.875rem]`,
    String.raw`tw:max-480:[padding-top:1.25rem] tw:max-480:[padding-right:0.75rem] tw:max-480:[padding-bottom:1.25rem] tw:max-480:[padding-left:0.75rem]`,
    String.raw`tw:landscape-600:[padding-top:1.5rem] tw:landscape-600:[padding-right:clamp(1rem,_3vw,_2rem)] tw:landscape-600:[padding-bottom:1.5rem] tw:landscape-600:[padding-left:clamp(1rem,_3vw,_2rem)]`,
    String.raw`tw:min-1600:[max-width:1600px] tw:min-1600:[margin-left:auto] tw:min-1600:[margin-right:auto] tw:min-1600:[padding-top:4rem] tw:min-1600:[padding-bottom:5rem]`,
    String.raw`tw:print:[padding-top:1rem] tw:print:[padding-right:1rem] tw:print:[padding-bottom:1rem] tw:print:[padding-left:1rem] tw:print:[background:#fff]`,
  ].join(' '),
  // itc-highlight
  "logo-containerITC": [
    String.raw`tw:flex tw:justify-center tw:[margin-bottom:1.5rem]! tw:[margin-top:0]!`,
    String.raw`tw:tablet:[margin-bottom:1.75rem]`,
    String.raw`tw:min-1200:[margin-bottom:2rem]`,
    String.raw`tw:max-767:[margin-bottom:1.5rem]`,
    String.raw`tw:max-640:[margin-bottom:1.25rem]`,
    String.raw`tw:max-480:[margin-bottom:1rem]`,
    String.raw`tw:landscape-600:[margin-bottom:1rem]`,
  ].join(' '),
  // itc-highlight
  "itcLogo": [
    String.raw`tw:[width:clamp(120px,_15vw,_200px)] tw:[height:clamp(120px,_15vw,_200px)] tw:object-contain tw:[border-radius:var(--radius-sm)] tw:[filter:drop-shadow(0_4px_8px_rgba(0,_0,_0,_0.1))]`,
    String.raw`tw:max-640:[width:110px] tw:max-640:[height:110px]`,
    String.raw`tw:max-480:[width:95px] tw:max-480:[height:95px]`,
  ].join(' '),
  // itc-highlight
  "section-titleITC": [
    String.raw`tw:[font-size:clamp(1.8rem,_4vw,_2.5rem)] tw:[color:var(--colorPrincipal)] tw:font-bold tw:[margin-top:0]! tw:[margin-right:0] tw:[margin-bottom:1rem]! tw:[margin-left:0] tw:[line-height:1.2] tw:[font-family:var(--titulos)] tw:[text-wrap:balance] tw:relative tw:[z-index:101]`,
    String.raw`tw:max-768:[margin-top:0]! tw:max-768:[margin-bottom:1rem]!`,
    String.raw`tw:tablet:[font-size:clamp(2.1rem,_3.5vw,_2.4rem)] tw:tablet:[margin-top:6rem]`,
    String.raw`tw:min-1200:[font-size:2.6rem] tw:min-1200:[margin-top:1rem] tw:min-1200:[margin-right:0] tw:min-1200:[margin-bottom:1.25rem] tw:min-1200:[margin-left:0]`,
    String.raw`tw:max-767:[margin-top:0.5rem] tw:max-767:[margin-right:0] tw:max-767:[margin-bottom:1rem] tw:max-767:[margin-left:0] tw:max-767:[font-size:clamp(1.7rem,_5.5vw,_2rem)] tw:max-767:[line-height:1.25]`,
    String.raw`tw:max-640:[font-size:1.7rem] tw:max-640:[margin-top:0.25rem] tw:max-640:[margin-right:0] tw:max-640:[margin-bottom:0.875rem] tw:max-640:[margin-left:0] tw:max-640:[line-height:1.3]`,
    String.raw`tw:max-480:[font-size:1.55rem] tw:max-480:[margin-top:0.25rem] tw:max-480:[margin-right:0] tw:max-480:[margin-bottom:0.75rem] tw:max-480:[margin-left:0]`,
    String.raw`tw:landscape-600:[margin-top:0.25rem] tw:landscape-600:[margin-right:0] tw:landscape-600:[margin-bottom:0.75rem] tw:landscape-600:[margin-left:0] tw:landscape-600:[font-size:1.6rem]`,
    String.raw`tw:min-1600:[font-size:2.8rem] tw:min-1600:[margin-top:1.25rem] tw:min-1600:[margin-right:0] tw:min-1600:[margin-bottom:1.5rem] tw:min-1600:[margin-left:0]`,
  ].join(' '),
  // itc-highlight
  "section-subtitleITC": [
    String.raw`tw:[font-size:clamp(0.95rem,_1.5vw,_1.1rem)] tw:[color:var(--subtitulos)] tw:[max-width:min(90vw,_700px)] tw:[line-height:1.6] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:clamp(1.5rem,_2.5vw,_2rem)] tw:[margin-left:auto] tw:[font-family:var(--subtitulos)] tw:[text-wrap:pretty]`,
    String.raw`tw:max-767:[margin-top:0] tw:max-767:[margin-right:auto] tw:max-767:[margin-bottom:1.5rem] tw:max-767:[margin-left:auto] tw:max-767:[font-size:1rem] tw:max-767:[line-height:1.5]`,
    String.raw`tw:max-640:[font-size:0.925rem] tw:max-640:[margin-bottom:1.25rem] tw:max-640:[line-height:1.5]`,
    String.raw`tw:max-480:[font-size:0.875rem] tw:max-480:[margin-bottom:1rem]`,
  ].join(' '),
  // itc-highlight
  "courses-grid-three": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(300px,_90vw),_1fr))] tw:[row-gap:clamp(1.25rem,_2vw,_2rem)] tw:[column-gap:clamp(1.25rem,_2vw,_2rem)] tw:[max-width:min(95vw,_1400px)] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0.5rem] tw:[padding-right:0] tw:[padding-bottom:0.5rem] tw:[padding-left:0]`,
    String.raw`tw:tablet:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:tablet:[row-gap:1.75rem] tw:tablet:[column-gap:1.75rem]`,
    String.raw`tw:min-1200:[grid-template-columns:repeat(3,_minmax(0,_1fr))] tw:min-1200:[row-gap:2.25rem] tw:min-1200:[column-gap:2.25rem]`,
    String.raw`tw:max-767:[row-gap:1.5rem] tw:max-767:[column-gap:1.5rem]`,
    String.raw`tw:max-640:[row-gap:1.25rem] tw:max-640:[column-gap:1.25rem]`,
    String.raw`tw:min-1600:[max-width:1500px] tw:min-1600:[row-gap:2.75rem] tw:min-1600:[column-gap:2.75rem]`,
  ].join(' '),
  // itc-highlight
  "course-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-lg)] tw:[box-shadow:var(--shadow-sm)] tw:overflow-hidden tw:flex tw:flex-col tw:[height:100%] tw:[transition:all_0.3s_cubic-bezier(0.4,_0,_0.2,_1)] tw:[border:1px_solid_var(--border)] tw:[opacity:0] tw:[transform:translateY(20px)] tw:relative`,
    String.raw`tw:[&::before]:[content:''] tw:[&::before]:absolute tw:[&::before]:[top:0] tw:[&::before]:[left:0] tw:[&::before]:[right:0] tw:[&::before]:[height:3px] tw:[&::before]:[background:linear-gradient(90deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[&::before]:[transform:scaleX(0)] tw:[&::before]:[transition:transform_0.3s_ease]`,
    String.raw`tw:[&.animate-in]:[opacity:1] tw:[&.animate-in]:[transform:translateY(0)] tw:[&.animate-in]:[transition:opacity_0.6s_ease,_transform_0.6s_cubic-bezier(0.34,_1.56,_0.64,_1)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:[&:hover::before]:[transform:scaleX(1)]`,
    String.raw`tw:motion-reduce:[transition:none] tw:motion-reduce:[transform:none]! tw:motion-reduce:[opacity:1]`,
    String.raw`tw:motion-reduce:[&::before]:hidden`,
    String.raw`tw:contrast-high:[border:2px_solid] tw:contrast-high:[box-shadow:0_2px_8px_rgba(0,_0,_0,_0.3)]`,
    String.raw`tw:dark-system:[background:color-mix(in_srgb,_var(--bg-card)_95%,_#000)]`,
    String.raw`tw:no-hover:[&:hover]:[transform:none] tw:no-hover:[&:hover]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:no-hover:[&:active]:[transform:scale(0.98)]`,
    String.raw`tw:print:[break-inside:avoid] tw:print:[box-shadow:none] tw:print:[border:1px_solid_#ccc]`,
  ].join(' '),
  // itc-highlight
  "course-image": [
    String.raw`tw:relative tw:[height:clamp(160px,_28vw,_220px)] tw:overflow-hidden tw:[background:linear-gradient(135deg,_color-mix(in_srgb,_var(--colorFondo)_90%,_#000),_color-mix(in_srgb,_var(--colorFondo)_95%,_#000))]`,
    String.raw`tw:[&_img]:[width:100%] tw:[&_img]:[height:100%] tw:[&_img]:object-cover tw:[&_img]:[transition:all_0.4s_cubic-bezier(0.4,_0,_0.2,_1)]`,
    String.raw`tw:[.course-card:hover_&_img]:[transform:scale(1.08)]`,
    String.raw`tw:max-480:[height:140px]`,
    String.raw`tw:landscape-600:[height:120px]`,
    String.raw`tw:motion-reduce:[&_img]:[transition:none] tw:motion-reduce:[&_img]:[transform:none]!`,
    String.raw`tw:dark-system:[background:color-mix(in_srgb,_var(--colorFondo)_85%,_#000)]`,
    String.raw`tw:no-hover:[.course-card:hover_&_img]:[transform:none]`,
  ].join(' '),
  // itc-highlight
  "loading": [
    String.raw`tw:[.course-image_img&]:[opacity:0.7] tw:[.course-image_img&]:[filter:blur(4px)]`,
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[color:#666]`,
  ].join(' '),
  // itc-highlight
  "course-duration": [
    String.raw`tw:absolute tw:[bottom:12px] tw:[right:12px] tw:[background:linear-gradient(135deg,_rgba(0,_0,_0,_0.9),_rgba(0,_0,_0,_0.7))] tw:[color:#fff] tw:[padding-top:6px] tw:[padding-right:12px] tw:[padding-bottom:6px] tw:[padding-left:12px] tw:[border-radius:20px] tw:[font-size:clamp(0.7rem,_1.5vw,_0.85rem)] tw:font-semibold tw:[backdrop-filter:blur(8px)] tw:[border:1px_solid_rgba(255,_255,_255,_0.1)]`,
    String.raw`tw:contrast-high:[border:2px_solid_#fff]`,
  ].join(' '),
  // itc-highlight
  "course-info": [
    String.raw`tw:[padding-top:clamp(1.25rem,_2vw,_1.75rem)] tw:[padding-right:clamp(1.25rem,_2vw,_1.75rem)] tw:[padding-bottom:clamp(1.25rem,_2vw,_1.75rem)] tw:[padding-left:clamp(1.25rem,_2vw,_1.75rem)] tw:flex tw:flex-col tw:[flex-grow:1] tw:text-left tw:[row-gap:0.75rem] tw:[column-gap:0.75rem]`,
    String.raw`tw:[&_h3]:[font-size:clamp(1.2rem,_2.2vw,_1.5rem)] tw:[&_h3]:[margin-bottom:0.5rem] tw:[&_h3]:[color:var(--colorPrincipal)] tw:[&_h3]:[line-height:1.3] tw:[&_h3]:font-bold tw:[&_h3]:[text-wrap:balance]`,
    String.raw`tw:[&_ul]:list-none tw:[&_ul]:[padding-top:0] tw:[&_ul]:[padding-right:0] tw:[&_ul]:[padding-bottom:0] tw:[&_ul]:[padding-left:0] tw:[&_ul]:[margin-top:0] tw:[&_ul]:[margin-right:0] tw:[&_ul]:[margin-bottom:0] tw:[&_ul]:[margin-left:0] tw:[&_ul]:flex tw:[&_ul]:flex-col tw:[&_ul]:[row-gap:0.25rem] tw:[&_ul]:[column-gap:0.25rem]`,
    String.raw`tw:[&_ul_li]:[color:var(--colorTexto)] tw:[&_ul_li]:[padding-top:0.25rem] tw:[&_ul_li]:[padding-right:0] tw:[&_ul_li]:[padding-bottom:0.25rem] tw:[&_ul_li]:[padding-left:1.25rem] tw:[&_ul_li]:[font-size:clamp(0.85rem,_1.5vw,_0.9rem)] tw:[&_ul_li]:[line-height:1.4] tw:[&_ul_li]:relative tw:[&_ul_li]:[opacity:0.85]`,
    String.raw`tw:[&_ul_li::before]:[content:"•"] tw:[&_ul_li::before]:[color:var(--colorSecundario)] tw:[&_ul_li::before]:font-bold tw:[&_ul_li::before]:absolute tw:[&_ul_li::before]:[left:0.5rem] tw:[&_ul_li::before]:[font-size:1.2em]`,
    String.raw`tw:max-480:[padding-top:1rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem] tw:max-480:[row-gap:0.5rem] tw:max-480:[column-gap:0.5rem]`,
    String.raw`tw:max-480:[&_h3]:[font-size:1.15rem]`,
    String.raw`tw:landscape-600:[padding-top:0.875rem] tw:landscape-600:[padding-right:0.875rem] tw:landscape-600:[padding-bottom:0.875rem] tw:landscape-600:[padding-left:0.875rem]`,
  ].join(' '),
  // itc-highlight
  "course-description": [
    String.raw`tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[font-size:clamp(0.9rem,_1.5vw,_1rem)] tw:[display:-webkit-box] tw:[-webkit-line-clamp:3] tw:[-webkit-box-orient:vertical] tw:overflow-hidden tw:[min-height:4.5em] tw:[opacity:0.9]`,
  ].join(' '),
  // itc-highlight
  "requirements-container": [
    String.raw`tw:[margin-top:0.5rem] tw:[margin-right:0] tw:[margin-bottom:0.5rem] tw:[margin-left:0]`,
  ].join(' '),
  // itc-highlight
  "requirements-title": [
    String.raw`tw:[font-size:clamp(0.9rem,_1.5vw,_1rem)] tw:[margin-bottom:0.5rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:flex tw:items-center tw:[row-gap:0.5rem] tw:[column-gap:0.5rem]`,
    String.raw`tw:[&::before]:[content:'📋'] tw:[&::before]:[font-size:0.9em]`,
  ].join(' '),
  // itc-highlight
  "more-items": [
    String.raw`tw:[font-style:italic] tw:[color:var(--colorPrincipal)] tw:[font-size:clamp(0.8rem,_1.5vw,_0.85rem)] tw:[opacity:0.7]`,
  ].join(' '),
  // itc-highlight
  "info-btn": [
    String.raw`tw:[background:linear-gradient(135deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[color:#fff] tw:[padding-top:clamp(0.85rem,_1.8vw,_1rem)] tw:[padding-right:1.5rem] tw:[padding-bottom:clamp(0.85rem,_1.8vw,_1rem)] tw:[padding-left:1.5rem] tw:[border:none] tw:[border-radius:var(--radius-md)] tw:cursor-pointer tw:font-semibold tw:[margin-top:auto] tw:[font-size:clamp(0.9rem,_1.5vw,_1rem)] tw:[width:100%] tw:[transition:all_0.3s_cubic-bezier(0.4,_0,_0.2,_1)] tw:relative tw:overflow-hidden`,
    String.raw`tw:[&::before]:[content:''] tw:[&::before]:absolute tw:[&::before]:[top:0] tw:[&::before]:[left:-100%] tw:[&::before]:[width:100%] tw:[&::before]:[height:100%] tw:[&::before]:[background:linear-gradient(90deg,_transparent,_rgba(255,_255,_255,_0.2),_transparent)] tw:[&::before]:[transition:left_0.5s]`,
    String.raw`tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_8px_25px_rgba(0,_0,_0,_0.15)]`,
    String.raw`tw:[&:hover::before]:[left:100%]`,
    String.raw`tw:motion-reduce:[transition:none] tw:motion-reduce:[transform:none]!`,
    String.raw`tw:motion-reduce:[&::before]:hidden`,
    String.raw`tw:contrast-high:[border:2px_solid]`,
    String.raw`tw:no-hover:[&:active]:[transform:scale(0.95)]`,
    String.raw`tw:print:hidden`,
  ].join(' '),
  // itc-highlight
  "see-more": [
    String.raw`tw:[margin-top:clamp(2.5rem,_4vw,_3.5rem)] tw:flex tw:justify-center`,
  ].join(' '),
  // itc-highlight
  "more-courses-btn": [
    String.raw`tw:[background:transparent] tw:[color:var(--colorPrincipal)] tw:[padding-top:clamp(0.9rem,_1.8vw,_1.1rem)] tw:[padding-right:clamp(1.75rem,_3vw,_2.25rem)] tw:[padding-bottom:clamp(0.9rem,_1.8vw,_1.1rem)] tw:[padding-left:clamp(1.75rem,_3vw,_2.25rem)] tw:[border:2px_solid_var(--colorPrincipal)] tw:[border-radius:30px] tw:cursor-pointer tw:font-semibold tw:[font-size:clamp(0.95rem,_1.5vw,_1.1rem)] tw:[transition:all_0.3s_cubic-bezier(0.4,_0,_0.2,_1)] tw:relative tw:overflow-hidden`,
    String.raw`tw:[&::before]:[content:''] tw:[&::before]:absolute tw:[&::before]:[top:0] tw:[&::before]:[left:0] tw:[&::before]:[width:0%] tw:[&::before]:[height:100%] tw:[&::before]:[background:var(--colorPrincipal)] tw:[&::before]:[transition:width_0.3s_ease] tw:[&::before]:[z-index:-1]`,
    String.raw`tw:[&:hover]:[color:#fff] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_6px_20px_rgba(0,_0,_0,_0.15)]`,
    String.raw`tw:[&:hover::before]:[width:100%]`,
    String.raw`tw:motion-reduce:[transition:none] tw:motion-reduce:[transform:none]!`,
    String.raw`tw:motion-reduce:[&::before]:hidden`,
    String.raw`tw:contrast-high:[border:2px_solid]`,
    String.raw`tw:no-hover:[&:active]:[transform:scale(0.95)]`,
    String.raw`tw:print:hidden`,
  ].join(' '),
  // itc-highlight
  "loading-container": [
    String.raw`tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:[min-height:300px] tw:[color:var(--colorTexto)] tw:[margin-top:100px]`,
  ].join(' '),
  // itc-highlight
  "error-container": [
    String.raw`tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:[min-height:300px] tw:[color:var(--colorTexto)] tw:[margin-top:100px]`,
  ].join(' '),
  // itc-highlight
  "empty-container": [
    String.raw`tw:[padding-top:clamp(3rem,_6vw,_4rem)] tw:[padding-right:clamp(3rem,_6vw,_4rem)] tw:[padding-bottom:clamp(3rem,_6vw,_4rem)] tw:[padding-left:clamp(3rem,_6vw,_4rem)] tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:[min-height:300px]`,
  ].join(' '),
  // itc-highlight
  "retry-btn": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[padding-top:.8rem] tw:[padding-right:1.2rem] tw:[padding-bottom:.8rem] tw:[padding-left:1.2rem] tw:[border:none] tw:[border-radius:8px] tw:cursor-pointer tw:[margin-top:1rem] tw:[transition:var(--transition)] tw:[font-size:clamp(0.9rem,_1.5vw,_1rem)] tw:font-bold`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-1px)] tw:[&:hover]:[box-shadow:0_4px_12px_rgba(0,_0,_0,_0.15)] tw:[&:hover]:[outline:none]`,
    String.raw`tw:motion-reduce:[transition:none] tw:motion-reduce:[transform:none]!`,
    String.raw`tw:[&:focus]:[background:var(--colorSecundario)] tw:[&:focus]:[outline:none]`,
  ].join(' '),
  // icic-highlight
  "visually-hidden": [
    String.raw`tw:absolute tw:[width:1px] tw:[height:1px] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:-1px] tw:[margin-right:-1px] tw:[margin-bottom:-1px] tw:[margin-left:-1px] tw:overflow-hidden tw:[clip:rect(0,_0,_0,_0)] tw:whitespace-nowrap tw:[border:0]`,
  ].join(' '),
  // icic-highlight
  "icic-highlight": [
    String.raw`tw:[padding-top:5rem] tw:[padding-right:0] tw:[padding-bottom:2.5rem] tw:[padding-left:0] tw:[background:var(--colorFondo)] tw:relative tw:overflow-visible tw:[opacity:1]! tw:[transform:none]! tw:[margin-top:2rem] tw:[margin-bottom:2rem]`,
    String.raw`tw:contrast-high:[background:#fff] tw:contrast-high:[border:2px_solid_#000]`,
    String.raw`tw:max-576:[padding-top:3rem] tw:max-576:[padding-right:0] tw:max-576:[padding-bottom:3rem] tw:max-576:[padding-left:0]`,
  ].join(' '),
  // icic-highlight
  "icic-icic-contenedor": [
    String.raw`tw:relative tw:[z-index:1] tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:1.5rem] tw:[padding-bottom:0] tw:[padding-left:1.5rem]`,
  ].join(' '),
  // icic-highlight
  "icic-header": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:text-center tw:[margin-bottom:3rem]`,
  ].join(' '),
  // icic-highlight
  "icic-icic-logo-container": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:flex tw:justify-center tw:[margin-bottom:1.5rem]`,
  ].join(' '),
  // icic-highlight
  "section-title": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:[font-size:clamp(1.75rem,_3vw,_2.25rem)] tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:font-semibold tw:[background-clip:text] tw:[margin-top:0] tw:[font-family:var(--titulos)] tw:[margin-right:0] tw:[margin-left:0] tw:relative tw:inline-block`,
    String.raw`tw:max-768:[font-size:2.2rem] tw:max-768:[margin-top:-20px]`,
    String.raw`tw:max-480:[margin-top:65px]`,
    String.raw`tw:[&::after]:[content:""] tw:[&::after]:absolute tw:[&::after]:[left:50%] tw:[&::after]:[bottom:-8px] tw:[&::after]:[transform:translateX(-50%)] tw:[&::after]:[width:60px] tw:[&::after]:[height:3px] tw:[&::after]:[background:var(--colorPrincipal)] tw:[&::after]:[border-radius:2px]`,
  ].join(' '),
  // icic-highlight
  "section-subtitle": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:[font-size:1.3rem] tw:[color:#6c757d] tw:[max-width:700px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[line-height:1.5]`,
    String.raw`tw:max-768:[font-size:1.1rem]`,
  ].join(' '),
  // icic-highlight
  "icic-info": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]!`,
  ].join(' '),
  // icic-highlight
  "icic-gallery": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:flex tw:flex-col tw:[row-gap:2rem] tw:[column-gap:2rem]`,
    String.raw`tw:[&_h3]:text-center tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:2rem] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:#212529] tw:[&_h3]:[font-size:1.8rem] tw:[&_h3]:font-semibold tw:[&_h3]:relative tw:[&_h3]:[padding-bottom:0.5rem]`,
    String.raw`tw:[&_h3::after]:[content:''] tw:[&_h3::after]:absolute tw:[&_h3::after]:[bottom:0] tw:[&_h3::after]:[left:50%] tw:[&_h3::after]:[transform:translateX(-50%)] tw:[&_h3::after]:[width:60px] tw:[&_h3::after]:[height:3px] tw:[&_h3::after]:[background:var(--colorPrincipal)] tw:[&_h3::after]:[border-radius:2px]`,
    String.raw`tw:max-768:[&_h3]:[font-size:1.6rem]`,
    String.raw`tw:max-576:[&_h3]:[font-size:1.4rem] tw:max-576:[&_h3]:[margin-bottom:1.5rem]`,
    String.raw`tw:max-576:[&_h3::after]:[width:40px]`,
  ].join(' '),
  // icic-highlight
  "stat": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:text-center tw:[padding-top:1.5rem] tw:[padding-right:1rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1rem] tw:[background:#fff] tw:[border-radius:12px] tw:[box-shadow:0_4px_12px_rgba(0,0,0,0.08)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-5px)] tw:[&:hover]:[box-shadow:0_8px_20px_rgba(0,_0,_0,_0.12)]`,
    String.raw`tw:contrast-high:[border:2px_solid_var(--colorPrincipal)]`,
    String.raw`tw:motion-reduce:[transition:none]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
  ].join(' '),
  // icic-highlight
  "feature-card": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:grid tw:[grid-template-columns:auto_1fr] tw:[row-gap:1.2rem] tw:[column-gap:1.2rem] tw:[align-items:start] tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:[background:#fff] tw:[border-radius:12px] tw:[box-shadow:0_4px_12px_rgba(0,0,0,0.08)] tw:text-left`,
    String.raw`tw:[&:hover]:[transform:translateY(-5px)] tw:[&:hover]:[box-shadow:0_8px_20px_rgba(0,_0,_0,_0.12)]`,
    String.raw`tw:contrast-high:[border:2px_solid_var(--colorPrincipal)]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:text-center tw:max-768:[row-gap:1rem] tw:max-768:[column-gap:1rem]`,
    String.raw`tw:motion-reduce:[transition:none]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
  ].join(' '),
  // icic-highlight
  "button-container": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:flex tw:justify-center tw:[width:100%] tw:[margin-top:1rem]`,
  ].join(' '),
  // icic-highlight
  "calendar-section": [
    String.raw`tw:[opacity:1]! tw:[transform:none]! tw:[transition:none]! tw:text-center tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem] tw:[border-radius:20px]`,
    String.raw`tw:[&_h4]:[margin-top:0] tw:[&_h4]:[color:#212529] tw:[&_h4]:[font-size:1.5rem] tw:[&_h4]:[margin-bottom:1.5rem] tw:[&_h4]:font-semibold`,
    String.raw`tw:max-576:[padding-top:1.5rem] tw:max-576:[padding-right:1.5rem] tw:max-576:[padding-bottom:1.5rem] tw:max-576:[padding-left:1.5rem]`,
  ].join(' '),
  // icic-highlight
  "icic-logoHead": [
    String.raw`tw:[width:400px] tw:[height:400px] tw:object-contain tw:[border-radius:12px] tw:[padding-top:15px] tw:[padding-right:15px] tw:[padding-bottom:15px] tw:[padding-left:15px]  tw:[margin-bottom:-50px]`,
    String.raw`tw:max-768:[width:300px] tw:max-768:[height:300px] `,
    String.raw`tw:max-576:[width:250px] tw:max-576:[height:250px] `,
    String.raw`tw:max-480:[width:200px] tw:max-480:[height:200px]`,
    String.raw`tw:max-1024:[margin:0_auto]! tw:max-480:[width:min(100%,_250px)] tw:max-480:[height:auto]`,
  ].join(' '),
  // icic-highlight
  "icic-grid": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:4rem] tw:[column-gap:4rem] tw:[align-items:start]`,
    String.raw`tw:max-1024:[grid-template-columns:1fr] tw:max-1024:[row-gap:3rem] tw:max-1024:[column-gap:3rem]`,
  ].join(' '),
  // icic-highlight
  "icic-description": [
    String.raw`tw:text-center tw:[font-size:1.125rem] tw:[line-height:1.8] tw:[color:var(--colorTexto)] tw:[margin-bottom:3rem] tw:[max-width:800px] tw:[margin-left:auto] tw:[margin-right:auto]`,
    String.raw`tw:[&_p]:[font-size:1.2rem] tw:[&_p]:[line-height:1.7] tw:[&_p]:[color:#495057] tw:[&_p]:[margin-bottom:2rem]`,
  ].join(' '),
  // icic-highlight
  "stats-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(3,_minmax(0,_1fr))] tw:[row-gap:1.5rem] tw:[column-gap:1.5rem] tw:[margin-top:1.5rem] tw:[margin-right:0] tw:[margin-bottom:1.5rem] tw:[margin-left:0]`,
    String.raw`tw:max-1024:[grid-template-columns:repeat(3,_minmax(0,_1fr))]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:1rem] tw:max-768:[column-gap:1rem]`,
  ].join(' '),
  // icic-highlight
  "stat-number": [
    String.raw`tw:block tw:[font-size:2.5rem] tw:font-extrabold tw:[color:var(--colorPrincipal)] tw:[margin-bottom:.5rem]`,
    String.raw`tw:max-576:[font-size:2rem]`,
  ].join(' '),
  // icic-highlight
  "stat-label": [
    String.raw`tw:block tw:[font-size:1rem] tw:[color:#6c757d] tw:font-medium`,
  ].join(' '),
  // icic-highlight
  "features-grid": [
    String.raw`tw:grid tw:[grid-template-columns:1fr] tw:[row-gap:1.5rem] tw:[column-gap:1.5rem]`,
  ].join(' '),
  // icic-highlight
  "feature-icon": [
    String.raw`tw:[font-size:2.2rem] tw:[width:60px] tw:[height:60px] tw:flex tw:items-center tw:justify-center tw:[background:linear-gradient(135deg,_#e3f2fd_0%,_#bbdefb_100%)] tw:[border-radius:12px]`,
    String.raw`tw:max-768:[align-self:center] tw:max-768:[justify-self:center]`,
  ].join(' '),
  // icic-highlight
  "feature-content": [
    String.raw`tw:[&_h4]:[margin-top:0] tw:[&_h4]:[margin-right:0] tw:[&_h4]:[margin-bottom:.5rem] tw:[&_h4]:[margin-left:0] tw:[&_h4]:[color:#212529] tw:[&_h4]:[font-size:1.2rem] tw:[&_h4]:font-semibold`,
    String.raw`tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:0] tw:[&_p]:[color:#6c757d] tw:[&_p]:[font-size:1rem] tw:[&_p]:[line-height:1.5]`,
  ].join(' '),
  // icic-highlight
  "cta-button": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:.8rem] tw:[column-gap:.8rem] tw:[padding-top:1.2rem] tw:[padding-right:2.5rem] tw:[padding-bottom:1.2rem] tw:[padding-left:2.5rem] tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[border:none] tw:[border-radius:12px] tw:font-semibold tw:[font-size:1.1rem] tw:cursor-pointer tw:[transition:box-shadow_.3s_ease,_transform_.3s_ease]`,
    String.raw`tw:[&:hover]:[transform:translateY(-3px)] tw:[&:hover]:[box-shadow:0_6px_15px_rgba(255,0,0,.3)] tw:[&:hover]:[outline:none]`,
    String.raw`tw:[&:focus]:[transform:translateY(-3px)] tw:[&:focus]:[box-shadow:0_6px_15px_rgba(255,0,0,.3)] tw:[&:focus]:[outline:none]`,
    String.raw`tw:contrast-high:[border:2px_solid_#fff]`,
    String.raw`tw:motion-reduce:[transition:none]`,
  ].join(' '),
  // icic-highlight
  "gallery-carousel": [
    String.raw`tw:relative tw:[border-radius:20px] tw:overflow-hidden tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:0]`,
  ].join(' '),
  // icic-highlight
  "carousel-container": [
    String.raw`tw:relative tw:[height:500px] tw:overflow-hidden tw:[border-radius:16px] tw:flex tw:items-center tw:justify-center`,
    String.raw`tw:max-1024:[height:450px]`,
    String.raw`tw:max-768:[height:380px]`,
    String.raw`tw:max-576:[height:320px]`,
    String.raw`tw:max-480:[height:280px]`,
  ].join(' '),
  // icic-highlight
  "carousel-slide": [
    String.raw`tw:absolute tw:[top:0] tw:[right:0] tw:[bottom:0] tw:[left:0] tw:[opacity:0] tw:[transform:scale(.95)] tw:[transition:all_.6s_cubic-bezier(.25,.46,.45,.94)] tw:flex tw:items-center tw:justify-center`,
    String.raw`tw:[&.active]:[opacity:1] tw:[&.active]:[transform:scale(1)] tw:[&.active]:[z-index:2]`,
  ].join(' '),
  // icic-highlight
  "carousel-image": [
    String.raw`tw:[max-width:100%] tw:[max-height:100%] tw:[width:auto] tw:[height:auto] tw:object-contain tw:[border-radius:12px] tw:[transition:transform_.3s_ease]`,
    String.raw`tw:[.carousel-slide:hover_&]:[transform:scale(1.02)]`,
  ].join(' '),
  // icic-highlight
  "carousel-controls": [
    String.raw`tw:hidden!`,
  ].join(' '),
  // icic-highlight
  "carousel-caption": [
    String.raw`tw:hidden!`,
  ].join(' '),
  // icic-highlight
  "calendar-preview": [
    String.raw`tw:relative tw:[border-radius:16px] tw:overflow-hidden tw:[transition:transform_.3s_ease] tw:[width:620px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:flex tw:justify-center tw:[padding-top:1rem] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem]`,
    String.raw`tw:[&:hover]:[transform:translateY(-3px)]`,
    String.raw`tw:max-1024:[max-width:400px]`,
    String.raw`tw:max-768:[max-width:350px]`,
    String.raw`tw:max-576:[max-width:300px] tw:max-576:[padding-top:.8rem] tw:max-576:[padding-right:.8rem] tw:max-576:[padding-bottom:.8rem] tw:max-576:[padding-left:.8rem]`,
    String.raw`tw:max-480:[max-width:280px]`,
    String.raw`tw:motion-reduce:[transition:none]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
    String.raw`tw:[width:100%]! tw:[max-width:620px]`,
  ].join(' '),
  // icic-highlight
  "calendar-image": [
    String.raw`tw:[max-width:100%] tw:[height:auto] tw:[max-height:500px] tw:object-contain tw:[border-radius:12px]`,
    String.raw`tw:max-1024:[max-height:580px]`,
    String.raw`tw:max-768:[max-height:450px]`,
    String.raw`tw:max-576:[max-height:390px]`,
    String.raw`tw:max-480:[max-height:390px]`,
  ].join(' '),
  // icic-highlight
  "calendar-description": [
    String.raw`tw:[color:#495057] tw:[margin-top:1rem] tw:[font-size:1rem] tw:[line-height:1.5] tw:[font-style:italic]`,
  ].join(' '),
  // icic-highlight
  "gallery-placeholder": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(2,_minmax(0,_1fr))] tw:[row-gap:1rem] tw:[column-gap:1rem]`,
  ].join(' '),
  // icic-highlight
  "placeholder-image": [
    String.raw`tw:[height:200px] tw:[background:linear-gradient(90deg,#e9ecef_0%,#dee2e6_50%,#e9ecef_100%)] tw:[border-radius:12px] tw:[animation:cmic-pulse_1.5s_ease-in-out_infinite]`,
  ].join(' '),
  // icic-highlight
  "icic-contenedor": [
    String.raw`tw:relative tw:[z-index:1] tw:[width:100%] tw:[max-width:1200px] tw:mx-auto tw:px-6 tw:sm:px-8 tw:lg:px-10`,
  ].join(' '),
  // noticiasGlobales
  "ng-wrapper": [
    String.raw`tw:[margin-top:80px] tw:[margin-right:0] tw:[margin-bottom:3rem] tw:[margin-left:0] tw:[color:var(--colorTexto)] tw:[font-family:var(--texto)] tw:relative`,
    String.raw`tw:max-768:[margin-top:60px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-header-modern": [
    String.raw`tw:text-center tw:[margin-bottom:2rem] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem]`,
  ].join(' '),
  // noticiasGlobales
  "ng-title-modern": [
    String.raw`tw:[font-family:var(--titulos)] tw:[color:var(--colorTitulo)] tw:[font-size:clamp(1.75rem,_4vw,_2.5rem)] tw:font-bold tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:1rem] tw:[margin-left:0]    `,
  ].join(' '),
  // noticiasGlobales
  "ng-org-buttons": [
    String.raw`tw:flex tw:justify-center tw:[row-gap:1rem] tw:[column-gap:1rem] tw:flex-wrap`,
    String.raw`tw:max-480:flex-col tw:max-480:items-center`,
  ].join(' '),
  // noticiasGlobales
  "ng-org-btn": [
    String.raw`tw:[padding-top:0.75rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.75rem] tw:[padding-left:1.5rem] tw:[border-radius:var(--radius-lg)] tw:[font-size:0.875rem] tw:font-semibold tw:[color:#fff] tw:[font-family:var(--subtitulos)] tw:uppercase tw:[border:2px_solid_transparent] tw:cursor-pointer tw:[transition:all_0.2s_ease] tw:no-underline tw:inline-block tw:[min-width:100px]`,
    String.raw`tw:[&.cmic]:[background:var(--colorPrincipal)]`,
    String.raw`tw:[&.icic]:[background:var(--colorPrincipal)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[color:#fff]`,
    String.raw`tw:[&:disabled]:[opacity:0.6] tw:[&:disabled]:cursor-not-allowed tw:[&:disabled]:[transform:none]`,
    String.raw`tw:max-480:[width:140px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-carousel-container": [
    String.raw`tw:relative tw:[width:100%] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0.5rem] tw:[padding-right:0] tw:[padding-bottom:0.5rem] tw:[padding-left:0] tw:overflow-hidden`,
    String.raw`tw:[&::before]:[content:''] tw:[&::before]:absolute tw:[&::before]:[top:0] tw:[&::before]:[bottom:0] tw:[&::before]:[width:60px] tw:[&::before]:[z-index:2] tw:[&::before]:pointer-events-none tw:[&::before]:[left:0] tw:[&::before]:[background:linear-gradient(90deg,_var(--colorFondo)_20%,_transparent_100%)]`,
    String.raw`tw:[&::after]:[content:''] tw:[&::after]:absolute tw:[&::after]:[top:0] tw:[&::after]:[bottom:0] tw:[&::after]:[width:60px] tw:[&::after]:[z-index:2] tw:[&::after]:pointer-events-none tw:[&::after]:[right:0] tw:[&::after]:[background:linear-gradient(270deg,_var(--colorFondo)_20%,_transparent_100%)]`,
    String.raw`tw:max-768:[&::before]:[width:40px]`,
    String.raw`tw:max-768:[&::after]:[width:40px]`,
    String.raw`tw:max-480:[&::before]:[width:30px]`,
    String.raw`tw:max-480:[&::after]:[width:30px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-carousel-track": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[padding-top:0.5rem] tw:[padding-right:2rem] tw:[padding-bottom:0.5rem] tw:[padding-left:2rem] tw:[will-change:transform] tw:select-none tw:[-webkit-user-drag:none]`,
    String.raw`tw:max-768:[padding-top:0.5rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:0.5rem] tw:max-768:[padding-left:1.5rem] tw:max-768:[row-gap:0.75rem] tw:max-768:[column-gap:0.75rem]`,
    String.raw`tw:max-480:[padding-top:0.5rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:0.5rem] tw:max-480:[padding-left:1rem] tw:max-480:[row-gap:0.75rem] tw:max-480:[column-gap:0.75rem]`,
    String.raw`tw:motion-reduce:[animation:none]!`,
  ].join(' '),
  // noticiasGlobales
  "ng-carousel-item": [
    String.raw`tw:[flex:0_0_300px]`,
    String.raw`tw:max-768:[flex:0_0_280px]`,
    String.raw`tw:max-480:[flex:0_0_260px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-card": [
    String.raw`tw:[&.clickable-card]:cursor-pointer tw:[&.clickable-card]:relative tw:[&.clickable-card]:[transition:all_0.3s_ease]`,
    String.raw`tw:[&.clickable-card:hover]:[transform:translateY(-4px)] tw:[&.clickable-card:hover]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:[&.clickable-card:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&.clickable-card:focus]:[outline-offset:2px]`,
    String.raw`tw:[&.clickable-card::after]:[content:''] tw:[&.clickable-card::after]:absolute tw:[&.clickable-card::after]:[top:0.5rem] tw:[&.clickable-card::after]:[right:0.5rem] tw:[&.clickable-card::after]:[width:8px] tw:[&.clickable-card::after]:[height:8px] tw:[&.clickable-card::after]:[background:var(--colorPrincipal)] tw:[&.clickable-card::after]:[border-radius:50%] tw:[&.clickable-card::after]:[opacity:0] tw:[&.clickable-card::after]:[transition:opacity_0.3s_ease]`,
    String.raw`tw:[&.clickable-card:hover::after]:[opacity:1]`,
    String.raw`tw:max-768:[&.clickable-card:hover]:[transform:translateY(-2px)]`,
    String.raw`tw:motion-reduce:[&.clickable-card]:[transition:none]`,
    String.raw`tw:motion-reduce:[&.clickable-card:hover]:[transition:none] tw:motion-reduce:[&.clickable-card:hover]:[transform:none]`,
    String.raw`tw:flex tw:flex-col tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-lg)] tw:overflow-hidden tw:[border:1px_solid_var(--border)] tw:[box-shadow:var(--shadow-sm)] tw:[transition:transform_0.2s_ease,_box-shadow_0.2s_ease] tw:[height:400px] tw:[width:100%]`,
    String.raw`tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
    String.raw`tw:max-768:[height:380px]`,
    String.raw`tw:max-480:[height:350px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-card-overlay": [
    String.raw`tw:absolute tw:[top:0] tw:[left:0] tw:[right:0] tw:[bottom:0] tw:[background:rgba(0,_0,_0,_0.7)] tw:flex tw:items-center tw:justify-center tw:[opacity:0] tw:[transition:opacity_0.3s_ease] tw:[border-radius:var(--radius-lg)] tw:pointer-events-none`,
    String.raw`tw:[.ng-card.clickable-card:hover_&]:[opacity:1]`,
    String.raw`tw:motion-reduce:[transition:none]`,
  ].join(' '),
  // noticiasGlobales
  "ng-card-overlay-text": [
    String.raw`tw:[color:white] tw:font-semibold tw:[font-size:0.9rem] tw:text-center tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem] tw:[font-family:var(--subtitulos)]`,
    String.raw`tw:max-768:[font-size:0.8rem] tw:max-768:[padding-top:0] tw:max-768:[padding-right:0.5rem] tw:max-768:[padding-bottom:0] tw:max-768:[padding-left:0.5rem]`,
  ].join(' '),
  // noticiasGlobales
  "ng-skel-card": [
    String.raw`tw:cursor-default tw:[flex:0_0_300px] tw:[height:400px] tw:[border-radius:var(--radius-lg)] tw:[background:var(--border)] tw:[animation:cmic-ng-pulse_1.5s_ease-in-out_infinite]`,
  ].join(' '),
  // noticiasGlobales
  "ng-card-header": [
    String.raw`tw:flex tw:items-center tw:justify-between tw:[padding-top:0.75rem] tw:[padding-right:1rem] tw:[padding-bottom:0.75rem] tw:[padding-left:1rem] tw:[border-bottom:1px_solid_var(--border)] tw:[background:var(--colorFondo)] tw:[flex-shrink:0]`,
  ].join(' '),
  // noticiasGlobales
  "ng-chip": [
    String.raw`tw:[padding-top:0.25rem] tw:[padding-right:0.75rem] tw:[padding-bottom:0.25rem] tw:[padding-left:0.75rem] tw:[border-radius:1rem] tw:[font-size:0.75rem] tw:font-semibold tw:[color:#fff] tw:uppercase tw:[border:none]`,
    String.raw`tw:[&.cmic]:[background:var(--colorPrincipal)]`,
    String.raw`tw:[&.icic]:[background:var(--colorSecundario)]`,
  ].join(' '),
  // noticiasGlobales
  "ng-date": [
    String.raw`tw:[font-size:0.75rem] tw:[color:var(--muted)] tw:font-medium`,
  ].join(' '),
  // noticiasGlobales
  "ng-iframe-wrap": [
    String.raw`tw:[width:100%] tw:[background:var(--colorFondo)] tw:[flex:1] tw:[min-height:0]`,
  ].join(' '),
  // noticiasGlobales
  "ng-event-image-container": [
    String.raw`tw:cursor-pointer tw:overflow-hidden tw:[flex:1] tw:flex tw:items-center tw:justify-center tw:[background:#f8f9fa] tw:[padding-top:0.5rem] tw:[padding-right:0.5rem] tw:[padding-bottom:0.5rem] tw:[padding-left:0.5rem]`,
  ].join(' '),
  // noticiasGlobales
  "ng-event-image-original": [
    String.raw`tw:[width:auto] tw:[height:auto] tw:[max-width:100%] tw:[max-height:200px] tw:object-contain tw:[border-radius:6px]`,
  ].join(' '),
  // noticiasGlobales
  "ng-event-image-placeholder": [
    String.raw`tw:[width:100%] tw:[height:150px] tw:flex tw:items-center tw:justify-center tw:[background:var(--border)] tw:[border-radius:6px] tw:[font-size:2rem] tw:[opacity:0.5]`,
  ].join(' '),
  // noticiasGlobales
  "ng-event-content": [
    String.raw`tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem] tw:[flex-shrink:0]`,
  ].join(' '),
  // noticiasGlobales
  "ng-card-title": [
    String.raw`tw:[font-size:0.9rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[display:-webkit-box] tw:[-webkit-line-clamp:2] tw:[-webkit-box-orient:vertical] tw:overflow-hidden tw:[line-height:1.3]`,
  ].join(' '),
  // noticiasGlobales
  "ng-skeleton-carousel": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[padding-top:0.5rem] tw:[padding-right:2rem] tw:[padding-bottom:0.5rem] tw:[padding-left:2rem] tw:overflow-hidden`,
  ].join(' '),
  // noticiasGlobales
  "ng-empty-state": [
    String.raw`tw:text-center tw:[padding-top:3rem] tw:[padding-right:1rem] tw:[padding-bottom:3rem] tw:[padding-left:1rem] tw:[color:var(--muted)]`,
  ].join(' '),
  // noticiasGlobales
  "ng-error-modern": [
    String.raw`tw:text-center tw:[padding-top:3rem] tw:[padding-right:1rem] tw:[padding-bottom:3rem] tw:[padding-left:1rem] tw:[color:var(--muted)]`,
  ].join(' '),
  // noticiasGlobales
  "ng-empty-icon": [
    String.raw`tw:[font-size:2rem] tw:[margin-bottom:1rem] tw:[opacity:0.5]`,
  ].join(' '),
  // noticiasGlobales
  "ng-error-icon": [
    String.raw`tw:[font-size:2rem] tw:[margin-bottom:1rem] tw:[opacity:0.5]`,
  ].join(' '),
  // noticiasGlobales
  "ng-retry-btn": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:0.75rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.75rem] tw:[padding-left:1.5rem] tw:[border-radius:var(--radius-lg)] tw:font-semibold tw:cursor-pointer tw:[transition:background-color_0.2s_ease] tw:[margin-top:1rem]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)]`,
  ].join(' '),
  // icic
  "icic-redesign": [
    String.raw`tw:[&_.icic-grid-layout]:[align-items:start] tw:[&_.icic-grid-calendar_.icic-calendar-preview]:[border:1px_solid_#e8e3df] tw:[&_.icic-grid-calendar_.icic-calendar-preview]:[box-shadow:0_8px_28px_#3020170a] tw:[&_.icic-grid-calendar_.icic-calendar-preview:hover]:[transform:none] tw:[&_.icic-grid-calendar_.icic-calendar-image]:[max-height:none]`,
    String.raw`tw:[&_.icic-grid-gallery_.icic-gallery-carousel]:[background:transparent] tw:[&_.icic-grid-gallery_.icic-gallery-carousel]:[box-shadow:none] tw:[&_.icic-grid-gallery_.icic-carousel-container]:[height:auto] tw:[&_.icic-grid-gallery_.icic-carousel-container]:[background:#f5f3f0] tw:[&_.icic-grid-gallery_.icic-carousel-container]:[border:1px_solid_#e8e3df]`,
    String.raw`tw:[&_.icic-grid-gallery_.icic-carousel-slide]:hidden tw:[&_.icic-grid-gallery_.icic-carousel-slide]:relative tw:[&_.icic-grid-gallery_.icic-carousel-slide.icic-active]:flex tw:[&_.icic-grid-gallery_.icic-carousel-slide.icic-active]:[animation:cmic-photo-reveal_.65s_ease-out_both] tw:motion-reduce:[&_.icic-grid-gallery_.icic-carousel-slide.icic-active]:[animation:none] tw:[&_.icic-grid-gallery_.icic-carousel-image]:[max-height:65vh] tw:[&_.icic-grid-gallery_.icic-carousel-image]:[transform:none]`,
    String.raw`tw:[&_.icic-grid-gallery_.icic-carousel-indicators]:static tw:[&_.icic-grid-gallery_.icic-carousel-indicators]:[padding:1rem] tw:[&_.icic-grid-gallery_.icic-indicator]:[background:#c8bdb7] tw:[&_.icic-grid-gallery_.icic-indicator-active]:[background:var(--colorPrincipal)]`,
    String.raw`tw:[&_.icic-event-image-container]:[padding-top:0] tw:[&_.icic-event-image-container]:[background:#f5f3f0] tw:[&_.icic-event-image]:static tw:[&_.icic-event-image]:block tw:[&_.icic-event-image]:[height:auto] tw:[&_.icic-event-image]:object-contain tw:[&_.icic-event-card:hover_.icic-event-image]:[transform:none]`,
  ].join(' '),
  "icic-media-copy": String.raw`tw:[padding:1.25rem_0_.25rem] tw:[color:var(--colorTexto)] tw:[font-family:var(--texto)] tw:[&_h4]:[font-family:var(--subtitulos)] tw:[&_h4]:[font-size:1.15rem] tw:[&_h4]:[color:var(--colorTitulo)] tw:[&_h4]:[margin:0_0_.5rem] tw:[&_p]:[margin:0] tw:[&_p]:[line-height:1.7] tw:[animation:cmic-photo-reveal_.65s_ease-out_both] tw:motion-reduce:[animation:none]`,
  "icic-calendar-download": String.raw`tw:inline-flex tw:items-center tw:justify-center tw:[margin-top:1rem] tw:[padding:.85rem_1.5rem] tw:[border:1px_solid_var(--colorPrincipal)] tw:[border-radius:10px] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:no-underline tw:[font-family:var(--texto)] tw:font-semibold tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:4px]`,
  "icic-course-date": String.raw`tw:block tw:[font-family:var(--texto)] tw:[font-size:.9rem] tw:[line-height:1.5] tw:[color:var(--colorPrincipal)] tw:font-semibold`,
  "icic-page": [
    String.raw`tw:[min-height:100vh] tw:[background-color:var(--colorFondo)] tw:[padding-top:var(--header-offset,_80px)]`,
    String.raw`tw:max-768:[padding-top:70px]`,
    String.raw`tw:max-576:[padding-top:60px]`,
    String.raw`tw:print:[padding-top:0] tw:print:[background:#fff]`,
    String.raw`tw:[padding-top:calc(var(--site-header-height)_+_1rem)]!`,
  ].join(' '),
  // icic
  "icic-loading-container": [
    String.raw`tw:[min-height:60vh] tw:flex tw:flex-col tw:items-center tw:justify-center tw:[padding-top:3rem] tw:[padding-right:1rem] tw:[padding-bottom:3rem] tw:[padding-left:1rem]`,
    String.raw`tw:[&_p]:[font-family:var(--texto)] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[font-size:1.1rem]`,
  ].join(' '),
  // icic
  "icic-loading-spinner": [
    String.raw`tw:[width:50px] tw:[height:50px] tw:[border:3px_solid_var(--border)] tw:[border-top-color:var(--colorPrincipal)] tw:[border-radius:50%] tw:[animation:cmic-icic-spin_1s_linear_infinite] tw:[margin-bottom:1rem]`,
    String.raw`tw:motion-reduce:[animation:none]`,
  ].join(' '),
  // icic
  "icic-error-container": [
    String.raw`tw:[min-height:60vh] tw:flex tw:flex-col tw:items-center tw:justify-center tw:[padding-top:3rem] tw:[padding-right:1rem] tw:[padding-bottom:3rem] tw:[padding-left:1rem] tw:text-center`,
    String.raw`tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-bottom:2rem] tw:[&_p]:[max-width:500px] tw:[&_p]:[line-height:1.6]`,
  ].join(' '),
  // icic
  "icic-retry-btn": [
    String.raw`tw:[background-color:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:0.75rem] tw:[padding-right:2rem] tw:[padding-bottom:0.75rem] tw:[padding-left:2rem] tw:[border-radius:var(--radius-lg)] tw:[font-family:var(--texto)] tw:font-medium tw:cursor-pointer tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[background-color:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-2px)]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-hero-section": [
    String.raw`tw:flex tw:items-center tw:justify-center tw:px-4 tw:py-8 tw:sm:py-10 tw:lg:py-12 tw:[background-color:transparent] tw:mb-8`,
  ].join(' '),
  // icic
  "icic-hero-content": [
    String.raw`tw:text-center tw:w-full tw:[max-width:800px]`,
  ].join(' '),
  // icic
  "icic-hero-logo": [
    String.raw`tw:[width:100%] tw:[max-width:400px] tw:[height:auto] tw:[margin-bottom:1.5rem] tw:object-contain tw:[transition:transform_0.3s_ease]`,
    String.raw`tw:max-840:[margin-bottom:1rem]!`,
    String.raw`tw:max-768:[max-width:300px]`,
    String.raw`tw:max-576:[max-width:250px]`,
    String.raw`tw:max-480:[max-width:200px]`,
  ].join(' '),
  // icic
  "icic-hero-subtitle": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[font-size:clamp(1.25rem,_3vw,_2rem)] tw:[color:var(--colorTexto)] tw:[line-height:1.5] tw:[max-width:600px] tw:mx-auto`,
  ].join(' '),
  // icic
  "icic-container": [
    String.raw`tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:1.5rem] tw:[padding-bottom:0] tw:[padding-left:1.5rem]`,
    String.raw`tw:max-576:[padding-top:0] tw:max-576:[padding-right:1rem] tw:max-576:[padding-bottom:0] tw:max-576:[padding-left:1rem]`,
  ].join(' '),
  // icic
  "icic-info-section": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:1rem] tw:[padding-bottom:4rem] tw:[padding-left:1rem] tw:[background-color:#fff]`,
    String.raw`tw:max-768:[padding-top:3rem] tw:max-768:[padding-right:1rem] tw:max-768:[padding-bottom:3rem] tw:max-768:[padding-left:1rem]`,
  ].join(' '),
  // icic
  "icic-intro": [
    String.raw`tw:[max-width:1000px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // icic
  "icic-features-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_300px),_1fr))] tw:[row-gap:1.5rem] tw:[column-gap:1.5rem] tw:[margin-top:3rem]`,
    String.raw`tw:max-1024:[grid-template-columns:repeat(2,_minmax(0,_1fr))]`,
    String.raw`tw:max-768:[grid-template-columns:1fr]`,
  ].join(' '),
  // icic
  "icic-feature-card": [
    String.raw`tw:grid tw:[grid-template-columns:auto_1fr] tw:[row-gap:1.2rem] tw:[column-gap:1.2rem] tw:[align-items:start] tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:[background:#fff] tw:[border-radius:12px] tw:[box-shadow:0_4px_12px_rgba(0,_0,_0,_0.08)] tw:text-left tw:[transition:transform_0.3s_ease,_box-shadow_0.3s_ease] tw:[border:1px_solid_var(--border)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-5px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:text-center tw:max-768:[row-gap:1rem] tw:max-768:[column-gap:1rem]`,
    String.raw`tw:max-480:[padding-top:1.25rem] tw:max-480:[padding-right:1.25rem] tw:max-480:[padding-bottom:1.25rem] tw:max-480:[padding-left:1.25rem]`,
    String.raw`tw:contrast-high:[border:2px_solid_var(--colorTitulo)]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
    String.raw`tw:print:[box-shadow:none] tw:print:[border:1px_solid_#ddd]`,
  ].join(' '),
  // icic
  "icic-feature-icon": [
    String.raw`tw:[font-size:2rem] tw:[width:60px] tw:[height:60px] tw:flex tw:items-center tw:justify-center tw:[background:linear-gradient(135deg,_#e3f2fd_0%,_#bbdefb_100%)] tw:[border-radius:12px]`,
    String.raw`tw:max-768:[align-self:center] tw:max-768:[justify-self:center]`,
  ].join(' '),
  // icic
  "icic-feature-content": [
    String.raw`tw:[&_h4]:[margin-top:0] tw:[&_h4]:[margin-right:0] tw:[&_h4]:[margin-bottom:.5rem] tw:[&_h4]:[margin-left:0] tw:[&_h4]:[color:var(--colorTitulo)] tw:[&_h4]:[font-size:1.2rem] tw:[&_h4]:font-semibold tw:[&_h4]:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:0] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[font-size:1rem] tw:[&_p]:[line-height:1.5] tw:[&_p]:[font-family:var(--texto)]`,
  ].join(' '),
  // icic
  "icic-grid-section": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:1rem] tw:[padding-bottom:4rem] tw:[padding-left:1rem] tw:[background:linear-gradient(to_bottom,_white,_var(--colorFondo))]`,
  ].join(' '),
  // icic
  "icic-grid-layout": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:3rem] tw:[column-gap:3rem] tw:[align-items:start]`,
    String.raw`tw:max-1024:[row-gap:2rem] tw:max-1024:[column-gap:2rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:3rem] tw:max-768:[column-gap:3rem]`,
  ].join(' '),
  // icic
  "icic-grid-calendar": [
    String.raw`tw:flex tw:flex-col`,
  ].join(' '),
  // icic
  "icic-grid-gallery": [
    String.raw`tw:flex tw:flex-col`,
  ].join(' '),
  // icic
  "icic-calendar-section": [
    String.raw`tw:[.icic-grid-calendar_&]:[max-width:100%] tw:[.icic-grid-calendar_&]:[margin-top:0] tw:[.icic-grid-calendar_&]:[margin-right:0] tw:[.icic-grid-calendar_&]:[margin-bottom:0] tw:[.icic-grid-calendar_&]:[margin-left:0]`,
  ].join(' '),
  // icic
  "icic-calendar-title": [
    String.raw`tw:[.icic-grid-calendar_&]:[font-family:var(--subtitulos)] tw:[.icic-grid-calendar_&]:[color:var(--colorTitulo)] tw:[.icic-grid-calendar_&]:[font-size:1.5rem] tw:[.icic-grid-calendar_&]:text-left tw:[.icic-grid-calendar_&]:[margin-bottom:1.5rem] tw:[.icic-grid-calendar_&]:[border-bottom:2px_solid_var(--colorPrincipal)] tw:[.icic-grid-calendar_&]:[padding-bottom:0.5rem]`,
    String.raw`tw:max-768:[.icic-grid-calendar_&]:text-center`,
    String.raw`tw:print:[color:black]`,
  ].join(' '),
  // icic
  "icic-calendar-preview": [
    String.raw`tw:[.icic-grid-calendar_&]:[border-radius:var(--radius-xl)] tw:[.icic-grid-calendar_&]:overflow-hidden tw:[.icic-grid-calendar_&]:[box-shadow:var(--shadow-md)] tw:[.icic-grid-calendar_&]:[transition:transform_0.3s_ease] tw:[.icic-grid-calendar_&]:[background:#fff] tw:[.icic-grid-calendar_&]:relative`,
    String.raw`tw:[.icic-grid-calendar_&:hover]:[transform:translateY(-3px)] tw:[.icic-grid-calendar_&:hover]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-calendar-image": [
    String.raw`tw:[.icic-grid-calendar_&]:[width:100%] tw:[.icic-grid-calendar_&]:[height:auto] tw:[.icic-grid-calendar_&]:block tw:[.icic-grid-calendar_&]:object-contain tw:[.icic-grid-calendar_&]:[max-height:600px]`,
  ].join(' '),
  // icic
  "icic-download-btn": [
    String.raw`tw:[.icic-grid-calendar_&]:absolute tw:[.icic-grid-calendar_&]:[bottom:1rem] tw:[.icic-grid-calendar_&]:[right:1rem] tw:[.icic-grid-calendar_&]:[background-color:var(--colorPrincipal)] tw:[.icic-grid-calendar_&]:[color:white] tw:[.icic-grid-calendar_&]:[padding-top:0.75rem] tw:[.icic-grid-calendar_&]:[padding-right:1.5rem] tw:[.icic-grid-calendar_&]:[padding-bottom:0.75rem] tw:[.icic-grid-calendar_&]:[padding-left:1.5rem] tw:[.icic-grid-calendar_&]:[border-radius:var(--radius-lg)] tw:[.icic-grid-calendar_&]:no-underline tw:[.icic-grid-calendar_&]:[font-family:var(--texto)] tw:[.icic-grid-calendar_&]:font-medium tw:[.icic-grid-calendar_&]:[transition:var(--transition)] tw:[.icic-grid-calendar_&]:[border:2px_solid_var(--colorPrincipal)] tw:[.icic-grid-calendar_&]:[font-size:0.9rem]`,
    String.raw`tw:[.icic-grid-calendar_&:hover]:[background-color:#fff] tw:[.icic-grid-calendar_&:hover]:[color:var(--colorPrincipal)]`,
    String.raw`tw:max-576:[.icic-grid-calendar_&]:[padding-top:0.6rem] tw:max-576:[.icic-grid-calendar_&]:[padding-right:1.2rem] tw:max-576:[.icic-grid-calendar_&]:[padding-bottom:0.6rem] tw:max-576:[.icic-grid-calendar_&]:[padding-left:1.2rem] tw:max-576:[.icic-grid-calendar_&]:[font-size:0.85rem]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-calendar-description": [
    String.raw`tw:[.icic-grid-calendar_&]:[margin-top:1rem] tw:[.icic-grid-calendar_&]:[line-height:1.6] tw:[.icic-grid-calendar_&]:[color:var(--colorTexto)] tw:[.icic-grid-calendar_&]:[font-size:1rem]`,
  ].join(' '),
  // icic
  "icic-calendar-placeholder": [
    String.raw`tw:[padding-top:3rem] tw:[padding-right:3rem] tw:[padding-bottom:3rem] tw:[padding-left:3rem] tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xl)] tw:[border:2px_dashed_var(--border)] tw:text-center tw:[color:var(--muted)]`,
  ].join(' '),
  // icic
  "icic-gallery-title": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[color:var(--colorTitulo)] tw:[font-size:1.5rem] tw:text-left tw:[margin-bottom:1.5rem] tw:[border-bottom:2px_solid_var(--colorPrincipal)] tw:[padding-bottom:0.5rem]`,
    String.raw`tw:max-768:text-center`,
  ].join(' '),
  // icic
  "icic-gallery-carousel": [
    String.raw`tw:[.icic-grid-gallery_&]:relative tw:[.icic-grid-gallery_&]:overflow-hidden tw:[.icic-grid-gallery_&]:[border-radius:var(--radius-xl)] tw:[.icic-grid-gallery_&]:[box-shadow:var(--shadow-md)] tw:[.icic-grid-gallery_&]:[background:#fff]`,
  ].join(' '),
  // icic
  "icic-carousel-container": [
    String.raw`tw:[.icic-grid-gallery_&]:relative tw:[.icic-grid-gallery_&]:[height:500px] tw:[.icic-grid-gallery_&]:overflow-hidden tw:[.icic-grid-gallery_&]:[border-radius:var(--radius-lg)]`,
    String.raw`tw:max-1024:[.icic-grid-gallery_&]:[height:450px]`,
    String.raw`tw:max-768:[.icic-grid-gallery_&]:[height:400px]`,
    String.raw`tw:max-576:[.icic-grid-gallery_&]:[height:350px]`,
    String.raw`tw:max-480:[.icic-grid-gallery_&]:[height:300px]`,
  ].join(' '),
  // icic
  "icic-carousel-slide": [
    String.raw`tw:[.icic-grid-gallery_&]:absolute tw:[.icic-grid-gallery_&]:[top:0] tw:[.icic-grid-gallery_&]:[right:0] tw:[.icic-grid-gallery_&]:[bottom:0] tw:[.icic-grid-gallery_&]:[left:0] tw:[.icic-grid-gallery_&]:[opacity:0] tw:[.icic-grid-gallery_&]:[transform:scale(.95)] tw:[.icic-grid-gallery_&]:[transition:all_.6s_cubic-bezier(.25,_.46,_.45,_.94)] tw:[.icic-grid-gallery_&]:flex tw:[.icic-grid-gallery_&]:items-center tw:[.icic-grid-gallery_&]:justify-center`,
    String.raw`tw:[.icic-grid-gallery_&.icic-active]:[opacity:1] tw:[.icic-grid-gallery_&.icic-active]:[transform:scale(1)] tw:[.icic-grid-gallery_&.icic-active]:[z-index:2]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-carousel-image": [
    String.raw`tw:[.icic-grid-gallery_&]:[max-width:100%] tw:[.icic-grid-gallery_&]:[max-height:100%] tw:[.icic-grid-gallery_&]:[width:auto] tw:[.icic-grid-gallery_&]:[height:auto] tw:[.icic-grid-gallery_&]:object-contain tw:[.icic-grid-gallery_&]:[transition:transform_.3s_ease]`,
    String.raw`tw:[.icic-grid-gallery_.icic-carousel-slide:hover_&]:[transform:scale(1.02)]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[.icic-carousel-slide:hover_&]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-carousel-caption": [
    String.raw`tw:[.icic-grid-gallery_&]:absolute tw:[.icic-grid-gallery_&]:[bottom:0] tw:[.icic-grid-gallery_&]:[left:0] tw:[.icic-grid-gallery_&]:[right:0] tw:[.icic-grid-gallery_&]:[background:linear-gradient(to_top,_rgba(0,_0,_0,_0.8),_transparent)] tw:[.icic-grid-gallery_&]:[padding-top:1.5rem] tw:[.icic-grid-gallery_&]:[padding-right:1rem] tw:[.icic-grid-gallery_&]:[padding-bottom:0.75rem] tw:[.icic-grid-gallery_&]:[padding-left:1rem] tw:[.icic-grid-gallery_&]:[color:white]`,
    String.raw`tw:max-576:[.icic-grid-gallery_&]:[padding-top:1rem] tw:max-576:[.icic-grid-gallery_&]:[padding-right:0.75rem] tw:max-576:[.icic-grid-gallery_&]:[padding-bottom:0.5rem] tw:max-576:[.icic-grid-gallery_&]:[padding-left:0.75rem]`,
  ].join(' '),
  // icic
  "icic-carousel-title": [
    String.raw`tw:[.icic-grid-gallery_&]:[font-family:var(--subtitulos)] tw:[.icic-grid-gallery_&]:[font-size:1.1rem] tw:[.icic-grid-gallery_&]:[margin-bottom:0.25rem] tw:[.icic-grid-gallery_&]:block`,
    String.raw`tw:max-576:[.icic-grid-gallery_&]:[font-size:1rem]`,
  ].join(' '),
  // icic
  "icic-carousel-desc": [
    String.raw`tw:[.icic-grid-gallery_&]:[font-family:var(--texto)] tw:[.icic-grid-gallery_&]:[font-size:0.9rem] tw:[.icic-grid-gallery_&]:[line-height:1.4] tw:[.icic-grid-gallery_&]:[opacity:0.9] tw:[.icic-grid-gallery_&]:[margin-top:0] tw:[.icic-grid-gallery_&]:[margin-right:0] tw:[.icic-grid-gallery_&]:[margin-bottom:0] tw:[.icic-grid-gallery_&]:[margin-left:0]`,
    String.raw`tw:max-576:[.icic-grid-gallery_&]:[font-size:0.85rem]`,
  ].join(' '),
  // icic
  "icic-carousel-controls": [
    String.raw`tw:[.icic-grid-gallery_&]:absolute tw:[.icic-grid-gallery_&]:[top:50%] tw:[.icic-grid-gallery_&]:[left:0] tw:[.icic-grid-gallery_&]:[right:0] tw:[.icic-grid-gallery_&]:[transform:translateY(-50%)] tw:[.icic-grid-gallery_&]:flex tw:[.icic-grid-gallery_&]:justify-between tw:[.icic-grid-gallery_&]:[padding-top:0] tw:[.icic-grid-gallery_&]:[padding-right:0.5rem] tw:[.icic-grid-gallery_&]:[padding-bottom:0] tw:[.icic-grid-gallery_&]:[padding-left:0.5rem] tw:[.icic-grid-gallery_&]:[z-index:10]`,
    String.raw`tw:print:hidden`,
  ].join(' '),
  // icic
  "icic-carousel-btn": [
    String.raw`tw:[.icic-grid-gallery_&]:[background:rgba(255,_255,_255,_0.9)] tw:[.icic-grid-gallery_&]:[border:none] tw:[.icic-grid-gallery_&]:[width:40px] tw:[.icic-grid-gallery_&]:[height:40px] tw:[.icic-grid-gallery_&]:[border-radius:50%] tw:[.icic-grid-gallery_&]:flex tw:[.icic-grid-gallery_&]:items-center tw:[.icic-grid-gallery_&]:justify-center tw:[.icic-grid-gallery_&]:cursor-pointer tw:[.icic-grid-gallery_&]:[transition:var(--transition)] tw:[.icic-grid-gallery_&]:[font-size:1.2rem] tw:[.icic-grid-gallery_&]:[color:var(--colorPrincipal)] tw:[.icic-grid-gallery_&]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:[.icic-grid-gallery_&:hover]:[background:#fff] tw:[.icic-grid-gallery_&:hover]:[transform:scale(1.1)] tw:[.icic-grid-gallery_&:hover]:[box-shadow:var(--shadow-md)]`,
    String.raw`tw:max-768:[.icic-grid-gallery_&]:[width:36px] tw:max-768:[.icic-grid-gallery_&]:[height:36px] tw:max-768:[.icic-grid-gallery_&]:[font-size:1rem]`,
    String.raw`tw:max-480:[.icic-grid-gallery_&]:[width:32px] tw:max-480:[.icic-grid-gallery_&]:[height:32px] tw:max-480:[.icic-grid-gallery_&]:[font-size:0.9rem]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
  ].join(' '),
  // icic
  "icic-carousel-indicators": [
    String.raw`tw:[.icic-grid-gallery_&]:absolute tw:[.icic-grid-gallery_&]:[bottom:0.75rem] tw:[.icic-grid-gallery_&]:[left:0] tw:[.icic-grid-gallery_&]:[right:0] tw:[.icic-grid-gallery_&]:flex tw:[.icic-grid-gallery_&]:justify-center tw:[.icic-grid-gallery_&]:[row-gap:0.4rem] tw:[.icic-grid-gallery_&]:[column-gap:0.4rem] tw:[.icic-grid-gallery_&]:[z-index:10]`,
    String.raw`tw:print:hidden`,
  ].join(' '),
  // icic
  "icic-indicator": [
    String.raw`tw:[.icic-grid-gallery_&]:[width:10px] tw:[.icic-grid-gallery_&]:[height:10px] tw:[.icic-grid-gallery_&]:[border-radius:50%] tw:[.icic-grid-gallery_&]:[border:none] tw:[.icic-grid-gallery_&]:[background:rgba(255,_255,_255,_0.5)] tw:[.icic-grid-gallery_&]:cursor-pointer tw:[.icic-grid-gallery_&]:[transition:var(--transition)] tw:[.icic-grid-gallery_&]:[padding-top:0] tw:[.icic-grid-gallery_&]:[padding-right:0] tw:[.icic-grid-gallery_&]:[padding-bottom:0] tw:[.icic-grid-gallery_&]:[padding-left:0]`,
    String.raw`tw:[.icic-grid-gallery_&:hover]:[background:rgba(255,_255,_255,_0.8)]`,
  ].join(' '),
  // icic
  "icic-indicator-active": [
    String.raw`tw:[.icic-grid-gallery_&]:[background:#fff] tw:[.icic-grid-gallery_&]:[transform:scale(1.2)]`,
  ].join(' '),
  // icic
  "icic-gallery-placeholder": [
    String.raw`tw:[.icic-grid-gallery_&]:[height:500px] tw:[.icic-grid-gallery_&]:flex tw:[.icic-grid-gallery_&]:items-center tw:[.icic-grid-gallery_&]:justify-center tw:[.icic-grid-gallery_&]:[background:var(--bg-card)] tw:[.icic-grid-gallery_&]:[border-radius:var(--radius-xl)] tw:[.icic-grid-gallery_&]:[border:2px_dashed_var(--border)]`,
  ].join(' '),
  // icic
  "icic-placeholder-image": [
    String.raw`tw:[.icic-grid-gallery_&]:[width:100%] tw:[.icic-grid-gallery_&]:[height:100%] tw:[.icic-grid-gallery_&]:[background:linear-gradient(90deg,_var(--border)_0%,_#e9ecef_50%,_var(--border)_100%)] tw:[.icic-grid-gallery_&]:[border-radius:var(--radius-lg)] tw:[.icic-grid-gallery_&]:[animation:cmic-icic-pulse_1.5s_ease-in-out_infinite]`,
    String.raw`tw:motion-reduce:[animation:none]`,
  ].join(' '),
  // icic
  "icic-section-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[color:var(--colorTitulo)] tw:[font-size:clamp(1.5rem,_3vw,_2.25rem)] tw:text-center tw:[margin-bottom:2rem] tw:relative`,
    String.raw`tw:[&::after]:[content:''] tw:[&::after]:block tw:[&::after]:[width:80px] tw:[&::after]:[height:4px] tw:[&::after]:[background-color:var(--colorPrincipal)] tw:[&::after]:[margin-top:0.5rem] tw:[&::after]:[margin-right:auto] tw:[&::after]:[margin-bottom:0] tw:[&::after]:[margin-left:auto] tw:[&::after]:[border-radius:2px]`,
    String.raw`tw:print:[color:black]`,
  ].join(' '),
  // icic
  "icic-section-subtitle": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[color:var(--colorTexto)] tw:[font-size:1.125rem] tw:text-center tw:[margin-bottom:3rem] tw:[max-width:700px] tw:[margin-left:auto] tw:[margin-right:auto]`,
  ].join(' '),
  // icic
  "icic-events-main-section": [
    String.raw`tw:[padding-top:4rem] tw:[padding-right:1rem] tw:[padding-bottom:4rem] tw:[padding-left:1rem] tw:[background:linear-gradient(to_bottom,_var(--colorFondo),_white)]`,
    String.raw`tw:max-768:[padding-top:3rem] tw:max-768:[padding-right:1rem] tw:max-768:[padding-bottom:3rem] tw:max-768:[padding-left:1rem]`,
  ].join(' '),
  // icic
  "icic-events-section": [
    String.raw`tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // icic
  "icic-events-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[color:var(--colorTitulo)] tw:[font-size:clamp(1.5rem,_3vw,_2.25rem)] tw:text-center tw:[margin-bottom:3rem]`,
    String.raw`tw:print:[color:black]`,
  ].join(' '),
  // icic
  "icic-events-subtitle": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[color:var(--colorPrincipal)] tw:[font-size:1.5rem] tw:[margin-top:2rem] tw:[margin-right:0] tw:[margin-bottom:1.5rem] tw:[margin-left:0] tw:text-center`,
  ].join(' '),
  // icic
  "icic-events-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_300px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[margin-top:2rem]`,
    String.raw`tw:max-1024:[grid-template-columns:repeat(2,_minmax(0,_1fr))]`,
    String.raw`tw:max-768:[grid-template-columns:1fr]`,
  ].join(' '),
  // icic
  "icic-event-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xxl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-md)] tw:[border:1px_solid_var(--border)] tw:[transition:var(--transition)] tw:flex tw:flex-col`,
    String.raw`tw:[&:hover]:[transform:translateY(-4px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:contrast-high:[border:2px_solid_var(--colorTitulo)]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
    String.raw`tw:print:[box-shadow:none] tw:print:[border:1px_solid_#ddd]`,
    String.raw`tw:max-480:[margin-top:0] tw:max-480:[margin-right:10px] tw:max-480:[margin-bottom:0] tw:max-480:[margin-left:10px]`,
  ].join(' '),
  // icic
  "icic-event-future": [
    String.raw`tw:[border-top:4px_solid_var(--colorPrincipal)]`,
  ].join(' '),
  // icic
  "icic-event-past": [
    String.raw`tw:[border-top:4px_solid_var(--muted)] tw:[opacity:0.9]`,
  ].join(' '),
  // icic
  "icic-event-image-container": [
    String.raw`tw:relative tw:[padding-top:62.5%] tw:overflow-hidden`,
  ].join(' '),
  // icic
  "icic-event-image": [
    String.raw`tw:absolute tw:[top:0] tw:[left:0] tw:[width:100%] tw:[height:100%] tw:object-cover tw:[transition:transform_0.4s_ease]`,
    String.raw`tw:[.icic-event-card:hover_&]:[transform:scale(1.05)]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[.icic-event-card:hover_&]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-event-date-badge": [
    String.raw`tw:absolute tw:[top:1rem] tw:[right:1rem] tw:[background:rgba(114,_0,_0,_0.9)] tw:[color:white] tw:[padding-top:0.5rem] tw:[padding-right:1rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1rem] tw:[border-radius:var(--radius-sm)] tw:[font-size:0.875rem] tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // icic
  "icic-event-info": [
    String.raw`tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:[flex:1] tw:flex tw:flex-col tw:[row-gap:1rem] tw:[column-gap:1rem]`,
    String.raw`tw:max-576:[padding-top:1rem] tw:max-576:[padding-right:1rem] tw:max-576:[padding-bottom:1rem] tw:max-576:[padding-left:1rem]`,
  ].join(' '),
  // icic
  "icic-event-title": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[color:var(--colorTitulo)] tw:[font-size:1.25rem] tw:[line-height:1.4] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0]`,
    String.raw`tw:max-576:[font-size:1.1rem]`,
    String.raw`tw:print:[color:black]`,
  ].join(' '),
  // icic
  "icic-event-description": [
    String.raw`tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[flex:1]`,
  ].join(' '),
  // icic
  "icic-event-actions": [
    String.raw`tw:[margin-top:1rem]`,
  ].join(' '),
  // icic
  "icic-event-details-btn": [
    String.raw`tw:[width:100%] tw:[padding-top:0.75rem] tw:[padding-right:0.75rem] tw:[padding-bottom:0.75rem] tw:[padding-left:0.75rem] tw:[border-radius:var(--radius-lg)] tw:[font-family:var(--texto)] tw:font-medium tw:[transition:var(--transition)] tw:[border:1px_solid_var(--colorPrincipal)] tw:[background-color:#fff] tw:[color:var(--colorPrincipal)] tw:cursor-pointer`,
    String.raw`tw:[&:hover]:[background-color:var(--colorPrincipal)] tw:[&:hover]:[color:white]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-contact-section": [
    String.raw`tw:[margin-top:5rem] tw:[padding-top:4rem] tw:[padding-right:0] tw:[padding-bottom:3rem] tw:[padding-left:0] tw:[border-top:2px_solid_var(--border)] tw:text-center tw:[background:linear-gradient(135deg,_#f8f9fa_0%,_#e9ecef_100%)] tw:[border-radius:20px] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[max-width:1200px]`,
    String.raw`tw:max-768:[margin-top:4rem] tw:max-768:[padding-top:3rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:3rem] tw:max-768:[padding-left:1.5rem]`,
    String.raw`tw:max-576:[margin-top:3rem] tw:max-576:[padding-top:2.5rem] tw:max-576:[padding-right:1rem] tw:max-576:[padding-bottom:2.5rem] tw:max-576:[padding-left:1rem]`,
    String.raw`tw:print:hidden`,
  ].join(' '),
  // icic
  "icic-contact-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[font-size:2.2rem] tw:[margin-bottom:0.5rem] tw:[color:var(--colorTitulo)] tw:font-bold tw:relative tw:[padding-bottom:0.75rem]`,
    String.raw`tw:[&::after]:[content:''] tw:[&::after]:absolute tw:[&::after]:[bottom:0] tw:[&::after]:[left:50%] tw:[&::after]:[transform:translateX(-50%)] tw:[&::after]:[width:80px] tw:[&::after]:[height:4px] tw:[&::after]:[background:var(--colorPrincipal)] tw:[&::after]:[border-radius:2px]`,
    String.raw`tw:max-576:[font-size:1.8rem]`,
    String.raw`tw:print:[color:black]`,
  ].join(' '),
  // icic
  "icic-contact-subtitle": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[font-size:1.1rem] tw:[color:var(--colorTexto)] tw:[margin-bottom:3rem] tw:[line-height:1.6] tw:[max-width:600px] tw:[margin-left:auto] tw:[margin-right:auto] tw:font-medium`,
    String.raw`tw:max-576:[font-size:1rem] tw:max-576:[margin-bottom:2rem]`,
  ].join(' '),
  // icic
  "icic-contact-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_300px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[max-width:1000px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:max-1024:[grid-template-columns:repeat(2,_minmax(0,_1fr))]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[max-width:500px]`,
  ].join(' '),
  // icic
  "icic-contact-card": [
    String.raw`tw:flex tw:items-center tw:[row-gap:1.5rem] tw:[column-gap:1.5rem] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[background:#fff] tw:[border-radius:16px] tw:[box-shadow:0_4px_20px_rgba(0,_0,_0,_0.1)] tw:no-underline tw:[transition:all_0.3s_ease] tw:[border:none] tw:cursor-pointer tw:text-left tw:[width:100%] tw:[min-height:120px]`,
    String.raw`tw:[&:hover]:[transform:translateY(-5px)] tw:[&:hover]:[box-shadow:0_12px_30px_rgba(0,_0,_0,_0.15)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:max-768:[padding-top:1.5rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:1.5rem] tw:max-768:[padding-left:1.5rem] tw:max-768:[row-gap:1.25rem] tw:max-768:[column-gap:1.25rem] tw:max-768:[min-height:100px]`,
    String.raw`tw:max-576:flex-col tw:max-576:text-center tw:max-576:[padding-top:1.25rem] tw:max-576:[padding-right:1.25rem] tw:max-576:[padding-bottom:1.25rem] tw:max-576:[padding-left:1.25rem] tw:max-576:[row-gap:1rem] tw:max-576:[column-gap:1rem]`,
    String.raw`tw:max-480:[padding-top:1rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem]`,
    String.raw`tw:contrast-high:[border:2px_solid_var(--colorTitulo)]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-whatsapp-card": [
    String.raw`tw:[&:hover]:[background:linear-gradient(135deg,_#25D36610_0%,_#128C7E10_100%)]`,
  ].join(' '),
  // icic
  "icic-email-card": [
    String.raw`tw:[&:hover]:[background:linear-gradient(135deg,_#667eea10_0%,_#764ba210_100%)]`,
  ].join(' '),
  // icic
  "icic-phone-card": [
    String.raw`tw:[&:hover]:[background:linear-gradient(135deg,_#34b7f110_0%,_#1e88e510_100%)]`,
  ].join(' '),
  // icic
  "icic-contact-icon": [
    String.raw`tw:[width:60px] tw:[height:60px] tw:flex tw:items-center tw:justify-center tw:[border-radius:16px] tw:[flex-shrink:0] tw:[transition:all_0.3s_ease] tw:[box-shadow:0_4px_12px_rgba(0,_0,_0,_0.1)]`,
    String.raw`tw:[.icic-contact-card:hover_&]:[transform:scale(1.1)_rotate(5deg)]`,
    String.raw`tw:[.icic-email-card_&]:[background:linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] tw:[.icic-email-card_&]:[color:white]`,
    String.raw`tw:[.icic-whatsapp-card_&]:[background:linear-gradient(135deg,_#25D366_0%,_#128C7E_100%)] tw:[.icic-whatsapp-card_&]:[color:white]`,
    String.raw`tw:[.icic-phone-card_&]:[background:linear-gradient(135deg,_#34b7f1_0%,_#1e88e5_100%)] tw:[.icic-phone-card_&]:[color:white]`,
    String.raw`tw:max-768:[width:50px] tw:max-768:[height:50px]`,
    String.raw`tw:max-576:[width:50px] tw:max-576:[height:50px]`,
    String.raw`tw:motion-reduce:[transition:none]!`,
    String.raw`tw:motion-reduce:[.icic-contact-card:hover_&]:[transform:none]!`,
  ].join(' '),
  // icic
  "icic-contact-info": [
    String.raw`tw:[flex:1] tw:[min-width:0]`,
    String.raw`tw:[&_h4]:[margin-top:0] tw:[&_h4]:[margin-right:0] tw:[&_h4]:[margin-bottom:0.5rem] tw:[&_h4]:[margin-left:0] tw:[&_h4]:[font-size:1.3rem] tw:[&_h4]:[color:var(--colorTitulo)] tw:[&_h4]:font-bold tw:[&_h4]:[line-height:1.3] tw:[&_h4]:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:0] tw:[&_p]:[font-size:0.8rem] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[line-height:1.5] tw:[&_p]:[font-family:var(--texto)]`,
    String.raw`tw:max-768:[&_h4]:[font-size:1.1rem]`,
    String.raw`tw:max-480:[&_h4]:[font-size:1rem]`,
    String.raw`tw:max-480:[&_p]:[font-size:0.875rem]`,
  ].join(' '),
  // itc
  "servicios-page": [
    String.raw`tw:[min-height:100vh] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[background:var(--colorFondo)] tw:[font-family:var(--texto)]`,
    String.raw`tw:max-968:[padding-top:1rem] tw:max-968:[padding-right:1rem] tw:max-968:[padding-bottom:1rem] tw:max-968:[padding-left:1rem]`,
    String.raw`tw:max-480:[padding-top:0.8rem] tw:max-480:[padding-right:0.8rem] tw:max-480:[padding-bottom:0.8rem] tw:max-480:[padding-left:0.8rem]`,
    String.raw`tw:[padding-top:calc(var(--site-header-height)_+_1rem)]!`,
  ].join(' '),
  // itc
  "servicios-header": [
    String.raw`tw:text-center tw:[padding-top:2rem] tw:[padding-right:0] tw:[padding-bottom:2rem] tw:[padding-left:0]`,
    String.raw`tw:[&_h1]:[color:var(--colorPrincipal)] tw:[&_h1]:[font-family:var(--titulos)] tw:[&_h1]:[font-size:clamp(2rem,_5vw,_2.8rem)] tw:[&_h1]:font-bold tw:[&_h1]:[margin-top:2rem]`,
    String.raw`tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[font-size:1.15rem] tw:[&_p]:[max-width:800px] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:auto] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:auto] tw:[&_p]:[line-height:1.6]`,
    String.raw`tw:max-968:[margin-top:50px]`,
    String.raw`tw:max-968:[&_h1]:[font-size:2.2rem] tw:max-968:[&_h1]:[margin-top:10px]`,
    String.raw`tw:max-840:[margin-top:-50px]`,
    String.raw`tw:max-768:[&_h1]:[font-size:2rem] tw:max-768:[&_h1]:[margin-top:10px]`,
    String.raw`tw:max-480:[&_h1]:[font-size:1.9rem] tw:max-480:[&_h1]:[margin-top:5px]`,
    String.raw`tw:max-480:[&_p]:[font-size:1rem]`,
    String.raw`tw:[margin-top:0]!`,
  ].join(' '),
  // itc
  "imagen-container": [
    String.raw`tw:flex tw:justify-center tw:[margin-top:1.5rem]`,
  ].join(' '),
  // itc
  "itc-logo": [
    String.raw`tw:[width:200px] tw:[height:200px] tw:object-contain tw:[border-radius:12px] tw:[padding-top:15px] tw:[padding-right:15px] tw:[padding-bottom:15px] tw:[padding-left:15px] tw:[margin-top:10px]`,
  ].join(' '),
  // itc
  "servicios-container": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_350px),_1fr))] tw:[row-gap:2.5rem] tw:[column-gap:2.5rem]`,
    String.raw`tw:max-968:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_300px),_1fr))] tw:max-968:[row-gap:2rem] tw:max-968:[column-gap:2rem]`,
  ].join(' '),
  // itc
  "flip-card": [
    String.raw`tw:[background:transparent] tw:[perspective:1200px] tw:cursor-pointer tw:[height:auto] tw:[min-height:480px] tw:[width:100%] tw:[contain:content] tw:[content-visibility:auto] tw:[contain-intrinsic-size:520px]`,
    String.raw`tw:[&:focus-visible]:[outline:3px_solid_color-mix(in_srgb,_var(--colorPrincipal),_#ffffff_40%)] tw:[&:focus-visible]:[outline-offset:3px] tw:[&:focus-visible]:[border-radius:16px]`,
    String.raw`tw:max-968:[min-height:500px]`,
    String.raw`tw:max-768:[min-height:520px] tw:max-768:cursor-default`,
    String.raw`tw:max-480:[min-height:480px]`,
  ].join(' '),
  // itc
  "flip-card-inner": [
    String.raw`tw:relative tw:[width:100%] tw:[height:100%] tw:[transition:all_0.5s_cubic-bezier(0.175,_0.885,_0.32,_1.275)] tw:[transform-style:preserve-3d] tw:[border-radius:16px] tw:[box-shadow:0_6px_14px_rgba(0,_0,_0,_0.15)]`,
    String.raw`tw:[.flip-card.flipped_&]:[transform:rotateY(180deg)] tw:[.flip-card.flipped_&]:[box-shadow:0_12px_24px_rgba(114,_0,_0,_0.15)]`,
    String.raw`tw:max-768:[touch-action:pan-y]`,
    String.raw`tw:[min-height:560px] tw:max-480:[min-height:540px] tw:motion-reduce:[transition:none]`,
  ].join(' '),
  // itc
  "flip-card-front": [
    String.raw`tw:absolute tw:[width:100%] tw:[height:100%] tw:[backface-visibility:hidden] tw:[-webkit-backface-visibility:hidden] tw:[border-radius:16px] tw:overflow-hidden tw:flex tw:flex-col tw:items-center tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:[will-change:transform] tw:[background:#fff] tw:[border:1px_solid_rgba(114,_0,_0,_0.1)] tw:justify-start`,
    String.raw`tw:[&_h2]:[color:var(--colorPrincipal)] tw:[&_h2]:[font-family:var(--titulos)] tw:[&_h2]:[font-size:1.1rem] tw:[&_h2]:font-bold tw:[&_h2]:text-center tw:[&_h2]:[margin-bottom:1rem] tw:[&_h2]:[flex-grow:1] tw:[&_h2]:flex tw:[&_h2]:items-center tw:[&_h2]:justify-center tw:[&_h2]:[min-height:60px] tw:[&_h2]:[padding-top:0] tw:[&_h2]:[padding-right:0.5rem] tw:[&_h2]:[padding-bottom:0] tw:[&_h2]:[padding-left:0.5rem]`,
    String.raw`tw:max-968:[&_h2]:[font-size:1.5rem] tw:max-968:[&_h2]:[min-height:60px] tw:max-968:[&_h2]:[margin-top:1rem] tw:max-968:[&_h2]:[margin-right:0] tw:max-968:[&_h2]:[margin-bottom:1.5rem] tw:max-968:[&_h2]:[margin-left:0]`,
    String.raw`tw:max-768:[padding-top:1.2rem] tw:max-768:[padding-right:1.2rem] tw:max-768:[padding-bottom:1.2rem] tw:max-768:[padding-left:1.2rem]`,
    String.raw`tw:max-768:[&_h2]:[font-size:1.2rem]`,
    String.raw`tw:max-480:[padding-top:1rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem]`,
    String.raw`tw:max-480:[&_h2]:[font-size:1.3rem]`,
    String.raw`tw:[.flip-card.flipped_&]:[visibility:hidden] tw:[.flip-card.flipped_&]:[transition:visibility_0s_0.25s]`,
  ].join(' '),
  // itc
  "flip-card-back": [
    String.raw`tw:absolute tw:[width:100%] tw:[height:100%] tw:[backface-visibility:hidden] tw:[-webkit-backface-visibility:hidden] tw:[border-radius:16px] tw:overflow-hidden tw:flex tw:flex-col tw:items-center tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:[will-change:transform] tw:[background:linear-gradient(135deg,_#fff,_#f9f9f9)] tw:[transform:rotateY(180deg)] tw:text-left tw:[border:1px_solid_rgba(114,_0,_0,_0.1)] tw:justify-start`,
    String.raw`tw:[&_h3]:[margin-top:1rem] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:0.5rem] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:var(--colorPrincipal)] tw:[&_h3]:[font-family:var(--subtitulos)] tw:[&_h3]:[font-size:1.3rem] tw:[&_h3]:font-bold tw:[&_h3]:[border-bottom:2px_solid_var(--colorPrincipal)] tw:[&_h3]:[padding-bottom:0.3rem]`,
    String.raw`tw:[&_p]:[font-size:0.95rem] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[line-height:1.5] tw:[&_p]:[margin-bottom:0.6rem]`,
    String.raw`tw:[&_li]:[font-size:0.95rem] tw:[&_li]:[color:var(--colorTexto)] tw:[&_li]:[line-height:1.5] tw:[&_li]:[margin-bottom:0.6rem] tw:[&_li]:relative tw:[&_li]:[padding-left:1.2rem]`,
    String.raw`tw:[&_ul]:list-none tw:[&_ul]:[padding-left:0]`,
    String.raw`tw:[&_li::before]:[content:"•"] tw:[&_li::before]:[color:var(--colorPrincipal)] tw:[&_li::before]:[font-weight:bold] tw:[&_li::before]:absolute tw:[&_li::before]:[left:0]`,
    String.raw`tw:max-768:[padding-top:1.2rem] tw:max-768:[padding-right:1.2rem] tw:max-768:[padding-bottom:1.2rem] tw:max-768:[padding-left:1.2rem]`,
    String.raw`tw:max-480:[padding-top:1rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem]`,
    String.raw`tw:[visibility:hidden] tw:[.flip-card.flipped_&]:[visibility:visible]`,
  ].join(' '),
  // itc
  "imagen-contenedor": [
    String.raw`tw:[width:100%] tw:[height:500px] tw:flex tw:justify-center tw:items-center tw:[margin-bottom:1.5rem] tw:overflow-hidden tw:[border-radius:12px]`,
    String.raw`tw:[.flip-card-front_&_img]:[width:100%] tw:[.flip-card-front_&_img]:[height:100%] tw:[.flip-card-front_&_img]:object-contain tw:[.flip-card-front_&_img]:[transition:transform_0.3s_ease]`,
    String.raw`tw:max-968:[height:350px]`,
    String.raw`tw:max-768:[height:350px]`,
    String.raw`tw:max-480:[height:350px]`,
  ].join(' '),
  // itc
  "flip-indicator": [
    String.raw`tw:flex tw:items-center tw:[color:var(--colorPrincipal)] tw:[font-size:0.85rem] tw:[opacity:0.8] tw:[margin-top:auto] tw:[padding-top:0.5rem] tw:[padding-right:0] tw:[padding-bottom:0.5rem] tw:[padding-left:0]`,
    String.raw`tw:[&_span]:[margin-right:5px]`,
    String.raw`tw:max-768:[font-size:0.9rem] tw:max-768:[padding-top:0.8rem] tw:max-768:[padding-right:0] tw:max-768:[padding-bottom:0.8rem] tw:max-768:[padding-left:0]`,
    String.raw`tw:max-480:[font-size:0.85rem]`,
  ].join(' '),
  // itc
  "mobile-info-button": [
    String.raw`tw:[margin-top:auto] tw:[width:100%] tw:[padding-top:0.5rem] tw:[padding-right:0] tw:[padding-bottom:0.5rem] tw:[padding-left:0]`,
    String.raw`tw:[&_button]:[background:linear-gradient(135deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[&_button]:[color:white] tw:[&_button]:[border:none] tw:[&_button]:[padding-top:0.8rem] tw:[&_button]:[padding-right:1.5rem] tw:[&_button]:[padding-bottom:0.8rem] tw:[&_button]:[padding-left:1.5rem] tw:[&_button]:[border-radius:8px] tw:[&_button]:[font-family:var(--subtitulos)] tw:[&_button]:font-semibold tw:[&_button]:[width:100%] tw:[&_button]:cursor-pointer tw:[&_button]:[transition:var(--transition)] tw:[&_button]:[box-shadow:0_4px_10px_rgba(0,_0,_0,_0.15)]`,
    String.raw`tw:[&_button:hover]:[background:linear-gradient(135deg,_var(--colorSecundario),_var(--colorPrincipal))] tw:[&_button:hover]:[transform:translateY(-2px)] tw:[&_button:hover]:[box-shadow:0_6px_14px_rgba(0,_0,_0,_0.2)]`,
    String.raw`tw:max-768:[&_button]:[padding-top:1rem] tw:max-768:[&_button]:[padding-right:1.5rem] tw:max-768:[&_button]:[padding-bottom:1rem] tw:max-768:[&_button]:[padding-left:1.5rem] tw:max-768:[&_button]:[font-size:1rem]`,
    String.raw`tw:max-480:[&_button]:[padding-top:0.9rem] tw:max-480:[&_button]:[padding-right:1.2rem] tw:max-480:[&_button]:[padding-bottom:0.9rem] tw:max-480:[&_button]:[padding-left:1.2rem] tw:max-480:[&_button]:[font-size:0.95rem]`,
  ].join(' '),
  // itc
  "contenido-scroll": [
    String.raw`tw:[flex-grow:1] tw:[min-height:0] tw:[max-height:360px] tw:overflow-y-auto tw:[width:100%] tw:[padding-right:0.5rem] tw:[margin-bottom:1rem]`,
    String.raw`tw:[&::-webkit-scrollbar]:[width:6px]`,
    String.raw`tw:[&::-webkit-scrollbar-thumb]:[background:var(--colorPrincipal)] tw:[&::-webkit-scrollbar-thumb]:[border-radius:4px]`,
    String.raw`tw:[&::-webkit-scrollbar-thumb:hover]:[background:var(--colorSecundario)]`,
  ].join(' '),
  // itc
  "boton-detalles": [
    String.raw`tw:[margin-top:auto] tw:flex tw:justify-center tw:[padding-top:1rem] tw:[width:100%]`,
    String.raw`tw:[&_button]:[background:linear-gradient(135deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[&_button]:[color:#fff] tw:[&_button]:[font-family:var(--subtitulos)] tw:[&_button]:[font-size:1rem] tw:[&_button]:font-semibold tw:[&_button]:[padding-top:0.8rem] tw:[&_button]:[padding-right:1.8rem] tw:[&_button]:[padding-bottom:0.8rem] tw:[&_button]:[padding-left:1.8rem] tw:[&_button]:[border:none] tw:[&_button]:[border-radius:8px] tw:[&_button]:cursor-pointer tw:[&_button]:[transition:var(--transition)] tw:[&_button]:[box-shadow:0_4px_10px_rgba(0,_0,_0,_0.15)] tw:[&_button]:flex tw:[&_button]:items-center`,
    String.raw`tw:[&_button_span]:[margin-left:8px]`,
    String.raw`tw:[&_button:hover]:[background:linear-gradient(135deg,_var(--colorSecundario),_var(--colorPrincipal))] tw:[&_button:hover]:[transform:translateY(-2px)] tw:[&_button:hover]:[box-shadow:0_6px_14px_rgba(0,_0,_0,_0.2)]`,
    String.raw`tw:[&_button:active]:[transform:translateY(0)]`,
    String.raw`tw:max-480:[&_button]:[padding-top:0.8rem] tw:max-480:[&_button]:[padding-right:1.6rem] tw:max-480:[&_button]:[padding-bottom:0.8rem] tw:max-480:[&_button]:[padding-left:1.6rem] tw:max-480:[&_button]:[font-size:0.95rem]`,
  ].join(' '),
  // itc
  "no-data-container": [
    String.raw`tw:text-center tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[color:var(--colorTexto)] tw:[margin-top:100px]`,
  ].join(' '),
  // itc
  "reload-button": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:0.8rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.8rem] tw:[padding-left:1.5rem] tw:[border-radius:8px] tw:cursor-pointer tw:[margin-top:1rem] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // nosotros
  "nosotros-container": [
    String.raw`tw:[padding-top:calc(var(--site-header-height,_100px)_+_2rem)] tw:[padding-right:clamp(1rem,_4vw,_2rem)] tw:[padding-bottom:4rem] tw:[padding-left:clamp(1rem,_4vw,_2rem)] tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // nosotros
  "nosotros-section": [
    String.raw`tw:block`,
  ].join(' '),
  // nosotros
  "panel": [
    String.raw`tw:overflow-hidden`,
  ].join(' '),
  // nosotros
  "panel-nosotros": [
    String.raw``,
  ].join(' '),
  // nosotros
  "nosotros-grid": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[align-items:start]`,
    String.raw`tw:max-900:[grid-template-columns:1fr] tw:max-900:text-center`,
  ].join(' '),
  // nosotros
  "nosotros-texto": [
    String.raw`tw:[&_h1]:[font-size:2.8rem] tw:[&_h1]:[color:var(--colorPrincipal)] tw:[&_h1]:[margin-bottom:1rem] tw:[&_h1]:[font-family:var(--titulos)] tw:[&_h1]:relative`,
    String.raw`tw:[&_h1::after]:[content:""] tw:[&_h1::after]:block tw:[&_h1::after]:[width:80px] tw:[&_h1::after]:[height:4px] tw:[&_h1::after]:[background-color:var(--colorSecundario)] tw:[&_h1::after]:[margin-top:0.6rem] tw:[&_h1::after]:mx-auto tw:[&_h1::after]:[border-radius:2px]`,
    String.raw`tw:[&_p]:[font-size:1.05rem] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[line-height:1.8] tw:[&_p]:text-justify`,
  ].join(' '),
  // nosotros
  "resaltado": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:font-semibold`,
  ].join(' '),
  // nosotros
  "nosotros-imagen": [
    String.raw`tw:flex tw:justify-center`,
    String.raw`tw:[&_img]:[width:100%] tw:[&_img]:[height:100%] tw:[&_img]:object-cover tw:[&_img]:[border-radius:10px] tw:[&_img]:[transition:transform_var(--hover-ms)_var(--ease-spring)] tw:[&_img]:[will-change:transform]`,
    String.raw`tw:[&_img:hover]:[transform:scale(1.03)]`,
  ].join(' '),
  // nosotros
  "image-fallback": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:[background:var(--colorFondo)] tw:flex tw:items-center tw:justify-center tw:[border-radius:10px] tw:[min-height:300px]`,
  ].join(' '),
  // nosotros
  "nuestro-trabajo": [
    String.raw`tw:[margin-top:1rem] tw:[padding-top:1.5rem] tw:[padding-right:0] tw:[padding-bottom:2rem] tw:[padding-left:0]`,
    String.raw`tw:[&_h2]:[font-size:1.6rem] tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:[margin-bottom:1rem]`,
  ].join(' '),
  // nosotros
  "nosotros-lista": [
    String.raw`tw:list-none tw:[padding-left:1.6rem] tw:[margin-bottom:1rem]`,
    String.raw`tw:[&_li]:[margin-bottom:0.9rem] tw:[&_li]:relative tw:[&_li]:[font-size:1.02rem]`,
    String.raw`tw:[&_li::before]:[content:"✔"] tw:[&_li::before]:[color:var(--colorPrincipal)] tw:[&_li::before]:absolute tw:[&_li::before]:[left:-1.6rem] tw:[&_li::before]:[font-size:1rem]`,
  ].join(' '),
  // nosotros
  "mensaje-final": [
    String.raw`tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:1rem]`,
  ].join(' '),
  // nosotros
  "panel-mv": [
    String.raw`tw:[padding-top:2rem]`,
  ].join(' '),
  // nosotros
  "panel-title": [
    String.raw`tw:[font-size:2.2rem] tw:[color:var(--colorPrincipal)] tw:text-center tw:[margin-bottom:2rem] tw:[font-family:var(--titulos)]`,
    String.raw`tw:max-900:[margin-top:0] tw:max-900:[margin-bottom:1rem]`,
  ].join(' '),
  // nosotros
  "valores-container": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(3,_minmax(0,_1fr))] tw:[row-gap:1.5rem] tw:[column-gap:1.5rem]`,
    String.raw`tw:max-900:[grid-template-columns:1fr] tw:max-900:[row-gap:1rem] tw:max-900:[column-gap:1rem]`,
  ].join(' '),
  // nosotros
  "valor-card": [
    String.raw`tw:[background:#fff] tw:[padding-top:1.8rem] tw:[padding-right:1.8rem] tw:[padding-bottom:1.8rem] tw:[padding-left:1.8rem] tw:[border-radius:15px] tw:[box-shadow:0_8px_20px_rgba(0,0,0,0.06)] tw:[border:1px_solid_#f2f2f2] tw:[transition:transform_var(--hover-ms)_var(--ease-spring),_box-shadow_0.3s_ease] tw:[will-change:transform]`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)] tw:[&:hover]:[box-shadow:0_14px_35px_rgba(0,0,0,0.12)]`,
    String.raw`tw:[&_h3]:[font-size:1.5rem] tw:[&_h3]:[color:var(--colorPrincipal)] tw:[&_h3]:[margin-bottom:1rem] tw:[&_h3]:[font-family:var(--titulos)] tw:[&_h3]:[border-bottom:3px_solid_var(--colorSecundario)] tw:[&_h3]:[padding-bottom:0.5rem]`,
    String.raw`tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[line-height:1.7] tw:[&_p]:[font-size:1rem] tw:[&_p]:text-justify`,
    String.raw`tw:[&_li]:[color:var(--colorTexto)] tw:[&_li]:[line-height:1.7] tw:[&_li]:[font-size:1rem] tw:[&_li]:text-justify tw:[&_li]:[margin-bottom:0.5rem]`,
    String.raw`tw:[&_ul]:[padding-left:1.2rem]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "vision-section": [
    String.raw`tw:[.valor-card-vision_&]:flex tw:[.valor-card-vision_&]:flex-col tw:[.valor-card-vision_&]:[row-gap:1rem] tw:[.valor-card-vision_&]:[column-gap:1rem]`,
  ].join(' '),
  // nosotros
  "vision-parrafo": [
    String.raw`tw:[.valor-card-vision_&]:[color:#444] tw:[.valor-card-vision_&]:[line-height:1.7] tw:[.valor-card-vision_&]:[font-size:1rem] tw:[.valor-card-vision_&]:text-justify tw:[.valor-card-vision_&]:[padding-left:.5rem] tw:[.valor-card-vision_&]:[border-left:4px_solid_#720000]`,
  ].join(' '),
  // nosotros
  "panel-comite": [
    String.raw`tw:[padding-top:2rem]`,
  ].join(' '),
  // nosotros
  "comite-title": [
    String.raw`tw:[font-size:2.5rem] tw:[color:var(--colorPrincipal)] tw:text-center tw:[margin-bottom:2rem] tw:[font-family:var(--titulos)] tw:relative`,
    String.raw`tw:[&::after]:[content:""] tw:[&::after]:block tw:[&::after]:[width:120px] tw:[&::after]:[height:4px] tw:[&::after]:[background-color:var(--colorSecundario)] tw:[&::after]:[margin-top:.5rem] tw:[&::after]:[margin-right:auto] tw:[&::after]:[margin-bottom:0] tw:[&::after]:[margin-left:auto] tw:[&::after]:[border-radius:2px]`,
    String.raw`tw:max-1024:[font-size:2.2rem]`,
    String.raw`tw:max-768:[font-size:2rem]`,
    String.raw`tw:max-480:[font-size:1.8rem]`,
  ].join(' '),
  // nosotros
  "team-hero-container": [
    String.raw`tw:[margin-top:2rem] tw:[margin-right:0] tw:[margin-bottom:4rem] tw:[margin-left:0] tw:[border-radius:var(--radius-xxl)] tw:overflow-hidden tw:cursor-pointer tw:relative tw:[transition:transform_var(--hover-ms)_var(--ease-spring)] tw:[will-change:transform]`,
    String.raw`tw:[&:hover]:[transform:translateY(-5px)] tw:[&:hover]:[box-shadow:0_20px_40px_rgba(0,0,0,0.15)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "team-hero-image": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:object-contain tw:object-center`,
    String.raw`tw:max-1024:[height:500px]`,
    String.raw`tw:max-768:[height:400px]`,
    String.raw`tw:max-480:[height:300px]`,
  ].join(' '),
  // nosotros
  "panel-directorio": [
    String.raw`tw:[padding-top:2rem]`,
  ].join(' '),
  // nosotros
  "directorio-title": [
    String.raw`tw:[font-size:2.5rem] tw:[color:var(--colorPrincipal)] tw:text-center tw:[margin-top:-35px] tw:[margin-right:0] tw:[margin-bottom:3rem] tw:[margin-left:0] tw:[font-family:var(--titulos)] tw:relative`,
    String.raw`tw:[&::after]:[content:""] tw:[&::after]:block tw:[&::after]:[width:100px] tw:[&::after]:[height:4px] tw:[&::after]:[background-color:var(--colorSecundario)] tw:[&::after]:[margin-top:.5rem] tw:[&::after]:[margin-right:auto] tw:[&::after]:[margin-bottom:0] tw:[&::after]:[margin-left:auto] tw:[&::after]:[border-radius:2px]`,
    String.raw`tw:max-1024:[font-size:2.2rem]`,
    String.raw`tw:max-768:[font-size:2rem]`,
    String.raw`tw:max-480:[font-size:1.8rem]`,
  ].join(' '),
  // nosotros
  "piramide-organigrama": [
    String.raw`tw:flex tw:flex-col tw:items-center tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[padding-top:3rem] tw:[padding-right:0] tw:[padding-bottom:3rem] tw:[padding-left:0] tw:relative tw:[margin-top:-35px]`,
    String.raw`tw:max-768:[row-gap:1.5rem] tw:max-768:[column-gap:1.5rem]`,
  ].join(' '),
  // nosotros
  "piramide-nivel": [
    String.raw`tw:flex tw:justify-center tw:[row-gap:1.5rem] tw:[column-gap:1.5rem] tw:[width:100%]`,
    String.raw`tw:max-768:flex-wrap tw:max-768:[row-gap:1rem] tw:max-768:[column-gap:1rem]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-0": [
    String.raw`tw:[transform:scale(1.12)] tw:[z-index:10] tw:[margin-bottom:20px]`,
    String.raw`tw:max-768:[margin-bottom:14px]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-1": [
    String.raw`tw:[transform:scale(1.06)] tw:[z-index:9] tw:[margin-top:20px]`,
    String.raw`tw:max-768:[margin-top:14px]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-2": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-3": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-4": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-5": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-6": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-7": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-8": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-9": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-10": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-nivel-11": [
    String.raw`tw:[transform:scale(1)] tw:[z-index:8]`,
  ].join(' '),
  // nosotros
  "piramide-persona": [
    String.raw`tw:[appearance:none] tw:[background:transparent] tw:[border:none] tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[text-align:inherit] tw:[flex:1] tw:[max-width:300px] tw:[min-width:240px] tw:cursor-pointer`,
    String.raw`tw:max-1024:[max-width:280px] tw:max-1024:[min-width:220px]`,
    String.raw`tw:max-768:[max-width:250px] tw:max-768:[min-width:200px] tw:max-768:[flex:0_1_calc(50%_-_1rem)]`,
    String.raw`tw:max-768:[.piramide-nivel-0_&]:[flex:0_1_100%] tw:max-768:[.piramide-nivel-0_&]:[max-width:300px]`,
    String.raw`tw:max-768:[.piramide-nivel-1_&]:[flex:0_1_calc(50%_-_1rem)]`,
    String.raw`tw:max-480:[flex:0_1_100%] tw:max-480:[max-width:100%]`,
  ].join(' '),
  // nosotros
  "piramide-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-md)] tw:[transition:transform_var(--hover-ms)_var(--ease-spring)] tw:[border:1px_solid_var(--border)] tw:[height:100%] tw:relative tw:[will-change:transform]`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)_scale(1.02)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "piramide-image-container": [
    String.raw`tw:[width:100%] tw:[height:240px] tw:overflow-hidden tw:flex tw:justify-center tw:items-center tw:[background:linear-gradient(135deg,_#f8f8f8_0%,_#e8e8e8_100%)] tw:relative tw:[transition:background_0.4s_ease]`,
    String.raw`tw:[.piramide-card:hover_&]:[background:linear-gradient(135deg,_#f0f0f0_0%,_#e0e0e0_100%)]`,
    String.raw`tw:max-480:[height:220px]`,
  ].join(' '),
  // nosotros
  "piramide-image": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:object-contain tw:object-center tw:[transition:transform_var(--hover-ms)_var(--ease-spring)] tw:[will-change:transform]`,
    String.raw`tw:[.piramide-card:hover_&]:[transform:scale(1.1)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "piramide-info": [
    String.raw`tw:[padding-top:1.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1.5rem] tw:[padding-left:1.5rem] tw:text-center tw:[background:var(--bg-card)] tw:[transition:background_0.3s_ease]`,
    String.raw`tw:[.piramide-card:hover_&]:[background:linear-gradient(to_bottom,_#ffffff,_#fafafa)]`,
  ].join(' '),
  // nosotros
  "piramide-nombre": [
    String.raw`tw:[font-size:1.2rem] tw:[color:var(--colorTitulo)] tw:[margin-bottom:.5rem] tw:[font-family:var(--titulos)] tw:font-bold tw:[line-height:1.3]`,
  ].join(' '),
  // nosotros
  "piramide-cargo": [
    String.raw`tw:[font-size:1rem] tw:[color:var(--colorPrincipal)] tw:font-semibold tw:[line-height:1.4]`,
  ].join(' '),
  // nosotros
  "modal-overlay": [
    String.raw`tw:fixed tw:[top:0] tw:[right:0] tw:[bottom:0] tw:[left:0] tw:[background:rgba(0,_0,_0,_.75)] tw:grid tw:justify-center tw:items-center tw:[z-index:1000] tw:[padding-top:1rem] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem] tw:[backdrop-filter:blur(5px)] tw:[place-items:center] tw:overflow-hidden`,
  ].join(' '),
  // nosotros
  "modal-content": [
    String.raw`tw:[background:#fff] tw:[border-radius:20px] tw:[max-width:90vw] tw:[max-height:92vh] tw:relative tw:[box-shadow:0_25px_50px_rgba(0,_0,_0,_.3)] tw:[animation:cmic-modalAppear_0.25s_ease-out] tw:[width:min(1000px,_96vw)] tw:overflow-hidden tw:flex tw:flex-col`,
    String.raw`tw:max-480:[width:98vw] tw:max-480:[max-height:96vh]`,
  ].join(' '),
  // nosotros
  "modal-close": [
    String.raw`tw:absolute tw:[top:15px] tw:[right:20px] tw:[background:none] tw:[border:none] tw:[font-size:2.5rem] tw:[color:var(--colorPrincipal)] tw:cursor-pointer tw:[z-index:10] tw:[width:40px] tw:[height:40px] tw:flex tw:items-center tw:justify-center tw:[border-radius:50%] tw:[transition:transform_var(--hover-ms)_var(--ease-spring)]`,
    String.raw`tw:[&:hover]:[transform:scale(1.06)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "modal-comite": [
    String.raw`tw:[max-width:95vw] tw:[max-height:95vh]`,
  ].join(' '),
  // nosotros
  "modal-image-container": [
    String.raw`tw:[.modal-comite_&]:[width:100%] tw:[.modal-comite_&]:[height:80vh] tw:[.modal-comite_&]:flex tw:[.modal-comite_&]:justify-center tw:[.modal-comite_&]:items-center tw:[.modal-comite_&]:[padding-top:2rem] tw:[.modal-comite_&]:[padding-right:2rem] tw:[.modal-comite_&]:[padding-bottom:2rem] tw:[.modal-comite_&]:[padding-left:2rem] tw:[.modal-comite_&]:[background:#f8f8f8]`,
    String.raw`tw:[.modal-persona_&]:[width:100%] tw:[.modal-persona_&]:[height:350px] tw:[.modal-persona_&]:[border-radius:15px] tw:[.modal-persona_&]:overflow-hidden tw:[.modal-persona_&]:flex tw:[.modal-persona_&]:justify-center tw:[.modal-persona_&]:items-center`,
    String.raw`tw:max-768:[.modal-persona_&]:[height:300px] tw:max-768:[.modal-persona_&]:[max-width:300px] tw:max-768:[.modal-persona_&]:[margin-top:0] tw:max-768:[.modal-persona_&]:[margin-right:auto] tw:max-768:[.modal-persona_&]:[margin-bottom:0] tw:max-768:[.modal-persona_&]:[margin-left:auto]`,
  ].join(' '),
  // nosotros
  "modal-image": [
    String.raw`tw:[.modal-comite_&]:[max-width:100%] tw:[.modal-comite_&]:[max-height:100%] tw:[.modal-comite_&]:object-contain tw:[.modal-comite_&]:[border-radius:10px]`,
    String.raw`tw:[.modal-persona_&]:[width:100%] tw:[.modal-persona_&]:[height:100%] tw:[.modal-persona_&]:object-contain tw:[.modal-persona_&]:object-center`,
    String.raw`tw:[width:100%] tw:[height:auto] tw:[max-height:calc(90vh_-_100px)] tw:object-contain tw:block`,
  ].join(' '),
  // nosotros
  "modal-persona": [
    String.raw`tw:[max-width:800px] tw:[width:90vw]`,
  ].join(' '),
  // nosotros
  "modal-persona-grid": [
    String.raw`tw:grid tw:[grid-template-columns:300px_1fr] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:text-center`,
  ].join(' '),
  // nosotros
  "modal-persona-info": [
    String.raw`tw:flex tw:flex-col tw:justify-center`,
  ].join(' '),
  // nosotros
  "modal-nombre": [
    String.raw`tw:[font-size:2rem] tw:[color:var(--colorTitulo)] tw:[margin-bottom:.5rem] tw:[font-family:var(--titulos)] tw:font-bold`,
  ].join(' '),
  // nosotros
  "modal-cargo": [
    String.raw`tw:[font-size:1.3rem] tw:[color:var(--colorPrincipal)] tw:[margin-bottom:2rem] tw:font-semibold tw:[border-bottom:3px_solid_var(--colorSecundario)] tw:[padding-bottom:.5rem]`,
  ].join(' '),
  // nosotros
  "modal-frase": [
    String.raw`tw:[margin-top:1rem]`,
    String.raw`tw:[&_blockquote]:[font-size:1.1rem] tw:[&_blockquote]:[font-style:italic] tw:[&_blockquote]:[color:var(--colorTexto)] tw:[&_blockquote]:[line-height:1.6] tw:[&_blockquote]:[border-left:4px_solid_var(--colorPrincipal)] tw:[&_blockquote]:[padding-left:1rem] tw:[&_blockquote]:[margin-top:0] tw:[&_blockquote]:[margin-right:0] tw:[&_blockquote]:[margin-bottom:0] tw:[&_blockquote]:[margin-left:0] tw:[&_blockquote]:[quotes:"«"_"»"_"‹"_"›"]`,
    String.raw`tw:[&_blockquote::before]:[content:open-quote]`,
    String.raw`tw:[&_blockquote::after]:[content:close-quote]`,
  ].join(' '),
  // nosotros
  "modal-actions": [
    String.raw`tw:[padding-top:1rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:text-center tw:[border-top:1px_solid_#f0f0f0]`,
  ].join(' '),
  // nosotros
  "btn-cerrar": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[border:none] tw:[padding-top:.8rem] tw:[padding-right:2rem] tw:[padding-bottom:.8rem] tw:[padding-left:2rem] tw:[border-radius:8px] tw:[font-size:1rem] tw:cursor-pointer tw:[transition:transform_var(--hover-ms)_var(--ease-spring)] tw:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-3px)]`,
    String.raw`tw:motion-reduce:[animation:none]! tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
  ].join(' '),
  // nosotros
  "directorio-loading": [
    String.raw`tw:text-center tw:[padding-top:4rem] tw:[padding-right:4rem] tw:[padding-bottom:4rem] tw:[padding-left:4rem] tw:[color:var(--colorTexto)] tw:[font-size:1.1rem]`,
  ].join(' '),
  // nosotros
  "image-click-hint": [
    String.raw`tw:max-480:[bottom:10px] tw:max-480:[right:10px] tw:max-480:[font-size:.8rem] tw:max-480:[padding-top:6px] tw:max-480:[padding-right:12px] tw:max-480:[padding-bottom:6px] tw:max-480:[padding-left:12px]`,
  ].join(' '),
  // conveniosBuscador
  "page-convenios": [
    String.raw`tw:[background:var(--colorFondo)] tw:[min-height:100dvh] tw:[padding-bottom:3rem]`,
  ].join(' '),
  // conveniosBuscador
  "convenios-responsive": [
    String.raw`tw:max-1024:text-center tw:max-1024:[&_*]:text-center tw:max-1024:[&_.card__body]:items-center tw:max-1024:[&_.card__cta]:w-full tw:max-1024:[&_.convenios__filters]:justify-center tw:max-1024:[&_.convenios__actions]:items-center`,
    String.raw`tw:max-1024:[&_.card__media]:[height:260px] tw:max-1024:[&_.card__media]:[padding:1rem] tw:max-1024:[&_.card__media_img]:[width:100%] tw:max-1024:[&_.card__media_img]:[height:100%] tw:max-1024:[&_.card__media_img]:[max-width:360px] tw:max-1024:[&_.card__media_img]:[max-height:225px] tw:max-1024:[&_.card__media_img]:object-contain`,
    String.raw`tw:max-1024:[&_.details__logo]:[max-width:100%] tw:max-1024:[&_.details__logo]:[width:340px] tw:max-1024:[&_.details__logo]:[max-height:200px] tw:max-1024:[&_.details__logo]:[height:auto] tw:max-1024:[&_.miniTable_th]:text-center tw:max-1024:[&_.miniTable_td]:text-center tw:max-1024:[&_.ctaRow]:justify-center`,
    String.raw`tw:max-1024:[&_.card__cta]:justify-center tw:max-1024:[&_.details]:text-center tw:max-1024:[&_.details_*]:text-center tw:max-1024:[&_.details__logo]:[max-height:240px] tw:max-1024:[&_.details__logo]:[width:min(100%,380px)] tw:max-1024:[&_.details__section]:[margin-inline:auto] tw:max-1024:[&_.ctaRow]:justify-center tw:max-1024:[&_.convenios__search_input]:text-center`,
  ].join(' '),
  "convenios__hero": [
    String.raw`tw:[width:min(1100px,_94vw)] tw:[margin-top:100px] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:text-center tw:[padding-top:2.2rem] tw:[padding-right:0] tw:[padding-bottom:1.2rem] tw:[padding-left:0]`,
    String.raw``,
    String.raw`tw:max-768:[margin-top:80px] tw:max-768:[padding-top:1.5rem] tw:max-768:[padding-right:0] tw:max-768:[padding-bottom:1rem] tw:max-768:[padding-left:0]`,
    String.raw`tw:[margin-top:var(--site-header-height)]!`,
  ].join(' '),
  // conveniosBuscador
  "convenios__title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[color:var(--colorTitulo)] tw:font-extrabold tw:[letter-spacing:.2px] tw:[font-size:clamp(1.8rem,_2.6vw_+_1rem,_2.8rem)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:.4rem] tw:[margin-left:0]`,
    String.raw`tw:max-768:[font-size:2rem]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__subtitle": [
    String.raw`tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:[opacity:0.9] tw:[max-width:760px] tw:[margin-top:0.25rem] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[line-height:1.6] tw:[font-size:1.1rem]`,
    String.raw`tw:max-768:[font-size:1rem]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__actions": [
    String.raw`tw:grid tw:[row-gap:14px] tw:[column-gap:14px] tw:[margin-top:1.25rem] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[width:min(1100px,_94vw)]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__search": [
    String.raw`tw:flex tw:justify-center`,
    String.raw`tw:[&_input]:[width:min(680px,_92vw)] tw:[&_input]:[appearance:none] tw:[&_input]:[border:1px_solid_var(--input-bd)] tw:[&_input]:[background:var(--input-bg)] tw:[&_input]:[border-radius:999px] tw:[&_input]:[padding-top:0.85rem] tw:[&_input]:[padding-right:1.1rem] tw:[&_input]:[padding-bottom:0.85rem] tw:[&_input]:[padding-left:1.1rem] tw:[&_input]:[font-size:1rem] tw:[&_input]:[outline:none] tw:[&_input]:[transition:var(--transition)] tw:[&_input]:[box-shadow:0_2px_10px_rgba(0,0,0,.04)] tw:[&_input]:[font-family:var(--texto)]`,
    String.raw`tw:[&_input:focus]:[border-top-color:var(--colorPrincipal)] tw:[&_input:focus]:[border-right-color:var(--colorPrincipal)] tw:[&_input:focus]:[border-bottom-color:var(--colorPrincipal)] tw:[&_input:focus]:[border-left-color:var(--colorPrincipal)] tw:[&_input:focus]:[box-shadow:0_8px_22px_rgba(114,_0,_0,_0.12)]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__filters": [
    String.raw`tw:flex tw:flex-wrap tw:[row-gap:8px] tw:[column-gap:8px] tw:justify-center tw:[margin-top:6px]`,
    String.raw`tw:max-480:[row-gap:6px] tw:max-480:[column-gap:6px]`,
  ].join(' '),
  // conveniosBuscador
  "chip": [
    String.raw`tw:[padding-top:.5rem] tw:[padding-right:.9rem] tw:[padding-bottom:.5rem] tw:[padding-left:.9rem] tw:[border-radius:999px] tw:[border:1px_solid_var(--chip-bd)] tw:[background:var(--chip-bg)] tw:[color:var(--chip-fg)] tw:[font-size:.95rem] tw:[line-height:1] tw:cursor-pointer tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:font-medium`,
    String.raw`tw:[&:hover]:[transform:translateY(-1px)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:max-480:[padding-top:0.4rem] tw:max-480:[padding-right:0.8rem] tw:max-480:[padding-bottom:0.4rem] tw:max-480:[padding-left:0.8rem] tw:max-480:[font-size:0.9rem]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[animation:none]!`,
  ].join(' '),
  // conveniosBuscador
  "chip--active": [
    String.raw`tw:[&.chip--active]:[background:var(--chip-active)] tw:[&.chip--active]:[border-top-color:var(--colorPrincipal)] tw:[&.chip--active]:[border-right-color:var(--colorPrincipal)] tw:[&.chip--active]:[border-bottom-color:var(--colorPrincipal)] tw:[&.chip--active]:[border-left-color:var(--colorPrincipal)] tw:[&.chip--active]:[color:#fff]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__count": [
    String.raw`tw:[margin-top:.6rem] tw:[color:var(--colorTexto)] tw:[opacity:0.7] tw:[font-size:.95rem] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "convenios__grid": [
    String.raw`tw:[width:min(1200px,_96vw)] tw:[margin-top:1.2rem] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:grid tw:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_320px),_1fr))] tw:[row-gap:1.8rem] tw:[column-gap:1.8rem] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:1.2rem] tw:max-768:[column-gap:1.2rem]`,
  ].join(' '),
  // conveniosBuscador
  "card": [
    String.raw`tw:[background:var(--card-bg)] tw:[border:1px_solid_var(--card-bd)] tw:[border-radius:var(--radius)] tw:[box-shadow:var(--card-shadow)] tw:overflow-hidden tw:flex tw:flex-col tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-4px)] tw:[&:hover]:[box-shadow:0_16px_36px_rgba(0,0,0,.10)] tw:[&:hover]:[border-top-color:rgba(114,_0,_0,_0.1)] tw:[&:hover]:[border-right-color:rgba(114,_0,_0,_0.1)] tw:[&:hover]:[border-bottom-color:rgba(114,_0,_0,_0.1)] tw:[&:hover]:[border-left-color:rgba(114,_0,_0,_0.1)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[animation:none]!`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // conveniosBuscador
  "card__media": [
    String.raw`tw:[height:180px] tw:flex tw:items-center tw:justify-center tw:[background:#fff] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[border-bottom:1px_solid_var(--card-bd)]`,
    String.raw`tw:[&_img]:[max-height:180px] tw:[&_img]:[max-width:240px] tw:[&_img]:[width:auto] tw:[&_img]:[height:auto] tw:[&_img]:object-contain tw:[&_img]:[transition:var(--transition)]`,
    String.raw`tw:[.card:hover_&_img]:[transform:scale(1.05)]`,
    String.raw`tw:max-768:[height:160px] tw:max-768:[padding-top:1.5rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:1.5rem] tw:max-768:[padding-left:1.5rem]`,
    String.raw`tw:max-768:[&_img]:[max-height:100px] tw:max-768:[&_img]:[max-width:200px]`,
    String.raw`tw:max-480:[height:140px] tw:max-480:[padding-top:1.2rem] tw:max-480:[padding-right:1.2rem] tw:max-480:[padding-bottom:1.2rem] tw:max-480:[padding-left:1.2rem]`,
    String.raw`tw:max-480:[&_img]:[max-height:80px] tw:max-480:[&_img]:[max-width:180px]`,
    String.raw`tw:motion-reduce:[&_img]:[transition:none]! tw:motion-reduce:[&_img]:[animation:none]!`,
    String.raw`tw:motion-reduce:[.card:hover_&_img]:[transform:none]!`,
  ].join(' '),
  // conveniosBuscador
  "card__placeholder": [
    String.raw`tw:[width:100px] tw:[height:100px] tw:[border-radius:12px] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:flex tw:items-center tw:justify-center tw:[font-size:2.2rem] tw:[font-weight:bold] tw:[font-family:var(--titulos)]`,
  ].join(' '),
  // conveniosBuscador
  "card__body": [
    String.raw`tw:[padding-top:1.8rem] tw:[padding-right:1.8rem] tw:[padding-bottom:1.8rem] tw:[padding-left:1.8rem] tw:[flex:1] tw:flex tw:flex-col`,
    String.raw`tw:max-480:[padding-top:1.2rem] tw:max-480:[padding-right:1.2rem] tw:max-480:[padding-bottom:1.2rem] tw:max-480:[padding-left:1.2rem]`,
  ].join(' '),
  // conveniosBuscador
  "badge": [
    String.raw`tw:inline-block tw:[padding-top:.25rem] tw:[padding-right:.75rem] tw:[padding-bottom:.25rem] tw:[padding-left:.75rem] tw:[border-radius:6px] tw:[font-size:.8rem] tw:font-semibold tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[margin-bottom:1rem] tw:[width:fit-content] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "card__title": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:.75rem] tw:[margin-left:0] tw:[font-size:1.3rem] tw:[color:var(--colorTitulo)] tw:font-bold tw:[font-family:var(--subtitulos)] tw:[line-height:1.3]`,
  ].join(' '),
  // conveniosBuscador
  "card__resume": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:1.5rem] tw:[margin-left:0] tw:[color:var(--colorTexto)] tw:[font-size:.95rem] tw:[line-height:1.5] tw:[flex:1] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "card__cta": [
    String.raw`tw:[margin-top:auto]`,
  ].join(' '),
  // conveniosBuscador
  "btn--primary": [
    String.raw`tw:[&.btn--primary]:[background:var(--colorPrincipal)] tw:[&.btn--primary]:[color:#fff] tw:[&.btn--primary]:[box-shadow:0_6px_16px_rgba(114,_0,_0,_0.2)] tw:[&.btn--primary]:[width:100%]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_12px_26px_rgba(114,_0,_0,_0.28)]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]!`,
  ].join(' '),
  // conveniosBuscador
  "convenios__empty": [
    String.raw`tw:[grid-column:1_/_-1] tw:[background:#fff] tw:[border:1px_dashed_rgba(0,0,0,.15)] tw:[color:var(--colorTexto)] tw:[opacity:0.7] tw:[border-radius:var(--radius)] tw:[padding-top:3rem] tw:[padding-right:2rem] tw:[padding-bottom:3rem] tw:[padding-left:2rem] tw:text-center tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "skeleton": [
    String.raw`tw:[grid-column:1_/_-1] tw:[background:linear-gradient(90deg,_#f4f4f4_0,_#f9f9f9_40%,_#f4f4f4_100%)] tw:[background-size:600%_100%] tw:[animation:cmic-sk_1.1s_infinite_linear] tw:[height:56px] tw:[border-radius:12px] tw:[color:#888] tw:flex tw:items-center tw:justify-center tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "modal": [
    String.raw`tw:fixed tw:[top:0] tw:[left:0] tw:[right:0] tw:[bottom:0] tw:[z-index:1000] tw:flex tw:items-center tw:justify-center tw:[padding-top:1rem] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem]`,
  ].join(' '),
  // conveniosBuscador
  "modal__backdrop": [
    String.raw`tw:absolute tw:[top:0] tw:[left:0] tw:[right:0] tw:[bottom:0] tw:[background:rgba(0,_0,_0,_0.5)] tw:[backdrop-filter:blur(4px)]`,
  ].join(' '),
  // conveniosBuscador
  "modal__panel": [
    String.raw`tw:relative tw:[background:var(--card-bg)] tw:[border-radius:var(--radius-lg)] tw:[box-shadow:0_30px_60px_rgba(0,0,0,.25)] tw:[max-width:700px] tw:[width:100%] tw:[max-height:90vh] tw:overflow-y-auto tw:[z-index:1001] tw:[animation:cmic-zoomIn_.18s_ease-out]`,
    String.raw`tw:max-768:[margin-top:1rem] tw:max-768:[margin-right:1rem] tw:max-768:[margin-bottom:1rem] tw:max-768:[margin-left:1rem] tw:max-768:[max-width:calc(100vw_-_2rem)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[animation:none]!`,
  ].join(' '),
  // conveniosBuscador
  "modal__close": [
    String.raw`tw:absolute tw:[top:1rem] tw:[right:1rem] tw:[background:var(--colorPrincipal)] tw:[border:none] tw:[color:white] tw:[font-size:1.5rem] tw:cursor-pointer tw:[width:40px] tw:[height:40px] tw:[border-radius:50%] tw:flex tw:items-center tw:justify-center tw:[transition:var(--transition)] tw:[z-index:1002] tw:[box-shadow:0_8px_20px_rgba(0,0,0,.25)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:scale(1.1)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[animation:none]!`,
  ].join(' '),
  // conveniosBuscador
  "details": [
    String.raw`tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem]`,
    String.raw`tw:max-768:[padding-top:1.5rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:1.5rem] tw:max-768:[padding-left:1.5rem]`,
    String.raw`tw:max-480:[padding-top:1rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1rem] tw:max-480:[padding-left:1rem]`,
  ].join(' '),
  // conveniosBuscador
  "details__header": [
    String.raw`tw:text-center tw:[margin-bottom:2.5rem] tw:[padding-bottom:1.5rem] tw:[border-bottom:1px_solid_rgba(0,0,0,.06)]`,
  ].join(' '),
  // conveniosBuscador
  "details__logo": [
    String.raw`tw:[max-width:400px] tw:[max-height:160px] tw:[width:auto] tw:[height:auto] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:2rem] tw:[margin-left:auto] tw:block tw:object-contain`,
    String.raw`tw:max-768:[max-width:300px] tw:max-768:[max-height:120px]`,
    String.raw`tw:max-480:[max-width:250px] tw:max-480:[max-height:100px]`,
  ].join(' '),
  // conveniosBuscador
  "details__title": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0.5rem] tw:[margin-left:0] tw:[font-size:2.2rem] tw:font-bold tw:[color:var(--colorTitulo)] tw:[font-family:var(--titulos)]`,
  ].join(' '),
  // conveniosBuscador
  "details__cat": [
    String.raw`tw:inline-block tw:[padding-top:0.5rem] tw:[padding-right:1rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1rem] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border-radius:8px] tw:font-semibold tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "highlight": [
    String.raw`tw:[background:var(--colorFondo)] tw:[padding-top:1.8rem] tw:[padding-right:1.8rem] tw:[padding-bottom:1.8rem] tw:[padding-left:1.8rem] tw:[border-radius:12px] tw:[margin-bottom:2rem] tw:[border-left:4px_solid_var(--colorPrincipal)]`,
    String.raw`tw:[.hero-title_&]:[color:var(--colorPrincipal)] tw:[.hero-title_&]:block tw:[.hero-title_&]:[margin-top:.5rem]`,
  ].join(' '),
  // conveniosBuscador
  "highlight__main": [
    String.raw`tw:block tw:[font-size:1.3rem] tw:font-semibold tw:[color:var(--colorPrincipal)] tw:[margin-bottom:0.5rem] tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // conveniosBuscador
  "highlight__sub": [
    String.raw`tw:[color:var(--colorTexto)] tw:[font-size:1rem] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // conveniosBuscador
  "infoGrid": [
    String.raw`tw:grid tw:[row-gap:1.5rem] tw:[column-gap:1.5rem] tw:[margin-bottom:2rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr]`,
  ].join(' '),
  // conveniosBuscador
  "infoItem": [
    String.raw`tw:[&_h4]:[margin-top:0] tw:[&_h4]:[margin-right:0] tw:[&_h4]:[margin-bottom:0.5rem] tw:[&_h4]:[margin-left:0] tw:[&_h4]:[color:var(--colorTitulo)] tw:[&_h4]:font-semibold tw:[&_h4]:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // conveniosBuscador
  "muted": [
    String.raw`tw:[color:var(--colorTexto)] tw:[opacity:0.8] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[font-family:var(--texto)]`,
    String.raw`tw:[&_a]:[color:var(--colorPrincipal)] tw:[&_a]:no-underline`,
    String.raw`tw:[&_a:hover]:underline`,
  ].join(' '),
  // conveniosBuscador
  "sectionTitle": [
    String.raw`tw:[font-size:1.3rem] tw:font-semibold tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:1rem] tw:[margin-left:0] tw:[color:var(--colorTitulo)] tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // conveniosBuscador
  "tableWrap": [
    String.raw`tw:overflow-x-auto tw:[margin-bottom:2rem] tw:[border-radius:8px] tw:[border:1px_solid_rgba(0,0,0,.06)]`,
  ].join(' '),
  // conveniosBuscador
  "miniTable": [
    String.raw`tw:[width:100%] tw:[border-collapse:collapse] tw:[font-size:0.9rem] tw:[font-family:var(--texto)]`,
    String.raw`tw:[&_th]:[padding-top:0.75rem] tw:[&_th]:[padding-right:1rem] tw:[&_th]:[padding-bottom:0.75rem] tw:[&_th]:[padding-left:1rem] tw:[&_th]:text-left tw:[&_th]:[border-bottom:1px_solid_rgba(0,0,0,.06)] tw:[&_th]:[background:#f6f6f6] tw:[&_th]:font-semibold tw:[&_th]:[color:var(--colorTitulo)] tw:[&_th]:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_td]:[padding-top:0.75rem] tw:[&_td]:[padding-right:1rem] tw:[&_td]:[padding-bottom:0.75rem] tw:[&_td]:[padding-left:1rem] tw:[&_td]:text-left tw:[&_td]:[border-bottom:1px_solid_rgba(0,0,0,.06)]`,
    String.raw`tw:[&_tr:last-child_td]:[border-bottom:none]`,
  ].join(' '),
  // conveniosBuscador
  "ctaRow": [
    String.raw`tw:text-center tw:[padding-top:1rem] tw:[border-top:1px_solid_rgba(0,0,0,.06)]`,
  ].join(' '),
  // maestriaDetalle
  "maestria-detalle-grid": [
    String.raw`tw:[max-width:1300px] tw:[margin-top:45px] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:4rem] tw:[padding-right:2rem] tw:[padding-bottom:4rem] tw:[padding-left:2rem] tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:[background:#fff] tw:grid tw:[grid-template-columns:1fr] tw:[row-gap:3rem] tw:[column-gap:3rem]`,
    String.raw`tw:max-900:[padding-top:3rem] tw:max-900:[padding-right:1.5rem] tw:max-900:[padding-bottom:3rem] tw:max-900:[padding-left:1.5rem] tw:max-900:text-center`,
    String.raw`tw:max-600:[padding-top:2rem] tw:max-600:[padding-right:1rem] tw:max-600:[padding-bottom:2rem] tw:max-600:[padding-left:1rem] tw:max-600:[row-gap:2rem] tw:max-600:[column-gap:2rem]`,
    String.raw`tw:max-300:[padding-top:1.5rem] tw:max-300:[padding-right:0.8rem] tw:max-300:[padding-bottom:1.5rem] tw:max-300:[padding-left:0.8rem] tw:max-300:[row-gap:1.5rem] tw:max-300:[column-gap:1.5rem]`,
    String.raw`tw:[margin-top:0]! tw:[padding-top:calc(var(--site-header-height)_+_2rem)]!`,
  ].join(' '),
  // maestriaDetalle
  "grid-hero": [
    String.raw`tw:[grid-column:1_/_-1]`,
  ].join(' '),
  // maestriaDetalle
  "hero-content": [
    String.raw`tw:grid tw:[grid-template-columns:1.5fr_1fr] tw:[align-items:start] tw:[row-gap:3rem] tw:[column-gap:3rem]`,
    String.raw`tw:max-900:[grid-template-columns:1fr] tw:max-900:text-center tw:max-900:[row-gap:2rem] tw:max-900:[column-gap:2rem]`,
  ].join(' '),
  // maestriaDetalle
  "hero-columna-izquierda": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:2.5rem] tw:[column-gap:2.5rem]`,
    String.raw`tw:max-900:[order:2] tw:max-900:items-center`,
  ].join(' '),
  // maestriaDetalle
  "hero-texto": [
    String.raw`tw:text-left`,
    String.raw`tw:[&_h1]:[font-family:var(--titulos)] tw:[&_h1]:[font-size:3rem] tw:[&_h1]:font-bold tw:[&_h1]:[color:var(--colorOscuro)] tw:[&_h1]:[margin-bottom:1.2rem]`,
    String.raw`tw:max-900:text-center`,
    String.raw`tw:max-600:[&_h1]:[font-size:2.2rem]`,
    String.raw`tw:max-300:[&_h1]:[font-size:1.8rem]`,
  ].join(' '),
  // maestriaDetalle
  "objetivo-text": [
    String.raw`tw:[font-size:1.15rem] tw:[color:#444] tw:[margin-top:1rem] tw:[line-height:1.8]`,
    String.raw`tw:max-300:[font-size:1rem]`,
  ].join(' '),
  // maestriaDetalle
  "detalles-hero": [
    String.raw`tw:[background:#fafafa] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[border-radius:20px] tw:[box-shadow:0_8px_24px_rgba(0,_0,_0,_0.08)] tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-6px)] tw:[&:hover]:[box-shadow:0_12px_30px_rgba(0,_0,_0,_0.12)]`,
    String.raw`tw:[&_h2]:[font-size:1.6rem] tw:[&_h2]:[font-family:var(--subtitulos)] tw:[&_h2]:font-bold tw:[&_h2]:[color:var(--colorPrincipal)] tw:[&_h2]:[margin-bottom:1.5rem] tw:[&_h2]:text-center`,
    String.raw`tw:max-900:text-center tw:max-900:[width:100%]`,
    String.raw`tw:max-600:[padding-top:1.5rem] tw:max-600:[padding-right:1.5rem] tw:max-600:[padding-bottom:1.5rem] tw:max-600:[padding-left:1.5rem]`,
    String.raw`tw:max-300:[padding-top:1rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:1rem] tw:max-300:[padding-left:1rem] tw:max-300:[border-radius:12px]`,
  ].join(' '),
  // maestriaDetalle
  "detalles-lista": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:1.2rem] tw:[column-gap:1.2rem]`,
    String.raw`tw:max-900:items-center`,
  ].join(' '),
  // maestriaDetalle
  "detalle-item": [
    String.raw`tw:flex tw:items-start tw:[row-gap:1rem] tw:[column-gap:1rem]`,
    String.raw`tw:max-600:text-center`,
  ].join(' '),
  // maestriaDetalle
  "detalle-icono": [
    String.raw`tw:[font-size:1.6rem] tw:[flex-shrink:0]`,
    String.raw`tw:max-300:[font-size:1.4rem]`,
  ].join(' '),
  // maestriaDetalle
  "detalle-contenido": [
    String.raw`tw:[&_h3]:[font-size:1.1rem] tw:[&_h3]:[margin-bottom:0.4rem] tw:[&_h3]:[color:var(--colorOscuro)]`,
    String.raw`tw:[&_p]:[font-size:1.05rem] tw:[&_p]:[line-height:1.6] tw:[&_p]:[color:var(--colorTexto)]`,
    String.raw`tw:max-300:[&_h3]:[font-size:1rem]`,
    String.raw`tw:max-300:[&_p]:[font-size:0.95rem]`,
  ].join(' '),
  // maestriaDetalle
  "hero-imagen": [
    String.raw`tw:flex tw:justify-center tw:items-start`,
    String.raw`tw:[&_img]:[width:auto] tw:[&_img]:[max-width:100%] tw:[&_img]:[max-height:500px] tw:[&_img]:[height:auto] tw:[&_img]:[border-radius:20px] tw:[&_img]:[box-shadow:0_15px_40px_rgba(0,_0,_0,_0.15)] tw:[&_img]:[transition:var(--transition)] tw:[&_img]:object-contain`,
    String.raw`tw:[&_img:hover]:[transform:scale(1.02)]`,
    String.raw`tw:max-900:[order:1] tw:max-900:justify-center`,
    String.raw`tw:max-900:[&_img]:[max-width:300px]`,
    String.raw`tw:max-600:[&_img]:[max-width:250px]`,
    String.raw`tw:max-300:[&_img]:[max-width:200px]`,
  ].join(' '),
  // maestriaDetalle
  "requisitos-extendidos": [
    String.raw`tw:[grid-column:1_/_-1] tw:[background:#fafafa] tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem] tw:[border-radius:20px] tw:[box-shadow:0_8px_24px_rgba(0,_0,_0,_0.08)] tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-6px)] tw:[&:hover]:[box-shadow:0_12px_30px_rgba(0,_0,_0,_0.12)]`,
    String.raw`tw:max-600:[padding-top:1.5rem] tw:max-600:[padding-right:1.5rem] tw:max-600:[padding-bottom:1.5rem] tw:max-600:[padding-left:1.5rem]`,
    String.raw`tw:max-300:[padding-top:1rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:1rem] tw:max-300:[padding-left:1rem] tw:max-300:[border-radius:12px]`,
  ].join(' '),
  // maestriaDetalle
  "requisitos-contenedor": [
    String.raw`tw:[&_h2]:[font-size:1.6rem] tw:[&_h2]:[font-family:var(--subtitulos)] tw:[&_h2]:font-bold tw:[&_h2]:[color:var(--colorPrincipal)] tw:[&_h2]:[margin-bottom:1.5rem] tw:[&_h2]:text-center`,
    String.raw`tw:max-300:[&_h2]:[font-size:1.4rem]`,
  ].join(' '),
  // maestriaDetalle
  "requisitos-lista": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_300px),_1fr))] tw:[row-gap:1rem] tw:[column-gap:1rem]`,
    String.raw`tw:max-900:[grid-template-columns:1fr] tw:max-900:[justify-items:center]`,
  ].join(' '),
  // maestriaDetalle
  "requisito-item": [
    String.raw`tw:flex tw:items-start tw:[row-gap:1rem] tw:[column-gap:1rem]`,
    String.raw`tw:[&_p]:[font-size:1.05rem] tw:[&_p]:[line-height:1.7] tw:[&_p]:[color:var(--colorTexto)]`,
    String.raw`tw:max-900:[row-gap:0.5rem] tw:max-900:[column-gap:0.5rem]`,
    String.raw`tw:max-600:text-center`,
    String.raw`tw:max-300:[&_p]:[font-size:0.95rem]`,
  ].join(' '),
  // maestriaDetalle
  "requisito-marcador": [
    String.raw`tw:[width:8px] tw:[height:8px] tw:[background:var(--colorPrincipal)] tw:[border-radius:50%] tw:[margin-top:0.5rem] tw:[flex-shrink:0]`,
  ].join(' '),
  // maestriaDetalle
  "grid-mapa": [
    String.raw`tw:[grid-column:1_/_-1] tw:[background:#fafafa] tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem] tw:[border-radius:20px] tw:[box-shadow:0_8px_24px_rgba(0,_0,_0,_0.08)] tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[transform:translateY(-6px)] tw:[&:hover]:[box-shadow:0_12px_30px_rgba(0,_0,_0,_0.12)]`,
    String.raw`tw:[&_h2]:[font-size:1.6rem] tw:[&_h2]:[font-family:var(--subtitulos)] tw:[&_h2]:font-bold tw:[&_h2]:[color:var(--colorPrincipal)] tw:[&_h2]:[margin-bottom:1.2rem] tw:[&_h2]:text-center`,
    String.raw`tw:max-600:[padding-top:1.5rem] tw:max-600:[padding-right:1.5rem] tw:max-600:[padding-bottom:1.5rem] tw:max-600:[padding-left:1.5rem]`,
    String.raw`tw:max-300:[padding-top:1rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:1rem] tw:max-300:[padding-left:1rem] tw:max-300:[border-radius:12px]`,
    String.raw`tw:max-300:[&_h2]:[font-size:1.4rem]`,
  ].join(' '),
  // maestriaDetalle
  "semestres-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_280px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[margin-top:2rem]`,
    String.raw`tw:max-900:[grid-template-columns:1fr] tw:max-900:[justify-items:center]`,
  ].join(' '),
  // maestriaDetalle
  "semestre-card": [
    String.raw`tw:[background:#fff] tw:[border-radius:16px] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem] tw:[box-shadow:0_6px_18px_rgba(0,_0,_0,_0.08)] tw:[transition:var(--transition)] tw:text-center`,
    String.raw`tw:[&:hover]:[transform:scale(1.02)]`,
    String.raw`tw:[&_h3]:[font-size:1.3rem] tw:[&_h3]:[color:var(--colorOscuro)] tw:[&_h3]:[margin-bottom:1rem] tw:[&_h3]:[border-bottom:2px_solid_#eee] tw:[&_h3]:[padding-bottom:0.6rem] tw:[&_h3]:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_ul]:list-none tw:[&_ul]:[padding-top:0] tw:[&_ul]:[padding-right:0] tw:[&_ul]:[padding-bottom:0] tw:[&_ul]:[padding-left:0] tw:[&_ul]:text-left`,
    String.raw`tw:[&_li]:[font-size:1.05rem] tw:[&_li]:[line-height:1.7] tw:[&_li]:[color:var(--colorTexto)] tw:[&_li]:[padding-top:0.5rem] tw:[&_li]:[padding-right:0] tw:[&_li]:[padding-bottom:0.5rem] tw:[&_li]:[padding-left:1.2rem] tw:[&_li]:[border-bottom:1px_solid_#f0f0f0] tw:[&_li]:relative`,
    String.raw`tw:[&_li::before]:[content:"•"] tw:[&_li::before]:[color:var(--colorPrincipal)] tw:[&_li::before]:absolute tw:[&_li::before]:[left:0]`,
    String.raw`tw:[&_li:last-child]:[border-bottom:none]`,
    String.raw`tw:max-900:[width:100%] tw:max-900:[max-width:400px] tw:max-900:text-center`,
    String.raw`tw:max-900:[&_ul]:text-left`,
    String.raw`tw:max-600:[padding-top:1.5rem] tw:max-600:[padding-right:1.5rem] tw:max-600:[padding-bottom:1.5rem] tw:max-600:[padding-left:1.5rem] tw:max-600:text-center`,
    String.raw`tw:max-300:[padding-top:1rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:1rem] tw:max-300:[padding-left:1rem]`,
    String.raw`tw:max-300:[&_h3]:[font-size:1.1rem]`,
    String.raw`tw:max-300:[&_li]:[font-size:0.95rem] tw:max-300:[&_li]:[padding-left:1rem]`,
  ].join(' '),
  // maestriaDetalle
  "grid-cta": [
    String.raw`tw:[grid-column:1_/_-1] tw:text-center tw:[padding-top:2.5rem] tw:[padding-right:2.5rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2.5rem] tw:[background:#fafafa] tw:[border-radius:20px] tw:[box-shadow:0_8px_24px_rgba(0,_0,_0,_0.08)]`,
    String.raw`tw:[&_h2]:[font-size:1.8rem] tw:[&_h2]:[font-family:var(--subtitulos)] tw:[&_h2]:font-bold tw:[&_h2]:[color:var(--colorPrincipal)] tw:[&_h2]:[margin-bottom:1rem]`,
    String.raw`tw:[&_p]:[font-size:1.1rem] tw:[&_p]:[margin-bottom:1.5rem] tw:[&_p]:[color:var(--colorTexto)]`,
    String.raw`tw:max-600:[padding-top:1.5rem] tw:max-600:[padding-right:1.5rem] tw:max-600:[padding-bottom:1.5rem] tw:max-600:[padding-left:1.5rem]`,
    String.raw`tw:max-300:[padding-top:1rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:1rem] tw:max-300:[padding-left:1rem] tw:max-300:[border-radius:12px]`,
    String.raw`tw:max-300:[&_h2]:[font-size:1.4rem]`,
  ].join(' '),
  // maestriaDetalle
  "boton-whatsapp-container": [
    String.raw`tw:flex tw:justify-center tw:[margin-top:1.5rem]`,
  ].join(' '),
  // maestriaDetalle
  "boton-whatsapp": [
    String.raw`tw:[padding-top:1rem] tw:[padding-right:1.5rem] tw:[padding-bottom:1rem] tw:[padding-left:1.5rem] tw:[border:none] tw:[border-radius:8px] tw:[font-family:var(--subtitulos)] tw:[font-size:1rem] tw:font-semibold tw:cursor-pointer tw:[transition:var(--transition)] tw:flex tw:items-center tw:justify-center tw:[row-gap:0.5rem] tw:[column-gap:0.5rem] tw:[box-shadow:0_4px_10px_rgba(0,_0,_0,_0.15)] tw:[background:linear-gradient(135deg,_#25D366,_#128C7E)] tw:[color:#fff] tw:[min-width:200px]`,
    String.raw`tw:[&:hover]:[background:linear-gradient(135deg,_#128C7E,_#25D366)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_6px_14px_rgba(0,_0,_0,_0.2)]`,
    String.raw`tw:max-600:[width:100%] tw:max-600:[max-width:250px]`,
    String.raw`tw:max-300:[padding-top:0.8rem] tw:max-300:[padding-right:1rem] tw:max-300:[padding-bottom:0.8rem] tw:max-300:[padding-left:1rem] tw:max-300:[font-size:0.9rem] tw:max-300:[min-width:auto] tw:max-300:[width:100%]`,
  ].join(' '),
  // maestriaDetalle
  "icono-whatsapp": [
    String.raw`tw:[font-size:1.2rem]`,
  ].join(' '),
  // servicios
  "skip-link": [
    String.raw`tw:absolute tw:[top:-40px] tw:[left:0] tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[padding-top:8px] tw:[padding-right:16px] tw:[padding-bottom:8px] tw:[padding-left:16px] tw:[border-radius:0_0_var(--radius-sm)_0] tw:no-underline tw:[z-index:10000] tw:font-semibold`,
    String.raw`tw:[&:focus]:[top:0] tw:[&:focus]:[outline:3px_solid_var(--colorSecundario)] tw:[&:focus]:[outline-offset:2px]`,
  ].join(' '),
  // servicios
  "servicios-page-v2": [
    String.raw`tw:[min-height:100vh] tw:[background:var(--colorFondo)] tw:[padding-top:var(--header-offset)] tw:[font-family:var(--texto)]`,
    String.raw`tw:[padding-top:calc(var(--site-header-height)_+_1rem)]`,
    String.raw`tw:max-1024:[&_.card-media]:[height:210px] tw:max-1024:[&_.card-media]:[padding:1.5rem] tw:max-1024:[&_.card-media_img]:[width:100%] tw:max-1024:[&_.card-media_img]:[height:100%] tw:max-1024:[&_.card-media_img]:[max-width:210px] tw:max-1024:[&_.card-media_img]:[max-height:155px] tw:max-1024:[&_.card-media_img]:object-contain`,
  ].join(' '),
  // servicios
  "hero-compact": [
    String.raw`tw:[max-width:800px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:var(--space-6)] tw:[margin-left:auto] tw:[padding-top:var(--space-6)] tw:[padding-right:var(--space-4)] tw:[padding-bottom:var(--space-6)] tw:[padding-left:var(--space-4)] tw:text-center tw:[background:transparent]`,
    String.raw`tw:max-768:[padding-top:var(--space-5)] tw:max-768:[padding-right:var(--space-3)] tw:max-768:[padding-bottom:var(--space-5)] tw:max-768:[padding-left:var(--space-3)] tw:max-768:[margin-bottom:var(--space-5)] `,
  ].join(' '),
  // servicios
  "hero-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[font-size:clamp(2rem,_5vw,_3rem)] tw:font-bold tw:[color:var(--colorTitulo)] tw:[line-height:1.1] tw:[letter-spacing:-.02em] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:var(--space-3)] tw:[margin-left:0]`,
  ].join(' '),
  // servicios
  "hero-desc": [
    String.raw`tw:[font-family:var(--texto)] tw:[font-size:clamp(1.125rem,_2vw,_1.25rem)] tw:[color:var(--colorTexto)] tw:[max-width:600px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[line-height:1.7] tw:[opacity:.8]`,
  ].join(' '),
  // servicios
  "service-index": String.raw`tw:relative tw:[max-width:650px] tw:[margin:0_auto_2.5rem] tw:[padding:1rem] tw:text-center tw:[font-family:var(--texto)] tw:[&_>_span]:block tw:[&_>_span]:[font-size:.85rem] tw:[&_>_span]:[color:var(--colorTexto)] tw:[&_>_span]:[margin-bottom:.85rem] tw:[&_>_div]:flex tw:[&_>_div]:flex-wrap tw:[&_>_div]:justify-center tw:[&_>_div]:[gap:.5rem] tw:max-480:[&_.nav-btn]:[padding:.7rem_1rem] tw:max-480:[&_.nav-btn]:[width:auto]`,
  "service-section-jump": String.raw`tw:inline-flex tw:items-center tw:[gap:.65rem] tw:[margin-top:1rem] tw:[font-family:var(--texto)] tw:[font-size:.85rem] tw:[color:var(--colorTexto)] tw:[&_select]:[padding:.55rem_.75rem] tw:[&_select]:[min-height:44px] tw:[&_select]:[border:1px_solid_var(--border)] tw:[&_select]:[border-radius:8px] tw:[&_select]:[background:white] tw:[&_select]:[color:var(--colorPrincipal)] tw:[&_select]:[font-family:var(--texto)] tw:[&_select]:cursor-pointer tw:[&_select:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&_select:focus-visible]:[outline-offset:3px]`,
  "service-nav": [
    String.raw`tw:sticky tw:[top:var(--header-offset)] tw:[z-index:100] tw:[max-width:450px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:var(--space-6)] tw:[margin-left:auto] tw:[padding-top:var(--space-3)] tw:[padding-right:var(--space-4)] tw:[padding-bottom:var(--space-3)] tw:[padding-left:var(--space-4)] tw:[background:var(--bg-card)] tw:[backdrop-filter:blur(20px)] tw:[border-radius:var(--radius-xl)] tw:[box-shadow:var(--shadow-sm)] tw:[border:1px_solid_var(--border)] tw:text-center`,
    String.raw`tw:max-768:[padding-top:.75rem] tw:max-768:[padding-right:1rem] tw:max-768:[padding-bottom:.75rem] tw:max-768:[padding-left:1rem] tw:max-768:[margin-bottom:var(--space-4)]`,
    String.raw`tw:max-480:[max-width:290px]`,
  ].join(' '),
  // servicios
  "nav-toggle": [
    String.raw`tw:hidden`,
    String.raw`tw:max-768:block tw:max-768:[width:100%] tw:max-768:[padding-top:.875rem] tw:max-768:[padding-right:.875rem] tw:max-768:[padding-bottom:.875rem] tw:max-768:[padding-left:.875rem] tw:max-768:[background:var(--colorPrincipal)] tw:max-768:[color:#fff] tw:max-768:[border:none] tw:max-768:[border-radius:var(--radius-lg)] tw:max-768:[font-family:var(--subtitulos)] tw:max-768:[font-size:1rem] tw:max-768:font-semibold tw:max-768:cursor-pointer`,
  ].join(' '),
  // servicios
  "nav-items": [
    String.raw`tw:flex tw:[row-gap:.5rem] tw:[column-gap:.5rem] tw:justify-center tw:flex-wrap`,
    String.raw`tw:max-768:hidden tw:max-768:flex-col tw:max-768:[margin-top:1rem] tw:max-768:[row-gap:.5rem] tw:max-768:[column-gap:.5rem]`,
    String.raw`tw:max-768:[.service-nav.open_&]:flex`,
  ].join(' '),
  // servicios
  "nav-btn": [
    String.raw`tw:[padding-top:.75rem] tw:[padding-right:1.5rem] tw:[padding-bottom:.75rem] tw:[padding-left:1.5rem] tw:[background:transparent] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-lg)] tw:[font-family:var(--subtitulos)] tw:[font-size:.9rem] tw:font-medium tw:[color:var(--colorTexto)] tw:cursor-pointer tw:[transition:var(--transition)] tw:whitespace-nowrap`,
    String.raw`tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)] tw:[&:hover]:[color:var(--colorPrincipal)] tw:[&:hover]:[transform:translateY(-1px)]`,
    String.raw`tw:[&.active]:[background:var(--colorPrincipal)] tw:[&.active]:[border-top-color:var(--colorPrincipal)] tw:[&.active]:[border-right-color:var(--colorPrincipal)] tw:[&.active]:[border-bottom-color:var(--colorPrincipal)] tw:[&.active]:[border-left-color:var(--colorPrincipal)] tw:[&.active]:[color:#fff] tw:[&.active]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:max-768:[width:100%] tw:max-768:justify-center`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
  ].join(' '),
  // servicios
  "services-container": [
    String.raw`tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:var(--space-4)] tw:[padding-bottom:var(--space-6)] tw:[padding-left:var(--space-4)]`,
    String.raw`tw:max-768:[padding-top:0] tw:max-768:[padding-right:var(--space-3)] tw:max-768:[padding-bottom:var(--space-5)] tw:max-768:[padding-left:var(--space-3)]`,
  ].join(' '),
  // servicios
  "services-section": [
    String.raw`tw:text-center tw:[margin-bottom:var(--space-6)]`,
    String.raw`tw:max-768:[margin-bottom:var(--space-5)]`,
  ].join(' '),
  // servicios
  "section-header": [
    String.raw`tw:[margin-bottom:var(--space-5)]`,
  ].join(' '),
  // servicios
  "section-desc": [
    String.raw`tw:[font-family:var(--texto)] tw:[font-size:1.125rem] tw:[color:var(--muted)] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[line-height:1.6]`,
  ].join(' '),
  // servicios
  "services-grid": [
    String.raw`tw:[--min:260px] tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(var(--min),_1fr))] tw:[row-gap:var(--space-4)] tw:[column-gap:var(--space-4)] tw:[align-items:start]`,
    String.raw`tw:max-1024:[row-gap:1.5rem] tw:max-1024:[column-gap:1.5rem]`,
  ].join(' '),
  // servicios
  "glass": [
    String.raw`tw:[background:var(--bg-card)] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-xl)] tw:[box-shadow:var(--shadow-sm)]`,
  ].join(' '),
  // servicios
  "service-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-sm)] tw:[transition:var(--transition)] tw:flex tw:flex-col tw:[height:100%] tw:[border:1px_solid_var(--border)] tw:text-center`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
  ].join(' '),
  // servicios
  "card-link": [
    String.raw`tw:[appearance:none] tw:[background:none] tw:[border:none] tw:[color:inherit] tw:no-underline tw:flex tw:flex-col tw:[height:100%] tw:[text-align:inherit] tw:cursor-pointer`,
  ].join(' '),
  // servicios
  "card-media": [
    String.raw`tw:[width:100%] tw:[height:160px] tw:flex tw:items-center tw:justify-center tw:[background:linear-gradient(135deg,_#fafafa_0%,_#f5f5f5_100%)] tw:[padding-top:var(--space-4)] tw:[padding-right:var(--space-4)] tw:[padding-bottom:var(--space-4)] tw:[padding-left:var(--space-4)] tw:[border-bottom:1px_solid_var(--border)] tw:overflow-hidden`,
    String.raw`tw:[&_img]:[max-width:120px] tw:[&_img]:[max-height:100px] tw:[&_img]:object-contain tw:[&_img]:[transition:var(--transition)] tw:[&_img]:[filter:grayscale(.3)]`,
    String.raw`tw:[.service-card:hover_&_img]:[transform:scale(1.1)] tw:[.service-card:hover_&_img]:[filter:grayscale(0)]`,
    String.raw`tw:motion-reduce:[.service-card:hover_&_img]:[transform:none]`,
    String.raw`tw:max-1024:[height:210px] tw:max-1024:[padding:1rem] tw:max-1024:[&_img]:[width:auto] tw:max-1024:[&_img]:[height:auto] tw:max-1024:[&_img]:[max-width:85%] tw:max-1024:[&_img]:[max-height:175px]`,
  ].join(' '),
  // servicios
  "card-content": [
    String.raw`tw:[padding-top:var(--space-4)] tw:[padding-right:var(--space-4)] tw:[padding-bottom:var(--space-4)] tw:[padding-left:var(--space-4)] tw:flex tw:flex-col tw:[row-gap:var(--space-3)] tw:[column-gap:var(--space-3)] tw:[flex:1]`,
  ].join(' '),
  // servicios
  "card-title": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[font-size:1.25rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[line-height:1.3]`,
    String.raw`tw:[.service-card:hover_&]:[color:var(--colorSecundario)]`,
    String.raw`tw:[.card-link:focus-visible_&]:[color:var(--colorSecundario)]`,
  ].join(' '),
  // servicios
  "card-tags": [
    String.raw`tw:flex tw:flex-wrap tw:[row-gap:.5rem] tw:[column-gap:.5rem] tw:justify-center`,
  ].join(' '),
  // servicios
  "tag": [
    String.raw`tw:[padding-top:.25rem] tw:[padding-right:.75rem] tw:[padding-bottom:.25rem] tw:[padding-left:.75rem] tw:[background:rgba(114,_0,_0,_.08)] tw:[color:var(--colorPrincipal)] tw:[border-radius:var(--radius-lg)] tw:[font-family:var(--texto)] tw:[font-size:.75rem] tw:font-medium tw:[border:1px_solid_rgba(114,_0,_0,_.15)] tw:uppercase tw:[letter-spacing:.5px]`,
  ].join(' '),
  // servicios
  "card-summary": [
    String.raw`tw:[font-family:var(--texto)] tw:[font-size:.9375rem] tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[flex:1] tw:[opacity:.8]`,
  ].join(' '),
  // servicios
  "card-links": [
    String.raw`tw:list-none tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[font-family:var(--texto)] tw:[font-size:.875rem] tw:[color:var(--colorTexto)]`,
    String.raw`tw:[&_li]:[padding-top:.25rem] tw:[&_li]:[padding-right:0] tw:[&_li]:[padding-bottom:.25rem] tw:[&_li]:[padding-left:0] tw:[&_li]:flex tw:[&_li]:items-start tw:[&_li]:[row-gap:.5rem] tw:[&_li]:[column-gap:.5rem] tw:[&_li]:justify-center`,
  ].join(' '),
  // servicios
  "card-highlights": [
    String.raw`tw:list-none tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[font-family:var(--texto)] tw:[font-size:.875rem] tw:[color:var(--colorTexto)]`,
    String.raw`tw:[&_li]:[padding-top:.25rem] tw:[&_li]:[padding-right:0] tw:[&_li]:[padding-bottom:.25rem] tw:[&_li]:[padding-left:0] tw:[&_li]:flex tw:[&_li]:items-start tw:[&_li]:[row-gap:.5rem] tw:[&_li]:[column-gap:.5rem] tw:[&_li]:justify-center`,
  ].join(' '),
  // servicios
  "link-bullet": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:font-bold tw:[flex-shrink:0]`,
  ].join(' '),
  // servicios
  "cta-section": [
    String.raw`tw:[margin-top:var(--space-6)] tw:[padding-top:60px] tw:[padding-right:5vw] tw:[padding-bottom:60px] tw:[padding-left:5vw] tw:[background:linear-gradient(135deg,_var(--colorFondo)_0%,_#f8f9fa_100%)] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-xl)] tw:text-center tw:[box-shadow:var(--shadow-sm)] tw:[border-top:1px_solid_var(--border)]`,
    String.raw`tw:[&_h2]:[font-family:var(--titulos)] tw:[&_h2]:[font-size:clamp(1.5rem,_3vw,_2rem)] tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:[margin-top:0] tw:[&_h2]:[margin-right:0] tw:[&_h2]:[margin-bottom:1rem] tw:[&_h2]:[margin-left:0] tw:[&_h2]:font-semibold`,
    String.raw`tw:max-768:[padding-top:var(--space-4)] tw:max-768:[padding-right:var(--space-3)] tw:max-768:[padding-bottom:var(--space-4)] tw:max-768:[padding-left:var(--space-3)] tw:max-768:[margin-top:var(--space-5)]`,
  ].join(' '),
  // servicios
  "cta-desc": [
    String.raw`tw:[font-family:var(--texto)] tw:[font-size:1.125rem] tw:[color:var(--colorTexto)] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:var(--space-4)] tw:[margin-left:auto] tw:[line-height:1.6] tw:[opacity:.8]`,
  ].join(' '),
  // servicios
  "cta-actions": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:justify-center tw:flex-wrap`,
    String.raw`tw:max-768:flex-col tw:max-768:items-center`,
  ].join(' '),
  // servicios
  "btn-cta": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:.5rem] tw:[column-gap:.5rem] tw:[padding-top:1rem] tw:[padding-right:2rem] tw:[padding-bottom:1rem] tw:[padding-left:2rem] tw:[border-radius:var(--radius-lg)] tw:[font-family:var(--subtitulos)] tw:[font-size:1rem] tw:font-medium tw:[border:none] tw:cursor-pointer tw:[transition:var(--transition)] tw:no-underline`,
    String.raw`tw:max-768:[width:100%] tw:max-768:[max-width:300px] tw:max-768:justify-center`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px]`,
    String.raw`tw:motion-reduce:[&:hover]:[transform:none]`,
  ].join(' '),
  // servicios
  "btn-whatsapp": [
    String.raw`tw:[&.btn-whatsapp]:[background:#25D366] tw:[&.btn-whatsapp]:[color:#fff]`,
    String.raw`tw:[&:hover]:[background:#128C7E] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
  ].join(' '),
  // servicios
  "reveal": [
    String.raw`tw:[opacity:0] tw:[transform:translateY(20px)] tw:[transition:opacity_.6s_ease,_transform_.6s_ease]`,
    String.raw`tw:[&.reveal-in]:[opacity:1] tw:[&.reveal-in]:[transform:translateY(0)]`,
    String.raw`tw:motion-reduce:[opacity:1] tw:motion-reduce:[transform:none]`,
  ].join(' '),
  // servicios
  "service-overlay": [
    String.raw`tw:fixed tw:[top:0] tw:[right:0] tw:[bottom:0] tw:[left:0] tw:[background:rgba(0,_0,_0,_.7)] tw:[backdrop-filter:blur(8px)] tw:flex tw:items-center tw:justify-center tw:[z-index:10000] tw:[padding-top:var(--space-5)] tw:[padding-right:var(--space-5)] tw:[padding-bottom:var(--space-5)] tw:[padding-left:var(--space-5)] tw:[opacity:0] tw:[transition:opacity_.3s_ease]`,
    String.raw`tw:[&.active]:[opacity:1]`,
    String.raw`tw:max-880:[padding-top:var(--space-4)] tw:max-880:[padding-right:var(--space-4)] tw:max-880:[padding-bottom:var(--space-4)] tw:max-880:[padding-left:var(--space-4)]`,
    String.raw`tw:max-480:[padding-top:10px] tw:max-480:[padding-right:10px] tw:max-480:[padding-bottom:10px] tw:max-480:[padding-left:10px]`,
  ].join(' '),
  // servicios
  "service-container": [
    String.raw`tw:[background:var(--bg-card)] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-xl)] tw:[box-shadow:var(--shadow-lg)] tw:[max-width:800px] tw:[width:100%] tw:[max-height:90vh] tw:overflow-hidden tw:[transform:translateY(20px)] tw:[transition:transform_.3s_ease] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:flex tw:flex-col`,
    String.raw`tw:[.service-overlay.active_&]:[transform:translateY(0)]`,
    String.raw`tw:max-880:[max-width:95%]`,
    String.raw`tw:max-480:[border-radius:14px] tw:max-480:[max-height:min(86dvh,_90vh)] tw:max-480:flex tw:max-480:flex-col tw:max-480:overflow-hidden`,
  ].join(' '),
  // servicios
  "service-header": [
    String.raw`tw:[padding-top:var(--space-5)] tw:[padding-right:var(--space-5)] tw:[padding-bottom:var(--space-3)] tw:[padding-left:var(--space-5)] tw:[border-bottom:1px_solid_var(--border)] tw:flex tw:items-center tw:justify-start tw:[row-gap:var(--space-3)] tw:[column-gap:var(--space-3)] tw:[flex-shrink:0] tw:relative`,
    String.raw`tw:max-880:[padding-top:var(--space-4)] tw:max-880:[padding-right:var(--space-4)] tw:max-880:[padding-bottom:var(--space-3)] tw:max-880:[padding-left:var(--space-4)] tw:max-880:items-center tw:max-880:[row-gap:var(--space-3)] tw:max-880:[column-gap:var(--space-3)] tw:max-880:sticky tw:max-880:[top:0] tw:max-880:[background:var(--bg-card)] tw:max-880:[z-index:2]`,
  ].join(' '),
  // servicios
  "service-header-content": [
    String.raw`tw:flex tw:items-center tw:[row-gap:var(--space-3)] tw:[column-gap:var(--space-3)] tw:[flex:1] tw:[min-width:0]`,
    String.raw`tw:max-880:[row-gap:12px] tw:max-880:[column-gap:12px] tw:max-880:items-center tw:max-880:[min-width:0]`,
  ].join(' '),
  // servicios
  "service-logo": [
    String.raw`tw:[width:60px] tw:[height:60px] tw:[flex-shrink:0] tw:flex tw:items-center tw:justify-center tw:[background:linear-gradient(135deg,_#fafafa_0%,_#f5f5f5_100%)] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-lg)] tw:[padding-top:.5rem] tw:[padding-right:.5rem] tw:[padding-bottom:.5rem] tw:[padding-left:.5rem]`,
    String.raw`tw:[&_img]:[width:100%] tw:[&_img]:[height:100%] tw:[&_img]:object-contain tw:[&_img]:block`,
    String.raw`tw:max-880:[width:50px] tw:max-880:[height:50px]`,
  ].join(' '),
  // servicios
  "service-title-section": [
    String.raw`tw:[flex:1] tw:[min-width:0]`,
  ].join(' '),
  // servicios
  "service-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[font-size:2rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[line-height:1.3] tw:[word-break:break-word] tw:text-left`,
    String.raw`tw:max-880:[font-size:1.25rem] tw:max-880:text-left`,
    String.raw`tw:max-480:[font-size:clamp(0.95rem,_4.5vw,_1.15rem)] tw:max-480:[line-height:1.2] tw:max-480:[letter-spacing:-0.01em] tw:max-480:[margin-top:2px] tw:max-480:[margin-right:0] tw:max-480:[margin-bottom:6px] tw:max-480:[margin-left:0] tw:max-480:text-left tw:max-480:[display:-webkit-box] tw:max-480:[-webkit-line-clamp:2] tw:max-480:[-webkit-box-orient:vertical] tw:max-480:overflow-hidden tw:max-480:[overflow-wrap:anywhere] tw:max-480:[word-break:break-word]`,
    String.raw`tw:max-480:supports-balance:[text-wrap:balance]`,
    String.raw`tw:max-380:[-webkit-line-clamp:3]`,
  ].join(' '),
  // servicios
  "service-close": [
    String.raw`tw:[background:none] tw:[border:none] tw:[font-size:1.5rem] tw:cursor-pointer tw:[padding-top:.5rem] tw:[padding-right:.5rem] tw:[padding-bottom:.5rem] tw:[padding-left:.5rem] tw:[border-radius:var(--radius-sm)] tw:[color:var(--muted)] tw:[transition:var(--transition)] tw:absolute tw:[top:12px] tw:[right:12px]`,
    String.raw`tw:[&:hover]:[background:var(--colorFondo)] tw:[&:hover]:[color:var(--colorTitulo)]`,
  ].join(' '),
  // servicios
  "service-content": [
    String.raw`tw:[padding-top:var(--space-5)] tw:[padding-right:var(--space-5)] tw:[padding-bottom:var(--space-5)] tw:[padding-left:var(--space-5)] tw:[max-height:60vh] tw:overflow-hidden tw:flex tw:flex-col tw:[flex:1] tw:box-border`,
    String.raw`tw:max-880:[padding-top:var(--space-4)] tw:max-880:[padding-right:var(--space-4)] tw:max-880:[padding-bottom:var(--space-4)] tw:max-880:[padding-left:var(--space-4)] tw:max-880:[max-height:70vh]`,
    String.raw`tw:max-480:[padding-top:12px] tw:max-480:[padding-right:12px] tw:max-480:[padding-bottom:12px] tw:max-480:[padding-left:12px] tw:max-480:[flex:1] tw:max-480:[min-height:0] tw:max-480:overflow-auto tw:max-480:[-webkit-overflow-scrolling:touch]`,
    String.raw`tw:max-380:[max-height:72dvh]`,
  ].join(' '),
  // servicios
  "service-body": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:var(--space-4)] tw:[column-gap:var(--space-4)] tw:[flex:1]`,
    String.raw`tw:max-480:[row-gap:12px] tw:max-480:[column-gap:12px]`,
  ].join(' '),
  // servicios
  "service-description": [
    String.raw`tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:[font-size:1rem] tw:[line-height:1.6] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:text-left tw:[overflow-wrap:anywhere] tw:[word-break:break-word]`,
    String.raw`tw:max-480:[font-size:.95rem] tw:max-480:[line-height:1.55] tw:max-480:text-left`,
  ].join(' '),
  // servicios
  "service-links-wrap": [
    String.raw`tw:relative`,
    String.raw`tw:[&.has-fade::before]:[content:""] tw:[&.has-fade::before]:absolute tw:[&.has-fade::before]:[left:0] tw:[&.has-fade::before]:[right:0] tw:[&.has-fade::before]:[height:16px] tw:[&.has-fade::before]:pointer-events-none tw:[&.has-fade::before]:[z-index:1] tw:[&.has-fade::before]:[top:2.25rem] tw:[&.has-fade::before]:[background:linear-gradient(var(--bg-card),_transparent)]`,
    String.raw`tw:[&.has-fade::after]:[content:""] tw:[&.has-fade::after]:absolute tw:[&.has-fade::after]:[left:0] tw:[&.has-fade::after]:[right:0] tw:[&.has-fade::after]:[height:16px] tw:[&.has-fade::after]:pointer-events-none tw:[&.has-fade::after]:[z-index:1] tw:[&.has-fade::after]:[bottom:.5rem] tw:[&.has-fade::after]:[background:linear-gradient(transparent,_var(--bg-card))]`,
    String.raw`tw:max-480:[&.has-fade::before]:[height:12px]`,
    String.raw`tw:max-480:[&.has-fade::after]:[height:12px]`,
  ].join(' '),
  // servicios
  "service-links-title": [
    String.raw`tw:[font-family:var(--subtitulos)] tw:[font-size:1.125rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:.5rem] tw:[margin-left:0] tw:text-left`,
    String.raw`tw:max-480:[margin-top:4px] tw:max-480:[margin-right:0] tw:max-480:[margin-bottom:6px] tw:max-480:[margin-left:0] tw:max-480:[font-size:1rem] tw:max-480:text-left`,
  ].join(' '),
  // servicios
  "service-links": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[width:100%]`,
    String.raw`tw:max-480:[row-gap:10px] tw:max-480:[column-gap:10px]`,
  ].join(' '),
  // servicios
  "service-links--scroller": [
    String.raw`tw:[&.service-links--scroller]:[max-height:220px] tw:[&.service-links--scroller]:overflow-auto tw:[&.service-links--scroller]:[overscroll-behavior:contain] tw:[&.service-links--scroller]:[-webkit-overflow-scrolling:touch] tw:[&.service-links--scroller]:[padding-right:.25rem] tw:[&.service-links--scroller]:[scroll-behavior:smooth] tw:[&.service-links--scroller]:[scrollbar-width:none]`,
    String.raw`tw:[&::-webkit-scrollbar]:[width:0] tw:[&::-webkit-scrollbar]:[height:0]`,
    String.raw`tw:[&:focus]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus]:[outline-offset:2px]`,
    String.raw`tw:max-480:[&.service-links--scroller]:[max-height:260px] tw:max-480:[&.service-links--scroller]:[padding-right:4px] tw:max-480:[&.service-links--scroller]:[scrollbar-width:none]`,
    String.raw`tw:max-480:[&::-webkit-scrollbar]:[width:0] tw:max-480:[&::-webkit-scrollbar]:[height:0]`,
  ].join(' '),
  // servicios
  "service-link-item": [
    String.raw`tw:flex tw:items-center tw:[row-gap:.75rem] tw:[column-gap:.75rem] tw:[padding-top:1rem] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem] tw:[background:var(--colorFondo)] tw:[border:1px_solid_var(--border)] tw:[border-radius:var(--radius-lg)] tw:no-underline tw:[color:var(--colorTexto)] tw:[transition:var(--transition)] tw:[width:100%] tw:box-border tw:[min-width:0] tw:text-left`,
    String.raw`tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-sm)]`,
    String.raw`tw:max-480:grid tw:max-480:[grid-template-columns:28px_1fr_14px] tw:max-480:items-center tw:max-480:[column-gap:10px] tw:max-480:[padding-top:10px] tw:max-480:[padding-right:12px] tw:max-480:[padding-bottom:10px] tw:max-480:[padding-left:12px] tw:max-480:[border-radius:12px] tw:max-480:text-left`,
  ].join(' '),
  // servicios
  "service-link-icon": [
    String.raw`tw:[width:24px] tw:[height:24px] tw:flex tw:items-center tw:justify-center tw:[background:var(--colorPrincipal)] tw:[color:#fff] tw:[border-radius:var(--radius-sm)] tw:[font-size:.875rem] tw:[flex-shrink:0]`,
    String.raw`tw:max-480:[width:22px] tw:max-480:[height:22px] tw:max-480:[font-size:.8rem]`,
  ].join(' '),
  // servicios
  "service-link-text": [
    String.raw`tw:[flex:1] tw:[font-family:var(--texto)] tw:font-medium tw:[font-size:.95rem] tw:[min-width:0] tw:[overflow-wrap:anywhere]`,
    String.raw`tw:max-480:[font-size:.92rem] tw:max-480:[line-height:1.4] tw:max-480:[min-width:0]`,
  ].join(' '),
  // servicios
  "service-link-arrow": [
    String.raw`tw:[color:var(--muted)] tw:[font-size:1.125rem] tw:[flex-shrink:0]`,
    String.raw`tw:max-480:[font-size:1rem] tw:max-480:[opacity:.7]`,
  ].join(' '),
  // servicios
  "service-link-button": [
    String.raw`tw:[border:1px_solid_var(--border)] tw:[background:var(--colorFondo)] tw:cursor-pointer tw:[font:inherit] tw:[color:inherit]`,
  ].join(' '),
  // cursosICIC
  "cursos-icic-page": [
    String.raw`tw:[min-height:80vh] tw:[padding-top:20px] tw:[padding-right:0] tw:[padding-bottom:20px] tw:[padding-left:0]`,
    String.raw`tw:max-768:[padding-top:10px] tw:max-768:[padding-right:0] tw:max-768:[padding-bottom:10px] tw:max-768:[padding-left:0]`,
  ].join(' '),
  // cursosICIC
  "page-header": [
    String.raw`tw:text-center tw:[padding-top:60px] tw:[padding-right:5vw] tw:[padding-bottom:40px] tw:[padding-left:5vw] tw:[background:linear-gradient(135deg,_#f8f9fa_0%,_var(--colorFondo)_100%)] tw:[border-bottom:1px_solid_var(--line)] tw:[margin-top:var(--header-offset)]`,
    String.raw`tw:[&_h1]:[font-size:clamp(28px,_5vw,_42px)] tw:[&_h1]:[margin-top:0] tw:[&_h1]:[margin-right:0] tw:[&_h1]:[margin-bottom:12px] tw:[&_h1]:[margin-left:0] tw:[&_h1]:[color:var(--txt)] tw:[&_h1]:font-extrabold tw:[&_h1]:[letter-spacing:-0.02em]`,
    String.raw`tw:[&_p]:[font-size:clamp(16px,_2.5vw,_18px)] tw:[&_p]:[color:var(--muted)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:auto] tw:[&_p]:[margin-bottom:20px] tw:[&_p]:[margin-left:auto] tw:[&_p]:[max-width:600px]`,
    String.raw`tw:max-840:[margin-top:-10px]`,
    String.raw`tw:max-768:[padding-top:40px] tw:max-768:[padding-right:5vw] tw:max-768:[padding-bottom:30px] tw:max-768:[padding-left:5vw]`,
    String.raw`tw:[margin-top:var(--site-header-height)]!`,
  ].join(' '),
  // cursosICIC
  "page-stats": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:8px] tw:[padding-right:16px] tw:[padding-bottom:8px] tw:[padding-left:16px] tw:[border-radius:999px] tw:[font-size:14px] tw:font-semibold`,
  ].join(' '),
  // cursosICIC
  "filters-section": [
    String.raw`tw:[padding-top:30px] tw:[padding-right:5vw] tw:[padding-bottom:30px] tw:[padding-left:5vw] tw:[background:var(--colorFondo)] tw:[border-bottom:1px_solid_var(--line)]`,
    String.raw`tw:max-768:[padding-top:20px] tw:max-768:[padding-right:5vw] tw:max-768:[padding-bottom:20px] tw:max-768:[padding-left:5vw]`,
  ].join(' '),
  // cursosICIC
  "filters-container": [
    String.raw`tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:[&_h3]:[margin-bottom:16px] tw:[&_h3]:[color:var(--colorTitulo)]`,
  ].join(' '),
  // cursosICIC
  "filter-buttons": [
    String.raw`tw:flex tw:[row-gap:12px] tw:[column-gap:12px] tw:flex-wrap`,
    String.raw`tw:max-768:justify-center`,
  ].join(' '),
  // cursosICIC
  "filter-btn": [
    String.raw`tw:[padding-top:10px] tw:[padding-right:20px] tw:[padding-bottom:10px] tw:[padding-left:20px] tw:[border:2px_solid_var(--border)] tw:[background:var(--bg-card)] tw:[color:var(--colorTexto)] tw:[border-radius:var(--radius-lg)] tw:cursor-pointer tw:[transition:var(--transition)] tw:font-semibold`,
    String.raw`tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)] tw:[&:hover]:[color:var(--colorPrincipal)]`,
    String.raw`tw:[&.active]:[background:var(--colorPrincipal)] tw:[&.active]:[color:white] tw:[&.active]:[border-top-color:var(--colorPrincipal)] tw:[&.active]:[border-right-color:var(--colorPrincipal)] tw:[&.active]:[border-bottom-color:var(--colorPrincipal)] tw:[&.active]:[border-left-color:var(--colorPrincipal)]`,
  ].join(' '),
  // cursosICIC
  "events-section": [
    String.raw`tw:[padding-top:40px] tw:[padding-right:5vw] tw:[padding-bottom:40px] tw:[padding-left:5vw] tw:[max-width:1200px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // cursosICIC
  "events-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_350px),_1fr))] tw:[row-gap:30px] tw:[column-gap:30px]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:20px] tw:max-768:[column-gap:20px]`,
    String.raw`tw:max-480:[grid-template-columns:1fr]`,
  ].join(' '),
  // cursosICIC
  "event-image-container": [
    String.raw`tw:relative tw:cursor-pointer tw:overflow-hidden`,
  ].join(' '),
  // cursosICIC
  "event-image": [
    String.raw`tw:[width:100%] tw:[height:250px] tw:object-cover tw:block tw:[transition:var(--transition)]`,
    String.raw`tw:[.event-image-container:hover_&]:[transform:scale(1.05)]`,
  ].join(' '),
  // cursosICIC
  "event-overlay": [
    String.raw`tw:absolute tw:[top:0] tw:[left:0] tw:[right:0] tw:[bottom:0] tw:[background:rgba(114,_0,_0,_0.8)] tw:flex tw:items-center tw:justify-center tw:[opacity:0] tw:[transition:var(--transition)]`,
    String.raw`tw:[.event-image-container:hover_&]:[opacity:1]`,
  ].join(' '),
  // cursosICIC
  "view-full": [
    String.raw`tw:[color:white] tw:font-semibold tw:[font-size:16px]`,
  ].join(' '),
  // cursosICIC
  "event-content": [
    String.raw`tw:[padding-top:20px] tw:[padding-right:20px] tw:[padding-bottom:20px] tw:[padding-left:20px]`,
  ].join(' '),
  // cursosICIC
  "event-header": [
    String.raw`tw:flex tw:justify-between tw:items-start tw:[margin-bottom:12px] tw:[row-gap:10px] tw:[column-gap:10px]`,
    String.raw`tw:max-768:flex-col tw:max-768:items-start`,
  ].join(' '),
  // cursosICIC
  "event-badge": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:4px] tw:[padding-right:12px] tw:[padding-bottom:4px] tw:[padding-left:12px] tw:[border-radius:999px] tw:[font-size:12px] tw:font-bold tw:whitespace-nowrap`,
  ].join(' '),
  // cursosICIC
  "event-date": [
    String.raw`tw:[font-size:12px] tw:[color:var(--muted)] tw:text-right tw:[line-height:1.4]`,
    String.raw`tw:max-768:text-left`,
  ].join(' '),
  // cursosICIC
  "event-title": [
    String.raw`tw:[font-size:18px] tw:font-bold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:12px] tw:[margin-left:0] tw:[line-height:1.4]`,
  ].join(' '),
  // cursosICIC
  "event-description": [
    String.raw`tw:[color:var(--colorTexto)] tw:[font-size:14px] tw:[line-height:1.5] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:20px] tw:[margin-left:0]`,
  ].join(' '),
  // cursosICIC
  "event-actions": [
    String.raw`tw:flex tw:[row-gap:10px] tw:[column-gap:10px] tw:flex-wrap`,
    String.raw`tw:max-768:flex-col`,
  ].join(' '),
  // cursosICIC
  "event-btn": [
    String.raw`tw:[padding-top:10px] tw:[padding-right:16px] tw:[padding-bottom:10px] tw:[padding-left:16px] tw:[border:none] tw:[border-radius:var(--radius-sm)] tw:cursor-pointer tw:font-semibold tw:[transition:var(--transition)] tw:[flex:1] tw:[min-width:120px] tw:flex tw:items-center tw:justify-center tw:[row-gap:6px] tw:[column-gap:6px]`,
    String.raw`tw:[&.primary]:[background:var(--colorPrincipal)] tw:[&.primary]:[color:white]`,
    String.raw`tw:[&.primary:hover]:[background:var(--colorSecundario)] tw:[&.primary:hover]:[transform:translateY(-1px)]`,
    String.raw`tw:[&.whatsapp]:[background:#25D366] tw:[&.whatsapp]:[color:white]`,
    String.raw`tw:[&.whatsapp:hover]:[background:#128C7E] tw:[&.whatsapp:hover]:[transform:translateY(-1px)]`,
    String.raw`tw:[&.secondary]:[background:var(--colorFondo)] tw:[&.secondary]:[color:var(--muted)] tw:[&.secondary]:cursor-not-allowed tw:[&.secondary]:[opacity:0.6]`,
    String.raw`tw:max-480:[min-width:100px] tw:max-480:[font-size:14px] tw:max-480:[padding-top:8px] tw:max-480:[padding-right:12px] tw:max-480:[padding-bottom:8px] tw:max-480:[padding-left:12px]`,
  ].join(' '),
  // cursosICIC
  "image-modal-backdrop": [
    String.raw`tw:fixed tw:[top:0] tw:[left:0] tw:[width:100%] tw:[height:100%] tw:[background:rgba(0,_0,_0,_0.9)] tw:flex tw:items-center tw:justify-center tw:[z-index:10000] tw:[padding-top:20px] tw:[padding-right:20px] tw:[padding-bottom:20px] tw:[padding-left:20px]`,
  ].join(' '),
  // cursosICIC
  "image-modal-content": [
    String.raw`tw:relative tw:[max-width:90%] tw:[max-height:90%] tw:[background:#fff] tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:max-768:[max-width:95%] tw:max-768:[max-height:95%]`,
  ].join(' '),
  // cursosICIC
  "modal-close-btn": [
    String.raw`tw:absolute tw:[top:15px] tw:[right:15px] tw:[background:rgba(0,_0,_0,_0.7)] tw:[color:white] tw:[border:none] tw:[width:40px] tw:[height:40px] tw:[border-radius:50%] tw:[font-size:18px] tw:cursor-pointer tw:flex tw:items-center tw:justify-center tw:[z-index:10] tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[background:rgba(0,_0,_0,_0.9)] tw:[&:hover]:[transform:scale(1.1)]`,
    String.raw`tw:max-768:[top:10px] tw:max-768:[right:10px] tw:max-768:[width:35px] tw:max-768:[height:35px] tw:max-768:[font-size:16px]`,
  ].join(' '),
  // cursosICIC
  "modal-footer": [
    String.raw`tw:[padding-top:20px] tw:[padding-right:20px] tw:[padding-bottom:20px] tw:[padding-left:20px] tw:text-center tw:[border-top:1px_solid_var(--border)]`,
  ].join(' '),
  // cursosICIC
  "modal-close-bottom": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:10px] tw:[padding-right:20px] tw:[padding-bottom:10px] tw:[padding-left:20px] tw:[border-radius:var(--radius-sm)] tw:cursor-pointer tw:font-semibold tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-1px)]`,
  ].join(' '),
  // cursosICIC
  "cta-whatsapp-btn": [
    String.raw`tw:[background:#25D366] tw:[color:white] tw:[border:none] tw:[padding-top:14px] tw:[padding-right:28px] tw:[padding-bottom:14px] tw:[padding-left:28px] tw:[border-radius:var(--radius-lg)] tw:font-bold tw:cursor-pointer tw:[transition:var(--transition)] tw:inline-flex tw:items-center tw:[row-gap:10px] tw:[column-gap:10px] tw:[margin-bottom:20px] tw:[font-size:16px]`,
    String.raw`tw:[&:hover]:[background:#128C7E] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)]`,
  ].join(' '),
  // cursosICIC
  "loading-state": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // cursosICIC
  "error-state": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:12px] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:var(--colorTitulo)]`,
    String.raw`tw:[&_p]:[color:var(--muted)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:24px] tw:[&_p]:[margin-left:0]`,
  ].join(' '),
  // cursosICIC
  "empty-state": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:12px] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:var(--colorTitulo)]`,
    String.raw`tw:[&_p]:[color:var(--muted)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:24px] tw:[&_p]:[margin-left:0]`,
  ].join(' '),
  // cursosICIC
  "error-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // cursosICIC
  "empty-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // cursosICIC
  "cta-content": [
    String.raw`tw:[max-width:600px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:[&_h3]:[font-size:24px] tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:16px] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:var(--colorTitulo)]`,
    String.raw`tw:[&_p]:[color:var(--muted)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:30px] tw:[&_p]:[margin-left:0] tw:[&_p]:[line-height:1.6]`,
  ].join(' '),
  // cursosICIC
  "cta-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // cursosICIC
  "cta-info": [
    String.raw`tw:flex tw:justify-center tw:[row-gap:30px] tw:[column-gap:30px] tw:flex-wrap tw:[margin-top:20px]`,
    String.raw`tw:max-768:flex-col tw:max-768:[row-gap:15px] tw:max-768:[column-gap:15px]`,
  ].join(' '),
  // cursosICIC
  "info-item": [
    String.raw`tw:flex tw:items-center tw:[row-gap:8px] tw:[column-gap:8px] tw:[color:var(--colorTexto)] tw:[font-size:14px]`,
  ].join(' '),
  // cursosICIC
  "info-icon": [
    String.raw`tw:[font-size:16px]`,
  ].join(' '),
  // asociadoProveedor
  "asociado-proveedor-container": [
    String.raw`tw:[max-width:1200px] tw:[margin-top:100px] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:2rem] tw:[padding-right:2rem] tw:[padding-bottom:2rem] tw:[padding-left:2rem]`,
    String.raw`tw:max-768:[padding-top:1rem] tw:max-768:[padding-right:1rem] tw:max-768:[padding-bottom:1rem] tw:max-768:[padding-left:1rem]`,
    String.raw`tw:[margin-top:var(--site-header-height)]! tw:max-480:[padding-left:1rem] tw:max-480:[padding-right:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "asociado-header": [
    String.raw`tw:text-center tw:[margin-bottom:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "subtitle": [
    String.raw`tw:[.asociado-header_&]:[color:var(--colorSecundario)] tw:[.asociado-header_&]:[max-width:700px] tw:[.asociado-header_&]:[margin-top:0] tw:[.asociado-header_&]:[margin-right:auto] tw:[.asociado-header_&]:[margin-bottom:0] tw:[.asociado-header_&]:[margin-left:auto]`,
  ].join(' '),
  // asociadoProveedor
  "search-container": [
    String.raw`tw:flex tw:justify-center tw:[margin-top:1rem] tw:[margin-right:0] tw:[margin-bottom:.25rem] tw:[margin-left:0]`,
  ].join(' '),
  // asociadoProveedor
  "search-input": [
    String.raw`tw:[width:100%] tw:[max-width:520px] tw:[padding-top:.8rem] tw:[padding-right:1rem] tw:[padding-bottom:.8rem] tw:[padding-left:1rem] tw:[border:1px_solid_var(--border)] tw:[border-radius:10px] tw:[font-family:var(--texto)] tw:[outline:none] tw:[box-shadow:0_1px_2px_rgba(0,_0,_0,_.02)]`,
    String.raw`tw:[&:focus]:[border-top-color:var(--colorPrincipal)] tw:[&:focus]:[border-right-color:var(--colorPrincipal)] tw:[&:focus]:[border-bottom-color:var(--colorPrincipal)] tw:[&:focus]:[border-left-color:var(--colorPrincipal)] tw:[&:focus]:[box-shadow:0_0_0_3px_color-mix(in_srgb,_var(--colorPrincipal)_18%,_transparent)]`,
  ].join(' '),
  // asociadoProveedor
  "results-count": [
    String.raw`tw:text-center tw:[color:var(--muted)] tw:[margin-bottom:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "afiliados-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] tw:[row-gap:24px] tw:[column-gap:24px] tw:items-stretch`,
    String.raw`tw:max-768:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_260px),_1fr))] tw:max-768:[row-gap:20px] tw:max-768:[column-gap:20px]`,
    String.raw`tw:max-480:[grid-template-columns:1fr] tw:max-480:[row-gap:16px] tw:max-480:[column-gap:16px]`,
  ].join(' '),
  // asociadoProveedor
  "afiliado-card": [
    String.raw`tw:flex tw:flex-col tw:items-center tw:justify-between tw:[background:#fff] tw:[border-radius:16px] tw:[padding-top:24px] tw:[padding-right:24px] tw:[padding-bottom:24px] tw:[padding-left:24px] tw:[box-shadow:0_6px_14px_rgba(0,_0,_0,_.08)] tw:[height:360px] tw:[width:100%] tw:box-border tw:overflow-hidden tw:[contain:layout_paint_style] tw:relative tw:[min-width:0] tw:[flex-shrink:0]`,
    String.raw`tw:max-768:[height:340px] tw:max-768:[padding-top:20px] tw:max-768:[padding-right:20px] tw:max-768:[padding-bottom:20px] tw:max-768:[padding-left:20px]`,
    String.raw`tw:max-480:[height:320px] tw:max-480:[padding-top:16px] tw:max-480:[padding-right:16px] tw:max-480:[padding-bottom:16px] tw:max-480:[padding-left:16px]`,
  ].join(' '),
  // asociadoProveedor
  "afiliado-card__media": [
    String.raw`tw:[width:100%] tw:[height:180px] tw:flex tw:items-center tw:justify-center tw:overflow-hidden tw:[border-radius:12px] tw:[flex-shrink:0]`,
    String.raw`tw:[&.media-rectangular]:[height:140px] tw:[&.media-rectangular]:[padding-top:1rem] tw:[&.media-rectangular]:[padding-right:1rem] tw:[&.media-rectangular]:[padding-bottom:1rem] tw:[&.media-rectangular]:[padding-left:1rem] tw:[&.media-rectangular]:[flex-shrink:0]`,
    String.raw`tw:max-768:[height:160px]`,
    String.raw`tw:max-768:[&.media-rectangular]:[height:120px] tw:max-768:[&.media-rectangular]:[padding-top:0.8rem] tw:max-768:[&.media-rectangular]:[padding-right:0.8rem] tw:max-768:[&.media-rectangular]:[padding-bottom:0.8rem] tw:max-768:[&.media-rectangular]:[padding-left:0.8rem]`,
    String.raw`tw:max-480:[height:140px]`,
    String.raw`tw:max-480:[&.media-rectangular]:[height:100px] tw:max-480:[&.media-rectangular]:[padding-top:0.6rem] tw:max-480:[&.media-rectangular]:[padding-right:0.6rem] tw:max-480:[&.media-rectangular]:[padding-bottom:0.6rem] tw:max-480:[&.media-rectangular]:[padding-left:0.6rem]`,
  ].join(' '),
  // asociadoProveedor
  "afiliado-logo": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:object-contain tw:block tw:[flex-shrink:0]`,
  ].join(' '),
  // asociadoProveedor
  "image-rectangular": [
    String.raw`tw:[max-width:90%]! tw:[max-height:80%]! tw:[width:auto]! tw:[height:auto]! tw:[flex-shrink:0]`,
  ].join(' '),
  // asociadoProveedor
  "image-square": [
    String.raw`tw:[max-width:100%] tw:[max-height:100%] tw:[flex-shrink:0]`,
  ].join(' '),
  // asociadoProveedor
  "afiliado-logo-placeholder": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:grid tw:[place-items:center] tw:[border-radius:12px] tw:[font-family:var(--titulos)] tw:[font-size:2rem] tw:font-bold tw:[flex-shrink:0]`,
  ].join(' '),
  // asociadoProveedor
  "afiliado-nombre": [
    String.raw`tw:[margin-top:12px] tw:[margin-right:0] tw:[margin-bottom:8px] tw:[margin-left:0] tw:font-extrabold tw:[color:var(--colorTitulo)] tw:text-center tw:[display:-webkit-box] tw:[-webkit-line-clamp:2] tw:[-webkit-box-orient:vertical] tw:overflow-hidden tw:[line-height:1.3] tw:[height:calc(1.3em_*_2_+_6px)] tw:[min-height:calc(1.3em_*_2_+_6px)] tw:[width:100%] tw:[flex-shrink:0]`,
    String.raw`tw:max-768:[height:calc(1.3em_*_2_+_4px)] tw:max-768:[min-height:calc(1.3em_*_2_+_4px)]`,
  ].join(' '),
  // asociadoProveedor
  "ver-mas-btn": [
    String.raw`tw:[width:100%] tw:[height:48px] tw:[border:none] tw:[border-radius:8px] tw:font-semibold tw:cursor-pointer tw:[background:linear-gradient(135deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[color:#fff] tw:[transition:transform_.2s_ease,_box-shadow_.25s_ease] tw:[will-change:transform] tw:[flex-shrink:0] tw:[font-family:var(--texto)] tw:[font-size:0.95rem]`,
    String.raw`tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:0_8px_25px_rgba(114,_0,_0,_.35)]`,
  ].join(' '),
  // asociadoProveedor
  "modal-layout": [
    String.raw`tw:grid tw:[grid-template-columns:400px_1fr] tw:[row-gap:32px] tw:[column-gap:32px] tw:[padding-top:28px] tw:[padding-right:28px] tw:[padding-bottom:28px] tw:[padding-left:28px] tw:[flex:1] tw:[min-height:0]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:16px] tw:max-768:[column-gap:16px] tw:max-768:[padding-top:20px] tw:max-768:[padding-right:20px] tw:max-768:[padding-bottom:20px] tw:max-768:[padding-left:20px]`,
    String.raw`tw:max-480:[padding-top:16px] tw:max-480:[padding-right:16px] tw:max-480:[padding-bottom:16px] tw:max-480:[padding-left:16px] tw:max-480:[row-gap:12px] tw:max-480:[column-gap:12px]`,
  ].join(' '),
  // asociadoProveedor
  "modal-image-section--rectangular": [
    String.raw`tw:[&.modal-image-section--rectangular]:flex tw:[&.modal-image-section--rectangular]:items-center tw:[&.modal-image-section--rectangular]:justify-center tw:[&.modal-image-section--rectangular]:[border-radius:16px] tw:[&.modal-image-section--rectangular]:overflow-hidden tw:[&.modal-image-section--rectangular]:[padding-top:2rem] tw:[&.modal-image-section--rectangular]:[padding-right:2rem] tw:[&.modal-image-section--rectangular]:[padding-bottom:2rem] tw:[&.modal-image-section--rectangular]:[padding-left:2rem] tw:[&.modal-image-section--rectangular]:[max-height:400px] tw:[&.modal-image-section--rectangular]:[min-height:200px] tw:[&.modal-image-section--rectangular]:[margin-top:15px]`,
    String.raw`tw:max-768:[&.modal-image-section--rectangular]:[max-height:250px] tw:max-768:[&.modal-image-section--rectangular]:[min-height:200px] tw:max-768:[&.modal-image-section--rectangular]:[padding-top:1.5rem] tw:max-768:[&.modal-image-section--rectangular]:[padding-right:1.5rem] tw:max-768:[&.modal-image-section--rectangular]:[padding-bottom:1.5rem] tw:max-768:[&.modal-image-section--rectangular]:[padding-left:1.5rem] tw:max-768:[&.modal-image-section--rectangular]:[margin-top:0]`,
    String.raw`tw:max-480:[&.modal-image-section--rectangular]:[max-height:200px] tw:max-480:[&.modal-image-section--rectangular]:[min-height:150px] tw:max-480:[&.modal-image-section--rectangular]:[padding-top:1rem] tw:max-480:[&.modal-image-section--rectangular]:[padding-right:1rem] tw:max-480:[&.modal-image-section--rectangular]:[padding-bottom:1rem] tw:max-480:[&.modal-image-section--rectangular]:[padding-left:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "modal-image-section--square": [
    String.raw`tw:[&.modal-image-section--square]:flex tw:[&.modal-image-section--square]:items-center tw:[&.modal-image-section--square]:justify-center tw:[&.modal-image-section--square]:[border-radius:16px] tw:[&.modal-image-section--square]:overflow-hidden tw:[&.modal-image-section--square]:[padding-top:2rem] tw:[&.modal-image-section--square]:[padding-right:2rem] tw:[&.modal-image-section--square]:[padding-bottom:2rem] tw:[&.modal-image-section--square]:[padding-left:2rem] tw:[&.modal-image-section--square]:[max-height:400px] tw:[&.modal-image-section--square]:[min-height:400px] tw:[&.modal-image-section--square]:[margin-top:40px]`,
    String.raw`tw:max-768:[&.modal-image-section--square]:[max-height:250px] tw:max-768:[&.modal-image-section--square]:[min-height:200px] tw:max-768:[&.modal-image-section--square]:[padding-top:1.5rem] tw:max-768:[&.modal-image-section--square]:[padding-right:1.5rem] tw:max-768:[&.modal-image-section--square]:[padding-bottom:1.5rem] tw:max-768:[&.modal-image-section--square]:[padding-left:1.5rem] tw:max-768:[&.modal-image-section--square]:[margin-top:0]`,
    String.raw`tw:max-480:[&.modal-image-section--square]:[max-height:200px] tw:max-480:[&.modal-image-section--square]:[min-height:150px] tw:max-480:[&.modal-image-section--square]:[padding-top:1rem] tw:max-480:[&.modal-image-section--square]:[padding-right:1rem] tw:max-480:[&.modal-image-section--square]:[padding-bottom:1rem] tw:max-480:[&.modal-image-section--square]:[padding-left:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "modal-image--rectangular": [
    String.raw`tw:[&.modal-image--rectangular]:[width:100%]! tw:[&.modal-image--rectangular]:[height:100%]! tw:[&.modal-image--rectangular]:[max-width:100%]! tw:[&.modal-image--rectangular]:[max-height:1000%]! tw:[&.modal-image--rectangular]:object-contain tw:[&.modal-image--rectangular]:block`,
    String.raw`tw:max-768:[&.modal-image--rectangular]:[max-width:95%]! tw:max-768:[&.modal-image--rectangular]:[max-height:85%]!`,
  ].join(' '),
  // asociadoProveedor
  "modal-image--square": [
    String.raw`tw:[&.modal-image--square]:[width:auto] tw:[&.modal-image--square]:[height:auto] tw:[&.modal-image--square]:[max-width:100%] tw:[&.modal-image--square]:[max-height:100%] tw:[&.modal-image--square]:object-contain tw:[&.modal-image--square]:block`,
  ].join(' '),
  // asociadoProveedor
  "modal-image-placeholder": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:grid tw:[place-items:center] tw:[background:#f0f0f0] tw:[border-radius:12px] tw:[color:#999] tw:[font-family:var(--titulos)] tw:[font-size:3rem] tw:font-bold`,
  ].join(' '),
  // asociadoProveedor
  "modal-content-section": [
    String.raw`tw:overflow-auto tw:[padding-right:8px] tw:[max-height:calc(92vh_-_56px)] tw:flex tw:flex-col`,
    String.raw`tw:[&::-webkit-scrollbar]:[width:6px]`,
    String.raw`tw:[&::-webkit-scrollbar-track]:[background:#f1f1f1] tw:[&::-webkit-scrollbar-track]:[border-radius:3px]`,
    String.raw`tw:[&::-webkit-scrollbar-thumb]:[background:#c1c1c1] tw:[&::-webkit-scrollbar-thumb]:[border-radius:3px]`,
    String.raw`tw:[&::-webkit-scrollbar-thumb:hover]:[background:#a8a8a8]`,
    String.raw`tw:max-768:[max-height:calc(92vh_-_40px)] tw:max-768:[padding-right:4px]`,
  ].join(' '),
  // asociadoProveedor
  "modal-header": [
    String.raw`tw:sticky tw:[top:0] tw:[background:#fff] tw:[z-index:5] tw:[padding-bottom:0.75rem] tw:[border-bottom:1px_solid_#eee] tw:[margin-bottom:0.5rem]`,
  ].join(' '),
  // asociadoProveedor
  "modal-title": [
    String.raw`tw:[font-family:var(--titulos)] tw:[font-size:2rem] tw:font-extrabold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:.75rem] tw:[margin-left:0] tw:[padding-bottom:.75rem] tw:[border-bottom:1px_solid_#eee]`,
    String.raw`tw:max-768:[font-size:1.7rem]`,
  ].join(' '),
  // asociadoProveedor
  "modal-body": [
    String.raw`tw:[padding-top:.5rem] tw:[flex:1]`,
  ].join(' '),
  // asociadoProveedor
  "contact-info": [
    String.raw`tw:grid tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[margin-bottom:1.5rem]`,
  ].join(' '),
  // asociadoProveedor
  "contact-item": [
    String.raw`tw:flex tw:[row-gap:.75rem] tw:[column-gap:.75rem] tw:items-start`,
  ].join(' '),
  // asociadoProveedor
  "contact-icon": [
    String.raw`tw:[font-size:1.5rem] tw:[flex-shrink:0] tw:[margin-top:2px] tw:[width:40px] tw:text-center`,
    String.raw`tw:max-480:[font-size:1.25rem] tw:max-480:[width:30px]`,
  ].join(' '),
  // asociadoProveedor
  "contact-details": [
    String.raw`tw:grid tw:[row-gap:.2rem] tw:[column-gap:.2rem] tw:[flex:1] tw:[min-width:0]`,
  ].join(' '),
  // asociadoProveedor
  "contact-label": [
    String.raw`tw:font-bold tw:[color:var(--muted)] tw:uppercase tw:[font-size:.8rem]`,
  ].join(' '),
  // asociadoProveedor
  "contact-value": [
    String.raw`tw:[color:var(--colorTitulo)] tw:[word-break:break-word]`,
  ].join(' '),
  // asociadoProveedor
  "maps-link": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:font-bold tw:[margin-top:.25rem] tw:inline-block`,
  ].join(' '),
  // asociadoProveedor
  "website-section": [
    String.raw`tw:[margin-top:1.25rem] tw:[margin-right:0] tw:[margin-bottom:1.25rem] tw:[margin-left:0]`,
  ].join(' '),
  // asociadoProveedor
  "website-link": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:.5rem] tw:[column-gap:.5rem] tw:[background:linear-gradient(135deg,_var(--colorPrincipal),_var(--colorSecundario))] tw:[color:#fff] tw:[padding-top:.9rem] tw:[padding-right:1.4rem] tw:[padding-bottom:.9rem] tw:[padding-left:1.4rem] tw:[border-radius:10px] tw:font-bold tw:no-underline`,
    String.raw`tw:[&:visited]:[color:#fff]`,
    String.raw`tw:[&:hover]:[color:#fff] tw:[&:hover]:no-underline`,
    String.raw`tw:[&:focus]:[color:#fff] tw:[&:focus]:no-underline`,
    String.raw`tw:[&:active]:[color:#fff] tw:[&:active]:no-underline`,
  ].join(' '),
  // asociadoProveedor
  "social-section": [
    String.raw`tw:[margin-top:1rem] tw:[padding-top:1rem] tw:[border-top:1px_solid_#f0f0f0]`,
  ].join(' '),
  // asociadoProveedor
  "social-title": [
    String.raw`tw:[margin-bottom:.6rem] tw:[font-size:1.1rem] tw:[color:var(--colorTitulo)]`,
  ].join(' '),
  // asociadoProveedor
  "social-links": [
    String.raw`tw:flex tw:[row-gap:.6rem] tw:[column-gap:.6rem] tw:flex-wrap`,
  ].join(' '),
  // asociadoProveedor
  "social-svg": [
    String.raw`tw:[width:22px] tw:[height:22px] tw:[fill:var(--colorPrincipal)]`,
  ].join(' '),
  // asociadoProveedor
  "loader-container": [
    String.raw`tw:text-center tw:[padding-top:2rem] tw:[padding-right:0] tw:[padding-bottom:2rem] tw:[padding-left:0]`,
  ].join(' '),
  // asociadoProveedor
  "loader": [
    String.raw`tw:[color:var(--muted)] tw:[margin-bottom:1rem]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] tw:[row-gap:24px] tw:[column-gap:24px]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-card": [
    String.raw`tw:[background:#fff] tw:[border-radius:16px] tw:[padding-top:24px] tw:[padding-right:24px] tw:[padding-bottom:24px] tw:[padding-left:24px] tw:[height:360px] tw:grid tw:[grid-template-rows:1fr_auto] tw:[row-gap:12px] tw:[column-gap:12px] tw:[box-shadow:0_6px_14px_rgba(0,_0,_0,_.06)]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-media": [
    String.raw`tw:[height:180px] tw:[border-radius:12px] tw:[background:linear-gradient(90deg,_#eee,_#f5f5f5,_#eee)] tw:[background-size:200%_100%] tw:[animation:cmic-pulse_1.2s_linear_infinite]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-content": [
    String.raw`tw:grid tw:[row-gap:10px] tw:[column-gap:10px]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-title": [
    String.raw`tw:[height:16px] tw:[border-radius:6px] tw:[background:linear-gradient(90deg,_#eee,_#f5f5f5,_#eee)] tw:[background-size:200%_100%] tw:[animation:cmic-pulse_1.2s_linear_infinite]`,
  ].join(' '),
  // asociadoProveedor
  "skeleton-button": [
    String.raw`tw:[height:48px] tw:[border-radius:8px] tw:[background:linear-gradient(90deg,_#eee,_#f5f5f5,_#eee)] tw:[background-size:200%_100%] tw:[animation:cmic-pulse_1.2s_linear_infinite]`,
  ].join(' '),
  // asociadoProveedor
  "image-skeleton": [
    String.raw`tw:[width:100%] tw:[height:100%] tw:[border-radius:inherit] tw:[background:linear-gradient(90deg,_#eee,_#f5f5f5,_#eee)] tw:[background-size:200%_100%] tw:[animation:cmic-pulse_1.2s_linear_infinite]`,
  ].join(' '),
  // asociadoProveedor
  "error-message": [
    String.raw`tw:[color:#b91c1c] tw:[margin-bottom:.75rem] tw:font-bold`,
  ].join(' '),
  // afiliacion2025
  "afi-wrap": [
    String.raw`tw:[--maxw:1280px] tw:[--pad:clamp(1.25rem,_5vw,_4rem)] tw:[--gap:clamp(1.25rem,_3.5vw,_3rem)] tw:[min-height:100vh] tw:[background:var(--colorFondo)] tw:[padding-top:calc(var(--site-header-height,_100px)_+_1.25rem)] tw:[padding-right:var(--pad)] tw:[padding-bottom:3rem] tw:[padding-left:var(--pad)] tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:[contain:layout_style_paint] tw:[content-visibility:auto]`,
    String.raw`tw:motion-reduce:[&_*]:[animation-duration:0.01ms]! tw:motion-reduce:[&_*]:[animation-iteration-count:1]! tw:motion-reduce:[&_*]:[transition-duration:0.01ms]!`,
    String.raw`tw:max-480:[--pad:1rem] tw:max-480:[padding-top:calc(var(--site-header-height,_100px)_+_1rem)] tw:max-480:[padding-right:var(--pad)] tw:max-480:[padding-bottom:2rem] tw:max-480:[padding-left:var(--pad)]`,
    String.raw`tw:print:[background:#fff]! tw:print:[color:black]!`,
  ].join(' '),
  // afiliacion2025
  "afi-main": [
    String.raw`tw:[max-width:var(--maxw)] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // afiliacion2025
  "afi-hero": [
    String.raw`tw:flex tw:items-center tw:[min-height:70vh] tw:[margin-bottom:4rem]`,
    String.raw`tw:max-810:[margin-bottom:-400px]`,
    String.raw`tw:max-480:[min-height:60vh] tw:max-480:[margin-bottom:3rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-hero-content": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:var(--gap)] tw:[column-gap:var(--gap)] tw:items-center tw:[width:100%]`,
    String.raw`tw:max-1024:[row-gap:3rem] tw:max-1024:[column-gap:3rem]`,
    String.raw``,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:2rem] tw:max-768:[column-gap:2rem] `,
    String.raw`tw:max-1024:[grid-template-columns:minmax(0,_1fr)] tw:max-1024:[row-gap:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-hero-text": [
    String.raw`tw:[max-width:600px]`,
    String.raw`tw:max-768:[order:2] tw:max-768:text-center`,
  ].join(' '),
  // afiliacion2025
  "afi-badge": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:0.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1.5rem] tw:[border-radius:25px] tw:[font-size:0.875rem] tw:font-semibold tw:[margin-bottom:1.5rem] tw:[font-family:var(--subtitulos)] tw:uppercase tw:[letter-spacing:0.5px]`,
  ].join(' '),
  // afiliacion2025
  "afi-title": [
    String.raw`tw:[font-size:clamp(2.5rem,_5vw,_3.5rem)] tw:font-bold tw:[line-height:1.2] tw:[color:var(--colorTitulo)] tw:[margin-bottom:1.5rem] tw:[font-family:var(--titulos)]`,
    String.raw`tw:max-480:[font-size:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-subtitle": [
    String.raw`tw:[font-size:1.25rem] tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[margin-bottom:2.5rem] tw:[font-family:var(--texto)]`,
    String.raw`tw:max-480:[font-size:1.125rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-actions": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:flex-wrap`,
    String.raw`tw:max-768:justify-center`,
    String.raw`tw:print:hidden!`,
    String.raw`tw:max-480:flex-col tw:max-480:[&>a]:w-full tw:max-480:[&>button]:w-full tw:max-480:[&>a]:justify-center`,
  ].join(' '),
  // afiliacion2025
  "btn-tertiary": [
    String.raw`tw:[&.btn-tertiary]:[background:transparent] tw:[&.btn-tertiary]:[color:var(--colorTitulo)] tw:[&.btn-tertiary]:[border:1.5px_solid_var(--border)]`,
    String.raw`tw:[&:hover]:[background:rgba(114,_0,_0,_0.05)] tw:[&:hover]:[transform:translateY(-2px)]`,
  ].join(' '),
  // afiliacion2025
  "btn-icon": [
    String.raw`tw:[font-size:1.2em]`,
  ].join(' '),
  // afiliacion2025
  "afi-hero-media": [
    String.raw`tw:flex tw:justify-center tw:items-center`,
    String.raw`tw:max-768:[order:1]`,
  ].join(' '),
  // afiliacion2025
  "afi-image-container": [
    String.raw`tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-lg)] tw:[background:#fff]`,
  ].join(' '),
  // afiliacion2025
  "afi-hero-image": [
    String.raw`tw:[width:100%] tw:[height:auto] tw:block tw:[transition:var(--transition)] tw:[transform:translateZ(0)] tw:[backface-visibility:hidden] tw:[will-change:transform] tw:[background:linear-gradient(90deg,_#f0f0f0_25%,_#e0e0e0_50%,_#f0f0f0_75%)] tw:[background-size:200%_100%]`,
    String.raw`tw:[&:hover]:[transform:scale(1.02)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]! tw:motion-reduce:[animation:none] tw:motion-reduce:[background:#f0f0f0]`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
    String.raw`tw:motion-safe:[animation:cmic-loading_1.5s_infinite]`,
  ].join(' '),
  // afiliacion2025
  "afi-benefits": [
    String.raw`tw:[margin-top:6rem] tw:[margin-right:0] tw:[margin-bottom:6rem] tw:[margin-left:0] tw:[padding-top:2rem] tw:[padding-right:0] tw:[padding-bottom:2rem] tw:[padding-left:0] tw:[content-visibility:auto] tw:[contain-intrinsic-size:1000px]`,
  ].join(' '),
  // afiliacion2025
  "afi-benefits-header": [
    String.raw`tw:text-center tw:[margin-bottom:4rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-benefits-title": [
    String.raw`tw:[font-size:2.5rem] tw:font-bold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--titulos)]`,
    String.raw`tw:max-480:[font-size:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-benefits-subtitle": [
    String.raw`tw:[font-size:1.25rem] tw:[color:var(--colorTexto)] tw:[font-family:var(--subtitulos)] tw:[max-width:600px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // afiliacion2025
  "afi-benefits-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_350px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[margin-top:3rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:1.5rem] tw:max-768:[column-gap:1.5rem]`,
    String.raw`tw:max-480:[grid-template-columns:1fr]`,
  ].join(' '),
  // afiliacion2025
  "afi-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[padding-top:2.5rem] tw:[padding-right:2rem] tw:[padding-bottom:2.5rem] tw:[padding-left:2rem] tw:[border-radius:var(--radius-xl)] tw:[box-shadow:var(--shadow-sm)] tw:[border:1px_solid_var(--border)] tw:[transition:var(--transition)] tw:text-center tw:[height:100%] tw:flex tw:flex-col tw:items-center`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
    String.raw`tw:contrast-high:[border:2px_solid_currentColor]`,
    String.raw`tw:max-768:[padding-top:2rem] tw:max-768:[padding-right:1.5rem] tw:max-768:[padding-bottom:2rem] tw:max-768:[padding-left:1.5rem]`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
    String.raw`tw:print:[break-inside:avoid] tw:print:[box-shadow:none]! tw:print:[border:1px_solid_#ccc]!`,
  ].join(' '),
  // afiliacion2025
  "afi-card-icon": [
    String.raw`tw:[width:80px] tw:[height:80px] tw:[background:var(--colorFondo)] tw:[border-radius:var(--radius-lg)] tw:flex tw:items-center tw:justify-center tw:[margin-bottom:1.5rem]`,
    String.raw`tw:[&_img]:[width:48px] tw:[&_img]:[height:48px] tw:[&_img]:object-contain tw:[&_img]:[transform:translateZ(0)] tw:[&_img]:[backface-visibility:hidden] tw:[&_img]:[will-change:transform]`,
    String.raw`tw:max-1024:[&_img]:[width:clamp(88px,12vw,120px)] tw:max-1024:[&_img]:[height:clamp(88px,12vw,120px)] tw:max-1024:shrink-0`,
    String.raw`tw:max-1024:[width:clamp(112px,16vw,152px)] tw:max-1024:[height:clamp(112px,16vw,152px)]`,
  ].join(' '),
  // afiliacion2025
  "afi-card-body": [
    String.raw`tw:[flex:1] tw:flex tw:flex-col tw:justify-center`,
  ].join(' '),
  // afiliacion2025
  "afi-card-title": [
    String.raw`tw:[font-size:1.5rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // afiliacion2025
  "afi-card-desc": [
    String.raw`tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[font-size:1rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact": [
    String.raw`tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xxl)] tw:[padding-top:4rem] tw:[padding-right:4rem] tw:[padding-bottom:4rem] tw:[padding-left:4rem] tw:[margin-top:6rem] tw:[margin-right:0] tw:[margin-bottom:6rem] tw:[margin-left:0] tw:[box-shadow:var(--shadow-lg)] tw:[border:1px_solid_var(--border)] tw:[content-visibility:auto] tw:[contain-intrinsic-size:1000px]`,
    String.raw`tw:contrast-high:[border:2px_solid_currentColor]`,
    String.raw`tw:max-1024:[padding-top:3rem] tw:max-1024:[padding-right:3rem] tw:max-1024:[padding-bottom:3rem] tw:max-1024:[padding-left:3rem]`,
    String.raw`tw:max-768:[padding-top:2rem] tw:max-768:[padding-right:2rem] tw:max-768:[padding-bottom:2rem] tw:max-768:[padding-left:2rem] tw:max-768:[margin-top:4rem] tw:max-768:[margin-right:0] tw:max-768:[margin-bottom:4rem] tw:max-768:[margin-left:0]`,
    String.raw`tw:max-768:[padding:1.25rem]! tw:max-768:[margin-top:2rem] tw:max-768:[margin-bottom:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-content": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:4rem] tw:[column-gap:4rem] tw:items-center`,
    String.raw`tw:max-1024:[row-gap:3rem] tw:max-1024:[column-gap:3rem]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:2rem] tw:max-768:[column-gap:2rem]`,
    String.raw`tw:max-1024:[grid-template-columns:minmax(0,_1fr)] tw:max-1024:[row-gap:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-badge": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:0.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1.5rem] tw:[border-radius:25px] tw:[font-size:0.875rem] tw:font-semibold tw:[margin-bottom:1.5rem] tw:[font-family:var(--subtitulos)] tw:uppercase tw:[letter-spacing:0.5px]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-title": [
    String.raw`tw:[font-size:2.5rem] tw:font-bold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--titulos)]`,
    String.raw`tw:max-480:[font-size:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-subtitle": [
    String.raw`tw:[font-size:1.25rem] tw:[color:var(--colorTexto)] tw:[margin-bottom:2.5rem] tw:[line-height:1.6]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-info": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[margin-bottom:2rem]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-item": [
    String.raw`tw:flex tw:items-center tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[padding-top:1rem] tw:[padding-right:1rem] tw:[padding-bottom:1rem] tw:[padding-left:1rem] tw:[border-radius:var(--radius-lg)]`,
    String.raw`tw:max-480:flex-col tw:max-480:items-start tw:max-480:[row-gap:0.5rem] tw:max-480:[column-gap:0.5rem] tw:max-480:text-left`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-link": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:underline tw:font-semibold tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:[text-underline-offset:2px]`,
    String.raw`tw:[&:hover]:[color:var(--colorSecundario)] tw:[&:hover]:underline tw:[&:hover]:[text-underline-offset:3px] tw:[&:hover]:[text-decoration-thickness:2px]`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px] tw:[&:focus-visible]:[border-radius:var(--radius-lg)]`,
    String.raw`tw:min-w-0 tw:[overflow-wrap:anywhere]`,
  ].join(' '),
  // afiliacion2025
  "afi-note": [
    String.raw`tw:[color:var(--muted)] tw:[font-size:0.875rem] tw:[font-style:italic]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-media": [
    String.raw`tw:flex tw:justify-center tw:items-center`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-image-container": [
    String.raw`tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-lg)] tw:[background:#fff]`,
  ].join(' '),
  // afiliacion2025
  "afi-contact-image": [
    String.raw`tw:[width:100%] tw:[height:auto] tw:block tw:[transition:var(--transition)] tw:[transform:translateZ(0)] tw:[backface-visibility:hidden] tw:[will-change:transform]`,
    String.raw`tw:[&:hover]:[transform:scale(1.03)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-wrap": [
    String.raw`tw:[--maxw:1280px] tw:[--pad:clamp(1.25rem,_5vw,_4rem)] tw:[--gap:clamp(1.25rem,_3.5vw,_3rem)] tw:[min-height:100vh] tw:[background:var(--colorFondo)] tw:[padding-top:calc(var(--site-header-height,_100px)_+_1.25rem)] tw:[padding-right:var(--pad)] tw:[padding-bottom:3rem] tw:[padding-left:var(--pad)] tw:[font-family:var(--texto)] tw:[color:var(--colorTexto)] tw:overflow-x-hidden`,
    String.raw`tw:motion-reduce:[&_*]:[animation-duration:0.01ms]! tw:motion-reduce:[&_*]:[animation-iteration-count:1]! tw:motion-reduce:[&_*]:[transition-duration:0.01ms]!`,
    String.raw`tw:max-640:[--pad:1rem] tw:max-640:[padding-top:calc(var(--site-header-height,_100px)_+_1rem)] tw:max-640:[padding-right:var(--pad)] tw:max-640:[padding-bottom:2rem] tw:max-640:[padding-left:var(--pad)] `,
    String.raw`tw:print:[background:#fff]! tw:print:[color:black]! tw:print:[padding-top:1rem]!`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-main": [
    String.raw`tw:[max-width:var(--maxw)] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[width:100%]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-hero": [
    String.raw`tw:flex tw:items-center tw:[min-height:70vh] tw:[margin-bottom:4rem] tw:relative`,
    String.raw`tw:max-840:[min-height:auto] tw:max-840:[margin-bottom:3rem]`,
    String.raw`tw:max-640:[min-height:auto] tw:max-640:[margin-bottom:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-hero-content": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:var(--gap)] tw:[column-gap:var(--gap)] tw:items-center tw:[width:100%]`,
    String.raw`tw:max-1024:[row-gap:clamp(1.5rem,_3vw,_3rem)] tw:max-1024:[column-gap:clamp(1.5rem,_3vw,_3rem)]`,
    String.raw`tw:max-840:[margin-top:0] tw:max-840:[margin-bottom:2rem] tw:max-840:[margin-left:0]`,
    String.raw`tw:max-770:[grid-template-columns:1fr] tw:max-770:[row-gap:2rem] tw:max-770:[column-gap:2rem]`,
    String.raw`tw:print:[grid-template-columns:1fr]!`,
    String.raw`tw:max-1024:[grid-template-columns:minmax(0,_1fr)] tw:max-1024:[row-gap:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-hero-text": [
    String.raw`tw:[max-width:600px]`,
    String.raw`tw:max-770:[order:2] tw:max-770:text-center tw:max-770:[max-width:100%]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-badge": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:0.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1.5rem] tw:[border-radius:25px] tw:[font-size:clamp(0.75rem,_2vw,_0.875rem)] tw:font-semibold tw:[margin-bottom:1.5rem] tw:[font-family:var(--subtitulos)] tw:uppercase tw:[letter-spacing:0.5px]`,
    String.raw`tw:max-480:[padding-top:0.375rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:0.375rem] tw:max-480:[padding-left:1rem] tw:max-480:[font-size:0.75rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-title": [
    String.raw`tw:[font-size:clamp(2rem,_5vw,_3.5rem)] tw:font-bold tw:[line-height:1.2] tw:[color:var(--colorTitulo)] tw:[margin-bottom:1.5rem] tw:[font-family:var(--titulos)] tw:[word-wrap:break-word]`,
    String.raw`tw:max-640:[font-size:1.75rem]`,
    String.raw`tw:max-480:[font-size:1.5rem]`,
    String.raw`tw:max-360:[font-size:1.25rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-subtitle": [
    String.raw`tw:[font-size:clamp(1rem,_2.5vw,_1.25rem)] tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[margin-bottom:2.5rem] tw:[font-family:var(--texto)]`,
    String.raw`tw:max-640:[font-size:1rem] tw:max-640:[margin-bottom:2rem]`,
    String.raw`tw:max-480:[font-size:0.875rem]`,
    String.raw`tw:max-360:[font-size:0.75rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-actions": [
    String.raw`tw:flex tw:[row-gap:1rem] tw:[column-gap:1rem] tw:flex-wrap`,
    String.raw`tw:max-770:justify-center`,
    String.raw`tw:max-640:flex-col tw:max-640:items-center`,
    String.raw`tw:print:hidden!`,
    String.raw`tw:max-480:flex-col tw:max-480:[&>a]:w-full tw:max-480:[&>button]:w-full tw:max-480:[&>a]:justify-center`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-hero-media": [
    String.raw`tw:flex tw:justify-center tw:items-center tw:[width:100%]`,
    String.raw`tw:max-770:[order:1]`,
    String.raw`tw:max-640:[margin-bottom:1rem]`,
    String.raw`tw:print:hidden!`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-image-container": [
    String.raw`tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-lg)] tw:[background:#fff] tw:[width:100%] tw:[max-width:500px]`,
    String.raw`tw:max-1024:[max-width:400px]`,
    String.raw`tw:max-640:[max-width:300px] tw:max-640:[margin-top:0] tw:max-640:[margin-right:auto] tw:max-640:[margin-bottom:0] tw:max-640:[margin-left:auto]`,
    String.raw`tw:max-480:[max-width:250px]`,
    String.raw`tw:max-360:[max-width:200px]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-hero-image": [
    String.raw`tw:[width:100%] tw:[height:auto] tw:block tw:[transition:var(--transition)] tw:[max-width:100%] tw:[transform:translateZ(0)] tw:[backface-visibility:hidden] tw:[will-change:transform] tw:[background:linear-gradient(90deg,_#f0f0f0_25%,_#e0e0e0_50%,_#f0f0f0_75%)] tw:[background-size:200%_100%]`,
    String.raw`tw:[&:hover]:[transform:scale(1.02)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]! tw:motion-reduce:[animation:none] tw:motion-reduce:[background:#f0f0f0]`,
    String.raw`tw:max-770:[max-height:300px] tw:max-770:object-cover`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
    String.raw`tw:motion-safe:[animation:cmic-loading_1.5s_infinite]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-benefits": [
    String.raw`tw:[margin-top:6rem] tw:[margin-right:0] tw:[margin-bottom:6rem] tw:[margin-left:0] tw:[padding-top:2rem] tw:[padding-right:0] tw:[padding-bottom:2rem] tw:[padding-left:0] tw:[width:100%]`,
    String.raw`tw:max-840:[margin-top:4rem] tw:max-840:[margin-right:0] tw:max-840:[margin-bottom:4rem] tw:max-840:[margin-left:0]`,
    String.raw`tw:max-640:[margin-top:3rem] tw:max-640:[margin-right:0] tw:max-640:[margin-bottom:3rem] tw:max-640:[margin-left:0]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-benefits-header": [
    String.raw`tw:text-center tw:[margin-bottom:4rem]`,
    String.raw`tw:max-770:[margin-bottom:2.5rem]`,
    String.raw`tw:max-480:[margin-bottom:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-benefits-title": [
    String.raw`tw:[font-size:clamp(1.75rem,_4vw,_2.5rem)] tw:font-bold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--titulos)] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem]`,
    String.raw`tw:max-640:[font-size:1.5rem]`,
    String.raw`tw:max-480:[font-size:1.25rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-benefits-subtitle": [
    String.raw`tw:[font-size:clamp(1rem,_2.5vw,_1.25rem)] tw:[color:var(--colorTexto)] tw:[font-family:var(--subtitulos)] tw:[max-width:600px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem]`,
    String.raw`tw:max-640:[font-size:1rem]`,
    String.raw`tw:max-480:[font-size:0.875rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-benefits-grid": [
    String.raw`tw:grid tw:[grid-template-columns:repeat(auto-fit,_minmax(min(100%,_350px),_1fr))] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[margin-top:3rem]`,
    String.raw`tw:max-770:[grid-template-columns:1fr] tw:max-770:[row-gap:1.5rem] tw:max-770:[column-gap:1.5rem]`,
    String.raw`tw:max-480:[margin-top:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-card": [
    String.raw`tw:[background:var(--bg-card)] tw:[padding-top:clamp(1.5rem,_3vw,_2.5rem)] tw:[padding-right:clamp(1rem,_2vw,_2rem)] tw:[padding-bottom:clamp(1.5rem,_3vw,_2.5rem)] tw:[padding-left:clamp(1rem,_2vw,_2rem)] tw:[border-radius:var(--radius-xl)] tw:[box-shadow:var(--shadow-sm)] tw:[border:1px_solid_var(--border)] tw:[transition:var(--transition)] tw:text-center tw:[height:100%] tw:flex tw:flex-col tw:items-center tw:[width:100%]`,
    String.raw`tw:[&:hover]:[transform:translateY(-8px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)] tw:[&:hover]:[border-top-color:var(--colorPrincipal)] tw:[&:hover]:[border-right-color:var(--colorPrincipal)] tw:[&:hover]:[border-bottom-color:var(--colorPrincipal)] tw:[&:hover]:[border-left-color:var(--colorPrincipal)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
    String.raw`tw:contrast-high:[border:2px_solid_currentColor]`,
    String.raw`tw:max-770:[padding-top:2rem] tw:max-770:[padding-right:1.5rem] tw:max-770:[padding-bottom:2rem] tw:max-770:[padding-left:1.5rem]`,
    String.raw`tw:max-480:[padding-top:1.5rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:1.5rem] tw:max-480:[padding-left:1rem]`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
    String.raw`tw:print:[break-inside:avoid] tw:print:[box-shadow:none]! tw:print:[border:1px_solid_#ccc]!`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-card-icon": [
    String.raw`tw:[margin-bottom:1.5rem] tw:[padding-top:clamp(1rem,_2vw,_1.5rem)] tw:[padding-right:clamp(1rem,_2vw,_1.5rem)] tw:[padding-bottom:clamp(1rem,_2vw,_1.5rem)] tw:[padding-left:clamp(1rem,_2vw,_1.5rem)] tw:[border-radius:var(--radius-xl)] tw:flex tw:items-center tw:justify-center`,
    String.raw`tw:[&_img]:[width:clamp(60px,_10vw,_80px)] tw:[&_img]:[height:clamp(60px,_10vw,_80px)] tw:[&_img]:object-contain tw:[&_img]:[transform:translateZ(0)] tw:[&_img]:[backface-visibility:hidden] tw:[&_img]:[will-change:transform]`,
    String.raw`tw:max-480:[&_img]:[width:88px] tw:max-480:[&_img]:[height:88px]`,
    String.raw`tw:max-1024:[&_img]:[width:clamp(88px,12vw,120px)] tw:max-1024:[&_img]:[height:clamp(88px,12vw,120px)] tw:max-1024:shrink-0`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-card-body": [
    String.raw`tw:[flex:1] tw:flex tw:flex-col tw:justify-center tw:[width:100%]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-card-title": [
    String.raw`tw:[font-size:clamp(1.25rem,_3vw,_1.5rem)] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--subtitulos)] tw:[word-wrap:break-word]`,
    String.raw`tw:max-480:[font-size:1.125rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-card-desc": [
    String.raw`tw:[color:var(--colorTexto)] tw:[line-height:1.6] tw:[font-size:clamp(0.875rem,_2vw,_1rem)] tw:[word-wrap:break-word]`,
    String.raw`tw:max-480:[font-size:0.875rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact": [
    String.raw`tw:[background:linear-gradient(135deg,_var(--bg-card)_0%,_#fafafa_100%)] tw:[border-radius:var(--radius-xxl)] tw:[padding-top:clamp(2rem,_4vw,_4rem)] tw:[padding-right:clamp(2rem,_4vw,_4rem)] tw:[padding-bottom:clamp(2rem,_4vw,_4rem)] tw:[padding-left:clamp(2rem,_4vw,_4rem)] tw:[margin-top:6rem] tw:[margin-right:0] tw:[margin-bottom:6rem] tw:[margin-left:0] tw:[box-shadow:var(--shadow-lg)] tw:[border:1px_solid_var(--border)] tw:[width:100%]`,
    String.raw`tw:contrast-high:[border:2px_solid_currentColor]`,
    String.raw`tw:max-1024:[padding-top:clamp(1.5rem,_3vw,_3rem)] tw:max-1024:[padding-right:clamp(1.5rem,_3vw,_3rem)] tw:max-1024:[padding-bottom:clamp(1.5rem,_3vw,_3rem)] tw:max-1024:[padding-left:clamp(1.5rem,_3vw,_3rem)]`,
    String.raw`tw:max-840:[margin-top:4rem] tw:max-840:[margin-right:0] tw:max-840:[margin-bottom:4rem] tw:max-840:[margin-left:0]`,
    String.raw`tw:max-770:[padding-top:2rem] tw:max-770:[padding-right:2rem] tw:max-770:[padding-bottom:2rem] tw:max-770:[padding-left:2rem] tw:max-770:[margin-top:3rem] tw:max-770:[margin-right:0] tw:max-770:[margin-bottom:3rem] tw:max-770:[margin-left:0]`,
    String.raw`tw:max-640:[margin-top:3rem] tw:max-640:[margin-right:0] tw:max-640:[margin-bottom:3rem] tw:max-640:[margin-left:0] tw:max-640:[padding-top:1.5rem] tw:max-640:[padding-right:1.5rem] tw:max-640:[padding-bottom:1.5rem] tw:max-640:[padding-left:1.5rem]`,
    String.raw`tw:max-768:[padding:1.25rem]! tw:max-768:[margin-top:2rem] tw:max-768:[margin-bottom:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-content": [
    String.raw`tw:grid tw:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] tw:[row-gap:clamp(2rem,_4vw,_4rem)] tw:[column-gap:clamp(2rem,_4vw,_4rem)] tw:items-center`,
    String.raw`tw:max-1024:[row-gap:clamp(1.5rem,_3vw,_3rem)] tw:max-1024:[column-gap:clamp(1.5rem,_3vw,_3rem)]`,
    String.raw`tw:max-770:[grid-template-columns:1fr] tw:max-770:[row-gap:2rem] tw:max-770:[column-gap:2rem]`,
    String.raw`tw:print:[grid-template-columns:1fr]!`,
    String.raw`tw:max-1024:[grid-template-columns:minmax(0,_1fr)] tw:max-1024:[row-gap:2rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-badge": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:0.5rem] tw:[padding-right:1.5rem] tw:[padding-bottom:0.5rem] tw:[padding-left:1.5rem] tw:[border-radius:25px] tw:[font-size:clamp(0.75rem,_2vw,_0.875rem)] tw:font-semibold tw:[margin-bottom:1.5rem] tw:[font-family:var(--subtitulos)] tw:uppercase tw:[letter-spacing:0.5px]`,
    String.raw`tw:max-480:[padding-top:0.375rem] tw:max-480:[padding-right:1rem] tw:max-480:[padding-bottom:0.375rem] tw:max-480:[padding-left:1rem] tw:max-480:[font-size:0.75rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-title": [
    String.raw`tw:[font-size:clamp(1.75rem,_4vw,_2.5rem)] tw:font-bold tw:[color:var(--colorTitulo)] tw:[margin-bottom:1rem] tw:[font-family:var(--titulos)] tw:[word-wrap:break-word]`,
    String.raw`tw:max-640:[font-size:1.5rem]`,
    String.raw`tw:max-480:[font-size:1.25rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-subtitle": [
    String.raw`tw:[font-size:clamp(1rem,_2.5vw,_1.25rem)] tw:[color:var(--colorTexto)] tw:[margin-bottom:2.5rem] tw:[line-height:1.6] tw:[word-wrap:break-word]`,
    String.raw`tw:max-640:[font-size:1rem]`,
    String.raw`tw:max-480:[font-size:0.875rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-info": [
    String.raw`tw:list-none tw:[padding-top:0] tw:[padding-right:0] tw:[padding-bottom:0] tw:[padding-left:0] tw:[margin-top:2.5rem] tw:[margin-right:0] tw:[margin-bottom:2.5rem] tw:[margin-left:0] tw:[width:100%]`,
    String.raw`tw:max-640:[margin-top:1.5rem] tw:max-640:[margin-right:0] tw:max-640:[margin-bottom:1.5rem] tw:max-640:[margin-left:0]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-item": [
    String.raw`tw:flex tw:items-center tw:[row-gap:1rem] tw:[column-gap:1rem] tw:[margin-bottom:1.25rem] tw:[font-size:clamp(0.875rem,_2vw,_1.125rem)] tw:[padding-top:0.5rem] tw:[padding-right:0] tw:[padding-bottom:0.5rem] tw:[padding-left:0] tw:flex-wrap`,
    String.raw`tw:max-640:flex-row tw:max-640:items-center tw:max-640:[row-gap:0.75rem] tw:max-640:[column-gap:0.75rem] tw:max-640:[margin-bottom:1rem]`,
    String.raw`tw:max-480:[font-size:0.875rem]`,
    String.raw`tw:max-360:flex-col tw:max-360:items-start tw:max-360:[row-gap:0.25rem] tw:max-360:[column-gap:0.25rem]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-link": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:underline tw:font-semibold tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:[word-break:break-all] tw:[text-underline-offset:2px]`,
    String.raw`tw:[&:hover]:[color:var(--colorSecundario)] tw:[&:hover]:underline tw:[&:hover]:[text-underline-offset:3px] tw:[&:hover]:[text-decoration-thickness:2px]`,
    String.raw`tw:[&:focus-visible]:[outline:2px_solid_var(--colorPrincipal)] tw:[&:focus-visible]:[outline-offset:2px] tw:[&:focus-visible]:[border-radius:var(--radius-lg)]`,
    String.raw`tw:max-360:[word-break:break-word]`,
    String.raw`tw:min-w-0 tw:[overflow-wrap:anywhere]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-note": [
    String.raw`tw:[color:var(--muted)] tw:[font-size:clamp(0.75rem,_1.5vw,_0.875rem)] tw:[font-style:italic] tw:[word-wrap:break-word]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-media": [
    String.raw`tw:flex tw:justify-center tw:items-center tw:[width:100%]`,
    String.raw`tw:print:hidden!`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-image-container": [
    String.raw`tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[box-shadow:var(--shadow-lg)] tw:[background:#fff] tw:[width:100%] tw:[max-width:500px]`,
    String.raw`tw:max-1024:[max-width:400px]`,
    String.raw`tw:max-480:[max-width:250px]`,
    String.raw`tw:max-360:[max-width:200px]`,
  ].join(' '),
  // asociadoEstudiantil
  "ase-contact-image": [
    String.raw`tw:[width:100%] tw:[height:auto] tw:block tw:[transition:var(--transition)] tw:[max-width:100%] tw:[transform:translateZ(0)] tw:[backface-visibility:hidden] tw:[will-change:transform]`,
    String.raw`tw:[&:hover]:[transform:scale(1.03)]`,
    String.raw`tw:motion-reduce:[transition:none]! tw:motion-reduce:[transform:none]!`,
    String.raw`tw:max-770:[max-height:250px] tw:max-770:object-cover`,
    String.raw`tw:touch:[&:hover]:[transform:none]`,
  ].join(' '),
  // noticas
  "noticias-page": [
    String.raw`tw:[min-height:100vh] tw:[font-family:var(--texto)]`,
  ].join(' '),
  // noticas
  "noticias-main-header": [
    String.raw`tw:text-center tw:[padding-top:100px] tw:[padding-right:5vw] tw:[padding-bottom:40px] tw:[padding-left:5vw] tw:[background:linear-gradient(135deg,_#f8f9fa_0%,_var(--colorFondo)_100%)] tw:[border-bottom:1px_solid_var(--border)]`,
    String.raw`tw:[&_h1]:[font-size:clamp(32px,_6vw,_48px)] tw:[&_h1]:[margin-top:0] tw:[&_h1]:[margin-right:0] tw:[&_h1]:[margin-bottom:16px] tw:[&_h1]:[margin-left:0] tw:[&_h1]:[color:var(--colorTitulo)] tw:[&_h1]:font-extrabold tw:[&_h1]:[letter-spacing:-0.02em] tw:[&_h1]:[font-family:var(--titulos)]`,
    String.raw`tw:[&_p]:[font-size:clamp(16px,_2.5vw,_18px)] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:auto] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:auto] tw:[&_p]:[max-width:600px] tw:[&_p]:[font-family:var(--texto)]`,
    String.raw`tw:max-840:[padding-top:120px] tw:max-840:[padding-right:5vw] tw:max-840:[padding-bottom:40px] tw:max-840:[padding-left:5vw]`,
    String.raw`tw:[padding-top:calc(var(--site-header-height)_+_2rem)]!`,
  ].join(' '),
  // noticas
  "noticias-nav": [
    String.raw`tw:flex tw:justify-center tw:[row-gap:20px] tw:[column-gap:20px] tw:[padding-top:40px] tw:[padding-right:5vw] tw:[padding-bottom:20px] tw:[padding-left:5vw] tw:[background:var(--colorFondo)] tw:[border-bottom:1px_solid_var(--border)]`,
    String.raw`tw:max-840:flex-col tw:max-840:items-center tw:max-840:[row-gap:15px] tw:max-840:[column-gap:15px]`,
    String.raw`tw:max-480:[padding-top:30px] tw:max-480:[padding-right:5vw] tw:max-480:[padding-bottom:20px] tw:max-480:[padding-left:5vw]`,
  ].join(' '),
  // noticas
  "nav-button": [
    String.raw`tw:[padding-top:12px] tw:[padding-right:24px] tw:[padding-bottom:12px] tw:[padding-left:24px] tw:[border:2px_solid_var(--colorPrincipal)] tw:[background:transparent] tw:[color:var(--colorPrincipal)] tw:[border-radius:var(--radius-lg)] tw:font-semibold tw:cursor-pointer tw:[transition:var(--transition)] tw:[font-family:var(--texto)] tw:[font-size:16px]`,
    String.raw`tw:[&:hover]:[background:var(--colorPrincipal)] tw:[&:hover]:[color:white] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
    String.raw`tw:[&.active]:[background:var(--colorPrincipal)] tw:[&.active]:[color:white]`,
    String.raw`tw:max-840:[width:100%] tw:max-840:[max-width:300px]`,
  ].join(' '),
  // noticas
  "noticias-content": [
    String.raw`tw:[padding-top:40px] tw:[padding-right:0] tw:[padding-bottom:40px] tw:[padding-left:0]`,
  ].join(' '),
  // noticas
  "noticias-prensa": [
    String.raw`tw:[max-width:1000px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto] tw:[padding-top:0] tw:[padding-right:1rem] tw:[padding-bottom:0] tw:[padding-left:1rem] tw:[font-family:var(--texto)]`,
    String.raw`tw:max-768:[padding-top:10px] tw:max-768:[padding-right:0] tw:max-768:[padding-bottom:10px] tw:max-768:[padding-left:0]`,
  ].join(' '),
  // noticas
  "prensa-header": [
    String.raw`tw:[margin-bottom:3rem] tw:[border-bottom:2px_solid_var(--border)] tw:[padding-bottom:1rem] tw:text-center`,
    String.raw`tw:[&_h2]:[font-size:2rem] tw:[&_h2]:font-bold tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:[margin-top:0] tw:[&_h2]:[margin-right:0] tw:[&_h2]:[margin-bottom:8px] tw:[&_h2]:[margin-left:0] tw:[&_h2]:[font-family:var(--titulos)]`,
    String.raw`tw:[&_p]:[font-size:1.1rem] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:0] tw:[&_p]:[margin-left:0]`,
    String.raw`tw:max-768:[&_h2]:[font-size:1.8rem]`,
  ].join(' '),
  // noticas
  "prensa-list": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:2.5rem] tw:[column-gap:2.5rem]`,
    String.raw`tw:max-768:[row-gap:2rem] tw:max-768:[column-gap:2rem]`,
  ].join(' '),
  // noticas
  "prensa-item": [
    String.raw`tw:[border-bottom:1px_solid_var(--border)] tw:[padding-bottom:2.5rem] tw:[transition:all_0.3s_ease]`,
    String.raw`tw:[&:last-child]:[border-bottom:none] tw:[&:last-child]:[padding-bottom:0]`,
    String.raw`tw:max-768:[padding-bottom:2rem]`,
  ].join(' '),
  // noticas
  "prensa-fecha": [
    String.raw`tw:[font-size:0.9rem] tw:[color:var(--colorTexto)] tw:[margin-bottom:1rem] tw:font-medium`,
  ].join(' '),
  // noticas
  "prensa-content-wrapper": [
    String.raw`tw:grid tw:[grid-template-columns:200px_1fr] tw:[row-gap:2rem] tw:[column-gap:2rem] tw:[align-items:start]`,
    String.raw`tw:max-768:[grid-template-columns:1fr] tw:max-768:[row-gap:1.5rem] tw:max-768:[column-gap:1.5rem] tw:max-768:text-center`,
  ].join(' '),
  // noticas
  "prensa-imagen": [
    String.raw`tw:[width:100%] tw:[border-radius:var(--radius-lg)] tw:overflow-hidden tw:[box-shadow:var(--shadow-md)] tw:[transition:var(--transition)]`,
    String.raw`tw:[&_img]:[width:100%] tw:[&_img]:[height:120px] tw:[&_img]:object-cover tw:[&_img]:block tw:[&_img]:[transition:var(--transition)]`,
    String.raw`tw:[.prensa-item:hover_&]:[transform:translateY(-2px)] tw:[.prensa-item:hover_&]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:[.prensa-item:hover_&_img]:[transform:scale(1.05)]`,
    String.raw`tw:max-768:[max-width:300px] tw:max-768:[margin-top:0] tw:max-768:[margin-right:auto] tw:max-768:[margin-bottom:0] tw:max-768:[margin-left:auto]`,
    String.raw`tw:max-768:[&_img]:[height:150px]`,
    String.raw`tw:max-480:[max-width:100%]`,
    String.raw`tw:max-480:[&_img]:[height:120px]`,
  ].join(' '),
  // noticas
  "prensa-content": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:0.8rem] tw:[column-gap:0.8rem]`,
  ].join(' '),
  // noticas
  "prensa-titulo": [
    String.raw`tw:[font-size:1.4rem] tw:font-semibold tw:[color:var(--colorTitulo)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[line-height:1.3] tw:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_a]:[color:inherit] tw:[&_a]:no-underline tw:[&_a]:[transition:color_0.2s_ease]`,
    String.raw`tw:[&_a:hover]:[color:var(--colorPrincipal)]`,
    String.raw`tw:max-768:[font-size:1.2rem]`,
    String.raw`tw:max-480:[font-size:1.1rem]`,
  ].join(' '),
  // noticas
  "prensa-resumen": [
    String.raw`tw:[font-size:1rem] tw:[line-height:1.6] tw:[color:var(--colorTexto)] tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[display:-webkit-box] tw:[-webkit-line-clamp:3] tw:[-webkit-box-orient:vertical] tw:overflow-hidden`,
    String.raw`tw:max-768:[font-size:0.95rem] tw:max-768:[-webkit-line-clamp:4]`,
    String.raw`tw:max-480:[-webkit-line-clamp:3]`,
  ].join(' '),
  // noticas
  "prensa-acciones": [
    String.raw`tw:[margin-top:0.5rem]`,
  ].join(' '),
  // noticas
  "leer-mas": [
    String.raw`tw:[color:var(--colorPrincipal)] tw:no-underline tw:font-medium tw:[font-size:0.9rem] tw:[transition:var(--transition)] tw:inline-flex tw:items-center tw:[row-gap:0.3rem] tw:[column-gap:0.3rem]`,
    String.raw`tw:[&:hover]:[color:var(--colorSecundario)] tw:[&:hover]:[row-gap:0.5rem] tw:[&:hover]:[column-gap:0.5rem]`,
  ].join(' '),
  // noticas
  "noticias-facebook": [
    String.raw`tw:[min-height:80vh] tw:[padding-top:20px] tw:[padding-right:0] tw:[padding-bottom:20px] tw:[padding-left:0]`,
    String.raw`tw:max-768:[padding-top:10px] tw:max-768:[padding-right:0] tw:max-768:[padding-bottom:10px] tw:max-768:[padding-left:0]`,
  ].join(' '),
  // noticas
  "facebook-header": [
    String.raw`tw:text-center tw:[padding-top:40px] tw:[padding-right:5vw] tw:[padding-bottom:30px] tw:[padding-left:5vw] tw:[background:linear-gradient(135deg,_#f8f9fa_0%,_var(--colorFondo)_100%)] tw:[border-bottom:1px_solid_var(--border)]`,
    String.raw`tw:[&_h2]:[font-size:clamp(28px,_5vw,_36px)] tw:[&_h2]:[margin-top:0] tw:[&_h2]:[margin-right:0] tw:[&_h2]:[margin-bottom:12px] tw:[&_h2]:[margin-left:0] tw:[&_h2]:[color:var(--colorTitulo)] tw:[&_h2]:font-extrabold tw:[&_h2]:[letter-spacing:-0.02em] tw:[&_h2]:[font-family:var(--titulos)]`,
    String.raw`tw:[&_p]:[font-size:clamp(16px,_2.5vw,_18px)] tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:auto] tw:[&_p]:[margin-bottom:20px] tw:[&_p]:[margin-left:auto] tw:[&_p]:[max-width:600px]`,
  ].join(' '),
  // noticas
  "fb-stats": [
    String.raw`tw:inline-block tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:8px] tw:[padding-right:16px] tw:[padding-bottom:8px] tw:[padding-left:16px] tw:[border-radius:999px] tw:[font-size:14px] tw:font-semibold`,
  ].join(' '),
  // noticas
  "fb-wrap": [
    String.raw`tw:[padding-top:clamp(24px,_4vw,_40px)] tw:[padding-right:0] tw:[padding-bottom:clamp(24px,_4vw,_40px)] tw:[padding-left:0] tw:[background:var(--colorFondo)] tw:[border-bottom:1px_solid_var(--border)] tw:[width:100%] tw:overflow-hidden`,
  ].join(' '),
  // noticas
  "fb-carrusel": [
    String.raw`tw:relative tw:overflow-hidden tw:[width:100%]`,
  ].join(' '),
  // noticas
  "fb-carrusel-inner": [
    String.raw`tw:flex tw:[row-gap:25px] tw:[column-gap:25px] tw:[will-change:transform] tw:[transition:transform_0.1s_linear] tw:[padding-top:0] tw:[padding-right:5vw] tw:[padding-bottom:0] tw:[padding-left:5vw]`,
    String.raw`tw:max-768:[row-gap:20px] tw:max-768:[column-gap:20px] tw:max-768:[padding-top:0] tw:max-768:[padding-right:5vw] tw:max-768:[padding-bottom:0] tw:max-768:[padding-left:5vw]`,
    String.raw`tw:max-480:[row-gap:15px] tw:max-480:[column-gap:15px]`,
  ].join(' '),
  // noticas
  "fb-carrusel-item": [
    String.raw`tw:[flex:0_0_auto]`,
  ].join(' '),
  // noticas
  "fb-card": [
    String.raw`tw:[min-width:350px] tw:[max-width:550px] tw:[background:var(--bg-card)] tw:[border-radius:var(--radius-xxl)] tw:[padding-top:20px] tw:[padding-right:20px] tw:[padding-bottom:20px] tw:[padding-left:20px] tw:[box-shadow:var(--shadow-md)] tw:[border:1px_solid_var(--border)] tw:flex tw:flex-col tw:[row-gap:15px] tw:[column-gap:15px] tw:[transition:var(--transition)] tw:[flex-shrink:0]`,
    String.raw`tw:[&:hover]:[transform:translateY(-3px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)]`,
    String.raw`tw:max-768:[min-width:300px] tw:max-768:[padding-top:16px] tw:max-768:[padding-right:16px] tw:max-768:[padding-bottom:16px] tw:max-768:[padding-left:16px]`,
    String.raw`tw:max-480:[min-width:280px] tw:max-480:[padding-top:14px] tw:max-480:[padding-right:14px] tw:max-480:[padding-bottom:14px] tw:max-480:[padding-left:14px]`,
  ].join(' '),
  // noticas
  "fb-media": [
    String.raw`tw:[border-radius:var(--radius-xl)] tw:overflow-hidden tw:[background:#f6f6f6] tw:[min-height:400px]`,
    String.raw`tw:max-480:[min-height:350px]`,
  ].join(' '),
  // noticas
  "fb-head": [
    String.raw`tw:flex tw:flex-col tw:[row-gap:10px] tw:[column-gap:10px]`,
  ].join(' '),
  // noticas
  "fb-badge": [
    String.raw`tw:inline-block tw:[font-size:12px] tw:font-extrabold tw:[letter-spacing:.02em] tw:[color:#fff] tw:[background:var(--colorPrincipal)] tw:[border-radius:999px] tw:[padding-top:6px] tw:[padding-right:12px] tw:[padding-bottom:6px] tw:[padding-left:12px] tw:[width:max-content]`,
  ].join(' '),
  // noticas
  "fb-title": [
    String.raw`tw:[margin-top:0] tw:[margin-right:0] tw:[margin-bottom:0] tw:[margin-left:0] tw:[font-size:clamp(16px,_2.6vw,_18px)] tw:font-bold tw:[letter-spacing:-.01em] tw:[color:var(--colorTitulo)] tw:[line-height:1.4] tw:[font-family:var(--subtitulos)]`,
  ].join(' '),
  // noticas
  "fb-link": [
    String.raw`tw:[margin-top:auto] tw:[align-self:flex-start] tw:no-underline tw:font-bold tw:[letter-spacing:.02em] tw:[color:var(--colorPrincipal)] tw:[border-bottom:2px_solid_transparent] tw:[padding-top:8px] tw:[padding-right:0] tw:[padding-bottom:8px] tw:[padding-left:0] tw:[transition:var(--transition)] tw:[font-size:15px]`,
    String.raw`tw:[&:hover]:[color:var(--colorSecundario)] tw:[&:hover]:[border-top-color:var(--colorSecundario)] tw:[&:hover]:[border-right-color:var(--colorSecundario)] tw:[&:hover]:[border-bottom-color:var(--colorSecundario)] tw:[&:hover]:[border-left-color:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-1px)]`,
  ].join(' '),
  // noticas
  "fb-loading": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // noticas
  "fb-error": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // noticas
  "fb-empty": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
  ].join(' '),
  // noticas
  "error": [
    String.raw`tw:text-center tw:[padding-top:80px] tw:[padding-right:20px] tw:[padding-bottom:80px] tw:[padding-left:20px] tw:[max-width:500px] tw:[margin-top:2rem] tw:[margin-right:0] tw:[margin-bottom:2rem] tw:[margin-left:0] tw:[color:#d32f2f] tw:[background:#ffebee] tw:[border-radius:8px]`,
  ].join(' '),
  // noticas
  "fb-loading-spinner": [
    String.raw`tw:[width:40px] tw:[height:40px] tw:[border:4px_solid_#f3f3f3] tw:[border-top:4px_solid_var(--colorPrincipal)] tw:[border-radius:50%] tw:[animation:cmic-spin_1s_linear_infinite] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:20px] tw:[margin-left:auto]`,
  ].join(' '),
  // noticas
  "fb-error-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // noticas
  "fb-empty-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // noticas
  "fb-retry-btn": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:12px] tw:[padding-right:24px] tw:[padding-bottom:12px] tw:[padding-left:24px] tw:[border-radius:var(--radius-lg)] tw:font-semibold tw:no-underline tw:inline-block tw:cursor-pointer tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-1px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
  ].join(' '),
  // noticas
  "fb-visit-link": [
    String.raw`tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[border:none] tw:[padding-top:12px] tw:[padding-right:24px] tw:[padding-bottom:12px] tw:[padding-left:24px] tw:[border-radius:var(--radius-lg)] tw:font-semibold tw:no-underline tw:inline-block tw:cursor-pointer tw:[transition:var(--transition)]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-1px)] tw:[&:hover]:[box-shadow:var(--shadow-md)]`,
  ].join(' '),
  // noticas
  "fb-cta-section": [
    String.raw`tw:[padding-top:60px] tw:[padding-right:5vw] tw:[padding-bottom:60px] tw:[padding-left:5vw] tw:[background:linear-gradient(135deg,_var(--colorFondo)_0%,_#f8f9fa_100%)] tw:text-center tw:[border-top:1px_solid_var(--border)]`,
    String.raw`tw:max-768:[padding-top:40px] tw:max-768:[padding-right:5vw] tw:max-768:[padding-bottom:40px] tw:max-768:[padding-left:5vw]`,
  ].join(' '),
  // noticas
  "fb-cta-content": [
    String.raw`tw:[max-width:500px] tw:[margin-top:0] tw:[margin-right:auto] tw:[margin-bottom:0] tw:[margin-left:auto]`,
    String.raw`tw:[&_h3]:[font-size:24px] tw:[&_h3]:[margin-top:0] tw:[&_h3]:[margin-right:0] tw:[&_h3]:[margin-bottom:16px] tw:[&_h3]:[margin-left:0] tw:[&_h3]:[color:var(--colorTitulo)] tw:[&_h3]:[font-family:var(--subtitulos)]`,
    String.raw`tw:[&_p]:[color:var(--colorTexto)] tw:[&_p]:[margin-top:0] tw:[&_p]:[margin-right:0] tw:[&_p]:[margin-bottom:30px] tw:[&_p]:[margin-left:0] tw:[&_p]:[line-height:1.6]`,
  ].join(' '),
  // noticas
  "fb-cta-icon": [
    String.raw`tw:[font-size:48px] tw:[margin-bottom:20px]`,
  ].join(' '),
  // noticas
  "fb-follow-btn": [
    String.raw`tw:inline-flex tw:items-center tw:[row-gap:10px] tw:[column-gap:10px] tw:[background:var(--colorPrincipal)] tw:[color:white] tw:[padding-top:14px] tw:[padding-right:28px] tw:[padding-bottom:14px] tw:[padding-left:28px] tw:[border-radius:var(--radius-lg)] tw:no-underline tw:font-bold tw:[transition:var(--transition)] tw:[margin-bottom:16px]`,
    String.raw`tw:[&:hover]:[background:var(--colorSecundario)] tw:[&:hover]:[transform:translateY(-2px)] tw:[&:hover]:[box-shadow:var(--shadow-lg)] tw:[&:hover]:[color:white]`,
  ].join(' '),
  // noticas
  "fb-btn-icon": [
    String.raw`tw:[font-size:18px]`,
  ].join(' '),
};

export function cmicClasses(value: string): string;
export function cmicClasses(value: string | undefined): string | undefined;
export function cmicClasses(value: string | undefined): string | undefined {
  if (!value) return value;
  const tokens = value.trim().split(/\s+/);
  const result = new Set(tokens);
  for (const token of tokens) {
    if (Object.hasOwn(recipes, token)) {
      for (const utility of recipes[token].split(' ')) result.add(utility);
    }
  }
  return [...result].join(' ');
}
