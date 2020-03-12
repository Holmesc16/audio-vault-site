import React from 'react'
import {StyledContainer} from './styles'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const FileCard = props => {
    const { isOpen, onClose, file } = props;

    return (
        <TransitionGroup component={null}>
        {isOpen && (
          <CSSTransition classNames="file" timeout={300}>
            <StyledContainer>
                <div>
                    <h1>Hello!</h1>
                </div>
            </StyledContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    )
}

export default FileCard