import React, { useState } from 'react';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type EditQuestionProps = {
  question: Question;
  onEditQuestion: (editedQuestion: Question) => void;
};

const EditQuestion: React.FC<EditQuestionProps> = ({ question, onEditQuestion }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleChangeOption = (index: number, value: string) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const handleSubmit = () => {
    onEditQuestion(editedQuestion);
  };

  return (
    <div>
      <h2>Edit Question</h2>
      <input
        type="text"
        placeholder="Question"
        value={editedQuestion.question}
        onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
      />
      {editedQuestion.options.map((option, index) => (
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
        value={editedQuestion.correctAnswer}
        onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
      />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditQuestion;
