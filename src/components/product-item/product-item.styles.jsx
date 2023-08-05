import styled, {css} from 'styled-components';

export const ProductItemContainer = styled.div`
    background-color: cyan;
    margin: auto;
    width: auto;
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const CategoryContainer = styled.span`
    width: 30%;
    text-align: left;
    /* border: 1px solid black; */
    text-transform: uppercase;
    font-weight: bold;
`;

export const NameContainer = styled.span`
    width: 30%;
    text-align: left;
    /* border: 1px solid black; */
    text-transform: uppercase;
    font-weight: bold;
`;

export const PriceContainer = styled.span`
    width: 10%;
    text-align: right;
    padding: 0px 10px;
    /* border: 1px solid black; */
`;

export const StockContainer = styled.span`
    width: 10%;
    text-align: right;
    padding: 0px 10px;
    /* border: 1px solid black; */
`;

export const EnableContainer = styled.span`
    width: 15%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    color: ${props=>(props.color)};
    /* border: 1px solid black; */
`;

export const ControlsContainer = styled.span`
    width: 20%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    /* border: 0px solid black; */
`;


export const IconContainer = styled.span`
    width: 20px;
    text-align: center;
`;