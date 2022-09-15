import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';
import Image from 'next/image';
import { convertTitleToSlug } from '../../utils';
import { useSiteNavQuery } from '../../data/queries';

export default function AlbumNav() {
  const { isLoading, isError, data } = useSiteNavQuery();
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );

  return (
    <section className="grid grid-cols-album gap-5 max-w-screen-xl xl:w-full xl:mx-auto">
      {data.map((albumData) => (
        <div
          className="relative text-transparent hover:text-zinc-200 hover:transition focus-within:text-zinc-100 focus-within:transition"
          key={albumData.contentfulId}
        >
          <Link href={`/albums/${convertTitleToSlug(albumData.title)}`}>
            <a className="block relative focus:transition focus:opacity-50 focus:outline-none">
              <Image
                alt={albumData.firstEntry.description}
                src={`https:${albumData.firstEntry.url}`}
                height={albumData.firstEntry.height}
                width={albumData.firstEntry.width}
                className="hover:opacity-50 hover:transition"
              />
            </a>
          </Link>
          <h2 className="text-lg absolute top-1/3 left-5">{albumData.title}</h2>
        </div>
      ))}
    </section>
  );
}
