/* eslint-disable react/no-children-prop */
import Image from "next/image";
import { useState, useContext } from "react";
function ItemContent(props) {
  const { item } = props;
  const { description, isSaved, price, title, slug, image } = item;
  console.log(item);
  const imagePath = `/images/${image}`;

  return (
    <section className="itemDetail">
      <div>
        <div>
          <div className="itemDetail__image">
            <Image src={imagePath} alt={title} width={200} height={200} />
          </div>
          <div className="itemDetail__details">
            <h1>{title}</h1>
            <h2>{description}</h2>
            <h4>{price}</h4>
          </div>
        </div>
        <div className="itemDetail__button">
          <button className="itemDetail__button-button">Add To Cart</button>
        </div>
      </div>
    </section>
  );
}
export default ItemContent;
