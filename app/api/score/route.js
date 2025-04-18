import { load } from 'cheerio';
import { NextResponse } from 'next/server';

let cached = { ts: 0, data: null };
const REFRESH_MS = 30 * 1000;

export async function GET() {
  if (cached.data && Date.now() - cached.ts < REFRESH_MS) {
    return NextResponse.json(cached.data, {
      headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate' },
    });
  }

  const url = 'https://cricclubs.com/FT20/viewScorecard.do?matchId=675&clubId=862';

  try {
    const html = await fetch(url).then(res => res.text());
    const $ = load(html);

    const teams = $('.matchHeader .teamName')
      .map((_, el) => $(el).text().trim())
      .get();

    const scores = $('.matchHeader .score')
      .map((_, el) => $(el).text().trim())
      .get();

    const status = $('.matchHeader .status').text().trim();

    const data = {
      teams,
      scores,
      status,
      updated: new Date().toISOString(),
    };
    cached = { ts: Date.now(), data };

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate' },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch score' },
      { status: 500 }
    );
  }
}
