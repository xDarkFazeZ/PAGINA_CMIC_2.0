import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'xs8bc8fb',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01',
  useCdn: import.meta.env.PROD,
  perspective: 'published',
});

const builder = imageUrlBuilder(client);
type ImageSource = Parameters<typeof builder.image>[0];
type ImageFit = Parameters<ReturnType<typeof builder.image>['fit']>[0];

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  dpr?: number;
  fit?: ImageFit;
}

export function urlFor(source: ImageSource, options: ImageOptions = {}) {
  const { width, height, quality = 80, dpr = 1, fit = 'max' } = options;
  let image = builder.image(source).auto('format').fit(fit).quality(quality).dpr(dpr);
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image;
}

export function imageAttrs(
  source: ImageSource | null | undefined,
  options: ImageOptions & { widths?: number[]; sizes?: string } = {},
) {
  if (!source) return { src: '', srcSet: '', sizes: '' };
  const { widths = [320, 480, 768, 1024], sizes = '(max-width: 600px) 90vw, 480px', ...rest } = options;
  return {
    src: urlFor(source, { ...rest, width: widths[1] || widths[0] || 480 }).url(),
    srcSet: widths.map(width => `${urlFor(source, { ...rest, width }).url()} ${width}w`).join(', '),
    sizes,
  };
}
