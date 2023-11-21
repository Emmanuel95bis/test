import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectJson } from "./selector";

// Le state initial de la feature freelances
const initialState = {
  // le statut permet de suivre l'état de la requête
  status: "void",
  // les données lorsque la requête a fonctionné
  data: null,
  // l'erreur lorsque la requête échoue
  error: null,
};

const thunkSlice = createSlice({
  name: "thunk",
  initialState,
  reducers: {
    fetching: (state) => {
      state.status = "pending";
    },
    resolved: (state, action) => {
      state.status = "fulfilled";
      state.data = action.payload; // assuming the payload contains the data
      state.error = null;
    },
    rejected: (state, action) => {
      state.status = "rejected";
      state.error = action.payload; // assuming the payload contains the error
    },
    afficher: (state) => {
      console.log(state);
    },
  },
});

export const { fetching, resolved, rejected, afficher } = thunkSlice.actions;

export const counterReducer = thunkSlice.reducer;

// ...

export async function fetchOrUpdateStore(dispatch, getState) {
  const status = selectJson(getState()).status;

  if (status === "pending" || status === "updating") {
    return;
  }
  dispatch(fetching());
  try {
    const response = await fetch("../Data/data.json");
    // const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    dispatch(resolved(data));
    dispatch(afficher());
    return data;
  } catch (error) {
    dispatch(rejected(error));
  }
}

function RecupApiComponent() {
  console.log("11111111111111");
  const dispatch = useDispatch();
  console.log("222222222222222");

  const { status, data, error } = useSelector((state) => state.thunk);
  console.log("3333333333333");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrUpdateStore());
        dispatch(afficher());
      } catch (error) {
        console.log(error);
        console.error("Error fetching data:", error);
      }
    };

    if (status === "void" || status === "rejected") {
      fetchData();
    }
  }, [dispatch, status]);

  if (status === "pending") {
    console.log("444444444444");
    return <p>Loading...</p>;
  }

  if (status === "fulfilled") {
    console.log("55555555555");
    return <p>{JSON.stringify(data)}</p>;
  }

  if (status === "rejected") {
    console.log("6666666666");
    return <p>Error: {error}</p>;
  }

  return null;
}

export default RecupApiComponent;
