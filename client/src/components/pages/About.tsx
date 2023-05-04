import React, { useEffect } from "react";
import { Carousel, Layout } from "../molecules";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { IAboutItem, IInitialStateAbout } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { getAboutAction } from "../../redux/about/actions";
import { Grid } from "@mui/material";

const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const AboutComponent = styled.div`
  margin-top: 1rem;
`;

const WrapperCarousel = styled(Grid)`
  display: flex;
  justify-content: center;
`

const CarouselItem = styled(Grid)`
-webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
-moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
`

function About() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const aboutInfo: IAboutItem[] = useSelector(
    (state: RootState) => state.about.aboutInfo
  );

  useEffect(() => {
    dispatch(getAboutAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <AboutComponent>
        <Title>
          <FormattedMessage id="about.title" />
        </Title>
        <WrapperCarousel container>
        <CarouselItem sm={12} md={8}>
        <Carousel carouselItems={aboutInfo} />
        </CarouselItem>
        </WrapperCarousel>
      </AboutComponent>
    </Layout>
  );
}

export default About;
