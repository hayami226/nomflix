import { collectionApi } from "api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Collections = ( props ) => {
    const [ collection, setCollection ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    let data = null;
    const getData = async() => {
        try {
            const { 
                match: { 
                    params: { id }
                }
            } = props;
            ({ data } = await collectionApi.collectionDetail(id));
        } catch(e) {
            console.log(e);
        } finally {
            setCollection(data);
            setLoading(false);
        }
    }

    const Container = styled.div`
        height: calc(100vh - 50px);
        width: 100%;
        position: relative;
        padding: 50px;
    `;

    const Backdrop = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${props => props.bgImage});
        background-position: center center;
        background-size: cover;
        filter: blur(3px);
        opacity: 0.5;
        z-index: 0;
    `;    

    const Content = styled.div`
        display: flex;
        width: 100%;
        position: relative;
        z-index: 1;
        height: 100%;
    `;

    const Cover = styled.div`
        width: 30%;
        background-image: url(${props => props.bgImage});
        background-position: center center;
        background-size: cover;
        height: 100%;
        border-radius: 5px;
    `;    

    const Data = styled.div`
        width: 70%;
        margin-left: 20px;
    `;

    const Title = styled.h3`
        font-size: 32px;
    `;

    const ItemContainer = styled.div`
        margin: 20px 0;
    `;

    const Item = styled.span``;
    
    const Divider = styled.span`
        margin: 0 10px;
    `;    

    const Part = styled.div`
        width: 30%;
        background-image: url(${props => props.bgImage});
        background-position: center center;
        background-size: cover;
        border-radius: 5px;    
        height: 500px;
        margin-top: 20px;
    `;

    const Overview = styled.p`
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.5;
        width: 50%;
        margin-bottom: 20px;
    `;   

    return (
        <>
        {
            loading ? (
                <>
                    <Helmet>
                        <title>Loading | Collections</title>
                    </Helmet>
                    <Loader />                
                </>
            ) : (
                <Container>
                    <Helmet>
                        <title>{collection.name} | Collections</title>
                    </Helmet>
                    <Backdrop
                        bgImage={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
                    />                    
                    <Content>
                        <Cover
                            bgImage={
                                collection.poster_path
                                ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
                                : require("../assets/noPosterSmall.png").default
                            }
                        />
                        <Data>
                            {collection.parts.map(part => (
                                <>
                                    <Title>
                                        {part.original_title
                                        ? part.original_title
                                        : part.original_name}
                                    </Title>
                                    <ItemContainer>
                                        <Item>
                                        {part.release_date
                                            ? part.release_date.substring(0, 4)
                                            : (part.first_air_date ? part.first_air_date.substring(0, 4) : '' )}
                                        </Item>
                                        <Overview>{part.overview}</Overview>
                                        <Part
                                            bgImage={
                                                part.poster_path
                                                ? `https://image.tmdb.org/t/p/original${part.poster_path}`
                                                : require("../assets/noPosterSmall.png").default
                                            }
                                        />                                        
                                    </ItemContainer>  
                                </>                          
                            ))}
                        </Data>
                    </Content>
                </Container>
            )
        }
        </>
    )
}

export default Collections;