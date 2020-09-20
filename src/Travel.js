import React from "react";
import axios from "axios";
const BaseURL = "http://localhost:8080/todos/";
export default class Travel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // create initial state for destinations
      destinations: [],
      text: "",
    };
  }
  componentDidMount() {
    this.loadDestinations();
  }

  //   showVisited = async () => {
  //     const res = await axios.get(BaseURL);
  //     const destinations = res.data;
  //     const visited = destinations.filter((des) => des.isCompleted === 1);

  //     this.setState({ destinations: visited });
  //   };

  onInputChange = (event) => {
    this.setState({ text: event.target.value });
    // console.log(this.state.text);
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.text !== "") {
      await axios.post(BaseURL, {
        name: this.state.text,
      });

      await this.loadDestinations();
      this.setState({ text: "" });
    }
  };
  onCheckboxChange = async (id, event) => {
    // to change the value of checked we need to know the id.value and the state of the checkbox
    // event.preventDefault(); // to prevent the page to reload
    const isCompleted = event.target.checked; // this is where the value of property checked is !!
    await axios.put("http://localhost:8080/todos/" + id, {
      isCompleted: isCompleted,
    });
    // now that the state of the checkbox is changed we need to call loadDestinations() again
    await this.loadDestinations();
  };
  handleDelete = async (id, event) => {
    event.preventDefault();
    await axios.delete(BaseURL + id);
    await this.loadDestinations();
  };
  loadDestinations = async () => {
    const res = await axios.get(BaseURL); // get the res from server
    const destinations = res.data; //set destinations equal with the data we got
    this.setState({ destinations: destinations }); // change the state of destinations so we can display them in the browser
  };

  render() {
    return (
      <div className="todo-container">
        <form onSubmit={this.handleSubmit}>
          <div className="header">
            <h1 className="todo-header">Travel-App</h1>
          </div>
          <div className="handle-todo">
            <h2 className="todo-subheader">Add places to visit</h2>
            <input
              className="input-todo "
              type="text"
              value={this.state.text}
              onChange={this.onInputChange}
            />
            <button type="submit" className="add-todo">
              Add
            </button>
            {this.state.destinations.map((des) => {
              return (
                <label key={des.id} className="checkbox-label ">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={des.isCompleted}
                    onChange={(event) => {
                      this.onCheckboxChange(des.id, event);
                    }}
                  />
                  <span className="checkbox-custom rectangular"></span>
                  <span className="todo-name">{des.name}</span>
                  <button
                    className="btn btn-danger"
                    onClick={(event) => {
                      this.handleDelete(des.id, event);
                    }}
                  >
                    Delete
                  </button>
                </label>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}
