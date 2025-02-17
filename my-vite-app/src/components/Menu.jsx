import React, { useState } from 'react';
import { BookOpen, Upload } from 'lucide-react';

function Menu({ onStartQuiz }) {
  const [subject, setSubject] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [showImport, setShowImport] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showImport) {
      try {
        const parsedData = JSON.parse(importData);
        if (!Array.isArray(parsedData.questions)) {
          throw new Error('Invalid quiz format');
        }
        onStartQuiz('Custom Quiz', parsedData.questions.length, parsedData);
      } catch (error) {
        setImportError('Invalid JSON format. Please check your input.');
      }
    } else if (subject.trim()) {
      onStartQuiz(subject, questionCount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to the AI QUIZ MAKER!</h1>
          <p className="text-gray-600 mt-2">Test your knowledge and challenge yourself</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowImport(false)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              !showImport
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Create Quiz
          </button>
          <button
            onClick={() => setShowImport(true)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              showImport
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Import Quiz
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {showImport ? (
            <div>
              <label htmlFor="importData" className="block text-sm font-medium text-gray-700 mb-1">
                Paste Quiz JSON
              </label>
              <textarea
                id="importData"
                value={importData}
                onChange={(e) => {
                  setImportData(e.target.value);
                  setImportError('');
                }}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200 h-48"
                placeholder='{"questions": [...]}'
                required
              />
              {importError && (
                <p className="mt-2 text-sm text-red-600">{importError}</p>
              )}
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-200"
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>

              <div>
                <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions: {questionCount}
                </label>
                <input
                  type="range"
                  id="questionCount"
                  min="1"
                  max="50"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {showImport ? (
              <>
                <Upload className="w-5 h-5" />
                Import and Start Quiz
              </>
            ) : (
              'Start Quiz'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Menu;
