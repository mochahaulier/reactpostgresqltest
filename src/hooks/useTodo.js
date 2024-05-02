import { useState, useEffect } from "react";
import api from "../api/config.js";

// my custom hook
const useGame = () => {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState({
    todoText: "",
    isImportant: false,
    isCompleted: false,
  });

  const [idEdit, setIdEdit] = useState(false);

  useEffect(() => {
    loadTodos();
  });

  const loadTodos = async () => {
    try {
      const result = await api.get("/todos");
      const sorted = result.data.sort((a, b) => (a.id > b.id ? -1 : 1));
      setTodos(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todo/${id}`);
    loadTodos();
  };

  const updateCompleted = async (e, upTodo) => {
    try {
      e.preventDefault();
      upTodo.isCompleted = e.target.checked;
      await api.put(`/todo/${upTodo.id}`, upTodo);
      loadTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
  };

  const onCheckChange = (e) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.checked });
  };

  const onEdit = (edTodo) => {
    setEditedTodo(edTodo);
    setIdEdit(edTodo.id);
  };

  const onAbortEdit = () => {
    setEditedTodo({ todoText: "", isCompleted: false, isImportant: false });
    setIdEdit("");
    console.log("aborted");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!idEdit) {
      try {
        await api.post("/todo", editedTodo);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api.put(`/todo/${idEdit}`, editedTodo);
        setIdEdit("");
      } catch (err) {
        console.log(err);
      }
    }
    setEditedTodo({ todoText: "", isCompleted: false, isImportant: false });
    loadTodos();
  };

  // hook allows access to from outside:
  return {
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
  };
};

export default useGame;
