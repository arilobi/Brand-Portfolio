import { useState } from 'react';

const faqData = [
  {
    question: 'Can you do Mobile Development?',
    answer: 'While I don’t offer mobile development right now, it’s something I’m learning. I’ll be ready for those projects soon as I continue to build my skills.'
  },
  {
    question: 'What\'s your pricing model?',
    answer: 'I work on a project basis. Each quote is customized based on your specific needs and requirements.'
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Yes, I specialize in modern redesigns that maintain your brand identity while improving user experience.'
  },
  {
    question: 'Do I need to provide hosting or domain?',
    answer: 'I can help you set up hosting, or you can use your existing provider. I\'ll guide you through the best options.'
  },
  {
    question: 'Can you work with my existing development team?',
    answer: 'Yes, I\'m comfortable collaborating with existing teams and following your current workflow.'
  }
];

export const FAQAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question-container">
            <h2 className="faq-question">{faq.question}</h2>
            <button 
              onClick={() => toggleAccordion(index)} 
              className="faq-toggle"
            >
              {expandedIndex === index ? '−' : '+'}
            </button>
          </div>
          {expandedIndex === index && (
            <div className="faq-answer-container">
              <p className="faq-answer">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};