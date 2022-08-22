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
      ? album?.imageTitles.find(
          (title) => convertTitleToSlug(title) === imageSlug,
        )
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

export const convertTitleToSlug = (title: string) => {
  const spaces = /\s+/g;
  return title.toLowerCase().replace(spaces, '-');
};
