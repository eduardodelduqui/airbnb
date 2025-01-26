import { ICategory } from "@/app/types/interfaces";
import { NextResponse } from "next/server";

const categories: ICategory[] = [
  {
    id: "frente-praia",
    image:
      "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
    text: "Em frente à praia",
    url: "",
  },
  {
    id: "vistas-incriveis",
    image:
      "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    text: "Vistas incríveis",
    url: "",
  },
  {
    id: "piscinas-incriveis",
    image:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
    text: "Piscinas incríveis",
    url: "",
  },
  {
    id: "nas-alturas",
    image:
      "https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
    text: "Nas alturas",
    url: "",
  },
  {
    id: "beira-do-lago",
    image:
      "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
    text: "Na beira do lago",
    url: "",
  },
  {
    id: "chales",
    image:
      "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
    text: "Chalés",
    url: "",
  },
];

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(categories);
}
