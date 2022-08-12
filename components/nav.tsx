import { getNav } from '../api/contentful';

import * as contentful from 'contentful';

export default function Nav ({client}: { client: contentful.ContentfulClientApi}) {
  const navContent = getNav(client);
  console.log(navContent);
  
  return <nav>this is a nav bar</nav>
}