import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';

const PassageContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Word = styled.span`
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e3f2fd;
  }

  &.selected {
    background-color: #bbdefb;
    text-decoration: underline;
  }
`;

const getSamplePassages = (mainCategory, subCategory, subSubCategory) => {
  const passages = {
    '스포츠': {
      '축구': {
        '프리미어리그': {
          'A1': 'Manchester United is a football team. They play in England. The team wears red shirts. They have many fans. The stadium is big. The players run fast. They score goals. The fans cheer loudly. The game is exciting. Football is fun to watch. The team trains every day. The coach helps the players. The matches are on TV. People watch the games. The team wins sometimes. The team loses sometimes. The players work hard. The fans are happy when they win. The fans are sad when they lose. Football is a popular sport.',
          'A2': 'The Premier League is England\'s top football division. Teams play 38 matches each season. Manchester United and Liverpool are famous clubs. Matches are played on weekends. Fans buy tickets to watch games. The season runs from August to May. Teams compete for the championship. The atmosphere in stadiums is electric. Players train hard every day. Football is very popular in England. Each team has a manager who makes important decisions. Players come from many countries. The league is watched by millions of people. Teams have their own stadiums. Fans sing songs during matches. The weather can affect the games. Referees make sure the rules are followed. Teams can win trophies at the end of the season. The Premier League is known worldwide.',
          'B1': 'The Premier League is renowned for its competitive nature and global appeal. Clubs invest heavily in player development and infrastructure. Tactical innovations have revolutionized modern football. The league\'s financial model attracts top talent worldwide. Fan culture plays a crucial role in team success. VAR technology has changed how matches are officiated. Youth academies produce future stars. The transfer market significantly impacts team performance. Stadium atmosphere creates unforgettable experiences. Media coverage reaches millions globally. Clubs implement sophisticated training methods. Sports science has transformed player preparation. Data analytics influence tactical decisions. The league\'s commercial success enables significant investment. International partnerships expand the league\'s reach. Player welfare programs ensure long-term health. Community initiatives engage local supporters. The league maintains high standards of professionalism. Global broadcasting deals generate substantial revenue.',
          'B2': 'The Premier League\'s evolution reflects broader changes in global football. Financial fair play regulations aim to maintain competitive balance. Tactical sophistication has reached unprecedented levels. Player development programs incorporate advanced analytics. Fan engagement strategies utilize digital platforms effectively. Stadium infrastructure meets modern safety standards. Media rights distribution generates substantial revenue. Youth development systems focus on holistic growth. International partnerships expand the league\'s influence. The competition maintains its position as a global benchmark. Clubs implement sophisticated scouting networks. Sports science departments optimize player performance. Data analytics inform strategic decision-making. Commercial partnerships drive financial growth. Grassroots programs nurture future talent. Stadium technology enhances spectator experience. Player welfare initiatives prioritize long-term health. Community outreach programs strengthen local ties. The league\'s governance model sets industry standards.',
          'C1': 'The Premier League\'s ascendancy in global football stems from strategic commercial development and sporting excellence. Financial regulations attempt to reconcile competitive balance with market forces. Tactical evolution reflects broader societal changes in sports science. Player development integrates psychological and physiological components. Fan engagement transcends traditional matchday experiences. Infrastructure development considers environmental sustainability. Media distribution strategies adapt to changing consumption patterns. Youth development emphasizes character building alongside technical skills. International partnerships foster cultural exchange. The league\'s governance model influences global football administration. Clubs implement sophisticated talent identification systems. Sports science integrates cutting-edge research methodologies. Data analytics inform complex strategic decisions. Commercial partnerships drive sustainable growth. Grassroots development programs nurture future talent. Stadium technology enhances spectator engagement. Player welfare initiatives prioritize holistic well-being. Community outreach programs strengthen social cohesion. The league\'s governance framework sets industry precedents.',
          'C2': 'The Premier League\'s preeminence in world football emerges from a complex interplay of commercial acumen, sporting innovation, and cultural significance. Financial regulations navigate the tension between market forces and competitive integrity. Tactical sophistication reflects the convergence of sports science and technological advancement. Player development encompasses cognitive, emotional, and physical dimensions. Fan engagement strategies leverage emerging technologies while preserving traditional values. Infrastructure development balances modernization with historical preservation. Media distribution adapts to evolving consumption patterns and regulatory frameworks. Youth development prioritizes holistic growth and social responsibility. International partnerships facilitate cross-cultural understanding and commercial expansion. The league\'s governance model sets precedents for global football administration. Clubs implement sophisticated talent identification and development systems. Sports science integrates cutting-edge research and innovation. Data analytics inform complex strategic and operational decisions. Commercial partnerships drive sustainable growth and innovation. Grassroots development programs nurture future talent and community engagement. Stadium technology enhances spectator experience and safety. Player welfare initiatives prioritize holistic well-being and career longevity. Community outreach programs strengthen social cohesion and local identity. The league\'s governance framework establishes industry-leading standards and best practices.'
        }
      }
    },
    '음악': {
      '팝': {
        'R&B': {
          'A1': 'R&B music is nice to hear. The singers have good voices. The songs are about love. People dance to the music. The beat is smooth. The instruments sound good. Fans enjoy the concerts. The music makes people happy. Many people like R&B. It is popular music.',
          'A2': 'R&B music combines soul and rhythm. Artists express deep emotions through their songs. The genre has evolved over decades. Modern R&B includes electronic elements. Concerts feature impressive performances. Fans connect with the lyrics. The music industry recognizes R&B talent. Streaming platforms help discover new artists. Music videos showcase creative expression. R&B influences many other genres.',
          'B1': 'Contemporary R&B represents a fusion of traditional soul and modern production techniques. Artists employ sophisticated vocal techniques and emotional expression. The genre\'s evolution reflects broader cultural changes. Digital production tools enable innovative sound design. Live performances incorporate advanced stage technology. Fan engagement utilizes social media platforms effectively. The industry recognizes R&B\'s commercial and artistic value. Streaming services facilitate global distribution. Music videos combine visual artistry with musical expression. The genre influences mainstream popular music.',
          'B2': 'R&B\'s position in contemporary music stems from its sophisticated blend of tradition and innovation. The genre\'s evolution reflects complex cultural and technological changes. Artists master both technical proficiency and emotional expression. Production techniques integrate analog warmth with digital precision. Live performances combine artistic integrity with technological spectacle. Fan engagement strategies leverage digital platforms while maintaining authenticity. The industry acknowledges R&B\'s cultural significance. Distribution channels adapt to changing consumption patterns. Visual elements enhance musical expression. The genre\'s influence extends across musical boundaries.',
          'C1': 'R&B\'s prominence in global music culture emerges from its nuanced synthesis of tradition and innovation. The genre\'s evolution reflects sophisticated cultural and technological integration. Artists achieve remarkable synthesis of technical mastery and emotional depth. Production methodologies balance analog authenticity with digital innovation. Live performances reconcile artistic integrity with technological spectacle. Fan engagement initiatives navigate the tension between digital connectivity and authentic experience. The industry recognizes R&B\'s cultural and commercial significance. Distribution strategies adapt to complex market dynamics. Visual elements enhance musical narrative. The genre\'s influence permeates contemporary music.',
          'C2': 'R&B\'s exceptional position in global music culture arises from its sophisticated reconciliation of tradition and innovation. The genre\'s evolution reflects profound cultural and technological synthesis. Artists achieve unprecedented synthesis of technical virtuosity and emotional resonance. Production methodologies harmonize analog authenticity with digital innovation. Live performances reconcile artistic integrity with technological spectacle. Fan engagement initiatives navigate complex digital landscapes while preserving authentic connection. The industry acknowledges R&B\'s cultural and commercial significance. Distribution strategies adapt to sophisticated market dynamics. Visual elements enhance musical narrative. The genre\'s influence permeates contemporary music culture.'
        }
      }
    },
    '영화': {
      '액션': {
        '스파이': {
          'A1': 'Spy movies are exciting. The spy is very smart. They have special gadgets. They fight bad people. The car chases are fast. The spy saves the world. The music is dramatic. The scenes are in many countries. The spy wears nice clothes. People like spy movies.',
          'A2': 'Spy films feature skilled agents completing dangerous missions. The protagonist uses advanced technology and combat skills. Locations span across different countries and cities. Car chases and fight scenes create excitement. The plot involves saving the world from threats. Music enhances the dramatic moments. Costumes and gadgets are carefully designed. The story keeps viewers interested. Action sequences are well choreographed. Spy movies are popular worldwide.',
          'B1': 'Contemporary spy films represent a sophisticated blend of action and intrigue. The genre incorporates advanced technology and complex narratives. Protagonists demonstrate exceptional skills in combat and strategy. Locations provide diverse cultural and geographical settings. Action sequences combine practical effects with digital enhancement. Plot development maintains suspense and engagement. Musical scores enhance emotional impact. Costume and production design reflect meticulous attention to detail. Character development adds depth to the narrative. The genre continues to evolve with audience expectations.',
          'B2': 'The spy genre\'s evolution reflects changing global dynamics and technological advancement. Modern films incorporate sophisticated narrative structures and character development. Protagonists navigate complex moral and strategic dilemmas. Location selection considers cultural authenticity and visual impact. Action choreography balances realism with cinematic spectacle. Plot construction maintains narrative coherence and suspense. Musical composition enhances thematic development. Production design integrates historical accuracy with creative vision. Character arcs explore psychological depth and moral complexity. The genre adapts to contemporary audience expectations.',
          'C1': 'The spy genre\'s prominence in contemporary cinema stems from its sophisticated integration of action and narrative complexity. Modern interpretations incorporate nuanced character development and thematic depth. Protagonists navigate intricate moral and strategic landscapes. Location selection considers cultural authenticity and symbolic significance. Action choreography synthesizes practical and digital techniques. Plot construction maintains narrative sophistication and emotional resonance. Musical composition enhances thematic exploration. Production design harmonizes historical accuracy with creative vision. Character development explores psychological complexity and moral ambiguity. The genre reflects contemporary cultural concerns.',
          'C2': 'The spy genre\'s exceptional position in contemporary cinema arises from its sophisticated synthesis of action and narrative complexity. Modern interpretations achieve remarkable integration of character development and thematic exploration. Protagonists navigate intricate moral and strategic landscapes with psychological depth. Location selection considers cultural authenticity and symbolic significance. Action choreography harmonizes practical and digital techniques. Plot construction maintains narrative sophistication and emotional resonance. Musical composition enhances thematic exploration. Production design reconciles historical accuracy with creative vision. Character development explores psychological complexity and moral ambiguity. The genre reflects profound cultural concerns.'
        }
      }
    },
    '과학': {
      '생물학': {
        '유전학': {
          'A1': 'Genes are important. They are in our cells. Genes decide how we look. Parents give genes to children. Some genes are good. Some genes are bad. Scientists study genes. They use special tools. Genes can change sometimes. This is called mutation. Genes help make proteins. Proteins do many things. DNA is like a code. It tells cells what to do. Genes are very small. We need a microscope to see them. Genes can cause diseases. Doctors study genes to help people. Genes are in all living things. Plants have genes. Animals have genes. People have genes. Genes are very interesting.',
          'A2': 'Genetics is the study of genes and heredity. Genes are made of DNA and contain instructions for building proteins. These proteins determine our traits and characteristics. Parents pass their genes to their children through reproduction. Mutations are changes in genes that can affect how organisms develop. Some mutations are harmful, while others can be beneficial. Scientists use special equipment to study genes and DNA. Genetic research helps us understand diseases and develop treatments. Genes control many aspects of our bodies, from eye color to disease susceptibility. Genetic testing can help identify potential health risks. The study of genetics has led to many medical advances. Genes are found in all living organisms. Plants and animals inherit genes from their parents. Genetic variation is important for evolution. Understanding genetics helps improve agriculture and medicine.',
          'B1': 'Modern genetics represents a sophisticated field of biological science that examines the structure and function of genes. The discovery of DNA\'s double helix structure revolutionized our understanding of heredity. Genetic research employs advanced technologies like CRISPR for gene editing. Scientists study how genes interact with environmental factors to influence development. The Human Genome Project mapped all human genes, enabling new medical discoveries. Genetic testing provides insights into disease susceptibility and treatment options. Epigenetics explores how environmental factors can affect gene expression without changing DNA. Genetic engineering has applications in medicine, agriculture, and biotechnology. Researchers investigate how genetic mutations contribute to disease development. The field continues to evolve with new technologies and discoveries. Genetic counseling helps individuals understand their genetic risks. The study of population genetics reveals patterns of human migration and evolution. Genetic research contributes to personalized medicine approaches. The ethical implications of genetic engineering are carefully considered. Advances in genetic technology raise important questions about privacy and discrimination.',
          'B2': 'Contemporary genetics encompasses a complex integration of molecular biology, biochemistry, and computational science. The field\'s evolution reflects profound advances in technology and theoretical understanding. Genetic research employs sophisticated methodologies like next-generation sequencing and bioinformatics. Scientists investigate intricate gene-environment interactions that influence phenotypic expression. The Human Genome Project\'s completion enabled unprecedented insights into human biology and disease. Genetic testing methodologies provide detailed analysis of disease susceptibility and treatment response. Epigenetic mechanisms reveal how environmental factors can modify gene expression patterns. Genetic engineering techniques enable precise manipulation of biological systems. Researchers explore complex genetic networks underlying disease pathogenesis. The field continues to evolve with emerging technologies and theoretical frameworks. Genetic counseling integrates scientific knowledge with psychological support. Population genetics research elucidates patterns of human evolution and diversity. Genetic research contributes to the development of targeted therapeutic approaches. The ethical dimensions of genetic technology require careful consideration. Advances in genetic science raise complex questions about privacy, equity, and societal impact.',
          'C1': 'The field of genetics represents a sophisticated synthesis of molecular biology, computational science, and ethical philosophy. The discipline\'s evolution reflects profound integration of technological innovation and theoretical advancement. Genetic research methodologies incorporate cutting-edge technologies like single-cell sequencing and CRISPR-Cas9 systems. Scientists investigate intricate gene-environment interactions that influence complex phenotypic traits. The completion of the Human Genome Project enabled unprecedented insights into human biology and disease mechanisms. Advanced genetic testing platforms provide comprehensive analysis of disease susceptibility and therapeutic response. Epigenetic research reveals sophisticated mechanisms of gene regulation and environmental adaptation. Genetic engineering techniques enable precise manipulation of biological systems with therapeutic potential. Researchers explore complex genetic networks underlying disease pathogenesis and treatment resistance. The field continues to evolve with emerging technologies and theoretical frameworks. Genetic counseling integrates scientific expertise with psychological support and ethical consideration. Population genetics research elucidates patterns of human evolution and genetic diversity. Genetic research contributes to the development of personalized therapeutic approaches. The ethical dimensions of genetic technology require nuanced consideration of societal implications. Advances in genetic science raise complex questions about privacy, equity, and the future of human evolution.',
          'C2': 'The discipline of genetics embodies a sophisticated synthesis of molecular biology, computational science, and ethical philosophy, reflecting profound integration of technological innovation and theoretical advancement. Contemporary genetic research methodologies incorporate cutting-edge technologies like single-cell sequencing and CRISPR-Cas9 systems, enabling unprecedented precision in genetic analysis. Scientists investigate intricate gene-environment interactions that influence complex phenotypic traits, revealing sophisticated mechanisms of biological regulation. The completion of the Human Genome Project facilitated comprehensive understanding of human biology and disease mechanisms, transforming medical research paradigms. Advanced genetic testing platforms provide detailed analysis of disease susceptibility and therapeutic response, enabling personalized medicine approaches. Epigenetic research elucidates complex mechanisms of gene regulation and environmental adaptation, revealing sophisticated biological control systems. Genetic engineering techniques enable precise manipulation of biological systems with therapeutic potential, revolutionizing medical treatment possibilities. Researchers explore intricate genetic networks underlying disease pathogenesis and treatment resistance, advancing understanding of complex biological processes. The field continues to evolve with emerging technologies and theoretical frameworks, pushing the boundaries of scientific knowledge. Genetic counseling integrates scientific expertise with psychological support and ethical consideration, addressing complex societal implications. Population genetics research reveals patterns of human evolution and genetic diversity, providing insights into human history and biology. Genetic research contributes to the development of personalized therapeutic approaches, transforming medical practice. The ethical dimensions of genetic technology require nuanced consideration of societal implications and future consequences. Advances in genetic science raise profound questions about privacy, equity, and the future trajectory of human evolution, necessitating careful ethical and philosophical reflection.'
        }
      }
    }
  };

  const selectedPassages = passages[mainCategory]?.[subCategory]?.[subSubCategory];
  if (selectedPassages) {
    return selectedPassages;
  }

  return {
    'A1': 'This is a sample text. It has simple words. The sentences are short. The meaning is clear. The topic is interesting. People can understand it easily. The vocabulary is basic. The grammar is simple. The text is not long. It is good for beginners. The words are common. The ideas are simple. The structure is easy. The context is clear. The examples are simple. The explanations are basic. The language is simple. The content is easy. The text is short. It helps beginners learn.',
    'A2': 'This passage contains more complex sentences. The vocabulary is more advanced. The ideas are more developed. The structure is more formal. The content is more detailed. The context is clearer. The examples are more specific. The explanations are more thorough. The language is more natural. The text is more engaging. The words are more varied. The ideas are more complex. The structure is more sophisticated. The context is more detailed. The examples are more relevant. The explanations are more comprehensive. The language is more refined. The content is more substantial. The text is longer. It helps intermediate learners improve.',
    'B1': 'This text demonstrates intermediate language proficiency. The vocabulary includes specialized terms. The sentence structure shows complexity. The ideas are well-developed. The arguments are coherent. The examples are relevant. The explanations are detailed. The style is appropriate. The content is substantial. The text maintains reader interest. The terminology is more technical. The concepts are more abstract. The reasoning is more sophisticated. The evidence is more substantial. The analysis is more thorough. The interpretation is more nuanced. The expression is more refined. The discussion is more comprehensive. The presentation is more polished. The engagement is more sustained.',
    'B2': 'This passage exhibits upper-intermediate language skills. The vocabulary demonstrates sophistication. The sentence structure shows variety. The ideas are thoroughly developed. The arguments are well-supported. The examples are carefully chosen. The explanations are comprehensive. The style is refined. The content is substantial. The text engages the reader effectively. The terminology is highly specialized. The concepts are abstract and complex. The reasoning is sophisticated and logical. The evidence is substantial and relevant. The analysis is thorough and insightful. The interpretation is nuanced and informed. The expression is refined and precise. The discussion is comprehensive and balanced. The presentation is polished and professional. The engagement is sustained and meaningful.',
    'C1': 'This text represents advanced language proficiency. The vocabulary shows precision and nuance. The sentence structure demonstrates mastery. The ideas are sophisticated. The arguments are compelling. The examples are insightful. The explanations are thorough. The style is elegant. The content is substantial. The text maintains reader engagement. The terminology is highly specialized and precise. The concepts are abstract, complex, and interconnected. The reasoning is sophisticated, logical, and nuanced. The evidence is substantial, relevant, and well-integrated. The analysis is thorough, insightful, and original. The interpretation is nuanced, informed, and critical. The expression is refined, precise, and sophisticated. The discussion is comprehensive, balanced, and authoritative. The presentation is polished, professional, and engaging. The engagement is sustained, meaningful, and intellectually stimulating.',
    'C2': 'This passage exemplifies mastery of the language. The vocabulary demonstrates exceptional range. The sentence structure shows artistry. The ideas are profound. The arguments are compelling. The examples are illuminating. The explanations are exhaustive. The style is refined. The content is substantial. The text captivates the reader. The terminology is exceptionally specialized and precise. The concepts are profoundly abstract, complex, and interconnected. The reasoning is exceptionally sophisticated, logical, and nuanced. The evidence is substantial, relevant, well-integrated, and critically evaluated. The analysis is thorough, insightful, original, and groundbreaking. The interpretation is nuanced, informed, critical, and innovative. The expression is refined, precise, sophisticated, and eloquent. The discussion is comprehensive, balanced, authoritative, and transformative. The presentation is polished, professional, engaging, and masterful. The engagement is sustained, meaningful, intellectually stimulating, and profound.'
  };
};

const ReadingModule = ({ topic, level, onComplete }) => {
  const [passage, setPassage] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [wordMeanings, setWordMeanings] = useState({});
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  useEffect(() => {
    const passages = getSamplePassages(topic.main, topic.sub, topic.subSub);
    setPassage(passages[level]);
    setWordMeanings({
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
      'tools': '도구',
      'change': '변화',
      'help': '도움',
      'code': '암호',
      'Manchester': '맨체스터',
      'United': '유나이티드',
      'football': '축구',
      'team': '팀',
      'England': '잉글랜드',
      'red': '빨간',
      'shirts': '셔츠',
      'fans': '팬들',
      'stadium': '경기장',
      'players': '선수들',
      'fast': '빠른',
      'goals': '골',
      'cheer': '응원',
      'loudly': '큰 소리로',
      'game': '경기',
      'exciting': '흥미진진한',
      'fun': '재미있는',
      'watch': '보기',
      'trains': '훈련',
      'coach': '코치',
      'matches': '경기들',
      'TV': '티비',
      'wins': '이김',
      'loses': '짐',
      'work': '일',
      'hard': '열심히',
      'happy': '행복한',
      'sad': '슬픈',
      'popular': '인기 있는',
      'sport': '스포츠',
      'epigenetics': '후성유전학',
      'phenotypic': '표현형의',
      'genetic': '유전적인',
      'heredity': '유전',
      'traits': '특성',
      'characteristics': '특징',
      'reproduction': '생식',
      'beneficial': '유익한',
      'harmful': '해로운',
      'equipment': '장비',
      'research': '연구',
      'treatments': '치료',
      'susceptibility': '감수성',
      'testing': '검사',
      'medical': '의학의',
      'advances': '진보',
      'organisms': '생물체',
      'variation': '변이',
      'agriculture': '농업',
      'medicine': '의학',
      'structure': '구조',
      'function': '기능',
      'discovery': '발견',
      'helix': '나선형',
      'revolutionized': '혁신적인',
      'understanding': '이해',
      'technologies': '기술',
      'CRISPR': '크리스퍼',
      'editing': '편집',
      'environmental': '환경의',
      'factors': '요인',
      'development': '발달',
      'mapped': '매핑된',
      'insights': '통찰력',
      'options': '옵션',
      'expression': '발현',
      'engineering': '공학',
      'applications': '응용',
      'biotechnology': '생명공학',
      'researchers': '연구자들',
      'contribute': '기여하다',
      'pathogenesis': '병인',
      'counseling': '상담',
      'patterns': '패턴',
      'migration': '이주',
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
      'profound': '심오한',
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
      'underlying': '기저의',
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
      'Cas9': 'Cas9',
      'enabling': '가능하게 하는',
      'precision': '정밀도',
      'revealing': '드러내는',
      'regulation': '규제',
      'adaptation': '적응',
      'facilitated': '촉진된',
      'comprehensive': '포괄적인',
      'paradigms': '패러다임',
      'detailed': '상세한',
      'enabling': '가능하게 하는',
      'elucidates': '명확히 하다',
      'control': '통제',
      'revolutionizing': '혁신적인',
      'possibilities': '가능성',
      'advancing': '진보하는',
      'processes': '과정',
      'pushing': '밀어붙이는',
      'boundaries': '경계',
      'addressing': '다루는',
      'providing': '제공하는',
      'history': '역사',
      'transforming': '변형하는',
      'practice': '실천',
      'consequences': '결과',
      'necessitating': '필요로 하는',
      'reflection': '반성',
      'bioinformatics': '생물정보학',
      'epigenetic': '후성유전학의'
    });
  }, [topic, level]);

  const handleWordClick = (word) => {
    setSelectedWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const handleSubmit = () => {
    if (selectedWords.length > 0) {
      onComplete(selectedWords);
      setShowSubmitButton(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Reading Module
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Topic: {topic.main} &gt; {topic.sub} &gt; {topic.subSub}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Level: {level}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, maxHeight: '500px', overflow: 'auto' }}>
        <Typography variant="body1" paragraph sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          {passage.split(' ').map((word, index) => (
            <span
              key={index}
              onClick={() => handleWordClick(word)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedWords.includes(word) ? '#ffeb3b' : 'transparent',
                padding: '2px',
                margin: '1px',
                borderRadius: '3px',
                display: 'inline-block'
              }}
            >
              {word}
            </span>
          ))}
        </Typography>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={selectedWords.length === 0}
        sx={{ display: showSubmitButton ? 'block' : 'none' }}
      >
        Submit Selected Words
      </Button>

      {selectedWords.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Words ({selectedWords.length} words, {((selectedWords.length / passage.split(' ').length) * 100).toFixed(1)}% of total words):
          </Typography>
          <List>
            {selectedWords.map((word, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={`${word} - ${wordMeanings[word.toLowerCase()] || '의미 없음'}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ReadingModule; 