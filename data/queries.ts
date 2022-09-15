import { useQuery } from '@tanstack/react-query';
import { getGalleryData, getImage, getSiteNav } from './contentful';

export const useSiteNavQuery = () => useQuery(['siteNav'], getSiteNav);

export const useGalleryQuery = (gallerySlug: string | string[] | undefined) => {
  const { data: navData } = useSiteNavQuery();
  return useQuery(
    ['gallery', gallerySlug],
    () => getGalleryData(gallerySlug, navData),
    {
      enabled: !!navData && !!gallerySlug && typeof gallerySlug === 'string',
    },
  );
};

export const useImageQuery = (
  imageSlug: string | string[] | undefined,
  gallerySlug: string | string[] | undefined,
) => {
  const { data: navData } = useSiteNavQuery();
  const { data: galleryData } = useQuery(
    ['gallery', gallerySlug],
    () => getGalleryData(gallerySlug, navData),
    {
      enabled: !!navData && !!gallerySlug && typeof gallerySlug === 'string',
    },
  );
  return useQuery(
    ['image', imageSlug],
    () => getImage(imageSlug, galleryData),
    {
      enabled: !!galleryData && !!imageSlug && typeof imageSlug === 'string',
    },
  );
};
