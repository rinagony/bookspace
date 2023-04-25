import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout, ProductItem } from "../molecules";
import { NoData, SkeletonCard } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { IInitialStateProducts } from "../../interfaces";

const ProductList = styled(Grid)`
  margin-top: 2rem;
`;

const ErrorText = styled.p`
  text-align: center;
`;

function Products() {
  const productsState: IInitialStateProducts = useSelector(
    (state: RootState) => state.products
  );

  if (productsState.error)
    return (
      <Layout>
        <ErrorText>
          <FormattedMessage id="error.reload" /> {productsState.error}
        </ErrorText>
      </Layout>
    );
  return (
    <Layout>
      {productsState.loading ? (
        <SkeletonCard />
      ) : (
        <>
          {!productsState.products.length ? (
            <NoData />
          ) : (
            <ProductList
              justifyContent={"center"}
              marginTop={2}
              container
              spacing={2}
            >
              {productsState.products.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
            </ProductList>
          )}
        </>
      )}
    </Layout>
  );
}

export default Products;
