import { createSlice } from "@reduxjs/toolkit";

export const reasonSlice = createSlice({
  name: "reason",
  initialState: {
    reasonData: {
      rebookReason: "",
      messageReason:"",
    },
  },
  reducers: {
    reasonForm: (state, action) => {
      const { rebookReason, messageReason } = action.payload;
      state.reasonData.rebookReason = rebookReason;
      state.reasonData.messageReason = messageReason;
    },
    resetReason: (state) => {
      state.reasonData.rebookReason = "";
      state.reasonData.messageReason = "";
    },
  },
});

export const { reasonForm, resetReason } = reasonSlice.actions;

export default reasonSlice.reducer;
