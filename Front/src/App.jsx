import "./App.css";
import NavigationFinal from "./js/components/dev/NavigationFinal/NavigationFinal";
import AppRoutes from "./js/router/AppRoutes";
import Footer from "./js/components/dev/Footer/Footer";
import BackToTop from "./js/components/dev/BackToTop/BackToTop";
function App() {

  return (
    <div className="App">
      <NavigationFinal />
      <main>
        <AppRoutes />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
