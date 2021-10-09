import { Fragment } from "react";
import AllItems from "../../components/browse/all-items";
import { getAllItems } from "../../lib/browse-util";

function BrowsePage(props) {
  return (
    <Fragment>
      <AllItems items={props.items} />
    </Fragment>
  );
}
export function getStaticProps() {
  const allItems = getAllItems();
  return {
    props: {
      items: allItems,
    },
  };
}

export default BrowsePage;
