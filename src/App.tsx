import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'
import bgImage from './assets/images/background-score-keeper.jpg'
import './App.css'
import { useEffect, useState } from 'react'
import { getSettings } from './service/api.service'
import { showErrorToast } from './utils/toast/toast'
function App() {
  const [settings, setSettings] = useState(null)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings()// adjust endpoint if needed
        setSettings(response)
      } catch (err :any) {
        showErrorToast(err.message)
      } finally {
      }
    }

    fetchSettings()
  }, [])
  // const [count, setCount] = useState(0)

  return (
    <div className="wrapper mainClass" style={{backgroundImage: `url(${bgImage})`}}>
    <Header settings={settings}/>
    <AppRoutes settings={settings} />
    <Footer  settings={settings} />
    </div>
  )
}

export default App
