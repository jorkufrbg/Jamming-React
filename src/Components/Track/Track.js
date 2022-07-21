import React from 'react'; //Imports the library & creates an object containing properties needed by React.{React.createElement() & React.Component}
import './Track.css';

/*Components are reusable pieces of code that define the appearance, behaviour & state of a part of the Application. They are defined as function or class
Component Classes are factories that produce Components with each his own unique props and local state by following a set of instructions.*/
class Track extends React.Component {

    constructor(props) {//Constructor Method to init object's state in a Class. Assigns an object to this.state. Makes it a STATEFUL Component

        /*Gets called before any other statement in the constructor. Binds event handling methods occuring in given Component
         Information that gets passed from one component to another is known as “props.”] */
        super(props);

        /*Creating a component class method that uses the .this keyword requires, binding that method inside of the constructor fucntion of the given component class.
        bind() creates a new function that, when called, has its this keyword set to the provided value.*/
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }

    renderAction() {//Method displaying - or + in the <button> element depending on the boolean value of isRemoval

        if (this.props.isRemoval) {
            return <button
                className="Track-action"
                onClick={this.removeTrack} //Adds an onClick property with the value of removeTrack() method
            >-</button>
        } else {
            return <button
                className="Track-action"
                onClick={this.addTrack} //Adds an onClick property with the pushed track value from the playlist
            >+</button>
        }

    }

    addTrack() {//Uses the addTrack(track) Method passed down from App Component Class to push the current track to a playlist
        this.props.onAdd(this.props.track);
    }

    removeTrack() {//Uses the removeTrack(track) Method passed from App Component Class to remove selected track from the playlist
        this.props.onRemove(this.props.track); //Assigns this.props.track value to the onRemove Method
    }

    render() {//A Component class must contain the render() method. Rendering is the only way for a component to pass props to another component.
        return (//Returns the JSX representation of the Component instance. Needed to make a component display data
            <div className="Track">
                <div className="Track-information">

                    {/* Props used to access the track's name from the TrackList Component's attribute named track*/}
                    <h3>{this.props.track.name}</h3>

                    {/* Props used to access the track's artist and album  from the TrackList Componnent attribute named track*/}
                    <p>{this.props.track.artist} | {this.props.track.album}</p>

                </div>

                {this.renderAction()} {/* Renders the renderAction method */}

            </div>
        );
    }
}

export default Track;