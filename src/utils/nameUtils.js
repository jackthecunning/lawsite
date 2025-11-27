// Utility functions for name formatting

export const getFirstName = (fullName) => {
  return fullName.split(' ')[0];
};

export const getLastName = (fullName) => {
  const parts = fullName.split(' ');
  return parts[parts.length - 1];
};

export const getInitials = (fullName) => {
  return fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
};
