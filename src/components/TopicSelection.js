import React, { useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, ListItemButton, Divider, TextField } from '@mui/material';

const TopicSelection = ({ onTopicSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const categories = {
    '스포츠': {
      '축구': ['프리미어리그', '분데스리가', '라리가', '세리에A', '기타'],
      '야구': ['MLB', 'KBO', 'NPB', '중화직업봉구대연맹', '기타'],
      '농구': ['NBA', 'KBL', '여자농구', '3x3', '기타'],
      '테니스': ['ATP', 'WTA', '그랜드슬램', '데이비스컵', '기타'],
      '골프': ['PGA', 'LPGA', '유러피언투어', '코리안투어', '기타']
    },
    '음악': {
      '팝': ['팝', 'R&B', '힙합', '일렉트로닉', '기타'],
      '클래식': ['교향곡', '협주곡', '실내악', '오페라', '기타'],
      '재즈': ['스윙', '비밥', '쿨재즈', '퓨전', '기타'],
      '록': ['하드록', '메탈', '얼터너티브', '인디', '기타'],
      '힙합': ['올드스쿨', '뉴스쿨', '트랩', '랩', '기타']
    },
    '영화': {
      '액션': ['슈퍼히어로', '전쟁', '무술', '스파이', '기타'],
      '드라마': ['로맨스', '가족', '역사', '전기', '기타'],
      '코미디': ['로맨틱코미디', '블랙코미디', '슬랩스틱', '패러디', '기타'],
      'SF': ['우주', '시간여행', '디스토피아', '사이버펑크', '기타'],
      '다큐멘터리': ['자연', '역사', '사회', '인물', '기타']
    },
    '과학': {
      '물리학': ['양자역학', '상대성이론', '천체물리학', '입자물리학', '기타'],
      '화학': ['유기화학', '무기화학', '생화학', '물리화학', '기타'],
      '생물학': ['분자생물학', '유전학', '생태학', '진화생물학', '기타'],
      '천문학': ['태양계', '은하', '우주론', '외계행성', '기타'],
      '지구과학': ['기후학', '지질학', '해양학', '대기과학', '기타']
    },
    '문학': {
      '소설': ['추리', '판타지', 'SF', '로맨스', '기타'],
      '시': ['서정시', '서사시', '자유시', '산문시', '기타'],
      '에세이': ['인문', '사회', '문화', '여행', '기타'],
      '전기': ['역사인물', '현대인물', '자서전', '평전', '기타'],
      '비평': ['문학비평', '영화비평', '미술비평', '음악비평', '기타']
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setSelectedSubSubcategory(null);
    setShowCustomInput(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedSubSubcategory(null);
    setShowCustomInput(false);
  };

  const handleSubSubcategoryClick = (subSubcategory) => {
    setSelectedSubSubcategory(subSubcategory);
    setShowCustomInput(false);
  };

  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      onTopicSelected({
        main: selectedCategory || '기타',
        sub: selectedSubcategory || '기타',
        subSub: customTopic.trim()
      });
    }
  };

  const handleNextClick = () => {
    if (selectedCategory && selectedSubcategory && selectedSubSubcategory) {
      onTopicSelected({
        main: selectedCategory,
        sub: selectedSubcategory,
        subSub: selectedSubSubcategory
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Select Your Topic
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Choose a category:
        </Typography>
        <List>
          {Object.keys(categories).map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                selected={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              selected={showCustomInput}
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSelectedSubSubcategory(null);
                setShowCustomInput(true);
              }}
            >
              <ListItemText primary="기타" />
            </ListItemButton>
          </ListItem>
        </List>

        {selectedCategory && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Choose a subcategory:
            </Typography>
            <List>
              {Object.keys(categories[selectedCategory]).map((subcategory) => (
                <ListItem key={subcategory} disablePadding>
                  <ListItemButton
                    selected={selectedSubcategory === subcategory}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <ListItemText primary={subcategory} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {selectedSubcategory && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Choose a specific topic:
            </Typography>
            <List>
              {categories[selectedCategory][selectedSubcategory].map((subSubcategory) => (
                <ListItem key={subSubcategory} disablePadding>
                  <ListItemButton
                    selected={selectedSubSubcategory === subSubcategory}
                    onClick={() => handleSubSubcategoryClick(subSubcategory)}
                  >
                    <ListItemText primary={subSubcategory} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {showCustomInput && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Enter your custom topic:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Custom Topic"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomTopicSubmit();
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCustomTopicSubmit}
                disabled={!customTopic.trim()}
              >
                Submit
              </Button>
            </Box>
          </>
        )}

        {(selectedCategory && selectedSubcategory && selectedSubSubcategory) && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              다음으로
            </Button>
          </Box>
        )}
      </Paper>

      {(selectedCategory || showCustomInput) && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Topic:
          </Typography>
          <Typography variant="body1">
            {showCustomInput
              ? `기타 > 기타 > ${customTopic}`
              : `${selectedCategory} > ${selectedSubcategory} > ${selectedSubSubcategory}`}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TopicSelection; 