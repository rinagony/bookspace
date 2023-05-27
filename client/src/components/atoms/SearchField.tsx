import React from "react";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import ButtonComponent from "./Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "@mui/material";

interface SearchFieldProps {
  handleSearchData: (dataToFilter: string) => void
}

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const SearchInput = styled(Input)`
  width: 100%;
  height: 1.9rem;
`;

function SearchField({ handleSearchData }: SearchFieldProps) {
  const { register, handleSubmit } = useForm();
  const onSubmitSearch = (data: FieldValues) => {
    handleSearchData(data.searchData);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitSearch)}>
        <SearchInput type="search" {...register("searchData")} />
        <ButtonComponent styles={{padding: '0.2rem'}} typeButton="submit">
          <SearchOutlinedIcon />
        </ButtonComponent>
      </Form>
    </>
  );
}

export default SearchField;
