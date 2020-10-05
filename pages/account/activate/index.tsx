import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../../views/styles/pages/login.less';
import { Button, Avatar, message, Result } from 'antd';
import userService from '../../../domain/user/service';


const ActivationAccount = () => {
  const router = useRouter();
  const { key } = router.query;
  const { auth: { activateAccount, startStreaming } } = userService()
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)


  const goToStream = async () => {
    try {
      setLoading(true)
      const result = await startStreaming()
      if (result) {
        router.push("/stream");
      } else {
        message.error("Terjadi kesalahan pada server, mohon coba kembali");
      }

    } catch (e) {
      message.error("Terjadi kesalahan pada server, mohon coba kembali");
    } finally {
      setLoading(false)
    }
  }

  const checkActivationKey = async () => {
    try {
      await activateAccount(key as string);
    } catch (e) {
      setError(true);
      message.error("Terjadi kesalahan pada server, mohon coba kembali");
    }
  }

  useEffect(() => {
    checkActivationKey()
  }, [])

  const errorState = (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => router.replace('/')}>Kembali ke beranda</Button>}
    />
  )

  const successState = (
    <React.Fragment>
      <Avatar size={40} src="../image/BNTHLL-LOGO.png" />
      <h3>Akun anda berhasil di aktfkan</h3>

      <Button
        style={{ margin: 5, width: '100%' }}
        type="primary"
        onClick={goToStream}
        loading={isLoading}
      >
        Mulai menonton!!
      </Button>
    </React.Fragment>
  )
  return (
    <div className="login-form">
      <div className="login-form__content txt-lignt--center">
        {
          isError ? errorState : successState
        }
      </div>
    </div>
  );
};

export default ActivationAccount;