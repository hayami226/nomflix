import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";
import Companies from "Routes/Companies";
import Countries from "Routes/Countries";
import Videos from "Routes/Videos";
import useReactRouter from "use-react-router";
import Seasons from "Routes/Seasons";

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
  margin-left: 10px;
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

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const LinkGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ALink = styled.a`
  margin-bottom: 10px;
  width: 145px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

const Coleections = styled.div`
  border: 1px solid white;
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;


const SLink = styled(Link)`
  font-size: 12px;
  margin-top: 20px;
  display:inline-block;
  padding: 20px 25.5px;
  background-color: ${props => (props.active ? "white" : "black")};
  color: ${props => (props.active ? "black" : "white")};
  font-weight: ${props => (props.active ? "bold" : "")};
`;

const DetailPresenter = ({ result, loading, error, isMovie}) => {
  const {
    location: { pathname }
  } = useReactRouter();

  return (
    loading ? (
      <>
        <Helmet>
          <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <>
        <Container>
          <Helmet>
            <title>
              {result.original_title ? result.original_title : result.original_name}{" "}
              | Nomflix
            </title>
          </Helmet>      
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
          />
          <Content>
            <Cover
              bgImage={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                  : require("../../assets/noPosterSmall.png").default
              }
            />
            <Data>
              <Title>
                {result.original_title
                  ? result.original_title
                  : result.original_name}
              </Title>
              <ItemContainer>
                <Item>
                  {result.release_date
                    ? result.release_date.substring(0, 4)
                    : (result.first_air_date ? result.first_air_date.substring(0, 4) : '' )}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {result.runtime ? result.runtime : (result.episode_run_time ? result.episode_run_time[0] : '' )} min
                </Item>
                <Divider>•</Divider>
                <Item>
                  {result.genres &&
                    result.genres.map((genre, index) =>
                      index === result.genres.length - 1
                        ? genre.name
                        : `${genre.name} / `
                    )}
                </Item>
              </ItemContainer>
              <Overview>{result.overview}</Overview>
              <LinkGroup>
                <ALink href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDB Link</ALink>
                <ALink href={`https://www.youtube.com/results?search_query=${result.original_title ? result.original_title : result.original_name}`} target="_blank">YT Videos</ALink>
              </LinkGroup>
              {result.belongs_to_collection ? (
                <Link to={`/collections/${result.belongs_to_collection.id}`}>
                  <Coleections>
                      View Collections
                  </Coleections>
                </Link>
                ) : <></>
              }
              <SLink 
                active={pathname === (isMovie ? `/movie/${result.id}/videos` : `/show/${result.id}/videos`)} 
                to={{ pathname: isMovie ? `/movie/${result.id}/videos` : `/show/${result.id}/videos`, state: {result} }}
              >Videos</SLink>
              <SLink 
                active={pathname === (isMovie ? `/movie/${result.id}/companies` : `/show/${result.id}/companies`)} 
                to={{ pathname: isMovie ? `/movie/${result.id}/companies` : `/show/${result.id}/companies`, state: {result} }}
              >Companies</SLink>
              <SLink 
                active={pathname === (isMovie ? `/movie/${result.id}/countries` : `/show/${result.id}/countries`)} 
                to={{ pathname: isMovie ? `/movie/${result.id}/countries` : `/show/${result.id}/countries`, state: {result} }}
              >Countries</SLink>
              {!isMovie && (
                <SLink
                  active={pathname === `/show/${result.id}/seasons`} 
                  to={{ pathname: `/show/${result.id}/seasons`, state: {result} }}                
                >Seasons</SLink>
              )}
              <Route path={isMovie ? "/movie/:id/videos" : "/show/:id/videos"} component={Videos}></Route>
              <Route path={isMovie ? "/movie/:id/companies" : "/show/:id/companies" } component={Companies}></Route>
              <Route path={isMovie ? "/movie/:id/countries" : "/show/:id/countries" } component={Countries}></Route>
              {!isMovie && <Route path="/show/:id/seasons" component={Seasons}></Route>}
            </Data>        
          </Content>
        </Container>
      </>
    )    
  )
}


DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;