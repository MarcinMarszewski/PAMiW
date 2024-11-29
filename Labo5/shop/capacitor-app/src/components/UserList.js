import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import { User, Profile } from "shared/models/user";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    profile: { bio: "" },
  });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const userList = response.data.map((user) => {
        const profile = user.Profile
          ? new Profile(user.Profile.id, user.Profile.bio, user.Profile.userId)
          : new Profile(null, "", user.id);
        return new User(user.id, user.name, user.email, profile);
      });
      setUsers(userList);
      setError(null);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      setNewUser({ name: "", email: "", profile: { bio: "" } });
      fetchUsers();
      setError(null);
    } catch (error) {
      setError("Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      fetchUsers();
      setError(null);
    } catch (error) {
      setError("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
      setError(null);
    } catch (error) {
      setError("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.profile.bio}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingUser ? "Edit User" : "Create User"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={editingUser ? editingUser.name : newUser.name}
        onChange={(e) => {
          const name = e.target.value;
          if (editingUser) {
            setEditingUser({ ...editingUser, name });
          } else {
            setNewUser({ ...newUser, name });
          }
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={editingUser ? editingUser.email : newUser.email}
        onChange={(e) => {
          const email = e.target.value;
          if (editingUser) {
            setEditingUser({ ...editingUser, email });
          } else {
            setNewUser({ ...newUser, email });
          }
        }}
      />
      <input
        type="text"
        placeholder="Bio"
        value={editingUser ? editingUser.profile.bio : newUser.profile.bio}
        onChange={(e) => {
          const bio = e.target.value;
          if (editingUser) {
            setEditingUser({
              ...editingUser,
              profile: { ...editingUser.profile, bio },
            });
          } else {
            setNewUser({ ...newUser, profile: { ...newUser.profile, bio } });
          }
        }}
      />
      <button onClick={editingUser ? handleUpdateUser : handleCreateUser}>
        {editingUser ? "Update User" : "Create User"}
      </button>
    </div>
  );
};

export default UserList;
