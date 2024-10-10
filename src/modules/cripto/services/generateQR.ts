import { toCanvas } from 'qrcode';

export const generateQR = async (
  qr: string,
  canvas: HTMLCanvasElement,
): Promise<void> => {
  await toCanvas(canvas, qr, { width: 200 });
};
