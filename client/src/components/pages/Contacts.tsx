import React, { useEffect } from "react";
import { GoogleMap } from "../molecules";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { LayoutAds } from "../organisms";
import { FormattedMessage } from "react-intl";
import { Description, Subtitle } from "../../assets/styled-components";
import { IInitialStateContacts } from "../../interfaces";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { getContactsAction } from "../../redux/contacts/actions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const WrapperContactInfo = styled(Grid)`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media screen and (max-width: 900px) {
    padding-top: 2rem;
    p {
      font-size: 0.8rem;
    }
  }
`;

const BlockInfo = styled.div`
text-align: left;
displa
`;

const LinkComponent = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  margin-left: 0.5rem;
`;

const LocationInfo = styled.div`
  display: flex;
  margin-top: 1.5rem;
  flex-diretion: column;
  justify-content: center;
  align-items: flex-start;
  color: ${(props) => props.theme.colors.black};
  svg {
    color: ${(props) => props.theme.colors.red};
    margin-right: 0.4rem;
  }
  span {
    font-weight: 600;
  }
`;

const WrapperLocationInfo = styled.div`

`

function Contacts() {
  const contactsInfo: IInitialStateContacts = useSelector(
    (state: RootState) => state.contacts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getContactsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutAds title="contacts.contact">
      <Grid container>
        <Grid data-aos="fade-up" data-aos-once="true" item xs={12} md={8}>
          <GoogleMap />
        </Grid>
        <WrapperContactInfo
          flexDirection={"column"}
          alignItems={"flex-start"}
          item
          xs={12}
          md={4}
        >
          {contactsInfo.contactsInfo?.contacts.map((item, index) => (
            <BlockInfo key={index}>
              <Subtitle>{item.title}</Subtitle>
              <Description>
                <FormattedMessage id="form.phone" />
                <LinkComponent to={`tel:${item.phone}`}>
                  {item.phone}
                </LinkComponent>
              </Description>
              <Description>
                <FormattedMessage id="form.email" />
                <LinkComponent to={`mailto:${item.email}`}>
                  {item.email}
                </LinkComponent>
              </Description>
            </BlockInfo>
          ))}
         <WrapperLocationInfo>
         <LocationInfo>
            <LocationOnIcon />
            <FormattedMessage id="primary.address" />
            <span>{contactsInfo.contactsInfo?.address}</span>
          </LocationInfo>
          <LocationInfo>
            <LocationCityIcon />
            <FormattedMessage id="primary.city" />
            <span>{contactsInfo.contactsInfo?.city}</span>
          </LocationInfo>
         </WrapperLocationInfo>
        </WrapperContactInfo>
      </Grid>
    </LayoutAds>
  );
}

export default Contacts;
