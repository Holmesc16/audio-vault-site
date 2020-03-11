import React from 'react'
import {StyledContainer} from './styles'

const Spinner = props => {
    return (
        <StyledContainer>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </StyledContainer>
    )
}

export default Spinner