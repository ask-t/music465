'use client';

import { useState, useEffect } from 'react';
import { songs } from '@/data/songs';
import styles from './page.module.css';

export default function ClassicQuiz() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomSong, setRandomSong] = useState(null);
  const [randomMovement, setRandomMovement] = useState(null);
  const [randomUrl, setRandomUrl] = useState('');

  useEffect(() => {
    // コンポーネントのマウント時に一度だけランダムな選択を行う
    const song = songs[Math.floor(Math.random() * songs.length)];
    const movement = song.movements[Math.floor(Math.random() * song.movements.length)];
    const url = `${song.url}&t=${movement.time}s`;
    
    setRandomSong(song);
    setRandomMovement(movement);
    setRandomUrl(url);
  }, []);

  if (!randomSong || !randomMovement) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>🎼 クラシック楽曲クイズ 🎼</h2>
      <p>以下のリンクをクリックして、曲を聴いてください。作曲家・曲名・楽章を当てましょう！</p>

      <a href={randomUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
        🔊 ランダムな楽曲を再生
      </a>

      <p>
        <button onClick={() => setShowAnswer(true)} className={styles.button}>
          ✅ 答えを見る
        </button>
      </p>

      {showAnswer && (
        <div className={styles.answer}>
          <strong>作曲家:</strong> {randomSong.composer} <br />
          <strong>曲名:</strong> {randomSong.title} <br />
          <strong>楽章:</strong> {randomMovement.name} <br />
          <strong>開始時間:</strong> {randomMovement.time} 秒
        </div>
      )}
    </div>
  );
}
