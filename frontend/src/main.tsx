import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './pages/home/App.tsx'
import { Provider } from 'react-redux'
import { store } from './utils/state/store.ts'
import BookMarked from './pages/bookmarked/page.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
          <Route path="/" element={<App/>}/>
          <Route path='/bookmark' element={<BookMarked/>}/>
      </Routes>
    </Provider>
  </BrowserRouter>
)
