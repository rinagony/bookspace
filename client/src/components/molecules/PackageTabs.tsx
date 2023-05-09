import { Grid} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import SouthIcon from "@mui/icons-material/South";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import book from "./../../assets/images/books.jpg";
import { ButtonComponent } from "../atoms";
import { FormattedMessage } from "react-intl";
import { IPackage } from "../../interfaces";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TabsHeader = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    justify-content: center !important;
  }
`;

const TabsHeaderItem = styled(Grid)`
  text-align: center;
  border: 3px solid ${(props) => props.theme.colors.white};
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.4rem;
  background: ${(props) => props.theme.colors.lightWhite};
  cursor: pointer;
  &.active-tab {
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
    -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
    box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  }
  svg {
    color: ${(props) => props.theme.colors.red};
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem !important;
  }
`;

const WrapperIcon = styled.div`
  text-align: center;
`;

const IconDown = styled(SouthIcon)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.red};
`;

const TabsBody = styled(Grid)`
  background-image: linear-gradient(
      90deg,
      rgba(2, 33, 34, 0.8941701680672269) 100%,
      rgba(0, 0, 0, 0.636467086834734) 100%,
      rgba(0, 212, 255, 1) 100%
    ),
    url(${book});
  color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  position: relative;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  background-repeat: no-repeat;
  @media screen and (max-width: 900px) {
    font-size: 0.8rem;
  }
  font-weight: 600;
  ul {
    padding-left: 1rem;
  }
  li {
    margin-top: 0.5rem;
  }
`;

const Title = styled.div`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 600;
`;

const WrapperTabBody = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const Price = styled.p`
  font-size: 2rem;
  text-align: right;
  font-weight: 600;
  text-align: right;
`;

const TabsReservation = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 600px) {
    padding-top: 3rem;
  }
`;

interface TabsProps {
  handleAdd: (pack: IPackage) => void;
}

function PackageTabs({ handleAdd }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const packages: IPackage[] = [
    {
      title: "VISITOR pack",
      secondaryTitle: "One day subscription",
      description: [
        "1 hour tour guide with Dr of Philosophical Science - you will learn about history of our ancient library",
        "Free drinks (coffee, beer)",
        "Flexible desk",
      ],
      price: 80,
      image: "",
      icon: <ElectricBoltIcon />,
    },
    {
      title: "FUN pack",
      secondaryTitle: "One month subscription with limited hours",
      description: [
        "1 hour tour guide with Dr of Philosophical Science - you will learn about history of our ancient library",
        "Free drinks (coffee, beer)",
        "Flexible desk",
        "Library and Coworking availible from 9am to 5pm",
      ],
      price: 400,
      image: "",
      icon: <StarBorderPurple500Icon />,
    },
    {
      title: "VIP pack",
      secondaryTitle: "One month subscribtion (ALL INCLUISIVE)",
      description: [
        "1 hour tour guide with Dr of Philosophical Science - you will learn about history of our ancient library",
        "Free drinks (coffee, beer)",
        "Fixed desk",
        "Library and Coworking availible anytime",
      ],
      price: 800,
      image: "",
      icon: <LocalFireDepartmentIcon />,
    },
  ];
  const [calendarValue, setCalendarValue] = useState<Dayjs | null>(
    dayjs(new Date().toISOString().slice(0, 10))
  );
  const onChangeTab = (index: number) => {
    setActiveTab(index);
  };
  const onReserve = (pack: IPackage) => {
    if(calendarValue) {
      pack.date = calendarValue.format('DD/MM/YYYY')
      handleAdd(pack);
    }
  };

  return (
    <>
      <TabsHeader container>
        {packages.map((item, index) => (
          <TabsHeaderItem
            key={index}
            item
            sm={3}
            onClick={() => onChangeTab(index)}
            className={index === activeTab ? "active-tab" : ""}
          >
            {item.title}
            {item.icon}
          </TabsHeaderItem>
        ))}
      </TabsHeader>
      <WrapperIcon>
        <IconDown fontSize="large" />
      </WrapperIcon>
      <WrapperTabBody container>
        <TabsBody item sm={5} md={7} flexDirection={'column'}>
          <Title>{packages[activeTab].secondaryTitle}</Title>
          <ul>
            {packages[activeTab].description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Price>{packages[activeTab].price} €</Price>
        </TabsBody>
        <TabsReservation flexDirection={"column"} item sm={7} md={5}>
          <Title>
            <FormattedMessage id="products.reservation" />
          </Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={calendarValue}
              sx={[
                {
                  '.Mui-selected': {
                    backgroundColor: `#b2dfdb !important`,
                  },
                }
              ]}
              onChange={(value: any) => setCalendarValue(value)}
            />
          </LocalizationProvider>

          <ButtonComponent
            styles={{ height: "2rem" }}
            typeButton="submit"
            onClick={() => onReserve(packages[activeTab])}
          >
            <FormattedMessage id="about.reserve" />
          </ButtonComponent>
        </TabsReservation>
      </WrapperTabBody>
    </>
  );
}

export default PackageTabs;
