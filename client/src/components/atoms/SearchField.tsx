import React from "react";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import ButtonComponent from "./Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchFieldComponent = styled.div``;

interface SearchFieldProps {
  searchData: string;
  setSearchData: () => void;
}

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 1.9rem;
`;

function SearchField({ searchData, setSearchData }: SearchFieldProps) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {};
  return (
    <SearchFieldComponent>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput type="text" {...register("searchData")} />
        <ButtonComponent typeButton="submit">
          <SearchOutlinedIcon />
        </ButtonComponent>
      </Form>
    </SearchFieldComponent>
  );
}

export default SearchField;
