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
    <div class="container">
      <h1>${data.title}</h1>
      
      <div class="mainContent">
        
        <div class="media">
          ${media}
        </div>

        <aside class="sideBar">
          <div class="information">
            <h2>Information</h2>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Media:</strong> ${data.media_type}</p>
            <p><strong>Copyright:</strong> ${data.copyright ?? "NASA"}</p>
            <p><strong>Source:</strong> NASA APOD API</p>
          </div>
        </aside>
        
        <div class="explanation">
            <h2>Explanation About Today's Picture</h2>
            <p>${data.explanation}</p>
        </div>

      </div>
        
    `;
  })
  .catch((err) => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
  });

              