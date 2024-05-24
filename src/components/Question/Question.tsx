import React, { useState, FC, useEffect } from 'react';
import AddQuestion from '../Add/AddQuestion';
import EditQuestion from '../Edit/EditQuestion';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const initialQuestions: Question[] = [
  {
    question: "Мова JavaScript є підвидом мови Java – вірно?",
    options: ["Так", "Ні", "Навпаки", "Не знаю"],
    correctAnswer: "Ні"
  },
  {
    question: "Чому дорівнює [] + []?",
    options: ["[object Object]", "2[object Object]", "111", "''"],
    correctAnswer: "''"
  },
  {
    question: "Який метод додає один або кілька елементів до кінця масиву?",
    options: ["push", "shift", "unshift", "pop"],
    correctAnswer: "push"
  },
  {
    question: "Яким буде результат виконання наступного коду - console.log(0.1 + 0.2)?",
    options: ["0.30000000000000004", "0.3", "0.33", "0.333"],
    correctAnswer: "0.30000000000000004"
  },
  {
    question: "Яким буде результат виконання наступного коду - Яким буде результат виконання наступного коду?",
    options: ["null", "undefined", "true", "false"],
    correctAnswer: "true"
  }
];


const Quiz: FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);


  useEffect(() => {
    const storedQuestions = localStorage.getItem('quizQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
  }, [questions]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setUserAnswers([...userAnswers, selectedAnswer]);
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setIsAdding(false);
  };

  const handleEditQuestion = (editedQuestion: Question) => {
    if (isEditing !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[isEditing] = editedQuestion;
      setQuestions(updatedQuestions);
      setIsEditing(null);
    }
  };

  return (
    <div>
      {showResults ? (
        <div>
          <h2>Your Score: {score} out of {questions.length}</h2>
          <button onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setUserAnswers([]);
            setSelectedAnswer(null);
            setShowResults(false);
          }}>Restart Quiz</button>
        </div>
      ) : isAdding ? (
        <AddQuestion onAddQuestion={handleAddQuestion} />
      ) : isEditing !== null ? (
        <EditQuestion
          question={questions[isEditing]}
          onEditQuestion={handleEditQuestion}
        />
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerChange}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>Next</button>
          <button onClick={() => setIsAdding(true)}>Add Question</button>
          <button onClick={() => setIsEditing(currentQuestionIndex)}>Edit Question</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;