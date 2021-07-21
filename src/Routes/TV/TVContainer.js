import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        topRated: null,
        popuar: null,
        airingToday: null,
        error: null,
        loading: false
    }

    render() {
        const { topRated, popuar, airingToday, error, loading } = this.state;
        return (
            <TVPresenter 
                topRated={topRated}
                popuar={popuar}
                airingToday={airingToday}
                error={error}
                loading={loading}
            />
        );
    }
}