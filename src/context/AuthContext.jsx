import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const initialUsers = [
  { email: 'fevziye.mamak35@gmail.com', password: '1234', name: 'Fevziye Mamak' }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('systemUsers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure every user has a password for the switch prompt
        return parsed.map(u => ({ ...u, password: u.password || '1234' }));
      } catch (e) {
        return initialUsers;
      }
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current_user_email');
    const user = users.find(u => u.email === saved);
    return user || users[0];
  });

  const [promptUser, setPromptUser] = useState(null); // User waiting for password verification

  useEffect(() => {
    localStorage.setItem('systemUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('current_user_email', currentUser.email);
  }, [currentUser]);

  const addUser = (email, password, name) => {
    if (users.find(u => u.email === email)) return false;
    const newUser = { email, password, name, role: 'Standart Kullanıcı' };
    setUsers([...users, newUser]);
    return true;
  };

  const updateUsers = (newList) => {
    setUsers(newList);
  };

  const switchUser = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setPromptUser(null);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, addUser, updateUsers, switchUser, promptUser, setPromptUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
