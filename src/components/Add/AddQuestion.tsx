import React, { useState } from 'react';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type AddQuestionProps = {
  onAddQuestion: (newQuestion: Question) => void;
};

const AddQuestion: React.FC<AddQuestionProps> = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleChangeOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    onAddQuestion({ question, options, correctAnswer });
  };

  return (
    <div>
      <h2>Add Question</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleChangeOption(index, e.target.value)}
          />
        </div>
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Question</button>
    </div>
  );
};

export default AddQuestion;
