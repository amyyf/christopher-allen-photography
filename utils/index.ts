import { NavData } from '../types/data';

export const generatePageTitle = (
  pathname: string,
  imageSlug?: string | string[],
  gallerySlug?: string | string[],
  data?: NavData[],
) => {
  const baseTitle = 'Christopher Allen Photography';
  const gallery = data?.find(
    (gallery) => convertTitleToSlug(gallery.title) === gallerySlug,
  );

  const contentTitle =
    // image title, if it exists, takes precedence over gallery title
    imageSlug && typeof imageSlug === 'string'
      ? gallery?.entryTitles.find(
          (title) =>
            convertTitleToSlug(title.title, title.imageNumber) === imageSlug,
        )?.title
      : gallery?.title;

  switch (pathname) {
    case '/':
      return `${baseTitle}: Home`;
    case '/galleries':
      return `${baseTitle}: Galleries`;
    default:
      return contentTitle ? `${baseTitle}: ${contentTitle}` : baseTitle;
  }
};

const formatUrlString = (str: string) => {
  const spaces = /\s+/g;
  return str.toLowerCase().replace(spaces, '-');
};

export const convertTitleToSlug = (title: string, imageNum?: string) => {
  return imageNum
    ? `${formatUrlString(title)}-${formatUrlString(imageNum)}`
    : formatUrlString(title);
};
