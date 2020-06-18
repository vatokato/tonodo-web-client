import React, { useState } from 'react';

function RegForm ({ onSubmit, error }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(login, password, password2);
      }}
    >
      <div className="input-container">
        <input
          type="text"
          name='username'
          placeholder='username'
          value={login}
          onChange={e=>setLogin(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          name='password'
          placeholder='password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          name='password2'
          placeholder='repeat password'
          value={password2}
          onChange={e=>setPassword2(e.target.value)}
        />
      </div>
      {error && (
        <div className="form-error">{error}</div>
      )}
      <div className="input-container"><input type="submit"/></div>
    </form>
  );
}

export default RegForm;
