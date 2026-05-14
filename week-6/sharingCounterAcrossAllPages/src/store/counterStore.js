import { create } from "zustand";

//create store
export const useCounterStore = create((set) => ({
  //state
  newCounter: 0,
  newCounter1: 100,
  //add user
  user: { name: "sanju", email: "sanju@123.com", age: 21 },
  //fucntion to change email
  changeEmail: () =>
    set((state) => ({ user: { ...state.user, email: "ponnu@123.com" } })),
  //function to change name and age
  changeName: () =>
    set((state) => ({ user: { ...state.user, name: "sanjay ponaganti" } })),
  //function to change age
  changeAge: () => set((state) => ({ user: { ...state.user, age: 19 } })),
  //functions to modify the state
  incrementCounter: () =>
    set((state) => ({ newCounter: state.newCounter + 1 })),
  decrementCounter: () =>
    set((state) => ({ newCounter: state.newCounter - 1 })),
  reset: () => set({ newCounter: 0 }),
  newCounter_1_Increment: () =>
    set((state) => ({ newCounter1: state.newCounter1 + 1 })),
}));
