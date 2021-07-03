import "./usersListScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import { USER_DELETE_RESET } from "../redux/constants/userConstants";
import { deleteUser, listUsers } from "../redux/actions/userActions";

function UsersListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (user.isAdmin) {
      alert("You can't delete admin user");
    } else if (window.confirm(`Are you sure to delete ${user.name}?`)) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="userslist-screen-container">
      <div className="userslist-top">
        <Jumbotron className="userslist-jumbo">
          <h1>Hair Salon</h1>
          <Button href="/user/" className="userslist-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="userslist-bottom">

        {loadingDelete && <LoadingBox />}
        {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : users.length === 0 ? (
          <h3>No user found</h3>
        ) : (
          <>
            <div className="userslist-bottom-title">
              <h3>users</h3>
            </div>
            <table className="userslist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th className="userslist-admin-th">ADMIN</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="userslist-id">{user._id}</div>
                    </td>
                    <td>
                      <div className="userslist-name">{user.name}</div>
                    </td>
                    <td>
                      <div className="userslist-email">{user.email}</div>
                    </td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      <div>
                        <button onClick={() => deleteHandler(user)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersListScreen;
