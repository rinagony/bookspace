import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IAboutItem } from "../../interfaces";

interface CarouselProps {
    carouselItems: IAboutItem[]
}

const CarouselItself = styled(Carousel)`
    background:  ${(props) => props.theme.colors.white};
`

const CarouselItem = styled.div`
    display: flex;
    flex-direction: column;
    p { 
        color:  ${(props) => props.theme.colors.black};
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 2rem;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }
`

const Image = styled.img`
height: auto;
border-radius: 0.3rem;
width: auto;
`

function CarouselComponent({carouselItems}: CarouselProps) {
  return (
    <CarouselItself infiniteLoop autoPlay interval={2000} showIndicators={false} showThumbs={false}>
      {carouselItems.map((item, index) => (
        <CarouselItem>
          <Image src={item.image} />
          <p>{item.title}</p>
        </CarouselItem>
      ))}
    </CarouselItself>
  );
}

export default CarouselComponent;
