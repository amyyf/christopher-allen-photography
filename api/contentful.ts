import * as contentful from 'contentful';

import type { Album } from '../types';

const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
});

export async function getClientData() {
  const entries = await client.getEntries<Album>();
  return entries;
}

export function getNav(entries: contentful.EntryCollection<Album>) {
  const nav = entries.items.map((item) => ({
    title: item.fields.title,
    contentfulId: item.sys.id,
  }));
  return nav;
}

export async function getAlbumData(id: string | string[] | undefined) {
  if (!id || typeof id !== 'string')
    return Promise.reject(new Error('No valid ID provided'));
  const data = await client.getEntry<Album>(id).then((entry) => entry);
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
