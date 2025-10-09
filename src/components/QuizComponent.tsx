import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface QuizComponentProps {
  content: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ content }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Parse quiz content - handle quiz_start and quiz_end markers
  const lines = content.split("\n").filter((line) => line.trim());

  // Extract content between quiz_start and quiz_end
  const startIndex = lines.findIndex((line) => line.trim() === "\\quiz_start");
  const endIndex = lines.findIndex((line) => line.trim() === "\\quiz_end");

  let quizLines = lines;
  if (startIndex !== -1 && endIndex !== -1) {
    quizLines = lines.slice(startIndex + 1, endIndex);
  }

  const questionLine = quizLines.find((line) => line.startsWith("\\question "));
  const optionLines = quizLines.filter((line) => line.startsWith("\\option_"));
  const explanationLine = quizLines.find((line) =>
    line.startsWith("\\explanation ")
  );

  const question = questionLine?.replace("\\question ", "") || "";
  const explanation = explanationLine?.replace("\\explanation ", "") || "";

  const options = optionLines.map((line) => {
    const isCorrect = line.startsWith("\\option_correct ");
    const text = line.replace(/\\option_(correct|wrong) /, "");
    return { text, isCorrect };
  });

  const handleOptionClick = (optionText: string) => {
    setSelectedOption(optionText);
    setShowExplanation(true);
  };

  const getOptionStyle = () => {
    return "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600";
  };

  const getOptionIcon = (optionText: string, isCorrect: boolean) => {
    if (!selectedOption) {
      return "";
    }

    // If this option is the one that was selected
    if (selectedOption === optionText) {
      return isCorrect ? " ✅" : " ❌";
    }

    // If a wrong option was selected, show checkmark for the correct option
    const selectedOptionData = options.find(
      (opt) => opt.text === selectedOption
    );
    const wasWrongOptionSelected =
      selectedOptionData && !selectedOptionData.isCorrect;

    if (wasWrongOptionSelected && isCorrect) {
      return " ✅";
    }

    return "";
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-600">
      <h6 className="text-lg text-left font-semibold mb-4 text-yellow-400">
        Short Quiz
      </h6>
      <p className="text-gray-200 text-left mb-4 leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
      </p>

      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.text)}
            className={`w-full p-3 rounded-full text-left transition-all duration-200 border-2 ${getOptionStyle()} cursor-pointer`}
          >
            <span className="font-medium text-orange-500">
              {String.fromCharCode(65 + index)}.
            </span>{" "}
            <span className="text-gray-500">
              {option.text}
              {getOptionIcon(option.text, option.isCorrect)}
            </span>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-8 mb-2 p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
          <h6 className="text-blue-300 text-left font-bold mb-2">
            Explanation:
          </h6>
          <div className="font-inter text-blue-100 text-left [&>p]:mb-2 [&>strong]:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {explanation}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
