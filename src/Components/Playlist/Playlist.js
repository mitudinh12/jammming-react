import React from "react";
import TrackList from "../TrackList/TrackList";
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
         this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input 
                    defaultValue={"New Playlist"} 
                    onChange={this.handleNameChange}/> 
                    {/* Whenever a user begins to type into input, handleNameChange fires, pass the event to props 'onNameChange'. 
                    That event has properties that can be accessed with dot notation */}
                    <TrackList 
                        tracks={this.props.playlistTracks} 
                        onRemove={this.props.onRemove} 
                        isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;