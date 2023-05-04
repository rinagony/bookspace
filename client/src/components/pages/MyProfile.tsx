import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout } from "../molecules";
import styled from "styled-components";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

const ContactComponent = styled.div`
  margin-top: 2rem;
`;

function MyProfile() {
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <Layout>
    <ContactComponent>
      <FormControl>
        <InputLabel htmlFor="name">Email address</InputLabel>
        <Input id="name" />
      </FormControl>
    </ContactComponent>
  </Layout>
  );
}

export default MyProfile;
