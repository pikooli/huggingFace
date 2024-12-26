import { NextResponse } from 'next/server';
import PipelineSingleton from './pipeline';

export async function GET(request) {
  const text = request.nextUrl.searchParams.get('text');

  if (!text) {
    return NextResponse.json(
      {
        error: 'Missing text parameter',
      },
      { status: 400 }
    );
  }
  const classifier = await PipelineSingleton.loadClassifier();
  if (!classifier) {
    return NextResponse.json(
      {
        error: 'Failed to load classifier',
      },
      { status: 500 }
    );
  }
  const result = await classifier(text);
  return NextResponse.json(result);
}
