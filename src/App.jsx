import { useState } from 'react'
import './App.css'
import SearchWindow from './components/SearchWindow'
import Header from './components/Headers/Header'
import Loading from './components/Loading/Loading'
import OutputWindow from './components/OutputWindow'
import ChatWindow from './components/Chat/ChatWindow'
export default function App() {

  const [loading, setLoading] = useState(false)
  const [torrent, setTorrents] = useState([])

  const handleCallback = (loading, torrents) => {
    setLoading(loading);
    setTorrents(torrents);
  };

  return (
    <div className="main">
      <Header />
      <SearchWindow onCallback={handleCallback} />
      <ChatWindow />
      {loading ? (
        <Loading />
      ) : (
        <OutputWindow torrents={torrent} />
      )}
    </div>
  )
}
