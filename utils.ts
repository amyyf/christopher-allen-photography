export const generatePageTitle = (
  pathname: string,
  queryOptions: {
    albumId?: string;
    imageId?: string;
  },
) => {
  const title = 'Christopher Allen Photography';
  // TODO: album titles, image titles should be pretty printed
  switch (pathname) {
    case '/':
      return `${title}: Home`;
    case '/albums':
      return `${title}: Albums`;
    default:
      if (queryOptions.imageId) {
        return `${title}: ${queryOptions.imageId}`;
      } else if (queryOptions.albumId) {
        return `${title}: ${queryOptions.albumId}`;
      }
  }
};
