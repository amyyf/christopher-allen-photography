import * as contentful from 'contentful';

import type { Gallery, NavData } from '../types/data';
import { convertTitleToSlug } from '../utils';

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESSTOKEN || '',
});

const getClient = () => {
  if (!client) throw new Error('Contentful client could not be found');
  return client;
};

export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsqAcAAYUBAdpOiIkAAAAASUVORK5CYII=';

export async function getSiteNav(): Promise<NavData[]> {
  const galleries = await getClient().getEntries<Gallery>({
    content_type: 'album', // note: this content type was renamed to 'gallery' but the Contentful id could not be updated
    select: 'fields.title,sys.id,fields.entries',
    order: 'fields.order',
  });
  return galleries.items.map((gallery) => ({
    title: gallery.fields.title,
    contentfulId: gallery.sys.id,
    firstEntry: {
      contentfulId: gallery.fields.entries[0].fields.visual.sys.id,
      title: gallery.fields.entries[0].fields.title,
      description: gallery.fields.entries[0].fields.description,
      url: gallery.fields.entries[0].fields.visual.fields.file.url,
      height:
        gallery.fields.entries[0].fields.visual.fields.file.details.image
          ?.height,
      width:
        gallery.fields.entries[0].fields.visual.fields.file.details.image
          ?.width,
    },
    entryTitles: gallery.fields.entries.map((entry) => ({
      title: entry.fields.title,
      imageNumber: entry.fields.visual.fields.title,
    })),
  }));
}

// This navigation through a gallery will wrap at the beginning and end:
// If the current image is the first in the gallery, the "previous" image will be the last in gallery.
// If the current image is the last in the gallery, the "next" image will be the first in gallery.
export function getPrevAndNextImages(
  galleryData: Gallery,
  currentImageId: string,
) {
  const currentIndex = galleryData.entries.findIndex(
    (el) => el.fields.visual.sys.id === currentImageId,
  );
  return {
    previousImageSlug:
      currentIndex === 0
        ? convertTitleToSlug(
            galleryData.entries[galleryData.entries.length - 1].fields.title,
            galleryData.entries[galleryData.entries.length - 1].fields.visual
              .fields.title,
          )
        : convertTitleToSlug(
            galleryData.entries[currentIndex - 1].fields.title,
            galleryData.entries[currentIndex - 1].fields.visual.fields.title,
          ),
    nextImageSlug:
      currentIndex + 1 === galleryData.entries.length
        ? convertTitleToSlug(
            galleryData.entries[0].fields.title,
            galleryData.entries[0].fields.visual.fields.title,
          )
        : convertTitleToSlug(
            galleryData.entries[currentIndex + 1].fields.title,
            galleryData.entries[currentIndex + 1].fields.visual.fields.title,
          ),
  };
}

export async function getGalleryData(
  gallerySlug: string | string[] | undefined,
  navData: NavData[] | undefined,
) {
  if (!gallerySlug || typeof gallerySlug !== 'string')
    throw new Error('Gallery title not found');
  if (!navData) throw new Error('Lookup data for gallery not found');
  const galleryId = navData.find(
    (item) => convertTitleToSlug(item.title) === gallerySlug,
  )?.contentfulId;
  if (!galleryId) throw new Error('Gallery ID could not be found');
  const data = await getClient().getEntry<Gallery>(galleryId);
  return {
    title: data.fields.title,
    entries: data.fields.entries,
  };
}

export async function getImage(
  imageSlug: string | string[] | undefined,
  galleryData: Gallery | undefined,
) {
  if (!imageSlug || typeof imageSlug !== 'string')
    return Promise.reject(new Error('No valid ID provided'));
  if (!galleryData)
    return Promise.reject(new Error('Lookup data for gallery not found'));
  const imageEntry = galleryData.entries.find(
    (entry) =>
      convertTitleToSlug(
        entry.fields.title,
        entry.fields.visual.fields.title,
      ) === imageSlug,
  );
  if (!imageEntry?.fields.visual.sys.id)
    return Promise.reject(new Error('Image ID could not be found'));
  const asset = await getClient().getAsset(imageEntry.fields.visual.sys.id);
  const { previousImageSlug, nextImageSlug } = getPrevAndNextImages(
    galleryData,
    imageEntry.fields.visual.sys.id,
  );
  return {
    asset,
    description: imageEntry.fields.description,
    previousImageSlug,
    nextImageSlug,
  };
}
