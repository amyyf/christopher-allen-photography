import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getAboutPagePhoto } from '../../data/contentful';

export default function About() {
  const { data, isError, isLoading } = useQuery(
    ['homepagePhoto'],
    getAboutPagePhoto,
  );

  return (
    <>
      <div className="text-neutral-400 space-y-4 max-w-2xl mx-auto">
        {/* TODO: get this text dynamically from Contentful? */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          commodi quisquam, cupiditate quod aliquid incidunt praesentium illum
          optio quo, mollitia est quaerat quis odio totam odit non cumque ut.
          Pariatur!
        </p>
        <p>
          Christopher Allen Photography, Whitinsville, Massachusetts, email to
          &quot;contact&quot; @ this website.
        </p>
      </div>
      {!isLoading && !isError && (
        <div className="text-center mt-12">
          <Image
            priority={true}
            alt={data.fields.image.fields.description}
            src={`https:${data.fields.image.fields.file.url}`}
            width={data.fields.image.fields.file.details.image?.width}
            height={data.fields.image.fields.file.details.image?.height}
            className="border-neutral-400 border-[1px] border-solid"
          />
        </div>
      )}
    </>
  );
}
