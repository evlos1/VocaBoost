import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Container, Box, Typography, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TopicSelection from './components/TopicSelection';
import CEFRLevelTest from './components/CEFRLevelTest';
import ReadingModule from './components/ReadingModule';
import QuizModule from './components/QuizModule';
import VocabularyModule from './components/VocabularyModule';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [currentModule, setCurrentModule] = useState('topicSelection');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [cefrLevel, setCefrLevel] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [quizScore, setQuizScore] = useState(null);

  const handleTopicSelected = (topic) => {
    setSelectedTopic(topic);
    setCurrentModule('cefrTest');
  };

  const handleLevelDetermined = (level, words) => {
    setCefrLevel(level);
    setSelectedWords(words);
    setCurrentModule('reading');
  };

  const handleReadingComplete = (words) => {
    setSelectedWords(words);
    setCurrentModule('vocabulary');
  };

  const handleVocabularyComplete = (score) => {
    setQuizScore(score);
    setCurrentModule('quiz');
  };

  const handleQuizComplete = (score) => {
    setCurrentModule('result');
    setQuizScore(score);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <Container maxWidth="lg">
              <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                  VocaBoost
                </Typography>

                {currentModule === 'topicSelection' && (
                  <TopicSelection onTopicSelected={handleTopicSelected} />
                )}

                {currentModule === 'cefrTest' && selectedTopic && (
                  <CEFRLevelTest
                    selectedTopic={selectedTopic}
                    onLevelDetermined={handleLevelDetermined}
                  />
                )}

                {currentModule === 'reading' && (
                  <ReadingModule
                    topic={selectedTopic}
                    level={cefrLevel}
                    onComplete={handleReadingComplete}
                  />
                )}

                {currentModule === 'vocabulary' && (
                  <VocabularyModule
                    words={selectedWords}
                    onComplete={handleVocabularyComplete}
                  />
                )}

                {currentModule === 'quiz' && (
                  <QuizModule
                    topic={selectedTopic}
                    level={cefrLevel}
                    words={selectedWords}
                    onComplete={handleQuizComplete}
                  />
                )}
              </Box>
            </Container>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 