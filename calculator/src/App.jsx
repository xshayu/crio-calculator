import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        if (input === '') {
          setResult('Error');
          return;
        }
        
        let evalResult = Function('return ' + input)();
        
        if (isNaN(evalResult)) {
          setResult('NaN');
        } else if (!isFinite(evalResult)) {
          setResult('Infinity');
        } else {
          setResult(evalResult.toString());
        }
      } catch (error) {
        setResult('Error');
      }
    } else {
      const isOperator = ['+', '-', '*', '/'].includes(value);
      
      const lastChar = input.slice(-1);
      const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);

      if (!isOperator || (!isLastCharOperator && input !== '')) {
        setInput(prev => prev + value);
      }
    }
  };

  const buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    'C', '0', '=', '/'
  ];

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>React Calculator</h1>
      
      <input
        type="text"
        value={input}
        readOnly
        style={styles.input}
      />

      <div style={styles.result}>
        {result}
      </div>
      
      <span style={styles.buttonGrid}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn)}
            style={styles.button}
          >
            {btn}
          </button>
        ))}
      </span>
      
    </main>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    maxWidth: '300px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'right',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    width: '100%',
  },
  button: {
    padding: '16px',
    fontSize: '18px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  result: {
    margin: '8px 0',
    fontSize: '18px',
  },
};

export default Calculator;