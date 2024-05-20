const apiKey = process.env.NEXT_PUBLIC_IMAGE_API ?? '';

export async function fetchImages(pageParam: number, search: string) {
  const url = `https://api.thecatapi.com/v1/images/search?limit=24&page=${pageParam}`;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key":  apiKey 
  });
  
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
}
