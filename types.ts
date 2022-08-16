import * as contentful from 'contentful';

export type HomepagePhoto = {
  title: contentful.EntryFields.Text;
  image: contentful.Asset;
};

export type Album = {
  title: contentful.EntryFields.Text;
  album: contentful.Asset[];
};

export type NavData = {
  title: string;
  contentfulId: string;
};
