import BrowseGrid from "./browse-grid";

function AllItems(props) {
  return (
    <section className="allItems">
      <h1>All items</h1>
      <BrowseGrid items={props.items} />
    </section>
  );
}

export default AllItems;
