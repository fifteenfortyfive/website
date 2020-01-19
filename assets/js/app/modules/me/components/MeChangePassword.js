import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import * as MeActions from '../MeActions';

import Button from '../../../uikit/Button';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';
import PasswordInput from '../../../uikit/PasswordInput';

const ChangePassword = props => {
  const dispatch = useDispatch();
  const { onFinish } = props;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit = newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword;

  useEffect(() => {
    setLoading(true);
    dispatch(MeActions.fetchMe()).then(setLoading(false));
  }, []);

  const handleUpdatePassword = useCallback(() => {
    setSubmitting(true);
    dispatch(MeActions.updatePassword(currentPassword, newPassword))
      .then(() => {
        setSubmitting(false);
        onFinish != null && onFinish();
      })
      .catch(() => {
        setSubmitting(false);
        setError('Failed to update password. Check that your current password is correct.');
      });
  }, [currentPassword, newPassword, onFinish]);

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      <Header size={Header.Sizes.H3}>Change Password</Header>

      <div>
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onInput={({ target }) => setCurrentPassword(target.value)}
        />
        <PasswordInput
          label="New Password"
          value={newPassword}
          onInput={({ target }) => setNewPassword(target.value)}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onInput={({ target }) => setConfirmPassword(target.value)}
        />
        {error != null ? <Text>{error}</Text> : null}
      </div>

      <div class="field is-grouped">
        <span class="control">
          <Button
            color={Button.Colors.PRIMARY}
            disabled={!canSubmit || submitting}
            onClick={handleUpdatePassword}>
            {submitting ? 'Submitting...' : 'Update Password'}
          </Button>
        </span>
        <span class="control">
          <Button disabled={submitting} onClick={onFinish}>
            Cancel
          </Button>
        </span>
      </div>
    </div>
  );
};

export default ChangePassword;
