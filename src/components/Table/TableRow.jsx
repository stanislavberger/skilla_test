import React, { useState } from 'react';
import incoming from '../../assets/icons/incoming.svg'
import outgoing from '../../assets/icons/outgoing.svg'
import Player from '../Player/Player';
import Rate from '../Rating/Rate';

const TableRow = ({ row }) => {

  const [isHovered, setIsHovered] = useState(false);

  //Тип звонка
  const icon = row.in_out === 1 ? incoming : outgoing;

  //Время звонка
  const timeString = row.date.split(" ")[1];
  const [hours, minutes] = timeString.split(":");

  //Длительность звонка
  const totalSeconds = row.time;
  const call_minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${call_minutes}:${seconds.toString().padStart(2, '0')}`;

    // Наведение мыши на Row
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

  return (
    <tr className='tableRow' onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} >
      <td className='typeCol'><img src={icon} alt={row.in_out === 1 ? 'Incoming Call' : 'Outgoing Call'} width="24" height="24" /></td>
      <td>{`${hours}:${minutes}`}</td>
      <td>
        <img src={row.person_avatar} alt="Avatar" />
      </td>
      <td className='alignLeft'>{row.partner_data.phone}<br />{row.partner_data.name}</td>
      <td>{row.source}</td>
      <td className='rating-col'>
        <Rate />
      </td>
      <td className='durationCol'>
        {isHovered ? <Player recordTime={formattedTime} /> : formattedTime}
      </td>
    </tr>
  );
};

export default TableRow;