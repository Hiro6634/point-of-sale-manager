import styled, {css} from 'styled-components';

const getIsEnable = props => {
    if(props.disable){
        return textDisableStyle;
    }
}

const textDisableStyle = css`
    text-decoration: line-through;
    text-decoration-thickness: 3px;  
`;
export const ProductLineInputContainer = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const CategoryContainer = styled.input`
    width: 30%;
`;

export const NameContainer = styled.input`
    width: 30%;
    text-align: left;
    ${getIsEnable}
`;

export const PriceContainer = styled.input`
    width: 10%;
    text-align: left;
    ${getIsEnable}
`;

export const StockContainer = styled.input`
    width: 10%;
    text-align: right;
    padding-right: 20px;
    ${getIsEnable}
`;

export const EnableContainer = styled.div`
    width: 15%;
    display: flex;
    cursor: pointer;
    justify-content: space-around;
`;

export const ControlsContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    border: 0px solid black;
`;

const iconClickeableStyles = css`
    cursor: pointer;
    &:hover {
        background-color: lightgrey;
        border: none;
    }
`;

const getIconStyles = props => {
    if(props.isCleckeable){
        return iconClickeableStyles;
    }
}

export const IconContainer = styled.span`
    width: 20px;
    text-align: center;
    ${getIconStyles}
`;