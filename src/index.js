import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter from react-router-dom
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './components/App';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/goit-react-hw-08-phonebook">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);