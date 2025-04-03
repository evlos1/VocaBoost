import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Radio, RadioGroup, FormControlLabel, FormControl, TextField } from '@mui/material';

const wordMeanings = {
  'genes': '유전자',
  'DNA': '디엔에이',
  'proteins': '단백질',
  'mutations': '돌연변이',
  'cells': '세포',
  'microscope': '현미경',
  'diseases': '질병',
  'scientists': '과학자들',
  'doctors': '의사들',
  'living': '생물',
  'plants': '식물',
  'animals': '동물',
  'people': '사람들',
  'interesting': '흥미로운',
  'important': '중요한',
  'special': '특별한',
  'tools': '도구들',
  'change': '변화',
  'help': '도움',
  'code': '암호',
  'epigenetics': '후성유전학',
  'phenotypic': '표현형의',
  'genetic': '유전의',
  'heredity': '유전',
  'traits': '특성',
  'characteristics': '특징',
  'reproduction': '생식',
  'beneficial': '유익한',
  'harmful': '해로운',
  'equipment': '장비',
  'research': '연구',
  'treatments': '치료법',
  'susceptibility': '감수성',
  'testing': '검사',
  'medical': '의학의',
  'advances': '진보',
  'organisms': '생물체',
  'variation': '변화',
  'agriculture': '농업',
  'medicine': '의학',
  'structure': '구조',
  'function': '기능',
  'discovery': '발견',
  'helix': '나선',
  'revolutionized': '혁신적인',
  'understanding': '이해',
  'technologies': '기술',
  'CRISPR': '크리스퍼',
  'editing': '편집',
  'environmental': '환경의',
  'factors': '요인',
  'development': '발달',
  'mapped': '매핑된',
  'insights': '통찰',
  'options': '선택지',
  'expression': '발현',
  'engineering': '공학',
  'applications': '응용',
  'biotechnology': '생명공학',
  'researchers': '연구자들',
  'contribute': '기여하다',
  'pathogenesis': '병인론',
  'counseling': '상담',
  'patterns': '패턴',
  'migration': '이동',
  'evolution': '진화',
  'personalized': '개인화된',
  'approaches': '접근법',
  'ethical': '윤리적인',
  'implications': '함의',
  'privacy': '개인정보',
  'discrimination': '차별',
  'contemporary': '현대의',
  'encompasses': '포함하다',
  'integration': '통합',
  'molecular': '분자의',
  'biochemistry': '생화학',
  'computational': '계산의',
  'evolution': '진화',
  'reflects': '반영하다',
  'profound': '깊은',
  'methodologies': '방법론',
  'next-generation': '차세대',
  'sequencing': '시퀀싱',
  'bioinformatics': '생물정보학',
  'investigate': '조사하다',
  'intricate': '복잡한',
  'interactions': '상호작용',
  'completion': '완성',
  'enabled': '가능하게 하다',
  'unprecedented': '전례 없는',
  'analysis': '분석',
  'response': '반응',
  'mechanisms': '메커니즘',
  'modify': '수정하다',
  'patterns': '패턴',
  'manipulation': '조작',
  'biological': '생물학의',
  'systems': '시스템',
  'networks': '네트워크',
  'underlying': '기본적인',
  'emerging': '새로운',
  'frameworks': '프레임워크',
  'integrates': '통합하다',
  'psychological': '심리학의',
  'support': '지원',
  'elucidates': '명확히 하다',
  'diversity': '다양성',
  'targeted': '표적화된',
  'therapeutic': '치료의',
  'dimensions': '차원',
  'require': '요구하다',
  'consideration': '고려',
  'equity': '공정성',
  'societal': '사회의',
  'impact': '영향',
  'synthesis': '합성',
  'discipline': '학문',
  'incorporates': '포함하다',
  'cutting-edge': '최첨단의',
  'single-cell': '단일 세포',
  'Cas9': '카스9',
  'enabling': '가능하게 하는',
  'precision': '정밀도',
  'revealing': '드러내는',
  'regulation': '규제',
  'adaptation': '적응',
  'facilitated': '촉진된',
  'comprehensive': '포괄적인',
  'paradigms': '패러다임',
  'detailed': '상세한',
  'control': '통제',
  'revolutionizing': '혁신적인',
  'possibilities': '가능성',
  'advancing': '진보하는',
  'processes': '과정',
  'pushing': '밀어붙이는',
  'boundaries': '경계',
  'addressing': '해결하는',
  'providing': '제공하는',
  'history': '역사',
  'transforming': '변형하는',
  'practice': '실천',
  'consequences': '결과',
  'necessitating': '필요하게 하는',
  'reflection': '반성',
  'bioinformatics': '생물정보학',
  'epigenetic': '후성유전학의'
};

const VocabularyModule = ({ words, onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const generatedQuestions = words.map(word => {
      const meaningQuestion = {
        type: 'meaning',
        word: word,
        question: `"${word}"의 올바른 의미를 선택하세요.`,
        options: [
          wordMeanings[word.toLowerCase()] || '의미 없음',
          ...Object.values(wordMeanings)
            .filter(meaning => meaning !== wordMeanings[word.toLowerCase()])
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        ].sort(() => Math.random() - 0.5),
        correctAnswer: wordMeanings[word.toLowerCase()] || '의미 없음'
      };

      const sentenceQuestion = {
        type: 'sentence',
        word: word,
        question: generateSentenceWithBlank(word),
        correctAnswer: word
      };

      return Math.random() < 0.5 ? meaningQuestion : sentenceQuestion;
    });

    setQuestions(generatedQuestions);
  }, [words]);

  const getRandomMeaning = (currentWord) => {
    const allMeanings = Object.values(wordMeanings);
    const randomMeaning = allMeanings[Math.floor(Math.random() * allMeanings.length)];
    return randomMeaning;
  };

  const generateSentenceWithBlank = (word) => {
    const sentences = {
      'genes': '___ are the basic units of heredity.',
      'DNA': '___ contains the genetic instructions for life.',
      'proteins': '___ are essential for cell function.',
      'mutations': '___ can cause genetic disorders.',
      'cells': 'All living organisms are made of ___.',
      'microscope': 'Scientists use a ___ to study small objects.',
      'diseases': 'Many ___ have genetic causes.',
      'scientists': '___ study the natural world.',
      'doctors': '___ help people stay healthy.',
      'living': 'All ___ things need energy.',
      'plants': '___ produce oxygen through photosynthesis.',
      'animals': '___ are multicellular organisms.',
      'people': '___ have unique genetic codes.',
      'interesting': 'The study of genetics is very ___.',
      'important': 'DNA is ___ for life.',
      'special': 'Each person has ___ genes.',
      'tools': 'Scientists use many ___ in research.',
      'change': 'Mutations can ___ genes.',
      'help': 'Genetic research can ___ people.',
      'code': 'DNA is like a ___ for life.',
      'epigenetics': '___ studies gene expression changes.',
      'phenotypic': '___ traits are visible characteristics.',
      'genetic': '___ information is passed to offspring.',
      'heredity': '___ is the passing of traits.',
      'traits': 'Physical ___ are inherited.',
      'characteristics': 'Unique ___ make each person different.',
      'reproduction': '___ creates new organisms.',
      'beneficial': 'Some mutations are ___.',
      'harmful': 'Some mutations are ___.',
      'equipment': 'Lab ___ is expensive.',
      'research': '___ leads to new discoveries.',
      'treatments': 'New ___ can cure diseases.',
      'susceptibility': '___ to diseases can be genetic.',
      'testing': 'Genetic ___ is important.',
      'medical': '___ advances help people.',
      'advances': 'Scientific ___ improve lives.',
      'organisms': 'All ___ have DNA.',
      'variation': 'Genetic ___ creates diversity.',
      'agriculture': '___ uses genetic knowledge.',
      'medicine': '___ benefits from genetics.',
      'structure': 'DNA has a double helix ___.',
      'function': 'Genes have specific ___.',
      'discovery': 'New ___ changes science.',
      'helix': 'DNA forms a double ___.',
      'revolutionized': 'Genetics has ___ medicine.',
      'understanding': '___ genetics is important.',
      'technologies': 'New ___ help research.',
      'CRISPR': '___ can edit genes.',
      'editing': 'Gene ___ is powerful.',
      'environmental': '___ factors affect genes.',
      'factors': 'Many ___ influence traits.',
      'development': '___ requires genes.',
      'mapped': 'The genome has been ___.',
      'insights': 'Research provides new ___.',
      'options': 'There are many treatment ___.',
      'expression': 'Gene ___ is complex.',
      'engineering': 'Genetic ___ is important.',
      'applications': 'There are many ___ of genetics.',
      'biotechnology': '___ uses genetic knowledge.',
      'researchers': '___ study genetics.',
      'contribute': 'Genes ___ to traits.',
      'pathogenesis': '___ studies disease causes.',
      'counseling': 'Genetic ___ helps families.',
      'patterns': 'Inheritance follows ___.',
      'migration': '___ affects gene flow.',
      'evolution': '___ changes species.',
      'personalized': '___ medicine is the future.',
      'approaches': 'New ___ help patients.',
      'ethical': '___ issues are important.',
      'implications': 'Research has many ___.',
      'privacy': 'Genetic ___ is important.',
      'discrimination': 'Genetic ___ is wrong.',
      'contemporary': '___ genetics is advanced.',
      'encompasses': 'Genetics ___ many fields.',
      'integration': '___ of knowledge is key.',
      'molecular': '___ biology studies cells.',
      'biochemistry': '___ studies molecules.',
      'computational': '___ tools help research.',
      'evolution': '___ changes life.',
      'reflects': 'DNA ___ ancestry.',
      'profound': 'The impact is ___.',
      'methodologies': 'Research ___ are important.',
      'next-generation': '___ sequencing is fast.',
      'sequencing': 'DNA ___ is powerful.',
      'bioinformatics': '___ analyzes genetic data.',
      'investigate': 'Scientists ___ genes.',
      'intricate': 'The process is ___.',
      'interactions': 'Gene ___ are complex.',
      'completion': '___ of the genome was important.',
      'enabled': 'Technology has ___ progress.',
      'unprecedented': 'The advances are ___.',
      'analysis': 'Data ___ is crucial.',
      'response': 'Gene ___ varies.',
      'mechanisms': 'Molecular ___ are complex.',
      'modify': 'Genes can ___ traits.',
      'patterns': 'Inheritance follows ___.',
      'manipulation': 'Gene ___ is powerful.',
      'biological': '___ systems are complex.',
      'systems': 'Living ___ are intricate.',
      'networks': 'Gene ___ are complex.',
      'underlying': '___ causes are important.',
      'emerging': '___ technologies help.',
      'frameworks': 'Theoretical ___ guide research.',
      'integrates': 'Science ___ knowledge.',
      'psychological': '___ factors matter.',
      'support': '___ helps patients.',
      'elucidates': 'Research ___ mechanisms.',
      'diversity': 'Genetic ___ is important.',
      'targeted': '___ therapies help.',
      'therapeutic': '___ approaches improve.',
      'dimensions': 'Many ___ affect genes.',
      'require': 'Research ___ funding.',
      'consideration': '___ of ethics is needed.',
      'equity': '___ in access is important.',
      'societal': '___ impact matters.',
      'impact': 'The ___ is significant.',
      'synthesis': 'Knowledge ___ is key.',
      'discipline': 'Genetics is a ___.',
      'incorporates': 'Science ___ many fields.',
      'cutting-edge': '___ research advances.',
      'single-cell': '___ analysis is precise.',
      'Cas9': '___ edits genes.',
      'enabling': 'Technology is ___.',
      'precision': '___ medicine is personalized.',
      'revealing': 'Research is ___.',
      'regulation': 'Gene ___ is complex.',
      'adaptation': '___ to environment matters.',
      'facilitated': 'Technology has ___ progress.',
      'comprehensive': '___ studies are needed.',
      'paradigms': 'New ___ emerge.',
      'detailed': '___ analysis helps.',
      'control': 'Gene ___ is important.',
      'revolutionizing': '___ medicine advances.',
      'possibilities': 'New ___ emerge.',
      'advancing': 'Science is ___.',
      'processes': 'Biological ___ are complex.',
      'pushing': 'Research ___ boundaries.',
      'boundaries': 'Science ___ expand.',
      'addressing': '___ challenges is key.',
      'providing': '___ solutions helps.',
      'history': '___ of genetics is long.',
      'transforming': '___ medicine changes.',
      'practice': 'Medical ___ evolves.',
      'consequences': '___ must be considered.',
      'necessitating': '___ careful study.',
      'reflection': '___ on ethics is needed.',
      'bioinformatics': '___ analyzes genetic data.',
      'epigenetic': '___ changes affect genes.'
    };
    return sentences[word] || `The word ___ is important in genetics.`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentWordIndex];
    if (selectedAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      setScore(score + 1);
    }

    if (currentWordIndex < questions.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  if (questions.length === 0) {
    return <Typography>Loading questions...</Typography>;
  }

  if (showResult) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Quiz Complete!
        </Typography>
        <Typography variant="h6">
          Score: {Math.round((score / questions.length) * 100)}%
        </Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentWordIndex];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Vocabulary Quiz
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Question {currentWordIndex + 1} of {questions.length}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question}
        </Typography>

        {currentQuestion.type === 'meaning' ? (
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => handleAnswerSelect(e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            value={selectedAnswer}
            onChange={(e) => handleAnswerSelect(e.target.value)}
            placeholder="Enter the missing word"
            sx={{ mt: 2 }}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          sx={{ mt: 3 }}
        >
          Submit Answer
        </Button>
      </Paper>
    </Box>
  );
};

export default VocabularyModule; 