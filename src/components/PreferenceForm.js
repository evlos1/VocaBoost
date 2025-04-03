import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, Paper } from '@mui/material';

const PreferenceForm = ({ onSubmit, selectedTopic }) => {
  const [preferences, setPreferences] = useState({
    level: ''
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        학습 설정
      </Typography>

      {selectedTopic && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: '#f5f5f5',
            borderLeft: '4px solid #4CAF50'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            선택한 관심 주제
          </Typography>
          <Typography variant="body1">
            {selectedTopic.main} → {selectedTopic.sub} → {selectedTopic.final}
          </Typography>
        </Paper>
      )}
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>영어 레벨</InputLabel>
        <Select
          name="level"
          value={preferences.level}
          label="영어 레벨"
          onChange={handleChange}
          required
        >
          {levels.map(level => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        시작하기
      </Button>
    </Box>
  );
};

export default PreferenceForm; 