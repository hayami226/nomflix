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
    text-decoration: underline;
    margin-bottom:10px;
    font-size: 13px;
`;

const Videos = (props) => {
    const { location: { state: { result } } } = props;
    return( 
        <Container>
            <ul>
            <Detail>
                {result.videos.results.map((video, index) => 
                    <Item>
                        <iframe 
                            width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${video.key}`} 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </Item>)}
            </Detail>
            </ul>
        </Container>
    );
};

export default Videos;