import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

type LoaderProps = {
    color?: string 
}

const rotate = keyframes`
  100% {transform: rotate(360deg) translate(30px)}
` 

const StyledLoader = styled.span`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.color || '#000'};;
    position: relative;
    
    &:before,
    &:after {
        content: "";
        position: absolute;
        border-radius: 50%;
        inset: 0;
        background: #fff;
        transform: rotate(0deg) translate(30px);
        animation: ${rotate} 1s ease infinite;
    }

    &:after {
        animation-delay: 0.5s
    }
`

const Loader = ({color = '#fff'}) => {
    return <StyledLoader color={color}/>
}

export default Loader