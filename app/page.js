'use client';

import { useState, useEffect } from 'react';
import { songs } from '@/data/songs';
import styles from './page.module.css';

export default function ClassicQuiz() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomSong, setRandomSong] = useState(null);
  const [randomMovement, setRandomMovement] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [playMode, setPlayMode] = useState('intro');
  const [selectedComposers, setSelectedComposers] = useState(['all']);

  const composers = ['all', 'Ludwig van Beethoven', 'Franz Schubert', 'Robert Schumann'];

  const handleComposerChange = (composer) => {
    if (composer === 'all') {
      setSelectedComposers(['all']);
    } else {
      const newSelected = selectedComposers.includes(composer)
        ? selectedComposers.filter(c => c !== composer)
        : [...selectedComposers.filter(c => c !== 'all'), composer];
      
      setSelectedComposers(newSelected.length ? newSelected : ['all']);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分 ${remainingSeconds}秒`;
  };

  const generateNewQuestion = () => {
    const useRandomTime = playMode === 'random';
    const filteredSongs = selectedComposers.includes('all')
      ? songs
      : songs.filter(song => selectedComposers.includes(song.composer));
    
    const song = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    const movement = song.movements[Math.floor(Math.random() * song.movements.length)];
    
    const randomTimeOffset = useRandomTime 
      ? Math.floor(Math.random() * 30)
      : 0;
    
    const videoId = song.url.split('v=')[1];
    const startTime = movement.time + randomTimeOffset;
    
    setRandomSong(song);
    setRandomMovement(movement);
    setVideoId(videoId);
    setStartTime(startTime);
    setShowAnswer(false);
  };

  useEffect(() => {
    setIsClient(true);
    generateNewQuestion();
  }, []);

  if (!isClient || !randomSong || !randomMovement) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎼 クラシック楽曲クイズ 🎼</h2>
      <p className={styles.text}>以下の再生ボタンを押して、曲を聴いてください。作曲家・曲名・楽章を当てましょう！</p>

      <div className={styles.radioGroup}>
        <p className={styles.groupLabel}>作曲家を選択：</p>
        {composers.map(composer => (
          <label key={composer} className={styles.radioLabel}>
            <input
              type="checkbox"
              checked={selectedComposers.includes(composer)}
              onChange={() => handleComposerChange(composer)}
              className={styles.radioInput}
            />
            {composer === 'all' ? '🎵 全ての作曲家' : `👤 ${composer}`}
          </label>
        ))}
      </div>

      {isClient && (
        <div className={styles.audioWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`}
            title="YouTube audio player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={styles.hiddenPlayer}
          />
        </div>
      )}

      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="playMode"
            value="intro"
            checked={playMode === 'intro'}
            onChange={(e) => setPlayMode(e.target.value)}
            className={styles.radioInput}
          />
          🎵 イントロから再生
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="playMode"
            value="random"
            checked={playMode === 'random'}
            onChange={(e) => setPlayMode(e.target.value)}
            className={styles.radioInput}
          />
          🎲 ランダムな場所から再生
        </label>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={generateNewQuestion} className={styles.button}>
          ▶️ 再生する
        </button>
        <button onClick={() => setShowAnswer(true)} className={styles.button}>
          ✅ 答えを見る
        </button>
      </div>

      {showAnswer && (
        <div className={styles.answer}>
          <strong>作曲家:</strong> {randomSong.composer} <br />
          <strong>曲名:</strong> {randomSong.title} <br />
          <strong>楽章:</strong> {randomMovement.name} <br />
          <strong>調性:</strong> {randomMovement.key} <br />
          <strong>開始時間:</strong> {formatTime(startTime)} <br />
          <strong>YouTube:</strong> <a 
            href={`${randomSong.url}&t=${startTime}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            動画を開く ↗️
          </a>
          <p>
            <button onClick={generateNewQuestion} className={styles.button}>
              🔄 次の問題へ
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
