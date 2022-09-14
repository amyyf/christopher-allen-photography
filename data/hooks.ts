import { NextRouter } from 'next/router';
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

export const useImageNav = (
  router: NextRouter,
  albumSlug?: string | string[],
  nextImageSlug?: string,
  previousImageSlug?: string,
) =>
  useEffect(() => {
    if (!albumSlug || !nextImageSlug || !previousImageSlug) return;

    const handleArrowEvent = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          return router.push(`/albums/${albumSlug}`);
        case 'ArrowLeft':
          return router.push(`/albums/${albumSlug}/${previousImageSlug}`);
        case 'ArrowRight':
          return router.push(`/albums/${albumSlug}/${nextImageSlug}`);
        default:
          return;
      }
    };

    document.addEventListener('keydown', handleArrowEvent);
    return () => document.removeEventListener('keydown', handleArrowEvent);
  }, [router, albumSlug, nextImageSlug, previousImageSlug]);
