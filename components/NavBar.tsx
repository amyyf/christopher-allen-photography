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
        <a className="text-zinc-400 hover:text-zinc-300">Galleries</a>
      </Link>
      <p className="text-zinc-400">|</p>
      {navData?.map((navItem) => {
        const slug = convertTitleToSlug(navItem.title);
        const textClasses =
          slug === currentGallery
            ? 'text-zinc-300'
            : 'text-zinc-400 hover:text-zinc-300';

        return (
          <Link key={navItem.contentfulId} href={`/galleries/${slug}`}>
            <a className={textClasses}>{navItem.title}</a>
          </Link>
        );
      })}
    </nav>
  );
};
