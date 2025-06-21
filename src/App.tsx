import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
