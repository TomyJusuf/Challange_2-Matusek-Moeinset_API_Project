const demo = document.querySelector('.demo');
const API_URL = 'https://sumsi.dev.webundsoehne.com/api/v1/submissions';

const DB_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDhjYmMzNTVmYzcxYTk1YjU5MWNkZDBmNzBjNTI4ZjVkNDU5NDU2MTBlNWMwNTRjOTZhOTZiZmQ2NzY4NTE5MjU5ZmI3YWY1NzIxMTAxMGYiLCJpYXQiOjE3MDI3NTc3NzEuNzM5OTQsIm5iZiI6MTcwMjc1Nzc3MS43Mzk5NDMsImV4cCI6MTczNDM4MDE3MS43MzM4NjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.qldlYkU025o_qa_0mqUFr-J_Bam6sPMjrNoz-WPcVO8Z81Ur0zuAt4rAr_qZnL1lojE1eyuCCw-YwCkL6arpryV0z1yJ3pXpSVwb8zppusTbjjvWFCNfZWPnB7s8N5KzoUGRcnfq4_T0he_oP4SPrQfjN8QLMtJwfA6eByXyhmB20jhmbXgNcVOWiKDGO1E14TQA4jKER3DhEUD4j9huq3ruGCWJlzBRBpFqSY4GP8-6GTKshIsyUg4vyzrnrgIGLR7nhxzp5XFL647OdBRKuvRb72Kmnj98vglPqNmvBs-M0_xzTl5yusezktX00A6cOO8czgsnipS_q-fqMDyOpdea7bIa7bHbIFTKDavV7YsS1EHRQ1djKnpgqFAi8642uoeh7wvTtvpOjWQhp_3_q3Gt4Cm3pOUrUd8CPAYcbQiDQEyhV7apOU5pr0DBSDqRgaw7ggeUSpQU6O0dY3I25GzWWevRekF1IcBUHprRrErL81GhZbrGUHlPk2ULo7z8JeNG4SwSTa-RRuaaV8AKU5SpgHe3TnQLOimF8l5r9wOUTPcoqnTI_s-Xox9CdBD4WXh3k4Pk67_L4o7TDa6TVcfrk728yIQl0XGr_xz_LRDKQuCGXVbfUTO7oZWbm95aOqL5zcbQVVM5roHyUUA7u5AGqc-u1x3wtixpnI950zc';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${DB_token}`, // Include the token in the Authorization header
};

// GET ALL
async function showData() {
  try {
    const response = await fetch(API_URL, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const saveData = data.data;

    console.log(saveData);
    let html = ''; // Initialize an empty string to concatenate HTML content

    for (let i = 0; i < saveData.length; i++) {
      // console.log(saveData[i]);
      html += `
      <div class="imageContainer" id="${saveData[i].id}">
       <img class="imageBox-1" src="https://sumsi.dev.webundsoehne.com/${saveData[i].image.public_location}"></img>
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

// VOTING METHOD
async function voting() {
  try {
  } catch (error) {}
}
// POST
async function postDataFunction() {
  // Assuming you have a FormData object stored in the postData variable
  // For POST data you must care about dont use same users information(data specifications :email !!)
  const postData = new FormData();
  postData.append('legalguardian_firstname', 'Pokemon');
  postData.append('legalguardian_lastname', 'Poke');
  postData.append('email', 'bububu@thekkk.com');
  postData.append('child_firstname', 'Poken_Purpur');
  postData.append('child_age', '120');
  postData.append('approval_privacypolicy', '1');
  postData.append('approval_participation', '1');
  postData.append('approval_mailnotification', '1');
  postData.append(
    'image',
    document.querySelector('input[name="image"]').files[0]
  );

  try {
    const postResponse = await fetch(
      'https://sumsi.dev.webundsoehne.com/api/v1/submissions',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${DB_token}`,
        },
        body: postData,
      }
    );

    if (!postResponse.ok) {
      console.error(`HTTP error! Status: ${postResponse.status}`);

      // Log the entire response for debugging purposes
      const responseText = await postResponse.text();
      console.log('Response text:', responseText);

      if (
        postResponse.headers.get('Content-Type')?.includes('application/json')
      ) {
        try {
          const validationErrors = JSON.parse(responseText);
          console.error('Validation Errors:', validationErrors);
          // Display validation errors to the user or handle them accordingly
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      } else {
        console.error('Response is not in JSON format.');
        // Handle non-JSON response as needed
      }
    } else {
      const responseData = await postResponse.json();
      console.log('Response data:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('showData').addEventListener('click', showData);
document
  .getElementById('postDataFunction')
  .addEventListener('click', postDataFunction);
