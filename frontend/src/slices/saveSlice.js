import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("saved")
? JSON.parse(localStorage.getItem("saved"))
: {savedItems : []};

const saveSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {
        addToSavedItems: (state, action) => {
            const item = action.payload;

            const existItem = state.savedItems.find((x) => x._id === item._id);

            if (existItem) {
                state.savedItems = state.savedItems.map((x) =>
                x._id === existItem._id ? item : x
            );
            } else {
                state.savedItems = [...state.savedItems, item];
            }

            localStorage.setItem('saved', JSON.stringify(state));
        },
        removeFromSavedItems: (state, action) => {
            state.savedItems = state.savedItems.filter((x) => x._id !== action.payload);
      
            localStorage.setItem('saved', JSON.stringify(state));
          },
    },
});

export const {addToSavedItems, removeFromSavedItems} = saveSlice.actions;

export default saveSlice.reducer;