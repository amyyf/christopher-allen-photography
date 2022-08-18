export const generatePageTitle = (
  pathname: string,
  imageTitle?: string,
  albumTitle?: string,
) => {
  const baseTitle = 'Christopher Allen Photography';
  // note that the order matters - image title, if it exists, takes precedence over album title
  const contentTitle = imageTitle ? imageTitle : albumTitle;

  switch (pathname) {
    case '/':
      return `${baseTitle}: Home`;
    case '/albums':
      return `${baseTitle}: Albums`;
    default:
      return contentTitle ? `${baseTitle}: ${contentTitle}` : baseTitle;
  }
};
