import * as contentful from 'contentful';

import type { Album, HomepagePhoto, NavData } from './types';
import { convertTitleToSlug } from '../utils';

const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
});

export async function getHomepagePhoto() {
  const photo = await client.getEntries<HomepagePhoto>({
    content_type: 'homepagePhoto',
  });
  return photo;
}

export async function getSiteNav(): Promise<NavData[]> {
  const entries = await client.getEntries<Album>({
    content_type: 'album',
    select: 'fields.title,sys.id,fields.album',
  });
  return entries.items.map((entry) => ({
    title: entry.fields.title,
    contentfulId: entry.sys.id,
    firstImage: {
      contentfulId: entry.fields.album[0].sys.id,
      title: entry.fields.album[0].fields.title,
      description: entry.fields.album[0].fields.description,
      url: entry.fields.album[0].fields.file.url,
      height: entry.fields.album[0].fields.file.details.image?.height,
      width: entry.fields.album[0].fields.file.details.image?.width,
    },
  }));
}

// This navigation through an album will wrap at the beginning and end:
// If the current image is the first in the album, the "previous" image will be the last in album.
// If the current image is the last in the album, the "next" image will be the first in album.
export function getPrevAndNextImages(albumData: Album, currentImageId: string) {
  const currentIndex = albumData.album.findIndex(
    (el) => el.sys.id === currentImageId,
  );
  return {
    previousImageSlug:
      currentIndex === 0
        ? convertTitleToSlug(
            albumData.album[albumData.album.length - 1].fields.title,
          )
        : convertTitleToSlug(albumData.album[currentIndex - 1].fields.title),
    nextImageSlug:
      currentIndex + 1 === albumData.album.length
        ? convertTitleToSlug(albumData.album[0].fields.title)
        : convertTitleToSlug(albumData.album[currentIndex + 1].fields.title),
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
    album: data.fields.album,
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
  const imageId = albumData.album.find(
    (image) => convertTitleToSlug(image.fields.title) === imageSlug,
  )?.sys.id;
  if (!imageId) return Promise.reject(new Error('Image ID could not be found'));
  const asset = await client.getAsset(imageId);
  const { previousImageSlug, nextImageSlug } = getPrevAndNextImages(
    albumData,
    imageId,
  );
  return {
    ...asset,
    previousImageSlug,
    nextImageSlug,
  };
}
