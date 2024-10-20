import React, { FC } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

export interface StepsProps {
  orientation: 'horizontal' | 'vertical';
  steps: string[];
  currentStep: number;
}

const Steps: FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <>
      <div className='flex  items-center w-full justify-between'>
        {steps.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      <div className='flex  items-center w-full justify-between'>
        {steps.map((s, i) => (
          <>
            <div
              className={cn(
                `rounded-md bg-muted size-10 flex items-center justify-center text-lg font-bold transition-colors`,
                currentStep === i + 1 && 'bg-blue-500 text-white',
                currentStep > i + 1 && 'bg-primary text-background',
              )}
            >
              {i + 1}
            </div>

            <div
              className={cn(
                'h-1.5 bg-muted w-12 flex-1 last:hidden transition-colors',
                currentStep > i + 1 && 'bg-primary',
              )}
            ></div>
          </>
        ))}
      </div>
    </>
  );
};

export default Steps;
