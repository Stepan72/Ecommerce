import React, { useState } from "react";
import { client, urlFor } from "../../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "@/components";
// import { useContext } from "react";
// import Context from "../../../context/StateContext";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cart-slice";

const ProductDetails = ({ product, products }) => {
  // console.log(products);
  const [index, setIndex] = useState(0);

  /// Old useContext
  // const ctx = useContext(Context);
  // console.log(product);
  // console.log(ctx);

  const { image, name, details, price } = product;

  /// New Redux
  const dispatch = useDispatch();
  const qty = useSelector((state) => state.cart.qty);
  // console.log(qty);
  /// Just check
  // const cart = useSelector((state) => state.cart);
  // console.log(cart);

  function handleBuyNow() {
    dispatch(cartActions.onAdd({ product, qty }));
    dispatch(cartActions.setShowCart());
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <img
                  src={urlFor(item)}
                  key={i}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => {
                    setIndex(i);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                // onClick={
                //   ctx.decQty}>
                onClick={() => {
                  dispatch(cartActions.decQty());
                }}
              >
                <AiOutlineMinus />
              </span>
              {/* <span className="num">{ctx.qty}</span> */}
              <span className="num">{qty}</span>

              <span
                className="plus"
                // onClick={ctx.incQty}>
                onClick={() => {
                  dispatch(cartActions.incQty());
                }}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                // ctx.onAdd(product, ctx.qty);
                dispatch(cartActions.onAdd({ product, qty }));
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item, index) => {
              return <Product key={item._id} product={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  // console.log(slug);
  // console.log(product);

  return {
    props: { products, product },
  };
};
