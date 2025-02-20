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
  const [isRandomTime, setIsRandomTime] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const generateNewQuestion = (useRandomTime = false) => {
    const song = songs[Math.floor(Math.random() * songs.length)];
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
    setIsRandomTime(useRandomTime);
  };

  useEffect(() => {
    setIsClient(true);
    generateNewQuestion(false);
  }, []);

  if (!isClient || !randomSong || !randomMovement) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎼 クラシック楽曲クイズ 🎼</h2>
      <p className={styles.text}>以下の再生ボタンを押して、曲を聴いてください。作曲家・曲名・楽章を当てましょう！</p>

      <div className={styles.audioWrapper}>
        {isClient && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`}
            title="YouTube audio player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={styles.hiddenPlayer}
          />
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={() => generateNewQuestion(false)} className={styles.button}>
          🎵 イントロから聴く
        </button>
        <button onClick={() => generateNewQuestion(true)} className={styles.button}>
          🎲 ランダムな場所から聴く
        </button>
      </div>

      <p className={styles.text}>
        <button onClick={() => setShowAnswer(true)} className={styles.button}>
          ✅ 答えを見る
        </button>
      </p>

      {showAnswer && (
        <div className={styles.answer}>
          <strong>作曲家:</strong> {randomSong.composer} <br />
          <strong>曲名:</strong> {randomSong.title} <br />
          <strong>楽章:</strong> {randomMovement.name} <br />
          <strong>開始時間:</strong> {startTime} 秒
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
