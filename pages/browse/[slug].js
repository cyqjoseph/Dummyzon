import { getBrowseFiles, getBrowseItemsData } from "../../lib/browse-util";
import Head from "next/head";
import { Fragment } from "react";
import ItemContent from "../../components/browse/browse-detail/item-content";

function ItemDetailPage(props) {
  return (
    <Fragment>
      <section className="itemDetailPageContainer">
        <div className="itemDetailPage">
          <ItemContent item={props.item} />
        </div>
      </section>
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const itemData = getBrowseItemsData(slug);
  return { props: { item: itemData }, revalidate: 600 };
}

export function getStaticPaths() {
  const itemFileNames = getBrowseFiles();
  const slugs = itemFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({
      params: { slug: slug },
    })),
    fallback: false,
  };
}

export default ItemDetailPage;
