import React, { useEffect, useState } from "react";
import {
  Carousel,
  ErrorComponent,
  Modal
} from "../molecules";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {
  IPackage,
  IModalReservation,
  IInitialStateAbout,
} from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { getAboutAction } from "../../redux/about/actions";
import { DialogActions, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Alert, ButtonComponent, SkeletonAbout } from "../atoms";
import { FormPackages, Layout, PackageTabs } from "../organisms";
import TurnRightIcon from '@mui/icons-material/TurnRight';

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
    color: ${(props) => props.theme.colors.red};
  }
`;

const SubTitle = styled.h3`
  font-size: 0.9rem;
  margin: 1rem 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
  text-decoration: underline;
  cursor: pointer;
`;

const Description = styled.p`
  margin: 0.4rem 0;
`;

const LinkComponent = styled(Link)`
  font-size: 0.9rem;
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
  text-decoration: underline;
  cursor: pointer;
`

function About() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const aboutInfo: IInitialStateAbout = useSelector(
    (state: RootState) => state.about
  );
  const tabsRef = React.useRef<HTMLDivElement>(null);
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

  if (aboutInfo.error) return <ErrorComponent errorMessage={aboutInfo.error} />;

  return (
    <Layout>
      <Alert
        alert={alert}
        setAlert={setAlert}
        message={<FormattedMessage id="product.added" />}
      />
      {aboutInfo.loading ? (
        <SkeletonAbout />
      ) : (
        <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} lg={2}>
            Adds content
          </Grid>
          <AboutComponent item xs={12} lg={10}>
            <Title>{aboutInfo.aboutInfo.aboutHeader1}</Title>
            <WrapperCarousel container>
              <CarouselItem item sm={12} md={7}>
                <Carousel images={aboutInfo.aboutInfo.images} />
              </CarouselItem>
              <DescriptionBlock item sm={12} md={5}>
                <Description>{aboutInfo.aboutInfo.aboutParagraph1}</Description>
                <LinkComponent to="/conferences">{aboutInfo.aboutInfo.aboutHeader2} </LinkComponent>
                <Description>
                  {aboutInfo.aboutInfo.aboutParagraph2}
                </Description>
                <LinkComponent to="/our-bar">{aboutInfo.aboutInfo.aboutHeader3}</LinkComponent>
                <Description>
                  {aboutInfo.aboutInfo.aboutParagraph3}
                </Description>
                <SubTitle onClick={() => tabsRef.current?.scrollIntoView()}>
                    {aboutInfo.aboutInfo.aboutHeader4}<TurnRightIcon fontSize="small"/>
                </SubTitle>
              </DescriptionBlock>
            </WrapperCarousel>
            <TitleSmall ref={tabsRef}>
              <FormattedMessage id="about.check-packages" />
            </TitleSmall>
            <PackageTabs handleAdd={handleAdd} packages={aboutInfo.aboutInfo.packages}/>
          </AboutComponent>
        </Grid>
      )}
      <Modal modal={modal.show} title="form.reservation-title">
        <FormPackages item={modal.item}>
          <DialogActions>
            <ButtonComponent typeButton="submit">
              <FormattedMessage id="primary.reservation" />
            </ButtonComponent>
            <ButtonComponent
              typeButton="button"
              styles={{ background: "#ff8282" }}
              onClick={handleClose}
            >
              <FormattedMessage id="primary.cancel" />
            </ButtonComponent>
          </DialogActions>
        </FormPackages>
      </Modal>
    </Layout>
  );
}

export default About;
