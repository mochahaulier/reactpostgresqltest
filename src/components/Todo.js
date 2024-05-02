import React from "react";
import {
  MDBCheckbox,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBTooltip,
} from "mdb-react-ui-kit";

function Todo({
  todo,
  editedTodo,
  idEdit,
  updateCompleted,
  onEdit,
  onAbortEdit,
  deleteTodo,
}) {
  return (
    <MDBListGroup horizontal className="rounded-0 bg-transparent">
      <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
        <MDBCheckbox
          name="isCompleted"
          value={todo.isCompleted}
          checked={todo.isCompleted}
          id="flexCheckChecked"
          onChange={(e) => updateCompleted(e, todo)}
          disabled={idEdit === todo.id}
        />
      </MDBListGroupItem>
      <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
        {" "}
        {idEdit !== todo.id ? (
          <p
            className="fw-normal mb-0"
            style={
              todo.isCompleted
                ? { textDecoration: "line-through", opacity: 0.5 }
                : {}
            }
          >
            {todo.todoText}
          </p>
        ) : (
          <p
            className="fw-normal mb-0 w-100 ps-2 py-1 rounded text-start"
            style={{
              backgroundColor: "#eff1f255",
              backdropFilter: "blur(8px)",
            }}
          >
            {editedTodo.todoText}
          </p>
        )}
      </MDBListGroupItem>
      {(idEdit !== todo.id ? todo.isImportant : editedTodo.isImportant) && (
        <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
          <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-transparent">
            <p className="small mb-0 bg-transparent">
              <MDBTooltip
                tag="a"
                wrapperProps={{ href: "#!" }}
                title="Is important."
              >
                <MDBIcon
                  fas
                  icon="exclamation-circle"
                  color="warning"
                  className="me-2"
                />
                Important
              </MDBTooltip>
            </p>
          </div>
        </MDBListGroupItem>
      )}
      <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
        {idEdit !== todo.id && (
          <div className="d-flex flex-row justify-content-end mb-1">
            <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Edit todo">
              <MDBIcon
                fas
                icon="pencil-alt"
                className="me-3"
                color="info"
                onClick={() => onEdit(todo)}
              />
            </MDBTooltip>
            <MDBTooltip
              tag="a"
              wrapperProps={{ href: "#!" }}
              title="Delete todo"
            >
              <MDBIcon
                fas
                icon="trash-alt"
                color="danger"
                onClick={() => deleteTodo(todo.id)}
              />
            </MDBTooltip>
          </div>
        )}
        {idEdit === todo.id && (
          <div className="d-flex flex-row justify-content-end mb-1">
            <MDBTooltip
              tag="a"
              wrapperProps={{ href: "#!" }}
              title="Abort edit"
            >
              <MDBIcon
                fas
                icon="times"
                color="danger"
                onClick={() => onAbortEdit()}
              />
            </MDBTooltip>
          </div>
        )}
        <div className="text-end text-muted">
          <MDBTooltip
            tag="a"
            wrapperProps={{ href: "#!" }}
            title={"Created: " + todo.createdDate?.slice(0, 10)}
          >
            <p className="small text-muted mb-0">
              <MDBIcon fas icon="info-circle" className="me-2" />
              {todo.modifiedDate?.slice(0, 10)}
            </p>
          </MDBTooltip>
        </div>
      </MDBListGroupItem>
    </MDBListGroup>
  );
}

export default Todo;
