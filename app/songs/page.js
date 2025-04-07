'use client';

import { useState, useEffect } from 'react';
import { getAllSongs } from '@/data/courses';
import styles from './songs.module.css';
import CustomLink from '../components/CustomLink';

export default function SongsList() {
  const [songs, setSongs] = useState([]);
  const [selectedComposer, setSelectedComposer] = useState('all');
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [composers, setComposers] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    const allSongs = getAllSongs();
    setSongs(allSongs);
    setFilteredSongs(allSongs);
    
    // 作曲家のリストを作成
    const uniqueComposers = [...new Set(allSongs.map(song => song.composer))];
    setComposers(['all', ...uniqueComposers]);
    
    // ホスト名に基づいてbasePath（ベースパス）を設定
    if (typeof window !== 'undefined') {
      const isAskTHost = window.location.hostname === 'ask-t.vercel.app';
      setBasePath(isAskTHost ? '/music465' : '');
      console.log(`Setting basePath: ${isAskTHost ? '/music465' : ''} for host: ${window.location.hostname}`);
    }
    
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedComposer === 'all') {
      setFilteredSongs(songs);
    } else {
      setFilteredSongs(songs.filter(song => song.composer === selectedComposer));
    }
    setSelectedSong(null);
    setSelectedMovement(null);
  }, [selectedComposer, songs]);

  const handleComposerChange = (e) => {
    setSelectedComposer(e.target.value);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setSelectedMovement(null);
  };

  const handleMovementSelect = (movement) => {
    setSelectedMovement(movement);
  };

  const getVideoId = (url) => {
    return url.split('v=')[1];
  };

  if (!isClient) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎹 曲リスト 🎹</h1>
      
      <div className={styles.navigation}>
        <CustomLink href="/" className={styles.navLink}>
          ← クイズページに戻る
        </CustomLink>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>
          作曲家で絞り込み:
          <select 
            value={selectedComposer} 
            onChange={handleComposerChange}
            className={styles.select}
          >
            {composers.map(composer => (
              <option key={composer} value={composer}>
                {composer === 'all' ? '全ての作曲家' : composer}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.songsList}>
          <h2 className={styles.sectionTitle}>曲目リスト</h2>
          {filteredSongs.map((song, index) => (
            <div 
              key={index} 
              className={`${styles.songItem} ${selectedSong === song ? styles.selectedSong : ''}`}
              onClick={() => handleSongSelect(song)}
            >
              <div className={styles.songTitle}>{song.title}</div>
              <div className={styles.songComposer}>{song.composer}</div>
            </div>
          ))}
        </div>

        {selectedSong && (
          <div className={styles.movementsList}>
            <h2 className={styles.sectionTitle}>楽章</h2>
            {selectedSong.movements.map((movement, index) => (
              <div 
                key={index} 
                className={`${styles.movementItem} ${selectedMovement === movement ? styles.selectedMovement : ''}`}
                onClick={() => handleMovementSelect(movement)}
              >
                <div className={styles.movementName}>{movement.name}</div>
                <div className={styles.movementKey}>{movement.key}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSong && selectedMovement && (
        <div className={styles.playerSection}>
          <h2 className={styles.playerTitle}>
            {selectedSong.composer}: {selectedSong.title} - {selectedMovement.name}
          </h2>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${getVideoId(selectedSong.url)}?start=${selectedMovement.time}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoPlayer}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
} 