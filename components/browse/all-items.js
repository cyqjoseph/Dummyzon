import BrowseGrid from "./browse-grid";

function AllItems(props) {
  return (
    <section className="allItemsContainer">
      <div className="allItems">
        <h1 className="allItems__header">Browse</h1>
        <BrowseGrid items={props.items} />
      </div>
    </section>
  );
}

export default AllItems;
