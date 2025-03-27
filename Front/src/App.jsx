import "./App.css";
import NavigationFinal from "./js/components/dev/NavigationFinal/NavigationFinal";
import AppRoutes from "./js/router/AppRoutes";
import Footer from "./js/components/dev/Footer/Footer";
import BackToTop from "./js/components/dev/backToTop/BackToTop";
import LangBubble from "./js/components/dev/LangBubble/LangBubble";
function App() {

  return (
    <div className="App">
      <NavigationFinal />
      <main>
        <AppRoutes />
      </main>
      <BackToTop />
      <LangBubble />
      <Footer />
    </div>
  );
}

export default App;
