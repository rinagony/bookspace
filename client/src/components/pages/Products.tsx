import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout, ProductItem, SidebarProducts } from "../molecules";
import { NoData, SkeletonCard } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import { IInitialStateProducts, IProduct } from "../../interfaces";
import usePagination from "./../../hooks/UsePagination";

const ProductList = styled(Grid)`
  margin-top: 2rem;
`;

const ErrorText = styled.p`
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

function Products() {
  let [page, setPage] = useState(1);

  const productsState: IInitialStateProducts = useSelector(
    (state: RootState) => state.products
  );

  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);

  const amountPerPage = 6;
  const paginationCount = Math.ceil(
    productsState.products.length / amountPerPage
  );
  let products = usePagination(productsFiltered, amountPerPage);

  useEffect(() => {
    setProductsFiltered(productsState.products);
  }, [productsState.products]);

  const handleSearchProducts = (search: string) => {
    const productsUpdated: IProduct[] = productsState.products.filter(
      (item) =>
        item.description.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search)
    );
    search.length !== 0
      ? setProductsFiltered(productsUpdated)
      : setProductsFiltered(productsState.products);
  };

  const handleFilterData = (filter: string) => {
    if (filter === "All") {
      setProductsFiltered(productsState.products);
    } else {
      const productsUpdated: IProduct[] = productsState.products.filter(
        (item) => item.category === filter.toLowerCase()
      );
      setProductsFiltered(productsUpdated);
    }
  };

  const onChangePagination = (e: any, pg: number) => {
    setPage(pg);
    products.jump(pg);
  };

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
        <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} lg={2}>
            <SidebarProducts
              handleSearchData={handleSearchProducts}
              handleFilterData={handleFilterData}
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <ProductList
              justifyContent={"center"}
              marginTop={2}
              container
              spacing={2}
            >
              {products.currentData().map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
            </ProductList>
            {productsFiltered.length >= 6 ? (
              <PaginationContainer>
                <Pagination
                  count={paginationCount}
                  size="large"
                  page={page}
                  variant="outlined"
                  shape="circular"
                  onChange={onChangePagination}
                />
              </PaginationContainer>
            ) : null}
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default Products;
