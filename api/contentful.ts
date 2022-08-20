import * as contentful from 'contentful';

import type { Album, HomepagePhoto, NavData } from '../types';

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
    include: 4,
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
    previousImageId:
      currentIndex === 0
        ? albumData.album[albumData.album.length - 1].sys.id
        : albumData.album[currentIndex - 1].sys.id,
    nextImageId:
      currentIndex + 1 === albumData.album.length
        ? albumData.album[0].sys.id
        : albumData.album[currentIndex + 1].sys.id,
  };
}

export async function getAlbumData(id: string | string[] | undefined) {
  if (!id || typeof id !== 'string')
    return Promise.reject(new Error('No valid ID provided'));
  const data = await client.getEntry<Album>(id);
  return {
    title: data.fields.title,
    album: data.fields.album,
  };
}

export async function getImage(imageId: string | string[] | undefined) {
  if (!imageId || typeof imageId !== 'string')
    return Promise.reject(new Error('No valid ID provided'));
  const asset = await client.getAsset(imageId);
  return asset;
}
