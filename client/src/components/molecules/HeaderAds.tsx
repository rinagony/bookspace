import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const HeaderAdsComponent = styled.div`
  background: #880e4f;
  color: #fce4ec;
  padding: 0.3rem;
  font-size: 0.7rem;
  overflow: hidden;
  font-weight: 600;
  text-align: center;
margin: 0;
`;

interface AlertComponentProps {
  announce: string;
}

function HeaderAds({ announce }: AlertComponentProps) {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(60%,0)" },
    to: { transform: "translate(-60%,0)" },
    config: { duration: 15000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });
  return (
    <HeaderAdsComponent>
      <animated.div style={scrolling}>{announce}</animated.div>
    </HeaderAdsComponent>
  );
}

export default HeaderAds;
