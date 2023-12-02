import { type NextRequest } from 'next/server'
import { getSimiliar } from '../../../lib/api';
import { ROOT_URL } from '../../../lib/constants';

export async function GET(
    request: NextRequest
  ) {
    const searchParams = request.nextUrl.searchParams
    const word = searchParams.get('word') ?? '';
    if(word.length < 3){
        return Response.json({error:true,msg:"Invalid word"})
    }
    const words = await getSimiliar(word);
    words.sort((a, b) => a.length - b.length);

    const groupedWords: { [key: number]: string[] } = words.reduce((acc, word) => {
      const length = word.length;
      if (!acc[length]) {
        acc[length] = [];
      }
      acc[length].push(word);
      return acc;
    }, {} as { [key: number]: string[] });
    return Response.json({error:false,possible:groupedWords})
}

export async function POST(
    request: NextRequest
  ) {
    const data = await request.json();
    const { word } = data;
    if(word.length < 3){
        return Response.json({error:true,msg:"Invalid word"})
    }
    const words = await getSimiliar(word);
    words.sort((a, b) => a.length - b.length);

    const groupedWords: { [key: number]: string[] } = words.reduce((acc, word) => {
      const length = word.length;
      if (!acc[length]) {
        acc[length] = [];
      }
      acc[length].push(word);
      return acc;
    }, {} as { [key: number]: string[] });
    return Response.json({error:false,possible:groupedWords})
}