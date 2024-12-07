import { NextResponse } from "next/server";
import listings from './listings.json'

const getByCategory = async (category: string) => {
    return listings.filter(item => item.category === category)
}

export async function GET(req: Request): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || 'chales';
 
    const response = await getByCategory(categoryId)

    return NextResponse.json(response);
}