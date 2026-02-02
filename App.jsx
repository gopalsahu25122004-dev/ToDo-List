import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
      isEditing: false,
      editId: null,
    };
  }

  updateInput(value) {
    this.setState({ userInput: value });
  }

  addItem() {
    if (this.state.userInput.trim() === "") return;

    const newItem = {
      id: Math.random(),
      value: this.state.userInput,
    };

    this.setState({
      list: [...this.state.list, newItem],
      userInput: "",
    });
    toast.success("Item added successfully");
  }

  deleteItem(id) {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
    toast.error("Item deleted successfully");
  }

  startEdit(item) {
    this.setState({
      userInput: item.value,
      isEditing: true,
      editId: item.id,
    });
  }

  updateItem() {
    const updatedList = this.state.list.map((item) =>
      item.id === this.state.editId
        ? { ...item, value: this.state.userInput }
        : item
    );
    this.setState({
      list: updatedList,
      userInput: "",
      isEditing: false,
      editId: null,
    });
    toast.warning("Item updated successfully");
  
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center fs-1 fw-bold">
          TODO LIST
        </Row>

        <hr />

        {/* INPUT */}
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <FormControl
              placeholder="add item..."
              size="lg"
              value={this.state.userInput}
              onChange={(e) =>
                this.updateInput(e.target.value)
              }
            />
          </Col>
        </Row>

        {/* BUTTON BELOW INPUT */}
        <Row className="mt-3">
          <Col
            md={{ span: 5, offset: 4 }}
            className="d-grid"
          >
            <Button
              variant={this.state.isEditing ? "warning" : "dark"}
              onClick={() =>
                this.state.isEditing
                  ? this.updateItem()
                  : this.addItem()
              }
            >
              {this.state.isEditing ? "UPDATE" : "ADD"}
            </Button>
          </Col>
        </Row>

        {/* LIST */}
        <Row className="mt-4">
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  variant="dark"
                  className="d-flex justify-content-between"
                >
                  {item.value}
                  <span>
                    <Button
                      variant="light"
                      className="me-2"
                      onClick={() =>
                        this.deleteItem(item.id)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      variant="light"
                      onClick={() =>
                        this.startEdit(item)
                      }
                    >
                      Edit
                    </Button>
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover 
        />
      </Container>
    );
  }
}
export default App;
