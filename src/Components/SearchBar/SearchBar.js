import React from 'react'; //Imports the library & creates an object containing properties needed by React.{React.createElement() & React.Component}
import './SearchBar.css';

/*Components are reusable pieces of code that define the appearance, behaviour & state of a part of the Application. They are defined as function or class
Component Classes are factories that produce Components with each his own unique props and local state by following a set of instructions.*/
class SearchBar extends React.Component {

    constructor(props) { //Constructor Method to init object's state in a Class. Assigns an object to this.state. Makes it a STATEFUL Component

        /*Gets called before any other statement in the constructor. Binds event handling methods occuring in given Component
         Information that gets passed from one component to another is known as “props.”] */
        super(props);

        this.state = {//Object representing the state of the component.
            term: '' //term property that gets updated when user types in the SearchBar input element
        }

        /*Creating a component class method that uses the .this keyword requires, binding that method inside of the constructor fucntion of the given component class. bind() creates a new function that, when called, has its this keyword set to the provided value.*/
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);

    }

    search() {//Method that passes the state of the term to the onSearch prop, which was passed from App Component
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) { //Method accepting an event argument, then setting the state of the search bar term to the event target's value
        this.setState({ term: e.target.value });
    }

    render() { //A Component class must contain the render() method. Rendering is the only way for a component to pass props to another component.
        return (//Returns the JSX representation of the Component instance. Needed to make a component display data
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange} //By typing, this event fires and passes an event object containing the typed in key to handleTermChange()
                />
                <button
                    className="SearchButton"
                    onClick={this.search}
                >SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;