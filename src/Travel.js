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
 
    const isCompleted = event.target.checked; 
    await axios.put("http://localhost:8080/todos/" + id, {
      isCompleted: isCompleted,
    });

    await this.loadDestinations();
  };
  handleDelete = async (id, event) => {
    event.preventDefault();
    await axios.delete(BaseURL + id);
    await this.loadDestinations();
  };
  loadDestinations = async () => {
    const res = await axios.get(BaseURL); 
    const destinations = res.data; 
    this.setState({ destinations: destinations }); 
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
