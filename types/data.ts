import * as contentful from 'contentful';

export type ContactPagePhoto = {
  title: contentful.EntryFields.Text;
  image: contentful.Asset;
};

type GalleryEntry = {
  description: string;
  title: string;
  visual: contentful.Asset;
};

export type Gallery = {
  title: contentful.EntryFields.Text;
  entries: contentful.Entry<GalleryEntry>[];
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
