export const generatePageTitle = (
  pathname: string,
  imageSlug?: string | string[],
  albumSlug?: string | string[],
) => {
  const baseTitle = 'Christopher Allen Photography';
  // note that the order matters - image title, if it exists, takes precedence over album title
  const contentTitle =
    imageSlug && typeof imageSlug === 'string'
      ? convertSlugToTitle(imageSlug)
      : albumSlug && typeof albumSlug === 'string'
      ? convertSlugToTitle(albumSlug)
      : null;

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

// todo: would be great to not have to use this
export const convertSlugToTitle = (slug: string) => {
  let titleArr = slug.split('-').map((word) => {
    const split = word.split('');
    split[0] = split[0].toUpperCase();
    return split.join('');
  });
  return titleArr.join(' ');
};
