import { useDispatch, useSelector } from 'react-redux';
import './UserList.css';
import React from 'react';
import { userDelete } from './usersSlice';

const UserList = (props) => {
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.users.entities);
    //const loading = useSelector((state) => state.loading);
    const handleEdit = (id) => {
        //dispatch(userDeleted({ id }));
        props.editUserForm(id);
    };
    const handleDelete = (id) => {
        dispatch(userDelete({ id }));
    };
    return (
        <div className="user-list-con">
            <h2>User List</h2>
            <div className="user-lists">
                <table className="ul-table">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DOB</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {usersList.map(({ id, name, dob, email, phone }, i) => (
                        <tr key={i}>
                            <td>{name}</td>
                            <td>{dob}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>
                                <button className='ul-edit-btn' onClick={() => handleEdit(id)}>Edit</button>
                                <button className='ul-dele-btn' onClick={() => handleDelete(id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList

