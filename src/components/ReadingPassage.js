import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const ReadingPassage = ({ passage, onWordSelect, onComplete }) => {
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  const handleWordClick = (word) => {
    const newSelectedWords = new Set(selectedWords);
    if (newSelectedWords.has(word)) {
      newSelectedWords.delete(word);
    } else {
      newSelectedWords.add(word);
    }
    setSelectedWords(newSelectedWords);
    onWordSelect(Array.from(newSelectedWords));
  };

  const words = passage.text.split(' ');

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {passage.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {words.map((word, index) => (
            <span
              key={index}
              onClick={() => handleWordClick(word)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedWords.has(word) ? '#e3f2fd' : 'transparent',
                padding: '2px 4px',
                borderRadius: '4px',
                margin: '0 2px'
              }}
            >
              {word}
            </span>
          ))}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? '원문 숨기기' : '번역 보기'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onComplete}
        >
          학습 완료
        </Button>
      </Box>

      {showTranslation && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1">
            {passage.translation}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ReadingPassage; 