import React, { useEffect, useMemo, useState } from "react";
import { Carousel, ErrorComponent, Table } from "../molecules";
import { FormBar, Layout } from "../organisms";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { IInitialStateBar } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Alert, NoData, SkeletonAbout } from "../atoms";
import { getBarAction } from "../../redux/bar/actions";
import TurnRightIcon from "@mui/icons-material/TurnRight";

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

const Description = styled.p`
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin: 0.7rem 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
`;

const SubtitleLink = styled(Subtitle)`
  text-decoration: underline;
  cursor: pointer;
`;
const WrapperTable = styled.div`
  margin-top: 3rem;
`;

const Reservation = styled.div`
  margin-top: 2rem;
`;

function OurBar() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const barInfo: IInitialStateBar = useSelector(
    (state: RootState) => state.bar
  );
  const [alert, setAlert] = useState(false);
  const reservationRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getBarAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Old Bar Del Bookspace Menu",
        columns: [
          {
            Header: "Drink",
            accessor: "title",
          },
          {
            Header: "Composition/Type",
            accessor: "composition",
          },
          {
            Header: "Price",
            accessor: "price",
          },
        ],
      },
    ],
    []
  );

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
                <div>
                  <FormattedMessage id="primary.phone" />:
                  <Link to={`tel:${barInfo.barInfo.phone}`}>
                    {barInfo.barInfo.phone}
                  </Link>
                </div>
                <div>
                  <FormattedMessage id="primary.email" />:
                  <Link to={`mailto:${barInfo.barInfo.email}`}>
                    {barInfo.barInfo.email}
                  </Link>
                </div>
                <div>
                  <SubtitleLink
                    onClick={() => reservationRef.current?.scrollIntoView()}
                  >
                    <FormattedMessage id="primary.reservation" />
                    <TurnRightIcon fontSize="small" />
                  </SubtitleLink>
                </div>
              </DescriptionBlock>
            </WrapperCarousel>
            <WrapperTable>
              {barInfo.barInfo.menu ? (
                <Table data={barInfo.barInfo.menu} columns={columns} />
              ) : (
                <NoData />
              )}
            </WrapperTable>
            <Reservation ref={reservationRef}>
              <Title>
                <FormattedMessage id="primary.reservation" />
              </Title>
              <FormBar />
            </Reservation>
          </AboutComponent>
        </Grid>
      )}
    </Layout>
  );
}

export default OurBar;
