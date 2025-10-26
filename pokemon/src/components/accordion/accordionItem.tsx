import React, { useState } from "react";

type AccordionItemProps = {
  title: string;
  content: React.ReactNode;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <div className="accordion-item">
      <h2
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        {title}
      </h2>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default AccordionItem;