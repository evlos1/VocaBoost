import React, { useState } from 'react';
import { Box, Typography, Button, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ComprehensionQuiz = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          이해도 테스트 ({currentIndex + 1}/{questions.length})
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentQuestion.question}
        </Typography>

        <RadioGroup
          value={selectedAnswers[currentQuestion.id] || ''}
          onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
        >
          {currentQuestion.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              disabled={showResults}
            />
          ))}
        </RadioGroup>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {currentIndex > 0 && (
            <Button
              variant="outlined"
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              이전
            </Button>
          )}
          
          {currentIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              다음
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              제출
            </Button>
          )}
        </Box>

        {showResults && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              결과: {score}/{questions.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onComplete(score)}
              sx={{ mt: 2 }}
            >
              완료
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ComprehensionQuiz; 