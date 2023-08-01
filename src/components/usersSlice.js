import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        userAdd(state, action)
        {
            state.entities.push(action.payload);
        },
        userUpdate(state, action)
        {
            const { id, name, dob, email, phone, address, pw1, pw2} = action.payload;
            const existingUser = state.entities.find((user) => user.id === id);
            if (existingUser)
            {
                existingUser.name = name;
                existingUser.dob = dob;
                existingUser.email = email;
                existingUser.phone = phone;
                existingUser.address = address;
                existingUser.pw1 = pw1;
                existingUser.pw2 = pw2;
            }
        },
        userDelete(state, action)
        {
            const { id } = action.payload;
            const existingUser = state.entities.find((user) => user.id === id);
            if (existingUser)
            {
                state.entities = state.entities.filter((user) => user.id !== id);
            }
        },
    },
});
  
  export const { userAdd, userUpdate, userDelete } = usersSlice.actions;
  
  export default usersSlice.reducer;