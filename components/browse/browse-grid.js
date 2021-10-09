import BrowseItem from "./browse-item";

function BrowseGrid(props) {
  const { items } = props;
  const key = "special";
  return (
    <ul className="browseGrid">
      {items.map((item) => (
        <BrowseItem key={key + item.slug} item={item} />
      ))}
    </ul>
  );
}
export default BrowseGrid;
