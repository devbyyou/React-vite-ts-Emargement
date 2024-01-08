import React from 'react';
import BanniereMessage from './BanniereMessage';
import ListPresents from './LIstPresents';
import Calendrier from './Calendrier';
import './index.scss';

function Presents() {
  return (
    <div className="content__page-presents">
      <BanniereMessage />
      <ListPresents />
      <Calendrier />
    </div>
  );
}

export default Presents;
