import * as contentful from 'contentful';

import type { Album, HomepagePhoto } from '../types';

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

export async function getClientData() {
  const entries = await client.getEntries<Album>({ content_type: 'album' });
  return entries;
}

export function getNav(entries: contentful.EntryCollection<Album>) {
  const nav = entries.items.map((item) => ({
    title: item.fields.title,
    contentfulId: item.sys.id,
  }));
  return nav;
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
