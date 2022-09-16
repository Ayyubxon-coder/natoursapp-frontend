import { FC, useRef, useState, useEffect, FormEvent } from 'react';
import FormInput from '../input/EmailInput';
import useHttp from '../../hooks/use-http';
import { ErrorNotif } from '../../components/notification/Notification';
import { RefValueType } from '../../types/types';
export const AccountPassword: FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const passwordConfRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { response, sendRequest: sendRequestToResetPass } = useHttp();

  // function for request to backend
  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();

    const passwordCurrent: RefValueType = currentPasswordRef.current?.value;
    const password: RefValueType = newPasswordRef.current?.value;
    const passwordConfirm: RefValueType = passwordConfRef.current?.value;

    if (passwordCurrent && password && passwordConfirm)
      await sendRequestToResetPass({
        url: `/api/v1/users/updateMyPassword`,
        method: 'PATCH',
        data: { passwordCurrent, password, passwordConfirm },
        headers: { Authorization: `Bearer ${token}` },
      });
    formRef.current?.reset();
  };
  const clearMsg = (): void => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  useEffect(() => {
    if (response?.status === 'success') {
      setMessage(`You successfully changed your password!`);
      clearMsg();
    } else if (response === false) {
      setMessage(`Password or password confirm is not valid!`);
      clearMsg();
    }
  }, [response]);

  return (
    <>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>Password change</h2>
        {response === false && <ErrorNotif text={message} type='error' />}
        {response?.status === 'success' && (
          <ErrorNotif text={message} type='success' />
        )}

        <form
          onSubmit={handleChangePassword}
          className='form form-user-password'
          ref={formRef}
        >
          <FormInput
            label='Current password'
            inputType='password'
            formClass='form--signup ma-bt-md'
            ref={currentPasswordRef}
            placeholder='••••••••'
            required
          />
          <FormInput
            label='New password'
            inputType='password'
            formClass='form--signup ma-bt-md'
            ref={newPasswordRef}
            required
            placeholder='••••••••'
          />
          <FormInput
            label='Confirm password'
            inputType='password'
            formClass='form--signup ma-bt-md'
            ref={passwordConfRef}
            required
            placeholder='••••••••'
          />
          <button
            type='submit'
            className='btn btn--small btn--green btn--save-password'
          >
            Save password
          </button>
        </form>
      </div>
    </>
  );
};
