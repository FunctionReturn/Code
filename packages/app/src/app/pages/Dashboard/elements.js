import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 100%;

  justify-content: space-around;
`;

export const Card = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.background};
  padding: 1rem;
  border-radius: 2px;
  font-size: 0.875rem;
`;

export const CollectionMenuCard = Card.extend`
  width: 350px;
  height: 100%;
  margin-right: 1rem;
  padding: 0;
`;

export const CollectionItem = styled.div`
  padding: 0.5rem 1rem;

  cursor: pointer;
`;
