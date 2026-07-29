const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>Loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(response => 
  response.json()).then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img src="${data.url}" style="max-width: 100%; height: auto; border-radius: 8px;"/>`;
    } else {
      
      media = `<iframe src="${data.url}" width="100%" height="400" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>`;
    }

    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p style="margin-top: 1rem; line-height: 1.6;">${data.explanation}</p>`;
  });
