import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import StoreLayout from './components/StoreLayout';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Gallery from './pages/Gallery';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/products" element={
                    <StoreLayout>
                        <Products />
                    </StoreLayout>
                } />
                <Route path="/gallery" element={
                    <StoreLayout>
                        <Gallery />
                    </StoreLayout>
                } />
                <Route path="/product/:id" element={
                    <StoreLayout>
                        <ProductDetail />
                    </StoreLayout>
                } />
                <Route path="/cart" element={
                    <StoreLayout>
                        <Cart />
                    </StoreLayout>
                } />
                <Route path="/checkout" element={
                    <StoreLayout>
                        <Checkout />
                    </StoreLayout>
                } />
                <Route path="/payment" element={
                    <StoreLayout>
                        <Payment />
                    </StoreLayout>
                } />
                <Route path="/success" element={
                    <StoreLayout>
                        <OrderSuccess />
                    </StoreLayout>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

const Dashboard = () => {
    const username = localStorage.getItem('username');
    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <p>This is a private dashboard only visible to logged-in users.</p>
            <button onClick={() => { localStorage.clear(); window.location.href='/login'; }}>Logout</button>
        </div>
    );
};

export default App;