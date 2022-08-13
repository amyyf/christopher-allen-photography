import * as contentful from "contentful";

import type { Album } from "../types";

export async function getNav (client: contentful.ContentfulClientApi) {
  const entries = await client.getEntries<Album>();
  const nav = entries.items.map(item => ({
    title: item.fields.title,
    contentfulId: item.sys.id
  }));
  return nav;
}

export async function generatePaths(client: contentful.ContentfulClientApi) {
  const navInfo = await getNav(client);
  return navInfo.map(entry => {
    // TODO: would be nice to use album titles instead of ids for the slug
    return {
      params: {
        id: entry.contentfulId
      }
    }
  })
}

export async function getAlbumData(client: contentful.ContentfulClientApi, id: string) {
  const data = await client.getEntry(id).then(entry => entry);
  return {
    id,
    ...data
  }
}