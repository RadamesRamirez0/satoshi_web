export default (timestamp: string | number | undefined): Date => {
  if (!timestamp) {
    return new Date();
  }

  let ts = timestamp;

  if (typeof ts === 'string') {
    ts = Number(timestamp);
  }

  const date = new Date(ts * 1000);

  return date;
};
