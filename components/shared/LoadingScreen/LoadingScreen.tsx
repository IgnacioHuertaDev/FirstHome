import styled from '@emotion/styled'
import Image from 'next/image'
import Loader from 'components/shared/Loader';
import BrandLogo from 'public/assets/firstHome.svg';
import { useMantineTheme } from '@mantine/core';

type LoadingScreenProps = {
  backgroundColor?: string 
}

const LoadingScreenContainer = styled.div<LoadingScreenProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: ${props => props.backgroundColor || 'red'};
  height: 100vh;
`

const ImageContainer = styled.div`
  width: 15%;
  margin-bottom: 5%;

  @media (max-width: 1100px) {
    width: 25%;
    margin-bottom: 8%;
  }

  @media (max-width: 748px) {
    width: 40%;
    margin-bottom: 10%;
  }
`

const LoadingScreen = ({ backgroundColor = 'linear-gradient(0deg, #000000, #041F3C 50%, #071C32)'}) => {
  const theme = useMantineTheme();

  return (
    <>
        <LoadingScreenContainer backgroundColor={backgroundColor}>
            <ImageContainer>
                <Image 
                    src={BrandLogo} 
                    alt="Volte Studio" 
                    layout="responsive"
                    priority
                />
            </ImageContainer>
            <Loader />
        </LoadingScreenContainer>
    </>
  );
}

export default LoadingScreen