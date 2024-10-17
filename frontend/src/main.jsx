import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './Store.jsx'; // Import the persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}> {/* Use PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
