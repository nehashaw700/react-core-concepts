import { useEffect, useState } from "react";
import AccordionItems from "./AccordionItems";

const Accordion = () => {
  const data = [
    {
      id: "frontend",
      title: "Frontend",
      description: "Frontend interview topics.",
      items: [
        {
          id: 1,
          question: "What is React?",
          answer: "A JavaScript library for building user interfaces.",
        },
        {
          id: 2,
          question: "Difference between useMemo and useCallback?",
          answer:
            "useMemo memoizes values, whereas useCallback memoizes functions.",
        },
        {
          id: 3,
          question: "What is reconciliation?",
          answer:
            "React's process of comparing Virtual DOM trees to update the real DOM efficiently.",
        },
      ],
    },
    {
      id: "javascript",
      title: "JavaScript",
      description: "Core JavaScript concepts.",
      items: [
        {
          id: 4,
          question: "What is a closure?",
          answer:
            "A closure gives a function access to variables from its outer scope.",
        },
        {
          id: 5,
          question: "Explain event loop.",
          answer:
            "The event loop executes synchronous code, then microtasks, then macrotasks.",
        },
      ],
    },
    {
      id: "performance",
      title: "Performance",
      description: "Optimization techniques.",
      items: [
        {
          id: 6,
          question: "What is lazy loading?",
          answer: "Loading components only when they are needed.",
        },
        {
          id: 7,
          question: "How does code splitting help?",
          answer:
            "It reduces the initial bundle size by loading code on demand.",
        },
      ],
    },
  ];

  const accordionData = data[0].items;
  const [showIndex, setShowIndex] = useState(null);

  return (
    <div
      style={{
        background: "lightgreen",
        border: "2px grey",
        borderRadius: "30px round",
      }}
    >
      {accordionData.map((item, index) => (
        <div key={item.id}>
          {item.question + " "}
          <button
            onClick={() => {
              // if already clicked from b4
              setShowIndex(showIndex === index ? null : index);
            }}
          >
            {showIndex === index ? "-" : "+"}
          </button>
          {
            <AccordionItems
              data={item.answer}
              shouldShow={index === showIndex}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default Accordion;
