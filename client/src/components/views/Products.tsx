import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout, ProductItem } from "../molecules";
import { getAllProducts } from "../../api/products";
import { updateProducts } from "../../redux/products/slice";
import { SkeletonCard } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";

const ProductList = styled(Grid)`
  margin-top: 2rem;
`;

const NoData = styled.h2`
  margin-top: 50%;
  text-align: center;
  color: ${(props) => props.theme.colors.darkGreen};
`;

function Products() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProducts()
      .then((response) => {
        dispatch(updateProducts(response));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    console.log(products, "response from server and action");
  }, [products, products.length]);

  return (
    <Layout>
      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          {!products.length ? (
            <NoData>
              <FormattedMessage id="primary.no-data" />
            </NoData>
          ) : (
            <ProductList marginTop={2} item container spacing={2}>
              {products.map((item, index) => (
                <ProductItem key={index} data={item}/>
              ))}
            </ProductList>
          )}
        </>
      )}
    </Layout>
  );
}

export default Products;