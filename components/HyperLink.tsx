// note: this component is used for links in rich text data from Contentful

import { ReactNode } from 'react';

export default function HyperLink({
  uri,
  linkText,
}: {
  uri: string;
  linkText: ReactNode;
}) {
  return (
    <a
      href={uri}
      className="hover:text-neutral-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  );
}
