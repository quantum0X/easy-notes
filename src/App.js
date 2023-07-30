import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/PublicRoute'
import NewUser from './Pages/NewUser';
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <NewUser />
    </div>
  );
}

export default App;
