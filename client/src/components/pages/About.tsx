import React, { useEffect } from "react";
import { Carousel, Layout, Tabs } from "../molecules";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { IAboutItem, IInitialStateAbout, IPackage } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { getAboutAction } from "../../redux/about/actions";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

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
  padding-left: 1rem;
  @media screen and (max-width: 900px) {
    paddding-left: 0;
    margin-top: 2rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`

const Description = styled.p`
  margin: 0;
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

  const onAddPackage = (pack: IPackage) => {
    console.log(pack, 'onAdd')
  }

  return (
    <Layout>
      <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} lg={2}>
          Addvertise
        </Grid>
        <AboutComponent item xs={12} lg={10}>
          <Title>
            <FormattedMessage id="about.title" />
          </Title>
          <WrapperCarousel container>
            <CarouselItem sm={12} md={7}>
              <Carousel carouselItems={aboutInfo} />
            </CarouselItem>
            <DescriptionBlock sm={12} md={5}>
              <Description>
                Awesome store is the
                single most important European travel bookshop. This spacious
                store offers a selection of books, maps, conferences, coworking
                spaces and bar. Founded in 1996, "Awesome"  is a store dedicated to all
                nature lovers, home of the largest natural history book collection
                in the world! Visitors can find books on entomology,
                botany, geology, environmental sciences, meteorology,
                engineering and astronomy.
              </Description>
              <SubTitle>Conferences:</SubTitle>
              <Description>
                In our book store there are many events and conferences. The
                most famous writers performed in our stage, presenting their new
                books. Check out events <Link to="/about#events">below</Link>
              </Description>
              <SubTitle>Coworking spaces:</SubTitle>
              <Description>
                In our book store there is a fancy Bar called Charles Darvin.
                You can check out its menu <Link to="/about#events">here</Link>
              </Description>
            </DescriptionBlock>
          </WrapperCarousel>
          <TitleSmall>
            <FormattedMessage id="about.check-packages" />
          </TitleSmall>
          <Tabs handleOnClick={onAddPackage}/>
        </AboutComponent>
      </Grid>
    </Layout>
  );
}

export default About;
