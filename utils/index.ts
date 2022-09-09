import { NavData } from '../data/types';

export const generatePageTitle = (
  pathname: string,
  imageSlug?: string | string[],
  albumSlug?: string | string[],
  data?: NavData[],
) => {
  const baseTitle = 'Christopher Allen Photography';
  const album = data?.find(
    (album) => convertTitleToSlug(album.title) === albumSlug,
  );

  const contentTitle =
    // image title, if it exists, takes precedence over album title
    imageSlug && typeof imageSlug === 'string'
      ? album?.entryTitles.find(
          (title) =>
            convertTitleToSlug(title.title, title.imageNumber) === imageSlug,
        )?.title
      : album?.title;

  switch (pathname) {
    case '/':
      return `${baseTitle}: Home`;
    case '/albums':
      return `${baseTitle}: Albums`;
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
