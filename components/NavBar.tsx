import Link from 'next/link';
import type { NavData } from '../data/types';
import { convertTitleToSlug } from '../utils';

export const NavBar = ({ navData }: { navData?: NavData[] }) => {
  return (
    <nav className="flex justify-end mr-4 md:mr-8">
      {navData?.map((navItem) => (
        <Link
          key={navItem.contentfulId}
          href={`/albums/${convertTitleToSlug(navItem.title)}`}
        >
          <a className="pl-2 text-zinc-400 hover:text-zinc-300">
            {navItem.title}
          </a>
        </Link>
      ))}
    </nav>
  );
};
