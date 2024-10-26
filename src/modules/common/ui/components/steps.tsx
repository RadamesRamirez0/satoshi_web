import React, { FC } from 'react';

import { cn } from '@/modules/common/ui/lib/utils';

export interface StepsProps {
  orientation: 'horizontal' | 'vertical';
  steps: { label: string; value: string }[];
  currentStep: string;
}

const Steps: FC<StepsProps> = ({ steps, currentStep }) => {
  const currentStepIndex = steps.findIndex((v) => v.value === currentStep);

  return (
    <>
      <div className='flex  items-center w-full justify-between'>
        {steps.map((v) => (
          <p key={`${v.value}-a`} className='text-center'>
            {v.label}
          </p>
        ))}
      </div>
      <div className='flex  items-center w-full justify-between'>
        {steps.map((v, i) => (
          <React.Fragment key={`${v.value}-2`}>
            <div
              className={cn(
                `rounded-md bg-muted size-10 flex items-center justify-center text-lg font-bold transition-colors ring ring-primary z-10`,
                currentStepIndex > i && 'bg-primary text-background  ',
                currentStepIndex === i && 'bg-primary text-background ring-primary/60 ',
                currentStepIndex < i && 'text-whiteBG ring-primary/60',
              )}
            >
              {i + 1}
            </div>

            <div
              className={cn(
                'h-1.5 bg-muted w-12 flex-1 last:hidden transition-colors',
                currentStepIndex > i && 'bg-primary',
              )}
            ></div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Steps;
