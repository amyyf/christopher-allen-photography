import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useImageQuery } from '../../../data/queries';

export default function ImageWrapper() {
  const router = useRouter();
  const { albumSlug, imageSlug } = router.query;

  const { isLoading, isError, data } = useImageQuery(imageSlug, albumSlug);

  if (isLoading) return <Loading />;
  if (isError || typeof imageSlug !== 'string' || !imageSlug)
    return <Error message="The image could not be found. Please try again." />;

  return (
    <section className="text-center">
      <div>
        <Link href={`/albums/${albumSlug}/${data.previousImageSlug}`}>
          <a className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </a>
        </Link>

        {/* is this the UX I want to handle forward/back browser routing?? */}
        <Link href={`/albums/${albumSlug}`}>
          <a className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
          </a>
        </Link>

        <Link href={`/albums/${albumSlug}/${data.nextImageSlug}`}>
          <a className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </Link>
      </div>

      <Image
        alt={data.fields.description}
        src={`https:${data.fields.file.url}`}
        width={data.fields.file.details.image?.width}
        height={data.fields.file.details.image?.height}
      />
    </section>
  );
}
