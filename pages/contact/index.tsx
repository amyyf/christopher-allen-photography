import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Block, Inline, INLINES } from '@contentful/rich-text-types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ReactNode } from 'react';
import HyperLink from '../../components/HyperLink';
import { getContactPageContent } from '../../data/contentful';

export default function Contact() {
  const { data, isLoading, isError } = useQuery(
    ['contactPage'],
    getContactPageContent,
  );

  const renderOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
        return <HyperLink uri={node.data.uri} linkText={children} />;
      },
    },
  };

  return (
    <>
      <div className="text-neutral-400 space-y-4 max-w-2xl mx-auto">
        {!isLoading &&
          !isError &&
          documentToReactComponents(data.textBlock, renderOptions)}
      </div>
      {!isLoading && !isError && (
        <div className="text-center mt-12">
          <Image
            priority={true}
            alt={data.image.fields.description}
            src={`https:${data.image.fields.file.url}`}
            width={data.image.fields.file.details.image?.width}
            height={data.image.fields.file.details.image?.height}
            className="border-neutral-400 border-[1px] border-solid"
          />
        </div>
      )}
    </>
  );
}
