import * as contentful from 'contentful';

import type { Album } from '../types';

export async function getNav(client: contentful.ContentfulClientApi) {
  const entries = await client.getEntries<Album>();
  const nav = entries.items.map((item) => ({
    title: item.fields.title,
    contentfulId: item.sys.id,
  }));
  return nav;
}

export async function getAlbumData(
  client: contentful.ContentfulClientApi,
  id: string,
) {
  const data = await client.getEntry<Album>(id).then((entry) => entry);
  return {
    title: data.fields.title,
    album: data.fields.album,
  };
}

export async function getImage(
  client: contentful.ContentfulClientApi,
  imageId: string,
) {
  const asset = await client.getAsset(imageId);
  return asset;
}
