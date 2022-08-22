import { useState, useEffect } from 'react';
import { generatePageTitle } from '../utils';

import type { NavData } from './types';

export const usePageTitle = (
  pathname: string,
  imageSlug?: string | string[],
  albumSlug?: string | string[],
  navData?: NavData[],
) => {
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    const title = generatePageTitle(pathname, imageSlug, albumSlug, navData);
    setPageTitle(title);
  }, [pathname, imageSlug, albumSlug, navData]);

  return pageTitle;
};
