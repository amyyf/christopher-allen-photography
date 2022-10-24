import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getContactPagePhoto } from '../../data/contentful';

export default function Contact() {
  const { data, isError, isLoading } = useQuery(
    ['homepagePhoto'],
    getContactPagePhoto,
  );

  return (
    <>
      <div className="text-neutral-400 space-y-4 max-w-2xl mx-auto">
        {/* TODO: get this text dynamically from Contentful, use below as fallback */}
        <p>
          Christopher Allen Photography is based in Whitinsville, town of
          Northbridge, Massachusetts, USA. I fell in love with photography in
          high school and college, processing in black and white. I photograph
          landscapes, people, weddings, plays, dance, and orchestras. I&apos;ve
          worked professionally for{' '}
          <a
            href="https://www.telegram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            telegram.com
          </a>
          .
        </p>
        <p>Please enjoy some of my favorite images on this site!</p>
        <p>
          To contact me:{' '}
          <a
            className="hover:text-neutral-300"
            href="mailto:contact@christopherallen.photography?subject=Inquiry%20from%20website"
          >
            contact@christopherallen.photography
          </a>
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
