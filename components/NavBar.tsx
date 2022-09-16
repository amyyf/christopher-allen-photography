import Link from 'next/link';
import type { NavData } from '../types/data';
import { convertTitleToSlug } from '../utils';

export const NavBar = ({
  navData,
  currentGallery,
}: {
  navData?: NavData[];
  currentGallery?: string | string[];
}) => {
  return (
    <nav className="flex justify-end flex-wrap gap-x-3 mr-4 md:mr-8">
      <Link href="/galleries">
        <a className="text-neutral-400 hover:text-neutral-300">Galleries</a>
      </Link>
      <p className="text-neutral-400">|</p>
      {navData?.map((navItem) => {
        const slug = convertTitleToSlug(navItem.title);
        const textClasses =
          slug === currentGallery
            ? 'text-neutral-300'
            : 'text-neutral-400 hover:text-neutral-300';

        return (
          <Link key={navItem.contentfulId} href={`/galleries/${slug}`}>
            <a className={textClasses}>{navItem.title}</a>
          </Link>
        );
      })}
    </nav>
  );
};
