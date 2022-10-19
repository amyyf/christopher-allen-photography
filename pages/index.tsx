import type { NextPage } from 'next';
import Image from 'next/image';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Link from 'next/link';
import { useSiteNavQuery } from '../data/queries';
import { convertTitleToSlug } from '../utils';

const Home: NextPage = () => {
  const { isLoading, isError, data } = useSiteNavQuery();
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Sorry, we couldn't display the images. Please try refreshing the page." />
    );

  return (
    <section className="grid grid-cols-gallery gap-5 max-w-screen-xl xl:w-full xl:mx-auto">
      {data.map((galleryData) => (
        <div
          className="relative text-transparent hover:text-neutral-200 hover:transition focus-within:text-neutral-100 focus-within:transition"
          key={galleryData.contentfulId}
        >
          <Link href={`/galleries/${convertTitleToSlug(galleryData.title)}`}>
            <a className="block relative focus:transition focus:opacity-50 focus:outline-none">
              <Image
                alt={galleryData.firstEntry.description}
                src={`https:${galleryData.firstEntry.url}`}
                height={galleryData.firstEntry.height}
                width={galleryData.firstEntry.width}
                className="hover:opacity-50 hover:transition"
              />
            </a>
          </Link>
          <h2 className="text-lg absolute top-1/3 left-5">
            {galleryData.title}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default Home;
