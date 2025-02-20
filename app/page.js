'use client';

import { useState, useEffect } from 'react';
import { songs } from '@/data/songs';
import styles from './page.module.css';

export default function ClassicQuiz() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomSong, setRandomSong] = useState(null);
  const [randomMovement, setRandomMovement] = useState(null);
  const [randomUrl, setRandomUrl] = useState('');
  const [isRandomTime, setIsRandomTime] = useState(false);

  const generateNewQuestion = (useRandomTime = false) => {
    const song = songs[Math.floor(Math.random() * songs.length)];
    const movement = song.movements[Math.floor(Math.random() * song.movements.length)];
    
    // ランダムな時間を生成（楽章の開始時間から30秒後までの範囲で）
    const randomTimeOffset = useRandomTime 
      ? Math.floor(Math.random() * 30)
      : 0;
    
    const url = `${song.url}&t=${movement.time + randomTimeOffset}s`;
    
    setRandomSong(song);
    setRandomMovement(movement);
    setRandomUrl(url);
    setShowAnswer(false);
    setIsRandomTime(useRandomTime);
  };

  useEffect(() => {
    generateNewQuestion(false);
  }, []);

  if (!randomSong || !randomMovement) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>🎼 クラシック楽曲クイズ 🎼</h2>
      <p>以下のリンクをクリックして、曲を聴いてください。作曲家・曲名・楽章を当てましょう！</p>

      <div className={styles.buttonGroup}>
        <a href={randomUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          🔊 {isRandomTime ? 'ランダムな場所から再生' : 'イントロから再生'}
        </a>
        <button onClick={() => generateNewQuestion(false)} className={styles.button}>
          🎵 イントロから始める
        </button>
        <button onClick={() => generateNewQuestion(true)} className={styles.button}>
          🎲 ランダムな場所から始める
        </button>
      </div>

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
          <strong>開始時間:</strong> {randomMovement.time + (isRandomTime ? '+ ランダム' : '')} 秒
          <p>
            <button onClick={() => generateNewQuestion(isRandomTime)} className={styles.button}>
              🔄 次の問題へ
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
