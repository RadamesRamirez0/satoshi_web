import Image from 'next/image';
import React from 'react';

import { Dialog, DialogContent } from '@/modules/common/ui/components/dialog';

export interface DocumentViewerProps {
  src?: string;
  onClose: VoidFunction;
}

const DocumentViewer = ({ src, onClose }: DocumentViewerProps) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isImage = src?.includes('png') || src?.includes('jpg') || src?.includes('jpeg');

  return (
    <Dialog
      open={!!src}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className='p-0 overflow-hidden w-fit  max-w-[400px] sm:max-w-[550px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1000px] 2xl:max-w-[2000px] h-[80vh]'>
        {isImage ? (
          <div className='relative w-full h-full max-w-full max-h-full'>
            <Image key={src} src={src ?? ''} alt='doc' fill />
          </div>
        ) : (
          <iframe
            title='Document view'
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
            className='w-full h-full'
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
