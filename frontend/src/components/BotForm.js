import React, { useState } from 'react';
import styled from 'styled-components';

const BotForm = ({ setIsBotRunning, isBotRunning }) => {
  const [maxBid, setMaxBid] = useState(0);
  const [minDifference, setMinDifference] = useState(0);
  const [collectionSlug, setCollectionSlug] = useState('');

  const startBot = async (maxBidWei, minDifferenceWei, collectionSlug) => {
    try {
      const apiUrl = `http://localhost:3000/combined-data?maxBid=${maxBidWei}&minDifference=${minDifferenceWei}&collectionSlug=${collectionSlug}`;
      const response = await fetch(apiUrl);
      const data = await response.text();
      console.log(data);
      setIsBotRunning(true);
    } catch (error) {
      console.error('Error starting bot', error);
      setIsBotRunning(false);
    }
  };
  

  const handleStartBot = () => {
    const maxBidWei = parseFloat(maxBid) * 1e18;
    const minDifferenceWei = parseFloat(minDifference) * 1e18;

    startBot(maxBidWei, minDifferenceWei, collectionSlug);
  };

  const stopBot = async () => {
    try {
      const stopBotUrl = 'http://localhost:3000/stop-bot';
      const response = await fetch(stopBotUrl);
      const result = await response.text();
      console.log(result);
      setIsBotRunning(false);
    } catch (error) {
      console.error('Error stopping bot', error);
    }
  };

  return (
    <FormContainer>
      <InputLabel>
        Max bid in eth:
        <InputField type="text" value={maxBid} onChange={(e) => setMaxBid(e.target.value)} />
      </InputLabel>
      <InputLabel>
        Min difference to floor in eth:
        <InputField
          type="text"
          value={minDifference}
          onChange={(e) => setMinDifference(e.target.value)}
        />
      </InputLabel>
      <InputLabel>
        Collection slug:
        <InputField
          type="text"
          value={collectionSlug}
          onChange={(e) => setCollectionSlug(e.target.value)}
        />
      </InputLabel>
      <StatusContainer>
            {isBotRunning ? (
              <div>
                <RunningStatus>Bot is running</RunningStatus>
                <Button onClick={stopBot}>Stop bot</Button>
              </div>
            ) : (
              <div>
                <Button onClick={handleStartBot}>Start bot</Button>
                <StoppedStatus>Bot is waiting for you to press "Start bot"</StoppedStatus>
              </div>
            )}
        </StatusContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const InputField = styled.input`
  margin-top: 5px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4fa3d1;
  }
`;

const StatusContainer = styled.div`
    margin-top: 20px;
`;

const RunningStatus = styled.p`
    color: green;
`;

const StoppedStatus = styled.p`
    color: red;
`;

export default BotForm;
