import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {defaultValue: 'New Playlist'};
    }

    render(){
        return (
                <div className="Playlist">
                    <input value={this.state.defaultValue}/>
                    <TrackList tracks={this.props.playlistTracks} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
                    <button className="Playlist-save">SAVE TO SPOTIFY</button>
                </div>
        );
    }
}

export default Playlist;
