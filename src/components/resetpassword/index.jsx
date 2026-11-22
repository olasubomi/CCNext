import React, { useState } from 'react';
import styles from '../Login/style.module.css';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ResetPasswordSuccess from '../resetPasswordSuccess';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { resetPassword } from '../../actions';

function Resetpassword({ resetPass }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formState, setFormState] = useState({ password1: '', password2: '' });
  const [error, setError] = useState('');
  const { password1, password2 } = formState;
  const { email, token } = router.query;
  const validToken = router.isReady && typeof token === 'string' && token.length > 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError('');
  }

  async function formSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    if (!password1 || !password2) {
      setError('Enter and confirm your new password.');
      return;
    }
    if (password1 !== password2) {
      setError('Passwords do not match.');
      return;
    }
    if (!validToken) {
      setError('Reset link is missing or invalid. Request a new link.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await resetPass(password1, token);
      setOpen(true);
    } catch (err) {
      setError(err?.response?.status === 400
        ? 'Reset link is invalid, expired, or already used. Request a new link.'
        : 'Unable to reset your password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!router.isReady) return null;
  if (!validToken) {
    return <div className={style.container} role="alert">Reset link is missing or invalid. Request a new link.</div>;
  }

  return (
    <div className={style.resetPage}>
      <div className={style.container}>
        <div className={style.ellipse}><FontAwesomeIcon icon={faLock} size="3x" /></div>
        <h3>Reset Password</h3>
        <div className={style.reset_text}>
          <h4>Enter a new password for {typeof email === 'string' ? email : 'your account'}</h4>
        </div>
        <div className={style.inputgroup}>
          <form className={style.formInput} onSubmit={formSubmit} noValidate>
            <div>
              <label className={style.inputlabel} htmlFor="reset-password">New Password</label>
              <div className={style.password_wrapper}>
                <input
                  className={styles.login_form_input}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password1"
                  id="reset-password"
                  value={password1}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button type="button" className={style.password_toggle}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  onClick={() => setPasswordVisible(prev => !prev)}>
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
            <div>
              <label className={style.inputlabel} htmlFor="confirm-password">Confirm Password</label>
              <div className={style.password_wrapper}>
                <input
                  className={styles.login_form_input}
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="password2"
                  id="confirm-password"
                  value={password2}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button type="button" className={style.password_toggle}
                  aria-label={confirmPasswordVisible ? 'Hide password confirmation' : 'Show password confirmation'}
                  onClick={() => setConfirmPasswordVisible(prev => !prev)}>
                  <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
            {error && <p className={style.formError} role="alert">{error}</p>}
            <button type="submit" className={style.button} disabled={submitting}>
              {submitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
      <ResetPasswordSuccess open={open} setOpen={setOpen} next={() => router.push('/login')} />
    </div>
  );
}

export default connect(null, dispatch => ({
  resetPass: (password, token) => dispatch(resetPassword(password, token)),
}))(Resetpassword);
