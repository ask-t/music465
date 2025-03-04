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
  },
  {
    text: "シンプルさは最高の複雑さである。",
    author: "Frédéric Chopin",
    course: "MUSC465-Unit2"
  },
  {
    text: "ピアノの詩人になりたいのなら、まず人生の詩人になれ。",
    author: "Frédéric Chopin",
    course: "MUSC465-Unit2"
  },
  {
    text: "感情なしに演奏することは許されない。",
    author: "Frédéric Chopin",
    course: "MUSC465-Unit2"
  },
  {
    text: "天才とは1%のインスピレーションと99%の努力である。",
    author: "Franz Liszt",
    course: "MUSC465-Unit2"
  },
  {
    text: "音楽は空気の中の彫刻である。",
    author: "Franz Liszt",
    course: "MUSC465-Unit2"
  },
  {
    text: "ピアノは私の言語であり、私の魂である。",
    author: "Franz Liszt",
    course: "MUSC465-Unit2"
  }
];

export const getRandomQuote = (courseId) => {
  const filteredQuotes = courseId === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.course === courseId);
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
}; 