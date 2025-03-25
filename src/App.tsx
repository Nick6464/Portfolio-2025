import './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
