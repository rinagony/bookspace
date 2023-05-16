import React, { useEffect, useMemo, useState } from "react";
import { Carousel, ErrorComponent, Table } from "../molecules";
import { FormBar, LayoutAds } from "../organisms";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { IInitialStateBar } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Alert, NoData, SkeletonAbout } from "../atoms";
import { getBarAction } from "../../redux/bar/actions";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { Description, Subtitle, Title } from "../../assets/styled-components";

const WrapperInfo = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const CarouselItem = styled(Grid)`
  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
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
  const dispatch = useAppDispatch()
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
    <LayoutAds title="bar.title">
      <Alert
        alert={alert}
        setAlert={setAlert}
        message={<FormattedMessage id="product.added" />}
      />
      {barInfo.loading ? (
        <SkeletonAbout />
      ) : (
        <>
          <WrapperInfo container>
            <CarouselItem
              data-aos="fade-up"
              data-aos-once="true"
              item
              sm={12}
              md={7}
            >
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
          </WrapperInfo>
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
        </>
      )}
    </LayoutAds>
  );
}

export default OurBar;
