import React from "react";
import styled from "styled-components";
import { SearchField, Select } from "../atoms";
import { FormattedMessage } from "react-intl";

const SidebarContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem 1rem 2rem 1rem;
  border-radius: 0.5rem;
  background: rgb(249 249 249);
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const SearchBlock = styled.div``;
const FilterBlock = styled.div`
  margin-top: 2rem;
`;

interface SidebarProductsProps {
  handleSearchData: (dataToFilter: string) => void;
  handleFilterData: (dataToFilter: string) => void;
}

function SidebarProducts({ handleSearchData, handleFilterData }: SidebarProductsProps) {
  return (
    <SidebarContainer>
      <SearchBlock>
        <Paragraph>
          <FormattedMessage id="products.search" />
        </Paragraph>
        <SearchField handleSearchData={handleSearchData} />
      </SearchBlock>
      <FilterBlock>
        <Paragraph>
          <FormattedMessage id="products.filter" />
        </Paragraph>
        <Select handleFilterData={handleFilterData} />
      </FilterBlock>
    </SidebarContainer>
  );
}

export default SidebarProducts;
