import * as contentful from 'contentful';

export type HomepagePhoto = {
  title: contentful.EntryFields.Text;
  image: contentful.Asset;
};

export type Album = {
  title: contentful.EntryFields.Text;
  images: contentful.Asset[];
};

export type NavData = {
  title: string;
  contentfulId: string;
  firstImage: {
    contentfulId: contentful.EntryFields.Text;
    title: contentful.EntryFields.Text;
    description: contentful.EntryFields.Text;
    url: contentful.EntryFields.Text;
    height?: contentful.EntryFields.Number;
    width?: contentful.EntryFields.Number;
  };
  imageTitles: string[];
};
