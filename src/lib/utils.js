export const getDate = (createdAt) => {
  const date = new Date(createdAt);
  const yyyy = date.getFullYear();
  const mm = String(1 + date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
