import { Star } from 'lucide-react';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { RankingDetailsT } from '../types/RankingDetailsT';

const RankingDetails: React.FC<{ ranks: RankingDetailsT[] }> = ({ ranks }) => {
  return (
    <Accordion defaultActiveKey="0">
      {ranks.map((rank: RankingDetailsT, i: number) => (
        <Accordion.Item key={i} eventKey={i.toString()}>
          <Accordion.Header>
            <span>
              <Star color={rank.color} size={24} /> 
            </span>
            <span style={{marginLeft: 10}}>
              {rank.name}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <ul style={{textAlign: 'left'}}>
              <li>
                <b>Graphics:</b> {rank.graphics}
              </li>
              <li>
                <b>Gameplay:</b> {rank.gameplay}
              </li>
              <li>
                <b>Load:</b> {rank.load}
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default RankingDetails;