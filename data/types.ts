import * as contentful from 'contentful';

type AlbumEntry = {
  description: string;
  title: string;
  visual: contentful.Asset;
};

export type HomepagePhoto = {
  title: contentful.EntryFields.Text;
  image: contentful.Asset;
};

export type Album = {
  title: contentful.EntryFields.Text;
  entries: contentful.Entry<AlbumEntry>[];
};

export type NavData = {
  title: string;
  contentfulId: string;
  firstEntry: {
    contentfulId: contentful.EntryFields.Text;
    title: contentful.EntryFields.Text;
    description: contentful.EntryFields.Text;
    url: contentful.EntryFields.Text;
    height?: contentful.EntryFields.Number;
    width?: contentful.EntryFields.Number;
  };
  entryTitles: { title: string; imageNumber: string }[];
};
