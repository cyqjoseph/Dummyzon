import Link from "next/link";
import Image from "next/image";
function BrowseItem(props) {
  const { description, isSaved, price, title, slug, image } = props.item;
  //unique path
  const linkPath = `/browse/${slug}`;
  const imagePath = `/images/${image}`;
  return (
    <li>
      <Link href={linkPath}>
        <a>
          <div>
            <Image src={imagePath} alt={title} width={200} height={200} />
          </div>
          <div>
            <h1>{title}</h1>
            <h3>{description}</h3>
            <h4>{price}</h4>
            <h5>{isSaved}</h5>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default BrowseItem;
