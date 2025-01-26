import { NextResponse } from "next/server";
import listings from "../listings.json";

const getById = async (id: string) => {
  return listings.filter((item) => item.id === id);
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await context.params;

  const response = await getById(id);

  return NextResponse.json(response);
}
