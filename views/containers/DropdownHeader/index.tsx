import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import LiveConfirmation from '../LiveConfirmation';
import { create_UUID } from '../../../util/uuid';

interface DropDownHeaderInterface {
  userId: string
}
const DropDownHeader: React.FC<DropDownHeaderInterface> = ({ userId }) => {
  const [isOverlayVisible, showOverlay] = useState(false)
  const [isLiveConfirmationVisible, showLiveConfirmation] = useState(false)
  const dropDownItem = (
    <Menu>
      <Menu.Item onClick={() => showLiveConfirmation(true)}>Live Streaming</Menu.Item>
      <Menu.Item>Upload Video</Menu.Item>
    </Menu>
  )

  return (
    userId ?
      <React.Fragment>
        <Dropdown
          overlay={dropDownItem}
          placement="bottomCenter"
          onVisibleChange={(visible) => showOverlay(visible)}
          visible={isOverlayVisible}
        >
          <VideoCameraAddOutlined style={{ margin: 'auto' }} />
        </Dropdown>

        <LiveConfirmation
          userId={userId}
          liveId={create_UUID()}
          isVisible={isLiveConfirmationVisible}
          liveNow={() => { showLiveConfirmation(false) }}
          onCancel={() => showLiveConfirmation(false)}
        />
      </React.Fragment>
      : null
  );
};

export default DropDownHeader;