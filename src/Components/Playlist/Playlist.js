import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {defaultValue: 'New Playlist'};
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        let name = event.target.value;
        this.props.onNameChange(name);
    }

    render(){
        return (
                <div className="Playlist">
                    <input value={this.props.playlistName || this.state.defaultValue} onChange={this.handleNameChange} />
                    <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                    />
                    <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
                </div>
        );
    }
}

export default Playlist;
