import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "./Components/Services/UserThunk";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return <div className="App"></div>;
}

export default App;
