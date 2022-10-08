import styled from 'styled-components';

export const AddProductContainer = styled.div`
    position: absolute;
    width:360px;
    height:670px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid black;
    background-color: white;
    top:90px;
    right: 70px;
    z-index: 5;
    border-radius: 10px;
`; 

export const FormContainer = styled.form`
    width: auto;
`;
export const ButtonContainer = styled.div`
    width: auto;
    display: flex;
    justify-content: space-between;    
    padding-top:20px;
`;