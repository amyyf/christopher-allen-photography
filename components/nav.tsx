import type { NavData } from "../types";

export const Nav = ({ navData }: { navData: NavData[] }) => {
  console.log(navData)
  return (
    <>
      {navData.map(navItem => <p key={navItem.contentfulId}>{navItem.contentfulId}, {navItem.title} </p>)}
    </>
  );
}
