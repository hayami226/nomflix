import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    };

    // 유효성 체크
    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.searchByTerm();
        }
    };

    updateTerm = event => {
        const {
          target: { value }
        } = event;
        this.setState({
          searchTerm: value
        });
    };    

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        try{
            const {
                 data: { results : movieResults }
            } = await moviesApi.search(searchTerm);
            const {
                 data: { results : tvResults }
            } = await tvApi.search(searchTerm);
            this.setState({
                loading: true,
                movieResults,
                tvResults
            });
        } catch {
            this.setState({
                error: "Can't find Find Results."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading} = this.state;
        return (
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                error={error}
                loading={loading}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}