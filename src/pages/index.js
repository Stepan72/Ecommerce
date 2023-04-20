import React, { useEffect } from "react";
import {
  Cart,
  Footer,
  FooterBanner,
  HeroBanner,
  Layout,
  Navbar,
  Product,
} from "@/components";
import { client } from "../../lib/client";

const Home = ({ products, bannerData }) => {
  // console.log(products);
  // console.log(bannerData);

  return (
    <div>
      <>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      </>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product, index) => {
          return product.name;
        })}
      </div>
      <FooterBanner />
    </div>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = "*[_type == 'product']";
  const products = await client.fetch(productsQuery);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
