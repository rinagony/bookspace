import React, { useEffect, useState } from "react";
import { Carousel, FormReservation, Layout, Tabs } from "../molecules";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { IPackage, IModalReservation, IAbout } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { getAboutAction } from "../../redux/about/actions";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Alert, ButtonComponent } from "../atoms";

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
    paddding-left: 0;
    margin-top: 2rem;
  }
  a {
    color: ${(props) => props.theme.colors.red};
  }
`;

const SubTitle = styled.h3`
  font-size: 1rem;
  margin: 0.7rem 0;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 0;
`;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

function About() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const aboutInfo: IAbout | null = useSelector(
    (state: RootState) => state.about.aboutInfo
  );
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState<IModalReservation>({
    show: false,
    item: null,
  });

  useEffect(() => {
    dispatch(getAboutAction());
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

  return (
    <Layout>
      <Alert alert={alert} setAlert={setAlert} message="product.added" />
      <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} lg={2}>
          Adds content
        </Grid>
        {aboutInfo ? (
          <AboutComponent item xs={12} lg={10}>
            <Title>{aboutInfo.aboutHeader1}</Title>
            <WrapperCarousel container>
              <CarouselItem sm={12} md={7}>
                <Carousel images={aboutInfo.images} />
              </CarouselItem>
              <DescriptionBlock sm={12} md={5}>
                <Description>{aboutInfo.aboutParagraph1}</Description>
                <SubTitle>{aboutInfo.aboutHeader2}</SubTitle>
                <Description>
                  {aboutInfo.aboutParagraph2}
                  <Link to="/about#events">below</Link>
                </Description>
                <SubTitle>{aboutInfo.aboutHeader3}</SubTitle>
                <Description>
                  {aboutInfo.aboutParagraph3}
                  <Link to="/about#events">here</Link>
                </Description>
              </DescriptionBlock>
            </WrapperCarousel>
            <TitleSmall>
              <FormattedMessage id="about.check-packages" />
            </TitleSmall>
            <Tabs handleAdd={handleAdd} />
          </AboutComponent>
        ) : (
          <FormattedMessage id="primary.no-data" />
        )}
      </Grid>
      <Dialog
        open={modal.show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><FormattedMessage id="products.reservation" /></DialogTitle>
        <DialogBody>
          <FormReservation item={modal.item}>
            <DialogActions>
              <ButtonComponent
                typeButton="submit"
                styles={{ background: "#ff8282" }}
              >
                <FormattedMessage id="primary.send" />
              </ButtonComponent>
              <ButtonComponent typeButton="button" onClick={handleClose}>
                <FormattedMessage id="primary.cancel" />
              </ButtonComponent>
            </DialogActions>
          </FormReservation>
        </DialogBody>
      </Dialog>
    </Layout>
  );
}

export default About;
