import { client } from "@/sanity/lib/client";

// Contact Info 
export async function getContact() {
  const query = `*[_type == "contact" && _id == "contact"][0]{
    email,
    twitter,
    instagram,
    youtube
  }`;

  return client.fetch(query);
}