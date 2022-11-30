import { useState, useEffect } from 'react';
import { generatePageTitle } from '../utils';

import type { NavData } from '../types/data';

export const usePageTitle = (
  pathname: string,
  imageSlug?: string | string[],
  gallerySlug?: string | string[],
  navData?: NavData[],
) => {
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    const title = generatePageTitle(pathname, imageSlug, gallerySlug, navData);
    setPageTitle(title);
  }, [pathname, imageSlug, gallerySlug, navData]);

  return pageTitle;
};
