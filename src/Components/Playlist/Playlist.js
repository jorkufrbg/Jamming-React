import React from 'react'; //Imports the library & creates an object containing properties needed by React.{React.createElement() & React.Component}
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

/*Components are reusable pieces of code that define the appearance, behaviour & state of a part of the Application. They are defined as function or class
Component Classes are factories that produce Components with each his own unique props and local state by following a set of instructions.*/
class Playlist extends React.Component {

    constructor(props) {//Constructor Method to init object's state in a Class. Assigns an object to this.state. Makes it a STATEFUL Component

        /*Gets called before any other statement in the constructor. Binds event handling methods occuring in given Component
         Information that gets passed from one component to another is known as “props.”] */
        super(props);

        /*Creating a component class method that uses the .this keyword requires, binding that method inside of the constructor fucntion of the given component class. bind() creates a new function that, when called, has its this keyword set to the provided value.*/
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    handleNameChange(e) { //Method accepting an event triggered by onChange atribute in the Playlist Component's Input element

        /* The passed in event has properties we can access with dot notation. e.target.value gives us access to the keys the user is typing and we pass that to onNameChange prop. Then the updatePlaylistName inside the App Component will update the state of the playlist name */
        this.props.onNameChange(e.target.value);

    }

    render() { //A Component class must contain the render() method. Rendering is the only way for a component to pass props to another component.
        return ( //Returns the JSX representation of the Component instance. Needed to make a component display data
            <div className="Playlist">
                <input
                    defaultValue={'New Playlist'}
                    onChange={this.handleNameChange} //When user types, handleNameChange method fires and passes the event. 
                />

                {/* Component Instance of the TrackList Class. Instances inherit all methods of the Component Class*/}
                <TrackList
                    tracks={this.props.playlistTracks}//Passes the playlist tracks from the Playlist Component to the TrackList Component, through props
                    onRemove={this.props.onRemove} //Passes the new state of removeTrack() from Playlist Component to the TrackList Component
                    isRemoval={true}
                />

                <button
                    className="Playlist-save"
                    onClick={this.props.onSave} //When the button is clicked, we call the onSave Method passed down from App Component
                >SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;