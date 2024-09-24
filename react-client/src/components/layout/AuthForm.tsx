// components/layout/AuthForm.tsx
import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { login } from '../../services/api/auth';
import { useUserContext } from '../../context/UserContext';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setAdmin } = useUserContext();

  const handleLogin = async () => {
    setErrorMessage(null);
    try {
      const response = await login(email, password);
      if (response.success) {
        setAdmin(response.isAdmin); // Assuming the API returns the isAdmin flag
        alert('Login successful!');
      } else {
        setErrorMessage(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please check your API or internet connection.');
    }
  };

  return (
    <div className="space-y-4 ">
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <Button text="Login" onClick={handleLogin} />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default AuthForm;
