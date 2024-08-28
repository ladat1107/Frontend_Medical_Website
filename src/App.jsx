import "./App.css";
import MainLayout from "./layouts/MainLayout";

function App() {
 
  return (
    <Routes>
      <Route  element={<MainLayout />}>
        {/* <Route index element={<Home />} />
        <Route path={PATHS.ABOUT} element={<About />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path={PATHS.PRODUCTS} element={<Product />} />
        <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={PATHS.BLOG} element={<Blog />} />
        <Route path={PATHS.CART} element={<Cart />} />
        <Route path={PATHS.CHECKOUT} element={<Checkout />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
