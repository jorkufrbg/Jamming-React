import React from 'react'; //Imports the library & creates an object containing properties needed by React.{React.createElement() & React.Component}
import './TrackList.css';
import Track from '../Track/Track'

/*Components are reusable pieces of code that define the appearance, behaviour & state of a part of the Application. They are defined as function or class
Component Classes are factories that produce Components with each his own unique props and local state by following a set of instructions.*/
class TrackList extends React.Component {

    render() {//A Component class must contain the render() method. Rendering is the only way for a component to pass props to another component.
        return (//Returns the JSX representation of the Component instance. Needed to make a component display data
            <div className="TrackList">
                {
                    this.props.tracks.map(track => { // .map() Method renders every single track in the track property of the Track Component Instance
                        return <Track
                            track={track} //Passes the current track as an attribute called track to the Track component as attribute named track.
                            key={track.id} //Keys are unique strings used by React in order to correctly pair each element with it's coresponding array item.
                            onAdd={this.props.onAdd} //Passes onAdd from the TrackList component to the Track component as an attribute onAdd
                            onRemove={this.props.onRemove} //Passes onRemove from TrackList component to the Track component as an attribute onRemove
                            isRemoval={this.props.isRemoval} //Passes isRemoval from the TrackList component to the Track component as attribute isRemoval
                        />
                    })
                }
            </div>
        );
    }
}

export default TrackList;