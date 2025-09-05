// features/auth/AuthView.tsx
import React, { useState } from 'react';
import { useAuthStore } from './useAuthStore';

const AuthView: React.FC = () => {
  const { isAuthenticated, user, isLoading, login, logout } = useAuthStore();
  const [username, setUsername] = useState('dev');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
  };

  if (isAuthenticated) {
    return (
      <div className="auth-view">
        <div className="auth-status">
          Logged in as <strong>{user?.username}</strong>
        </div>
        <button className="button" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="auth-view">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthView;
