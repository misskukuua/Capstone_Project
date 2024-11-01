// utils/profile.js
export const generateUsername = (email) => {
    const baseUsername = email.split('@')[0];
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${baseUsername}${randomSuffix}`;
  };
  
  export const setUserData = (userData) => {
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('userRole', userData.role);
  };
  