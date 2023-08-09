import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  note: "",
  amount: "",
};

const transfer = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setRecipient: (state, action) => {
      state.user = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    clearTransferState: () => {
      return initialState;
    },
  },
});

export const { setRecipient, setAmount, setNote, clearTransferState } =
  transfer.actions;
export default transfer.reducer;
