import React, { useEffect, useState } from "react";
import {
  Carousel,
  ErrorComponent
} from "../molecules";
import { Layout } from "../organisms";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {
  IPackage,
  IModalReservation,
  IInitialStateBar,
} from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Alert, SkeletonAbout } from "../atoms";
import { getBarAction } from "../../redux/bar/actions";

const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const AboutComponent = styled(Grid)`
  margin-top: 1rem;
`;

const WrapperCarousel = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const CarouselItem = styled(Grid)`
  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
`;

const TitleSmall = styled(Title)`
  font-size: 1.2rem;
  margin-top: 3rem;
`;

const DescriptionBlock = styled(Grid)`
  padding-left: 1.5rem;
  @media screen and (max-width: 900px) {
    padding-left: 0;
    padding-top: 2rem;
  }
  a {
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
    margin-left: 0.5rem;
  }
  ul {
    padding-left: 1rem;
  }
`;

const ContactBlock = styled.div`
`;

const Description = styled.p`
  margin: 0.4rem 0;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin: 1 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
`;

function OurBar() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const barInfo: IInitialStateBar = useSelector(
    (state: RootState) => state.bar
  );
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState<IModalReservation>({
    show: false,
    item: null,
  });

  useEffect(() => {
    dispatch(getBarAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = (pack: IPackage) => {
    if (pack.date) {
      setModal({ show: true, item: pack });
    }
  };

  const handleClose = () => {
    setModal({
      show: false,
      item: null,
    });
  };

  if (barInfo.error) return <ErrorComponent errorMessage={barInfo.error} />;

  return (
    <Layout>
      <Alert
        alert={alert}
        setAlert={setAlert}
        message={<FormattedMessage id="product.added" />}
      />
      {barInfo.loading ? (
        <SkeletonAbout />
      ) : (
        <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} lg={2}>
            Adds content
          </Grid>
          <AboutComponent item xs={12} lg={10}>
            <Title>{barInfo.barInfo.title}</Title>
            <WrapperCarousel container>
              <CarouselItem item sm={12} md={7}>
                <Carousel images={barInfo.barInfo.images} />
              </CarouselItem>
              <DescriptionBlock item sm={12} md={5}>
                <Description>{barInfo.barInfo.description}</Description>
                <Subtitle>{barInfo.barInfo.subtitle}</Subtitle>
                <ul>
                  {barInfo.barInfo.descrition2.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Subtitle>{barInfo.barInfo.subtitle2}</Subtitle>
                <ContactBlock>
                  <FormattedMessage id="primary.phone" />:
                  <Link to={`tel:${barInfo.barInfo.phone}`}>
                    {barInfo.barInfo.phone}
                  </Link>
                </ContactBlock>
                <ContactBlock>
                  <FormattedMessage id="primary.email" />:
                  <Link to={`mailto:${barInfo.barInfo.email}`}>
                    {barInfo.barInfo.email}
                  </Link>
                </ContactBlock>
              </DescriptionBlock>
            </WrapperCarousel>
            <TitleSmall ref={tabsRef}>
              <FormattedMessage id="bar.menu" />
            </TitleSmall>
          </AboutComponent>
        </Grid>
      )}
    </Layout>
  );
}

export default OurBar;
