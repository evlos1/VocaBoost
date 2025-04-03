import React, { useState } from 'react';
import { Box, Typography, Button, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const WordQuiz = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === words[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      onComplete(score);
    }
  };

  const currentWord = words[currentIndex];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          단어 퀴즈 ({currentIndex + 1}/{words.length})
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          "{currentWord.word}"의 의미는?
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleAnswerSelect(e.target.value)}
        >
          {currentWord.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              disabled={showResult}
            />
          ))}
        </RadioGroup>

        {showResult && (
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: selectedAnswer === currentWord.correctAnswer ? 'success.main' : 'error.main'
            }}
          >
            {selectedAnswer === currentWord.correctAnswer
              ? '정답입니다!'
              : `틀렸습니다. 정답은 "${currentWord.correctAnswer}"입니다.`}
          </Typography>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {!showResult ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              제출
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {currentIndex < words.length - 1 ? '다음' : '완료'}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default WordQuiz; 