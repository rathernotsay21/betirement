import { NextResponse } from 'next/server';

interface BitcoinData {
  usd: number;
  usd_24h_vol?: number;
  usd_24h_change?: number;
  usd_24h_change_percentage?: number;
  usd_market_cap?: number;
  last_updated_at?: number;
}

interface MarketData {
  high_24h?: number;
  low_24h?: number;
}

/**
 * Server-side API route to fetch Bitcoin price from CoinGecko
 * This avoids CORS issues when fetching from the client
 */
export async function GET() {
  try {
    // Fetch basic price data
    const priceResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&include_market_cap=true',
      {
        next: { revalidate: 30 }, // Cache for 30 seconds
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!priceResponse.ok) {
      throw new Error(`CoinGecko API error: ${priceResponse.status}`);
    }

    const priceData = await priceResponse.json();
    const bitcoinData: BitcoinData = priceData.bitcoin;

    // Fetch additional market data for high/low
    let high24h = bitcoinData.usd;
    let low24h = bitcoinData.usd;

    try {
      const marketResponse = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h',
        {
          next: { revalidate: 30 }, // Cache for 30 seconds
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (marketResponse.ok) {
        const marketData: MarketData[] = await marketResponse.json();
        if (marketData[0]) {
          high24h = marketData[0].high_24h || high24h;
          low24h = marketData[0].low_24h || low24h;
        }
      }
    } catch (marketError) {
      // If market data fails, continue with basic price data
      console.warn('Failed to fetch market data:', marketError);
    }

    // Return formatted data
    return NextResponse.json({
      success: true,
      data: {
        price: bitcoinData.usd,
        change24h: bitcoinData.usd_24h_change || 0,
        changePercent24h: bitcoinData.usd_24h_change_percentage || 0,
        high24h: high24h,
        low24h: low24h,
        marketCap: bitcoinData.usd_market_cap || 0,
        volume24h: bitcoinData.usd_24h_vol || 0,
        lastUpdated: new Date(bitcoinData.last_updated_at ? bitcoinData.last_updated_at * 1000 : Date.now()),
      },
    });

  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);

    // Return error response with fallback data
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Bitcoin price',
      data: {
        price: 98542.50,
        change24h: 2156.30,
        changePercent24h: 2.24,
        high24h: 99850.00,
        low24h: 96200.00,
        marketCap: 1932000000000,
        volume24h: 28500000000,
        lastUpdated: new Date(),
      },
    }, { status: 500 });
  }
}