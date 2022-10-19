import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { NavData } from '../types/data';
import { convertTitleToSlug } from '../utils';

// sets "active" nav link styles based on current URL slug
const getActiveLinkClasses = (
  thisLink: string,
  currentSelectedLink: string | string[] | undefined,
) => {
  return thisLink === currentSelectedLink
    ? 'text-neutral-300'
    : 'text-neutral-400 hover:text-neutral-300';
};

const toggleDropdown = (setState: Dispatch<SetStateAction<boolean>>) => {
  setState((prevState) => !prevState);
};

// TODO: set so click outside of menu closes it. double-check keyboard nav and aria
// const listenForOutsideClick = (e, dropdownOpen, setState) => {
//   console.log(
//     'listening',
//     !e.target.closest('.relative'),
//     !e.target.matches('.relative'),
//   );
//   // (!e.target.closest('.relative') || !e.target.matches('.relative'))
//   console.log('setting');
//   if (
//     dropdownOpen &&
//     !e.target.closest('.relative') &&
//     !e.target.matches('.relative')
//   ) {
//     return toggleDropdown(setState);
//   }
// };

export const NavBar = ({
  navData,
  currentGallery,
}: {
  navData?: NavData[];
  currentGallery?: string | string[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownContainerClasses = dropdownOpen
    ? 'block absolute z-10 bg-neutral-900 min-w-max	px-4 pb-3'
    : 'hidden';
  const dropdownItemClasses = 'block m-3';

  // useEffect(() => {
  //   if (dropdownOpen) {
  //     document.addEventListener('click', (e) =>
  //       listenForOutsideClick(e, dropdownOpen, setDropdownOpen),
  //     );
  //   }
  //   return () => {
  //     document.removeEventListener('click', () => listenForOutsideClick);
  //   };
  // }, [dropdownOpen, setDropdownOpen]);

  return (
    <nav className="flex justify-end flex-wrap gap-x-3 mr-4 md:mr-8">
      <div className="relative">
        <button
          onClick={() => toggleDropdown(setDropdownOpen)}
          className={getActiveLinkClasses('/galleries', currentGallery)}
        >
          Galleries
        </button>
        <div className={dropdownContainerClasses}>
          <Link href="/">
            <a
              className={`${dropdownItemClasses} ${getActiveLinkClasses(
                '/',
                currentGallery,
              )}`}
              onClick={() => toggleDropdown(setDropdownOpen)}
            >
              All Galleries
            </a>
          </Link>
          {navData?.map((navItem) => {
            const slug = convertTitleToSlug(navItem.title);
            return (
              <Link key={navItem.contentfulId} href={`/galleries/${slug}`}>
                <a
                  className={`${dropdownItemClasses} ${getActiveLinkClasses(
                    slug,
                    currentGallery,
                  )}`}
                  onClick={() => toggleDropdown(setDropdownOpen)}
                >
                  {navItem.title}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <p className="text-neutral-400">|</p>
      <Link href="/contact">
        <a className={getActiveLinkClasses('/contact', currentGallery)}>
          Contact
        </a>
      </Link>
    </nav>
  );
};
