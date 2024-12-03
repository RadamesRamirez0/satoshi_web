export const createTimer = (totalSeconds: number): string => {
  if (totalSeconds > 540) {
    throw new Error('El tiempo no puede exceder los 9 minutos (540 segundos).');
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
