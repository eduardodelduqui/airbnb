import { NextResponse } from "next/server";
import hosts from "../hosts.json";

const getById = async (id: string) => {
  return hosts.filter((item) => item.id === id);
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Ajuste para lidar com Promise
): Promise<NextResponse> {
  const { id } = await context.params; // Desestruturação do contexto, aguardando a Promise resolver

  const response = await getById(id);

  return NextResponse.json(response);
}
