import Header from "./components/Header";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getUserData } from "./redux/User/UserSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditQuiz from "./pages/EditQuiz/EditQuiz";
import Homepage from "./pages/Homepage/Homepage";
import QuizPage from "./pages/QuizPage";
import PlayQuiz from "./pages/PlayQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        dispatch(getUserData(decodedToken._id));
      }
    }
  }, []);

  return (
    <div className="bg-customDark min-h-screen flex flex-col ">
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <Modal />

        <Routes>
          <Route path="/edit/:quizID" element={<EditQuiz />} />
          <Route path="/quiz/:quizID" element={<QuizPage />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/search/:searchIndex" element={<SearchPage />} />
          <Route
            path="/quiz/:quizID/play/:quizType"
            exact
            element={<PlayQuiz />}
          />
          <Route path="/" exact element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
