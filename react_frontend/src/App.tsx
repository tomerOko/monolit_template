import './App.css';
// import AllTests from './components/tests/AllTests';
import { CSSProperties } from 'react';
import ListContainer from './components/usersList/listContainer/listContainer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FormComponent from './components/FormComponent/FormComponent';

function App() {
  return (
    <Router>
      <div className = "blueishBackground" style={outerContainerStyle}>
        <div className="container blueishBackground" style={innerContainerStyle}>
          <Routes>
            <Route path="/" element={<ListContainer/>} />
            <Route path="user_form" element={<FormComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
 
  );
}

const fullScreen:CSSProperties = { //basic 'full screen container' style
  width:'100vw',
  maxWidth:'100%',
  height:'100vh',
  maxHeight:'100%',
}

const innerContainerStyle:CSSProperties = Object.assign(
  {
    display:'grid',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  fullScreen
)

const outerContainerStyle:CSSProperties = Object.assign(
  {
    display:'absolute'
  }, 
  fullScreen
)

console.log(innerContainerStyle)

export default App;
