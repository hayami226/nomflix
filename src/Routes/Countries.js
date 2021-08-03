import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
    margin-left: 20px;
`;

const Detail = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const Countries = (props) => {
    const { location: { state: { result } } } = props;
    return( 
        <Container>
            <Detail>{result.production_countries.map((contry, index) => index == result.production_countries.length - 1 ? contry.name : `${contry.name} / `)}</Detail>        
        </Container>
    );
};

export default Countries;