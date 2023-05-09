import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

const WrapperPageItems = styled.div`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-around;
    align-items: center;
  }
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PageItem = styled.a`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  cursor: pointer;
  margin-left: 1.1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
  white-space: nowrap;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const pagesList = [
    { title: <FormattedMessage id="primary.products" />, link: "/products" },
    { title: <FormattedMessage id="primary.about" />, link: "/about" },
    {
      title: <FormattedMessage id="primary.my-profile" />,
      link: "/my-profile",
    },
    { title: <FormattedMessage id="primary.contacts" />, link: "/contacts" },
  ];

  console.log(location.pathname)
  return (
    <WrapperPageItems>
      {pagesList.map((item, index) => (
        <PageItem
          style={
            (item.link === location.pathname
              ? { color: "#004d40" }
              : { color: "#212121" })
          }
          key={index}
          onClick={() => navigate(item.link)}
        >
          {item.title}
        </PageItem>
      ))}
    </WrapperPageItems>
  );
}

export default Navigation;
