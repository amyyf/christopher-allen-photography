import { NextRouter } from 'next/router';
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

export const useImageNav = (
  router: NextRouter,
  gallerySlug?: string | string[],
  nextImageSlug?: string,
  previousImageSlug?: string,
) =>
  useEffect(() => {
    if (!gallerySlug || !nextImageSlug || !previousImageSlug) return;

    let keysPressed: string[] = [];
    const handleArrowEvent = (e: KeyboardEvent) => {
      keysPressed.push(e.key);
      if (keysPressed.length > 1) return; // prevent overriding multiple keypress events, i.e. browser navigation
      switch (e.code) {
        case 'ArrowUp':
          return router.push(`/galleries/${gallerySlug}`);
        case 'ArrowLeft':
          return router.push(`/galleries/${gallerySlug}/${previousImageSlug}`);
        case 'ArrowRight':
          return router.push(`/galleries/${gallerySlug}/${nextImageSlug}`);
        default:
          return;
      }
    };

    document.addEventListener('keydown', handleArrowEvent);
    return () => document.removeEventListener('keydown', handleArrowEvent);
  }, [router, gallerySlug, nextImageSlug, previousImageSlug]);
