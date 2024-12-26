import { pipeline , AllTasks} from '@huggingface/transformers';

const task = 'text-classification';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
// const progress_callback = (x) => console.log(x);
const progress_callback = null;

class PipelineSingleton {
  static classifier: AllTasks["text-classification"] | null = null;

  static async loadClassifier() {
    if (process.env.NODE_ENV !== 'production') {
      if (!global.pipelineSingleton) {
        console.log('start loading pipeline');
        this.classifier = await pipeline(task, model, {
          progress_callback: progress_callback || undefined,
        });
        global.pipelineSingleton = this.classifier;
        console.log('finish loading pipeline');
      }
      this.classifier = global.pipelineSingleton;
    } else {
      if (!this.classifier) {
        console.log('start loading pipeline');
        this.classifier = await pipeline(task, model, {
          progress_callback: progress_callback || undefined,
        });
        console.log('finish loading pipeline');
      }
    }
    return this.classifier;
}
}

export default PipelineSingleton;
