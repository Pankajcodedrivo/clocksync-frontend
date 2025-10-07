import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import ScoreKeeper from "../pages/ScoreKeeper"
import NotFound from "../pages/404"
import ClockSynkFeedback from "../pages/FeedBackForm"

// define type for settings
interface Settings {
  [key: string]: any // you can replace this with exact shape if known
}

interface AppRoutesProps {
  settings: Settings | null
}

export default function AppRoutes({ settings }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/:fieldslug" element={<Home  settings={settings}/>} />
      <Route path="/score-keeper" element={<ScoreKeeper />} />
      <Route path="/feedback" element={<ClockSynkFeedback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
