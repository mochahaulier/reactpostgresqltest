import useTodo from "../hooks/useTodo";
import Input from "../components/Input";
import Todo from "../components/Todo";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Home() {
  const {
    todos,
    editedTodo,
    idEdit,
    onInputChange,
    onSubmit,
    onCheckChange,
    onEdit,
    onAbortEdit,
    deleteTodo,
    updateCompleted,
  } = useTodo();

  return (
    <MDBContainer className="py-5" style={{ maxWidth: "800px" }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{
              borderRadius: ".75rem",
              backgroundColor: "#eff1f255",
              backdropFilter: "blur(8px)",
            }}
          >
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-left mt-3 mb-4 pb-3 text-primary">
                <MDBIcon far icon="check-square" className="me-1" />
                <b className="maintitle"> SPRING TODO LIST</b>
              </p>
              <Input
                idEdit={idEdit}
                editedTodo={editedTodo}
                onSubmit={onSubmit}
                onInputChange={onInputChange}
                onCheckChange={onCheckChange}
              />
              <hr className="my-4" />
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  editedTodo={editedTodo}
                  idEdit={idEdit}
                  updateCompleted={updateCompleted}
                  onEdit={onEdit}
                  onAbortEdit={onAbortEdit}
                  deleteTodo={deleteTodo}
                />
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
