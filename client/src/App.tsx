import { Switch, Route } from "wouter";
import { useScrollToTop } from "@/hooks/use-navigation";

// Pages
import Home from "@/pages/home";
import Create from "@/pages/create";
import Gallery from "@/pages/gallery";
import ArtDetails from "@/pages/art-details";
import Checkout from "@/pages/checkout";
import NotFound from "@/pages/not-found";

// Layout components
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function App() {
  // Hook that scrolls to top on route change
  useScrollToTop();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/art/:id" component={ArtDetails} />
          <Route path="/checkout" component={Checkout} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
