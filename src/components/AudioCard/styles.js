import styled from 'styled-components'

const StyledCard = styled.div`
width:100%;

.audio {
    font-family: 'Avenir Next', Segoe UI, Helvetica, Arial, Sans-serif !important;
}
.tag {
    margin:auto 2px;
    cursor:pointer;
}
.ui.items>.item .extra>* {
    margin: .25rem .6rem .25rem .4rem;
}
.ui.right.floated.button {
    color:white;
    background:#001968;
    margin-top:46px;
}
.ui.right.floated.button:hover {
    background:#0435cd;
    transition:background .2s ease-in-out;
}
`

export default StyledCard