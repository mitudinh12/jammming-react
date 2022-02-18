import React from "react";
import TrackList from "../TrackList/TrackList";
import './SearchResults.css';


class SearchResult extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.resultList} onAdd={this.props.onAdd} isRemoval={false}/>
            </div>
        )
    }
}

export default SearchResult;