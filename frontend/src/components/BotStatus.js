import React from 'react';
import styled from 'styled-components';

const BotStatus = ({ isBotRunning }) => {
    return (
        <StatusContainer>
            {isBotRunning ? (
                <RunningStatus>Bot is running</RunningStatus>
            ) : (
                <StoppedStatus>Bot is waiting for you to press "Start bot"</StoppedStatus>
            )}
        </StatusContainer>
    );
};

const StatusContainer = styled.div`
    margin-top: 20px;
`;

const RunningStatus = styled.p`
    color: green;
`;

const StoppedStatus = styled.p`
    color: red;
`;

export default BotStatus;