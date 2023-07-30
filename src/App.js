import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/PublicRoute'
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
