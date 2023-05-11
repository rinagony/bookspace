import React from "react";
import styled from "styled-components";
import { RadioGroup, SearchField, Select } from "../atoms";
import { FormattedMessage } from "react-intl";
import { SortProductsOptions } from "../../enums";

const SidebarContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem 1rem 2rem 1rem;
  border-radius: 0.5rem;
  background: rgb(249 249 249);
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const Block = styled.div`
  margin-top: 2rem;
`;

interface SidebarProductsProps {
  handleSearchData: (data: string) => void;
  handleFilterData: (option: string) => void;
  handleSortData: (option: string) => void;
}

function SidebarProducts({
  handleSearchData,
  handleFilterData,
  handleSortData,
}: SidebarProductsProps) {
  return (
    <SidebarContainer>
      <div>
        <Paragraph>
          <FormattedMessage id="products.search" />
        </Paragraph>
        <SearchField handleSearchData={handleSearchData} />
      </div>
      <Block>
        <Paragraph>
          <FormattedMessage id="products.filter" />
        </Paragraph>
        <Select handleFilterData={handleFilterData} />
      </Block>
      <Block>
        <Paragraph>
          <FormattedMessage id="products.sort" />
        </Paragraph>
        <RadioGroup
          type="sorter"
          options={Object.values(SortProductsOptions).filter((v) => isNaN(Number(v)))}
          onChange={handleSortData}
        />
      </Block>
    </SidebarContainer>
  );
}

export default SidebarProducts;
