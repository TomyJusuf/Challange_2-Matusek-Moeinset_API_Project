const demo = document.querySelector('.demo');

const API_URL = 'http://localhost:3000/api/get-data';

async function showData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    let html = ''; // Initialize an empty string to concatenate HTML content

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      html += `
        <div class="imageContainer">
          <img class="imageBox-1" src="https://sumsi.dev.webundsoehne.com${data[i].image.public_location}"></img>
        </div>`;
    }

    demo.innerHTML = html; // Set the HTML content after the loop
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error instanceof TypeError) {
      console.error('Check if the API server is running and accessible.');
    }
  }
}
