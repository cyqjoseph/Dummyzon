import Link from "next/link";
import Image from "next/image";
function BrowseItem(props) {
  const { description, isSaved, price, title, slug, image } = props.item;
  //unique path
  const linkPath = `/browse/${slug}`;
  const imagePath = `/images/${image}`;
  return (
    <li className="browseItem">
      <Link href={linkPath}>
        <a>
          <div className="browseitem__image">
            <Image src={imagePath} alt={title} width={240} height={200} />
          </div>
          <div className="browseItem__details">
            <div className="browseItem__details-title">{title}</div>
            <div className="browseItem__details-price">{price}</div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default BrowseItem;
