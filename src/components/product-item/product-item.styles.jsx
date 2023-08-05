import styled from 'styled-components';

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
    border: 0px solid black;
    text-transform: uppercase;
`;

export const NameContainer = styled.span`
    width: 30%;
    text-align: left;
    border: 0px solid black;
    text-transform: uppercase;
`;

export const PriceContainer = styled.span`
    width: 10%;
    text-align: right;
    border: 1px solid black;
`;

export const StockContainer = styled.span`
    width: 10%;
    text-align: right;
    border: 1px solid black;
`;

export const EnableContainer = styled.span`
    width: 15%;
    text-align: center;
    cursor: pointer;
    border: 0px solid black;
`;

export const ControlsContainer = styled.span`
    width: 20%;
    cursor: pointer;
    border: 0px solid black;
`;

