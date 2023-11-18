import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { RouterProvider } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <App />
);