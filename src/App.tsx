import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import pwaLogo from './assets/pwa.png'
import './App.css'
import Qr from './components/qr/Qr.tsx';
import Biometrics from './components/biometrics/Biometrics.tsx';

function App() {
    return (
        <>
            <div className='iconList'>
                <img src={viteLogo} className="logo" alt="Vite logo"/>
                <img src={reactLogo} className="logo react" alt="React logo"/>
                <img src={pwaLogo} className="logo pwa" alt="Pwa logo"/>
            </div>
            <h1>progressive web application</h1>
            <h2>Прототип приложения</h2>

            <h3>Qr</h3>
            <Qr/>

            <h3>Биометрия</h3>
            <Biometrics/>
        </>
    )
}

export default App
