import { useState } from "react";

const App = () => {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinish, setFinish] = useState(false);

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex === questions.length - 1) {
      return setFinish(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(() => {
        return questions.map(({ questionText, answerOptions }) => {
          return {
            questionText,
            answerOptions: answerOptions.find(({ isCorrect }) => isCorrect),
          };
        });
      });
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      {isFinish ? (
        <div className="container">
          <h1>Game Over!</h1>
          <p>
            Your final score is {score} out of {questions.length}.
          </p>
          <button
            className="btn"
            onClick={() => {
              setFinish(false);
              console.log(selectedAnswer);
              setCurrentQuestionIndex(0);
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <div className="container">
          <h1 className="headline-1">Quize App</h1>
          <div className="box">
            <div className="que">
              <h3 className="">
                <span>{currentQuestionIndex + 1}. &nbsp; </span>
                {questions[currentQuestionIndex].questionText}
              </h3>
              {questions[currentQuestionIndex].answerOptions.map(
                ({ answerText }, index) => {
                  return (
                    <p
                      onClick={() => {
                        setSelectedAnswerIndex(index);
                      }}
                      key={index}
                      style={{
                        backgroundColor:
                          selectedAnswerIndex === index && "green",
                      }}
                    >
                      {answerText}
                    </p>
                  );
                }
              )}
            </div>
            <div className="footer">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={handlePreviousQuestion}
                className="btn prev"
              >
                Prev
              </button>
              <button
                onClick={handleNextQuestion}
                className="btn next"
                style={{
                  backgroundColor:
                    currentQuestionIndex === questions.length - 1 && "green",
                }}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
