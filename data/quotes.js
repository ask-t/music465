export const quotes = [
  {
    text: "音楽は心の中にある炎を呼び覚ます。",
    author: "Ludwig van Beethoven",
    course: "MUSC465-Unit1"
  },
  {
    text: "音楽は言葉の始まるところで終わる。",
    author: "Ludwig van Beethoven",
    course: "MUSC465-Unit1"
  },
  {
    text: "私の音楽は私の心の奥底から生まれる。",
    author: "Franz Schubert",
    course: "MUSC465-Unit1"
  },
  {
    text: "音楽は魂の詩である。",
    author: "Robert Schumann",
    course: "MUSC465-Unit1"
  },
  {
    text: "私の心は歌う、なぜなら音楽が私の中に住んでいるから。",
    author: "Franz Schubert",
    course: "MUSC465-Unit1"
  },
  {
    text: "音楽は愛の食物である。",
    author: "Robert Schumann",
    course: "MUSC465-Unit1"
  }
];

export const getRandomQuote = (courseId) => {
  const filteredQuotes = courseId === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.course === courseId);
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
}; 