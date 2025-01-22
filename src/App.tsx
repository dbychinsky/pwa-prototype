import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import pwaLogo from './assets/pwa.png'
import './App.css'
import { Qr } from './components/qr/Qr.tsx';

function App() {
    return (
        <>
            <div className='iconList'>
                <img src={viteLogo} className="logo" alt="Vite logo"/>
                <img src={reactLogo} className="logo react" alt="React logo"/>
                <img src={pwaLogo} className="logo pwa" alt="Pwa logo"/>
            </div>
            <h1>progressive web application</h1>
            <h3>Прототип приложения</h3>
            <Qr/>
        </>
    )
}

export default App
