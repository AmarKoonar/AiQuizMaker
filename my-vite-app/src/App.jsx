import React, { useState } from 'react';
import Menu from './components/Menu';
import Quiz from './components/Quiz';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [subject, setSubject] = useState('');
  const [questionnum, setNumofQuestions] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = (selectedSubject, numofquestions, importedQuizData = null) => {
    if (isLoading) return;
    setIsLoading(true);

    setSubject(selectedSubject);
    setNumofQuestions(numofquestions);

    if (importedQuizData) {
      setQuizData(importedQuizData);
      setShowQuiz(true);
      setIsLoading(false);
      return;
    }

    fetch(`${process.env.VITE_REACT_APP_BACKEND_URL}/get_question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject: selectedSubject, num: numofquestions })
    })
    .then(response => response.json())
    .then(data => {
      setQuizData(data);
      setShowQuiz(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleReturnToMenu = () => {
    setShowQuiz(false);
    setSubject('');
  };

  return showQuiz ? (
    <Quiz quizData={quizData} onReturnToMenu={handleReturnToMenu} />
  ) : (
    <Menu onStartQuiz={handleStartQuiz} />
  );
}

export default App;
