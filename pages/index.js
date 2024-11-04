import React, { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/start-cue', {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('큐 감지 시작 실패');
      }
    } catch (error) {
      console.error('에러:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Container>
      <Button 
        onClick={handleStart}
        disabled={isRunning}
      >
        {isRunning ? '실행 중...' : '큐 감지 시작'}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;
