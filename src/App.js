import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react";
import { UseContextData } from "./components/UseContextData";
// import CardMapUse from './components/CardMapUse'
import UseStateNav from './components/UseStateNav'
// import EmailJs from './components/EmailJs';
// import MyForm from './components/MyForm';
// import ApiFetch from './components/ApiFetch';
// import FormSubmtion from './components/FormSubmtion';
import Progreesbar from './components/Progreesbar';
// import Preloader from './components/Preloader';

function App() {

  const { arr, newObj, show, setShow } = useContext(UseContextData);
  console.log(arr, newObj)

  return (
    <div>

      {show ? <h2 className='ms-5 mt-5 mb-4'>THIS IS DEFAULT</h2>
        :
        <h2 className='ms-5 mt-5 mb-4'>THIS IS ONCLICK</h2>}
      <button className='z-3 py-3 px-4 bg-black ms-5 text-white fw-bold fs-2 rounded-4 border-0' onClick={() => setShow(false)}>click</button>
      <button className='mb-5 py-3 px-4 bg-black ms-5 text-white fw-bold fs-2 rounded-4 border-0' onClick={() => setShow(true)}>click again</button>
      {/* <EmailJs /> */}
      <UseStateNav />
      {/* <CardMapUse /> */}
      {/* <MyForm /> */}
      {/* <ApiFetch/> */}
      {/* <FormSubmtion/> */}
      <Progreesbar/>
      {/* <Preloader/> */}
    </div>
  );
}

export default App;
