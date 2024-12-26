# Sentiment Analysis with Next.js and Transformers.js

A web application that analyzes the sentiment of text using machine learning, built with Next.js and Transformers.js.

## Features

- Real-time sentiment analysis
- Client-side inference using Transformers.js

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Learn More

This project was built following the [Transformers.js Next.js tutorial](https://huggingface.co/docs/transformers.js/en/tutorials/next).

this fix issue on import for huggingface library
https://github.com/huggingface/transformers.js/issues/1026#issuecomment-2490410996

## For local mode

put the model in the folder `public` folder and active the local mode

```
public
└── models
    └── distilbert-base-uncased-finetuned-sst-2-english
        ├── config.json
        ├── onnx
        │   ├── model.onnx
        │   ├── model_bnb4.onnx
        │   ├── model_fp16.onnx
        │   ├── model_int8.onnx
        │   ├── model_q4.onnx
        │   ├── model_q4f16.onnx
        │   ├── model_quantized.onnx
        │   └── model_uint8.onnx
        ├── quantize_config.json
        ├── special_tokens_map.json
        ├── tokenizer.json
        ├── tokenizer_config.json
        └── vocab.txt
```

## onnx

for the model file look at this : https://huggingface.co/docs/transformers.js/en/custom_usage#convert-your-models-to-onnx
