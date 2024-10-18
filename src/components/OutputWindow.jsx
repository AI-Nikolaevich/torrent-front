import React, { useState } from 'react';
import "./OutputWindow.css";
import download from './images/download.png';
import ComponentEnd from "./ComponentEnd.jsx";

export default function OutputWindow({ torrents }) {
  const [sortedTorrents, setSortedTorrents] = useState(torrents);
  const [sortOrder, setSortOrder] = useState('asc'); // asc или desc

  const sortTorrentsBySeeders = () => {
    const sorted = [...sortedTorrents].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.seeders - b.seeders;
      } else {
        return b.seeders - a.seeders;
      }
    });
    setSortedTorrents(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="OutputWindow">
      {torrents.length != 0 && (
        <div className="table">
          <ComponentEnd items={torrents.length} />
          <table>
            <thead>
              <tr>
                <th className="start">Название</th>
                <th className="center">Size</th>
                <th className="center">Source</th>
                <th onClick={sortTorrentsBySeeders} className="seeders">Seeders&#8595;</th>
                <th className="peers">Peers</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {sortedTorrents.map((torrent, index) => (
                <tr key={index}>
                  <td>{torrent.title}</td>
                  <td className="center">{torrent.size} Gb</td>
                  <td className="center">
                    <a href={torrent.comments}>{torrent.index}</a>

                  </td>
                  <td className="seeders">{torrent.seeders}</td>
                  <td className="peers">{torrent.peers}</td>
                  <td className="center adapt" >
                    <a href={torrent.link} target="_blank" rel="noopener noreferrer">
                      <img className='download' src={download} alt="Download" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
    </div>
  );
}