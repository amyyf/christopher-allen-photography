import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';
import Image from 'next/image';
import { convertTitleToSlug } from '../../utils';
import { useSiteNavQuery } from '../../data/queries';

export default function GalleryNav() {
  const { isLoading, isError, data } = useSiteNavQuery();
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );

  return (
    <section className="grid grid-cols-gallery gap-5 max-w-screen-xl xl:w-full xl:mx-auto">
      {data.map((galleryData) => (
        <div
          className="relative text-transparent hover:text-zinc-200 hover:transition focus-within:text-zinc-100 focus-within:transition"
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
}
