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

export const FAQAccordion = () => {  // ← Just add "export" here
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={{ 
      margin: 'clamp(20px, 5vw, 60px)',
      fontFamily: 'Geist',
      textAlign: 'left',
      paddingLeft: '7rem',
      paddingRight: '7rem'
    }}>
      
      {faqData.map((faq, index) => (
        <div key={index} style={{ 
          padding: 'clamp(10px, 5vw, 30px)', 
          marginBottom: 'clamp(15px, 4vw, 30px)',
          borderBottom: '1px solid #4A4848'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            gap: '15px',
          }}>
            <h2 style={{ 
              fontSize: 'clamp(13px, 4vw, 16px)', 
              fontWeight: '400',
              margin: '0',
              flex: '1',
              lineHeight: '1.4',
              color: '#4A4848',
            }}>{faq.question}</h2>
            <button onClick={() => toggleAccordion(index)} style={{  
              border: 'none', 
              cursor: 'pointer', 
              padding: '0', 
              marginLeft: '10px',
              fontSize: 'clamp(20px, 5vw, 24px)', 
              width: 'clamp(25px, 6vw, 30px)',   
              height: 'clamp(25px, 6vw, 30px)',   
              flexShrink: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              color:'#4A4848',
            }}>
              {expandedIndex === index ? '-' : '+'}
            </button>
          </div>
          {expandedIndex === index && (
            <div style={{ 
              marginTop: 'clamp(8px, 2vw, 10px)', 
              fontSize: 'clamp(16px, 4vw, 18px)',
            }}>
              <p style={{ 
                marginTop: 'clamp(15px, 4vw, 20px)',
                textAlign: 'left',
                fontFamily: 'Geist',
                fontSize: ' 1rem',
                color: '#4a4848c2',
                margin: '0',
                lineHeight: '1.6',
              }}>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};