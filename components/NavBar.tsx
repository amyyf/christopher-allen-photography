import Link from 'next/link';
import type { NavData } from '../types';

export const NavBar = ({ navData }: { navData: NavData[] }) => {
  return (
    <nav className="flex justify-end mr-4 md:mr-8 text-zinc-400">
      {navData.map((navItem) => (
        <Link
          key={navItem.contentfulId}
          href={`/albums/${navItem.contentfulId}`}
        >
          <a className="pl-2">{navItem.title}</a>
        </Link>
      ))}
    </nav>
  );
};
