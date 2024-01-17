import './App.css';


import Dopage from './Dopage';
import Doupdate from './Doupdate';


import { BrowserRouter, Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>


    <Route path='/' element={<Dopage/>}/>
    <Route path='/Doupdate' element={<Doupdate/>}/>




    
    
 

    </Routes>

    </BrowserRouter>





    

    
  );
}

export default App;
