import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
    margin-left: 20px;
`;

const Detail = styled.div`
    font-size: 13px;
`;

const Item = styled.li`
    margin-bottom: 5px;
`;

const Cover = styled.div`
    width: 355px;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 530px;
    border-radius: 5px;
    margin: 10px 0;
`; 

const Seasons = (props) => {
    const { location: { state: { result } } } = props;
    return( 
        <Container>
            <ul>
                <Detail>{
                    result.seasons && 
                    result.seasons.map(season => <Item>{season.name} / {season.air_date && season.air_date.substring(0, 4)} 
                    <Cover
                    bgImage={
                        season.poster_path
                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                        : require("../assets/noPosterSmall.png").default
                    }/></Item> )
                }</Detail>        
            </ul>
        </Container>
    );
}

export default Seasons;