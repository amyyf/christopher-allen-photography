import * as contentful from 'contentful';

export type Album = {
  title: contentful.EntryFields.Text;
  album: contentful.Asset[];
};

export type NavData = {
  title: string;
  contentfulId: string;
};
