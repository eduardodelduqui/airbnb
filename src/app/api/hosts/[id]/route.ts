import { NextResponse } from "next/server";
import hosts from '../hosts.json'

const getById = async (id: string) => {
    return hosts.filter(item => item.id === id)
}

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = await Promise.resolve(params);
 
    const response = await getById(id);

    return NextResponse.json(response);
}