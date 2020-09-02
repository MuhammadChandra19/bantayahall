import React, { useState } from 'react';
import '../../styles/components/copyClipBoard.less'
import { CopyOutlined } from '@ant-design/icons';
import copyToClipBoard from '../../../util/copyToClipBoard';

interface CopyClipBoardInterface {
  value: any
}

const CopyClipBoard: React.FC<CopyClipBoardInterface> = ({ value }) => {
  const [iconIsVisible, setIconVisibility] = useState(false)
  return (
    <div
      className="copy-clip-board"
      onMouseEnter={() => setIconVisibility(true)}
      onMouseLeave={() => setIconVisibility(false)}
      onClick={() => copyToClipBoard(value)}
    >
      {value}
      <CopyOutlined style={{ visibility: !iconIsVisible ? 'hidden' : 'visible' }} />
    </div>
  );
};

export default CopyClipBoard;