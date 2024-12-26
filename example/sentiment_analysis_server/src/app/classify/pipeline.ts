import { pipeline , AllTasks, env} from '@huggingface/transformers';


const task = 'text-classification';
const model = 'distilbert-base-uncased-finetuned-sst-2-english';

// for remote mode
env.allowLocalModels = false;
env.allowRemoteModels = true;
const modelPath = `Xenova/${model}`;

// for local mode
// env.allowLocalModels = true;
// env.allowRemoteModels = false;
// env.localModelPath = process.cwd();
// const modelPath = `models/${model}`;


// const progress_callback = (x) => console.log(x);
const progress_callback = null;

class PipelineSingleton {
  static classifier: AllTasks["text-classification"] | null = null;

  static async loadClassifier() {
    if (process.env.NODE_ENV !== 'production') {
      if (!global.pipelineSingleton) {
        console.log('start loading pipeline');
        this.classifier = await pipeline(task, modelPath, {
          progress_callback: progress_callback || undefined,
        });
        global.pipelineSingleton = this.classifier;
        console.log('finish loading pipeline');
      }
      this.classifier = global.pipelineSingleton;
    } else {
      if (!this.classifier) {
        console.log('start loading pipeline');
        this.classifier = await pipeline(task, modelPath, {
          progress_callback: progress_callback || undefined,
        });
        console.log('finish loading pipeline');
      }
    }
    return this.classifier;
}
}

export default PipelineSingleton;
