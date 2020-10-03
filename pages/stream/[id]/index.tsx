import React, { useState, useEffect } from 'react';
import Layout from '../../../views/Layout/MainLayout';
// import StreamPlayback from '../../../views/containers/StreamPlayback';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { Modal, Input, Button, message } from 'antd';
import ticketService from '../../../domain/tickets/service';

const Stream = () => {
  const router = useRouter()
  const { id, isLive } = router.query
  const [showTicketConfirmation, setShowTicketConfirmation] = useState(false);
  const [isSubmittingTicketId, setSubmittingTicketId] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const StreamPlaybackWithNoSSR = dynamic(() => import('../../../views/containers/StreamPlayback'), {
    ssr: false
  })

  const { getUserTicket } = ticketService();
  const submitTicket = async () => {
    try {
      setSubmittingTicketId(true);
      const isTicketIdValid = await getUserTicket(ticketId, id as string);
      if (isTicketIdValid) {
        setShowTicketConfirmation(false);
        localStorage.setItem(`${id}_bantayahall`, ticketId)
      } else {
        message.error(`There is no ticket with id ${ticketId}`)
      }
    } catch (e) {
      message.error('Something is wrong with server')
    } finally {
      setSubmittingTicketId(false);
    }
  }

  useEffect(() => {
    const idTicket = localStorage.getItem(`${id}_bantayahall`);
    if (!idTicket) {
      setShowTicketConfirmation(true);
    }
  }, [])


  return (
    <Layout
      useDrawer
      subPath="../"
      pageTitle="Live streaming"
      description="A band live streaming"
    >
      <StreamPlaybackWithNoSSR
        isLive={isLive === "true"}
        mediaId={id}
        readyToPlay={!showTicketConfirmation}
      />
      <Modal
        closable={false}
        visible={showTicketConfirmation}
        title="Please input your ticket id"
        maskClosable={false}
        onOk={submitTicket}
        confirmLoading={isSubmittingTicketId}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ disabled: ticketId.replace(/\s*/g, "").length < 5 }}
      >
        <Input
          style={{ margin: 5, width: '100%' }}
          onChange={(e) => setTicketId(e.target.value.replace(/\s*/g, ""))}
        />

      </Modal>
    </Layout>
  );
};

export default Stream;