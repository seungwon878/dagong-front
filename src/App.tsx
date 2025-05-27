import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { router } from './routes/routes';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
