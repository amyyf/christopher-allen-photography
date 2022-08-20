import { useQuery } from '@tanstack/react-query';
import { getAlbumData, getImage, getSiteNav } from './contentful';

export const useSiteNavQuery = () => useQuery(['siteNav'], getSiteNav);

export const useAlbumQuery = (albumSlug: string | string[] | undefined) => {
  const { data: navData } = useSiteNavQuery();
  return useQuery(
    ['album', albumSlug],
    () => getAlbumData(albumSlug, navData),
    {
      enabled: !!navData && !!albumSlug && typeof albumSlug === 'string',
    },
  );
};

export const useImageQuery = (
  imageSlug: string | string[] | undefined,
  albumSlug: string | string[] | undefined,
) => {
  const { data: navData } = useSiteNavQuery();
  const { data: albumData } = useQuery(
    ['album', albumSlug],
    () => getAlbumData(albumSlug, navData),
    {
      enabled: !!navData && !!albumSlug && typeof albumSlug === 'string',
    },
  );
  return useQuery(['image', imageSlug], () => getImage(imageSlug, albumData), {
    enabled: !!albumData && !!imageSlug && typeof imageSlug === 'string',
  });
};
