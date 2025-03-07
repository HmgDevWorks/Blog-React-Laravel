import "./App.css";
import NavigationFinal from "./js/components/dev/NavigationFinal/NavigationFinal";
import AppRoutes from "./js/router/AppRoutes";

import Footer from "./js/components/dev/footer/Footer";
import AdminPage from "./js/pages/AdminPage/AdminPage";


function App() {

  return (
    <div className="App">
      <NavigationFinal />
      {/* <main>
        <AppRoutes />
      </main>
      <Footer /> */}
      <AdminPage />
    </div>
  );
}

export default App;
