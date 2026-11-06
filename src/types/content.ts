import type { ImgHTMLAttributes, ReactNode } from 'react';
import type { PortableTextBlock } from '@portabletext/types';

/** Campos consultados por el frontend; los datos publicados pueden omitir campos opcionales. */
export interface CmsImage {
  asset: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } };
  };
  alt?: string;
}

export interface Afiliado {
  _id: string;
  nombre: string;
  logo?: CmsImage | null;
  aspectRatio?: number;
  width?: number;
  height?: number;
  contacto?: { email?: string; telefono?: string };
  ubicacion?: { direccion?: string; googleMaps?: string };
  sitioWeb?: string;
  redesSociales?: {
    tieneFacebook?: boolean; facebook?: string;
    tieneInstagram?: boolean; instagram?: string;
    tieneX?: boolean; x?: string;
    tieneTikTok?: boolean; tiktok?: string;
  };
}

export interface AfiliadoLogo {
  id: string; nombre: string; logo: CmsImage;
  ar: number; isWide: boolean; isUltraWide: boolean;
  originalWidth?: number; originalHeight?: number;
}

export interface Proveedor {
  _id: string; nombre: string;
  logoAsset: CmsImage | null; logoCard: string | null; logoModal: string | null;
  contacto: { email: string | null; telefono: string | null; rawEmail: string; rawTel: string };
  ubicacion: { direccion: string; googleMaps: string | null };
  sitioWeb: string | null;
  redes: { fb: string | null; ig: string | null; x: string | null; tk: string | null };
}

export interface Convenio {
  _id: string; nombre: string; categoria?: string; logo?: CmsImage | null;
  orden?: number; beneficioPublico?: string; precioDesde?: number; monedaDesde?: string;
  contactoPublico?: { telefono?: string; email?: string };
  direccion?: { calle?: string; colonia?: string; ciudad?: string; estado?: string };
  tarifasPublicas?: { precio?: number; moneda?: string; desayuno?: string; impuestos?: string }[];
}

export interface ConvenioLogo { id: string; nombre: string; img: string | null; orden: number }

export interface Maestria {
  _id: string; nombre_maestria?: string; imagen?: CmsImage | null;
  objetivo_itc?: string; requisitos?: string[];
  descripcion_corta?: string; duracion?: string; slug?: { current?: string };
  mapa_curricular?: { titulo_semestre?: string; materias?: string[] }[];
  detalles_maestria?: {
    duracion?: string; horario?: string; modalidad_asignaturas?: string;
    plataforma_tecnologica?: string; titulacion?: string;
  };
}

export interface Course {
  id: string; nombre: string; desc: string; requisitos: string[];
  duracion: string; img: string; slug: string | null;
}

export interface GalleryDocument {
  _id: string; titulo?: string; imagen?: CmsImage | null;
  descripcion?: PortableTextBlock[] | string;
}

export interface GalleryItem { id: string; titulo: string; descripcion: string; img: string | null }
export interface IcicEvent {
  _id: string; title: string; eventDate: string;
  description?: string; coverImage?: CmsImage | null;
}
export interface EventItem {
  id: string; title: string; description: string; date: string; rawDate: string; img: string;
}

export interface SocialPost {
  _id: string; title?: string; postUrl: string; publishedAt?: string;
}
export interface PrensaPost {
  _id: string; title: string; summary?: string; content?: PortableTextBlock[];
  publishDate: string; coverImage?: CmsImage | null; externalLink?: string;
}
export interface NewsData { cmicPosts: SocialPost[]; icicEvents: IcicEvent[] }
export interface NewsState { data: NewsData; loading: boolean; error: string }
export interface CourseState { courses: Course[]; status: string; errMsg: string | null }

export interface Persona { nombre: string; cargo: string; frase?: string; imagenUrl?: string }
export interface Service {
  id: string; title: string; icon: string; summary: string; tags: string[];
  link?: string; externalLink?: string;
  links?: string[]; highlights?: string[];
}
export type ServiceImages = Record<string, CmsImage | undefined>;
export interface ServiceLink { label: string; url: string }
export interface RetryProps { error: string; onRetry: () => void }
export interface CarouselProps { onPrev: () => void; onNext: () => void; itemsLength: number }
export type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  src?: string | null;
  alt: string;
  onError?: () => void;
  placeholder?: ReactNode;
  priority?: boolean;
  isRectangular?: boolean;
};
