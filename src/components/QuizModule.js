import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const QuizModule = ({ topic, level, words, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // 샘플 퀴즈 데이터 (실제로는 API에서 가져와야 함)
  const questions = [
    {
      question: "What is the main topic of the passage?",
      options: [
        "The history of baseball",
        "The rules of baseball",
        "The importance of baseball",
        "The future of baseball"
      ],
      correctAnswer: "The importance of baseball"
    },
    {
      question: "What skills do baseball players need?",
      options: [
        "Only physical strength",
        "Only mental strategy",
        "Both physical and mental skills",
        "No special skills required"
      ],
      correctAnswer: "Both physical and mental skills"
    }
  ];

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      onComplete();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Comprehension Quiz
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {questions[currentQuestion].question}
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary">
        Score: {score} / {questions.length}
      </Typography>
    </Box>
  );
};

export default QuizModule; 