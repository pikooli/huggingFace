/* eslint-disable no-var */
import { AllTasks } from '@huggingface/transformers';

declare global {
  var pipelineSingleton: AllTasks["text-classification"] | null;
}

export {};