import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout, ProductItem } from "../molecules";
import { useParams } from 'react-router-dom';
import { getAllProducts } from "../../api/products";
import { updateProducts } from "../../redux/products/slice";
import { SkeletonCard } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";

function SingleProduct() {
  const { id } = useParams();

  return (
    <Layout>
      Product item {id}
    </Layout>
  );
}

export default SingleProduct;