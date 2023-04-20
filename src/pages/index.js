import React from "react";

const Home = () => {
  return (
    <div>
      <>HeroBanner</>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variatoons</p>
      </div>
      <div className="products-container">
        {["Product 1", "Product 2"].map((product, index) => {
          return product;
        })}
      </div>
      Footer
    </div>
  );
};

export default Home;
