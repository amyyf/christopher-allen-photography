import Link from 'next/link';
import type { NavData } from '../data/types';
import { convertTitleToSlug } from '../utils';

export const NavBar = ({
  navData,
  currentAlbum,
}: {
  navData?: NavData[];
  currentAlbum?: string | string[];
}) => {
  return (
    <nav className="flex justify-end flex-wrap gap-x-3 mr-4 md:mr-8">
      {navData?.map((navItem) => {
        const slug = convertTitleToSlug(navItem.title);
        const textClasses =
          slug === currentAlbum
            ? 'text-zinc-300'
            : 'text-zinc-400 hover:text-zinc-300';

        return (
          <Link key={navItem.contentfulId} href={`/albums/${slug}`}>
            <a className={textClasses}>{navItem.title}</a>
          </Link>
        );
      })}
    </nav>
  );
};
