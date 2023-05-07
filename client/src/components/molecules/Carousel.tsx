import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IAboutItem } from "../../interfaces";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const ButtonArrowLeft = styled.button`
  border: none;
  position: absolute;
  outline: none;
  color: ${(props) => props.theme.colors.green100};
  z-index: 10;
  background: inherit;
  cursor: pointer;
  top: 50%;
`;

const ButtonArrowRight = styled(ButtonArrowLeft)`
  right: 0;
`;

const CarouselItself = styled(Carousel)`
  position: relative;
  background:  ${(props) => props.theme.colors.lightWhite};
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${(props) => props.theme.colors.black};
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`

const Image = styled.img`
  border-radius: 0.3rem;
  width:  100%;
  height: 100%;
  object-fit:scale-down;
`;

interface CarouselProps {
  carouselItems: IAboutItem[];
}

function CarouselComponent({ carouselItems }: CarouselProps) {
  return (
    <CarouselItself
      infiniteLoop
      autoPlay
      showStatus={false}
      swipeable
      transitionTime={500}
      interval={2000}
      renderArrowPrev={(clickHandler) => (
        <ButtonArrowLeft onClick={clickHandler}>
          <ArrowCircleLeftIcon fontSize="large" />
        </ButtonArrowLeft>
      )}
      renderArrowNext={(clickHandler) => (
        <ButtonArrowRight onClick={clickHandler}>
          <ArrowCircleRightIcon fontSize="large" />
        </ButtonArrowRight>
      )}
      showIndicators={false}
      showThumbs={false}
    >
      {carouselItems.map((item, index) => (
        <CarouselItem>
          <ImageWrapper>
            <Image src={item.image} />
          </ImageWrapper>
        </CarouselItem>
      ))}
    </CarouselItself>
  );
}

export default CarouselComponent;
