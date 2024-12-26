import { pipeline, env } from '@huggingface/transformers';

// Skip local model check
env.allowLocalModels = false;
const task = 'text-classification';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
let instance = null;

(async () => {
  console.log('start loaded');
  instance = await pipeline(task, model, {
    progress_callback: (x) => self.postMessage(x),
  });
  console.log('instance loaded');
})();

self.addEventListener('message', async (event) => {
  console.log('event.data', event.data);
  while (!instance) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  let output = await instance(event.data.text);

  self.postMessage({
    status: 'complete',
    output: output,
  });
});
