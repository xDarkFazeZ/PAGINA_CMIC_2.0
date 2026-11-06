import type { CmsImage } from '../types/content';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../lib/sanity';

const builder = imageUrlBuilder(client);

export const urlFor = (source: CmsImage | null | undefined) => {
    if (!source) return '';
    return builder.image(source);
};
