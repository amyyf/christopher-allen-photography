import Link from 'next/link';
import type { NavData } from '../types';

export const NavBar = ({ navData }: { navData: NavData[] }) => {
  console.log(navData);
  return (
    <>
      {navData.map((navItem) => (
        <p key={navItem.contentfulId}>
          <Link href={`/albums/${navItem.contentfulId}`}>{navItem.title}</Link>
        </p>
      ))}
    </>
  );
};
