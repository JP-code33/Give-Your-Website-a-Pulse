const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    let media;

    if (data.media_type === "image") {
      media = `<img src="${data.url}" style="width: 300px; height: 200px;" />`;
    } else {
      media = `<iframe src="${data.url}" width="100%" height="400" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>`;
    }

    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p>${data.explanation}</p>
    `;
  })
  .catch((err) => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
  });

              