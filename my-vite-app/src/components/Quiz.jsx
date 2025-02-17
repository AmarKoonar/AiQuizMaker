import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Award, RotateCcw, Home } from 'lucide-react';
import { Check, Copy } from 'lucide-react';

function Quiz({quizData, onReturnToMenu }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleAnswerSelect = (answer) => {
    if (answered) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === quizData.questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };
  const handleCopyQuestions = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(quizData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy questions:', err);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <Award className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              You scored {score} out of {quizData.questions.length}
            </p>
            <div className="text-indigo-600 font-medium mb-8">
              {((score / quizData.questions.length) * 100).toFixed(0)}% Correct
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={onReturnToMenu}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
            </div>
            <button
                onClick={handleCopyQuestions}
                className="w-full mt-5 bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Quiz Questions
                  </>
                )}
              </button>
            
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onReturnToMenu}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <span className="text-sm font-medium text-indigo-600">
            Score: {score}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestionData.question}
        </h2>

        <div className="space-y-3">
          {currentQuestionData.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                answered
                  ? answer === currentQuestionData.correct_answer
                    ? 'bg-green-100 border-2 border-green-500'  // <-- This line
                    : selectedAnswer === answer
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-50 border-2 border-gray-200'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
            } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
            
              disabled={answered}
            >
              <div className="flex items-center justify-between">
                <span>{answer}</span>
                {answered && answer === selectedAnswer && (
                  answer === currentQuestionData.correct_answer ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <button
            onClick={handleNextQuestion}
            className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {currentQuestion === quizData.questions.length - 1 ? 'Show Results' : 'Next Question'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;