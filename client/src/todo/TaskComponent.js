import React from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTaskContext } from '../context/TaskContext';
const TaskComponent = () => {
  const {
    tasks,
    editIndex,
    editTitle,
    editDescription,
    addTask,
    toggleEdit,
    deleteTask,
    setEditTitle,
    setEditDescription,
    logout,
  } = useTaskContext();
  const isEditing = editIndex !== null;
  const handleButtonClick = () => {
    if (isEditing) {
      toggleEdit(0);
    } else {
      addTask();

    }
  };
  return (
    <div style={{ marginTop: "40px", marginLeft: "10px", marginRight: "10px" }}>
      <TextField
        label="Title"
        variant="outlined"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <TextField
        style={{ marginLeft: "40px" }}
        label="Description"
        variant="outlined"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" style={{ marginLeft: "40px" }}
        onClick={handleButtonClick}
      >
        {isEditing ? 'Update' : 'Add'}
      </Button>
      <Button variant="contained" color="primary"
        onClick={logout}
        style={{ marginLeft: "40px" }}
      >
        Logout
      </Button>
      <List>
        {tasks?.map((task, index) => (
          <ListItem key={index}>
            <>
              <ListItemText primary={task.title} secondary={task.description} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => toggleEdit(index)}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTask(index)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default TaskComponent;
