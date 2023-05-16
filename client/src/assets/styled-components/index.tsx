import styled from "styled-components";

export const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Subtitle = styled.h3`
  font-size: 0.9rem;
  margin: 0.7rem 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
`;

export const Description = styled.p`
  margin: 0;
`;