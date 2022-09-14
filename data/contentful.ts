import * as contentful from 'contentful';

import type { Album, HomepagePhoto, NavData } from '../types/data';
import { convertTitleToSlug } from '../utils';

const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
});

export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsqAcAAYUBAdpOiIkAAAAASUVORK5CYII=';

export async function getHomepagePhoto() {
  const entry = await client.getEntries<HomepagePhoto>({
    content_type: 'homepagePhoto',
    limit: 1,
  });
  return entry.items[0];
}

export async function getSiteNav(): Promise<NavData[]> {
  const albums = await client.getEntries<Album>({
    content_type: 'album',
    select: 'fields.title,sys.id,fields.entries',
    order: 'fields.order',
  });
  return albums.items.map((album) => ({
    title: album.fields.title,
    contentfulId: album.sys.id,
    firstEntry: {
      contentfulId: album.fields.entries[0].fields.visual.sys.id,
      title: album.fields.entries[0].fields.title,
      description: album.fields.entries[0].fields.description,
      url: album.fields.entries[0].fields.visual.fields.file.url,
      height:
        album.fields.entries[0].fields.visual.fields.file.details.image?.height,
      width:
        album.fields.entries[0].fields.visual.fields.file.details.image?.width,
    },
    entryTitles: album.fields.entries.map((entry) => ({
      title: entry.fields.title,
      imageNumber: entry.fields.visual.fields.title,
    })),
  }));
}

// This navigation through an album will wrap at the beginning and end:
// If the current image is the first in the album, the "previous" image will be the last in album.
// If the current image is the last in the album, the "next" image will be the first in album.
export function getPrevAndNextImages(albumData: Album, currentImageId: string) {
  const currentIndex = albumData.entries.findIndex(
    (el) => el.fields.visual.sys.id === currentImageId,
  );
  return {
    previousImageSlug:
      currentIndex === 0
        ? convertTitleToSlug(
            albumData.entries[albumData.entries.length - 1].fields.title,
            albumData.entries[albumData.entries.length - 1].fields.visual.fields
              .title,
          )
        : convertTitleToSlug(
            albumData.entries[currentIndex - 1].fields.title,
            albumData.entries[currentIndex - 1].fields.visual.fields.title,
          ),
    nextImageSlug:
      currentIndex + 1 === albumData.entries.length
        ? convertTitleToSlug(
            albumData.entries[0].fields.title,
            albumData.entries[0].fields.visual.fields.title,
          )
        : convertTitleToSlug(
            albumData.entries[currentIndex + 1].fields.title,
            albumData.entries[currentIndex + 1].fields.visual.fields.title,
          ),
  };
}

export async function getAlbumData(
  albumSlug: string | string[] | undefined,
  navData: NavData[] | undefined,
) {
  if (!albumSlug || typeof albumSlug !== 'string')
    throw new Error('Album title not found');
  if (!navData) throw new Error('Lookup data for album not found');
  const albumId = navData.find(
    (item) => convertTitleToSlug(item.title) === albumSlug,
  )?.contentfulId;
  if (!albumId) throw new Error('Album ID could not be found');
  const data = await client.getEntry<Album>(albumId);
  return {
    title: data.fields.title,
    entries: data.fields.entries,
  };
}

export async function getImage(
  imageSlug: string | string[] | undefined,
  albumData: Album | undefined,
) {
  if (!imageSlug || typeof imageSlug !== 'string')
    return Promise.reject(new Error('No valid ID provided'));
  if (!albumData)
    return Promise.reject(new Error('Lookup data for album not found'));
  const imageEntry = albumData.entries.find(
    (entry) =>
      convertTitleToSlug(
        entry.fields.title,
        entry.fields.visual.fields.title,
      ) === imageSlug,
  );
  if (!imageEntry?.fields.visual.sys.id)
    return Promise.reject(new Error('Image ID could not be found'));
  const asset = await client.getAsset(imageEntry.fields.visual.sys.id);
  const { previousImageSlug, nextImageSlug } = getPrevAndNextImages(
    albumData,
    imageEntry.fields.visual.sys.id,
  );
  return {
    asset,
    description: imageEntry.fields.description,
    previousImageSlug,
    nextImageSlug,
  };
}
