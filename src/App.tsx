import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type Vik = {
  title: string;
  id: number;
};

const viktorins: Vik[] = [
  {
    title: "Вікторина JS",
    id: 1,
  },
];

const App: FC = () => {
  return (
    <div>
      {viktorins.map((item) => (
        <div key={item.id}>
          <h2>
            <Link to="/viktorina">{item.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default App;
