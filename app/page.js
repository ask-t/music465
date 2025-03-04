'use client';

import { useState, useEffect } from 'react';
import { songs } from '@/data/songs';
import styles from './page.module.css';
import { courses, getAllSongs, getSongsByCourse, getComposersByCourse } from '@/data/courses';
import { quotes, getRandomQuote } from '@/data/quotes';

export default function ClassicQuiz() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomSong, setRandomSong] = useState(null);
  const [randomMovement, setRandomMovement] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [playMode, setPlayMode] = useState('intro');
  const [selectedComposers, setSelectedComposers] = useState(['all']);
  const [selectedCourse, setSelectedCourse] = useState('MUSC465-Unit1');
  const [currentQuote, setCurrentQuote] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    course: false,
    composer: false,
    playMode: false
  });
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMovementIndex, setSelectedMovementIndex] = useState(0);
  const [isPlayingSelected, setIsPlayingSelected] = useState(false);
  const [showSongSelector, setShowSongSelector] = useState(false);

  const composers = getComposersByCourse(selectedCourse);

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

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedComposers(['all']);
    setCurrentQuote(getRandomQuote(courseId));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分 ${remainingSeconds}秒`;
  };

  const generateNewQuestion = () => {
    const useRandomTime = playMode === 'random';
    let availableSongs = selectedCourse === 'all' 
      ? getAllSongs()
      : getSongsByCourse(selectedCourse);

    if (!selectedComposers.includes('all')) {
      availableSongs = availableSongs.filter(song => 
        selectedComposers.includes(song.composer)
      );
    }
    
    const song = availableSongs[Math.floor(Math.random() * availableSongs.length)];
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSongSelector = () => {
    setShowSongSelector(!showSongSelector);
    if (isPlayingSelected) {
      setIsPlayingSelected(false);
    }
  };

  const playSelectedSong = () => {
    if (!selectedSong) return;
    
    const movement = selectedSong.movements[selectedMovementIndex];
    const videoId = selectedSong.url.split('v=')[1];
    
    setVideoId(videoId);
    setStartTime(movement.time);
    setIsPlayingSelected(true);
  };

  useEffect(() => {
    setIsClient(true);
    generateNewQuestion();
    setCurrentQuote(getRandomQuote(selectedCourse));
  }, []);

  if (!isClient) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎼 Keyboard Literature Quiz 🎼</h2>
      <p className={styles.text}>以下の再生ボタンを押して、曲を聴いてください。作曲家・曲名・楽章を当てましょう🐧🐧🐧</p>
      <br></br>
      {isClient && currentQuote && (
        <div className={styles.quoteContainer}>
          <p className={styles.quote}>
            {currentQuote.text}
          </p>
          <p className={styles.quoteAuthor}>
            ― {currentQuote.author}
          </p>
        </div>
      )}

      <div className={styles.accordionSection}>
        <div 
          className={styles.accordionHeader}
          onClick={() => toggleSection('course')}
        >
          <span>📚 コースを選択</span>
          <span className={`${styles.accordionIcon} ${expandedSections.course ? styles.expanded : ''}`}>
            ▼
          </span>
        </div>
        <div className={`${styles.accordionContent} ${expandedSections.course ? styles.expanded : ''}`}>
          <div className={styles.radioGroup}>
            <p className={styles.groupLabel}>コースを選択：</p>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="course"
                value="all"
                checked={selectedCourse === 'all'}
                onChange={(e) => handleCourseChange(e.target.value)}
                className={styles.radioInput}
              />
              📚 全てのコース
            </label>
            {courses.map(course => (
              <label key={course.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="course"
                  value={course.id}
                  checked={selectedCourse === course.id}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className={styles.radioInput}
                />
                📖 {course.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.accordionSection}>
        <div 
          className={styles.accordionHeader}
          onClick={() => toggleSection('composer')}
        >
          <span>👤 作曲家を選択</span>
          <span className={`${styles.accordionIcon} ${expandedSections.composer ? styles.expanded : ''}`}>
            ▼
          </span>
        </div>
        <div className={`${styles.accordionContent} ${expandedSections.composer ? styles.expanded : ''}`}>
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
        </div>
      </div>

      <div className={styles.accordionSection}>
        <div 
          className={styles.accordionHeader}
          onClick={() => toggleSection('playMode')}
        >
          <span>🎵 再生モードを選択</span>
          <span className={`${styles.accordionIcon} ${expandedSections.playMode ? styles.expanded : ''}`}>
            ▼
          </span>
        </div>
        <div className={`${styles.accordionContent} ${expandedSections.playMode ? styles.expanded : ''}`}>
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
        </div>
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

      <div className={styles.selectorToggle}>
        <button 
          onClick={toggleSongSelector} 
          className={`${styles.button} ${showSongSelector ? styles.activeButton : ''}`}
        >
          🎵 曲を選択して再生
        </button>
      </div>

      {showSongSelector && (
        <div className={styles.songSelectorPanel}>
          <h3>曲を選択</h3>
          <div className={styles.songSelector}>
            <select 
              className={styles.select}
              onChange={(e) => {
                const songId = e.target.value;
                const songs = getSongsByCourse(selectedCourse);
                const song = songs.find(s => s.url === songId);
                setSelectedSong(song);
                setSelectedMovementIndex(0);
              }}
              value={selectedSong?.url || ''}
            >
              <option value="">曲を選択してください</option>
              {getSongsByCourse(selectedCourse).map((song, idx) => (
                <option key={idx} value={song.url}>
                  {song.composer}: {song.title}
                </option>
              ))}
            </select>
            
            {selectedSong && (
              <>
                <select 
                  className={styles.select}
                  onChange={(e) => setSelectedMovementIndex(Number(e.target.value))}
                  value={selectedMovementIndex}
                >
                  {selectedSong.movements.map((movement, idx) => (
                    <option key={idx} value={idx}>
                      {movement.name} ({movement.key})
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={playSelectedSong} 
                  className={styles.button}
                  disabled={!selectedSong}
                >
                  ▶️ 選択した曲を再生
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
