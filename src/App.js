import './styles/App.css';
import Navbar from './components/Navbar';

const App = ({ cart }) => {
    return (
        <>
            <Navbar cart={cart} />

            <div id="home">
                <h1>Welcome</h1>

                <h4>Buy our products, thanks.</h4>
            </div>
        </>
    );
}

export default App;
