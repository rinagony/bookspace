import React from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { IProduct } from "../../interfaces";
import { FormattedMessage } from "react-intl";
import { ButtonComponent } from "../atoms";

interface ProductItemPropsInterface {
  data: IProduct;
}

const ProductItemComponent = styled(Grid)`
  padding: 15px;
  background: ${(props) => props.theme.colors.white};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  height: 20rem;
  border-radius: 5px;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0;
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: 1rem;
  span {
    color: ${(props) => props.theme.colors.black};
  }
`;

const Title = styled(Paragraph)`
  font-size: 1.3rem;
  font-weight: 600;
`;

function ProductItem({ data }: ProductItemPropsInterface) {
  return (
    <ProductItemComponent
      margin={5}
      item
      display={"flex"}
      flexDirection={"column"}
      xs={3}
    >
      <ImageContainer>
        <img
          width={"100%"}
          src={data.image}
          srcSet={data.image}
          alt={data.title}
        />
      </ImageContainer>
      <Title>
        <span>
          <FormattedMessage id="title" />
        </span>
        {data.title}
      </Title>
      <Paragraph>
        <span>
          <FormattedMessage id="category" />
        </span>
        {data.category}
      </Paragraph>
      <Paragraph>{data.description}</Paragraph>
      <ButtonComponent typeButton='button'>Learn more..</ButtonComponent>
    </ProductItemComponent>
  );
}

export default ProductItem;
