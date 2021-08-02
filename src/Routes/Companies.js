import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
    margin-left: 20px;
`;

const Detail = styled.div`
    font-size: 13px;
`;

const Companies = (props) => {
    const { location: { state: { result } } } = props;
    return( 
        <Container>
            <Detail>{result.production_companies.map((company, index) => index === result.production_companies.length - 1 ? company.name : `${company.name} / ` )}</Detail>
        </Container>
    );
};

export default Companies;