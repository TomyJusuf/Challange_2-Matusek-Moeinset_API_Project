window.addEventListener('DOMContentLoaded', () => {
  showData();
});
const demo = document.querySelector('.demo');
const API_URL = 'https://sumsi.dev.webundsoehne.com/api/v1/submissions';
let submissionId;

const DB_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDhjYmMzNTVmYzcxYTk1YjU5MWNkZDBmNzBjNTI4ZjVkNDU5NDU2MTBlNWMwNTRjOTZhOTZiZmQ2NzY4NTE5MjU5ZmI3YWY1NzIxMTAxMGYiLCJpYXQiOjE3MDI3NTc3NzEuNzM5OTQsIm5iZiI6MTcwMjc1Nzc3MS43Mzk5NDMsImV4cCI6MTczNDM4MDE3MS43MzM4NjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.qldlYkU025o_qa_0mqUFr-J_Bam6sPMjrNoz-WPcVO8Z81Ur0zuAt4rAr_qZnL1lojE1eyuCCw-YwCkL6arpryV0z1yJ3pXpSVwb8zppusTbjjvWFCNfZWPnB7s8N5KzoUGRcnfq4_T0he_oP4SPrQfjN8QLMtJwfA6eByXyhmB20jhmbXgNcVOWiKDGO1E14TQA4jKER3DhEUD4j9huq3ruGCWJlzBRBpFqSY4GP8-6GTKshIsyUg4vyzrnrgIGLR7nhxzp5XFL647OdBRKuvRb72Kmnj98vglPqNmvBs-M0_xzTl5yusezktX00A6cOO8czgsnipS_q-fqMDyOpdea7bIa7bHbIFTKDavV7YsS1EHRQ1djKnpgqFAi8642uoeh7wvTtvpOjWQhp_3_q3Gt4Cm3pOUrUd8CPAYcbQiDQEyhV7apOU5pr0DBSDqRgaw7ggeUSpQU6O0dY3I25GzWWevRekF1IcBUHprRrErL81GhZbrGUHlPk2ULo7z8JeNG4SwSTa-RRuaaV8AKU5SpgHe3TnQLOimF8l5r9wOUTPcoqnTI_s-Xox9CdBD4WXh3k4Pk67_L4o7TDa6TVcfrk728yIQl0XGr_xz_LRDKQuCGXVbfUTO7oZWbm95aOqL5zcbQVVM5roHyUUA7u5AGqc-u1x3wtixpnI950zc';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${DB_token}`, // Include the token in the Authorization header
};

// GET ALL

let saveData;
async function showData() {
  try {
    const response = await fetch(API_URL, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    saveData = data.data;
    console.log(saveData);
    const index = saveData.findIndex(
      (todo) => todo.email === localStorage.getItem('savedEmail')
    );

    // console.log(index);
    // console.log(saveData[index]);
    if (index == -1) {
      false;
    } else {
      submissionId = saveData[index].id;
    }
    let html = ''; // Initialize an empty string to concatenate HTML content

    for (let i = 0; i < saveData.length; i++) {
      // Check if the index is even

      html += `
      <div class="flex even-picture">
        <img
          class="h-64 w-56 object-cover"
          src="https://sumsi.dev.webundsoehne.com/${saveData[i].image.public_location}"
           alt="Bild von ${saveData[i].child_firstname}"
        />
      </div>`;
    }

    demo.innerHTML = html; // Set the HTML content after the loop
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error instanceof TypeError) {
      console.error('Check if the API server is running and accessible.');
    }
  }
  const imageContainers = document.querySelectorAll('.even-picture');
  imageContainers.forEach((element, i) => {
    element.addEventListener('click', () => {
      email = saveData[i].email; //testing

      elementID = element.id;
    });
  });
}

let elementID;
// VOTING METHOD
let email;

async function voting() {
  let body = {
    email: email,
  };
  try {
    const response = await fetch(`${API_URL}/${submissionId}/votings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      // Log the entire response for debugging purposes

      if (response.headers.get('Content-Type')?.includes('application/json')) {
        try {
          const responseText = await response.text();
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
      const responseData = await response.json();
      console.log('Response data:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  // -------------------------------------------
}

// Retrieve Votes
async function getVotes() {
  try {
    const response = await fetch(`${API_URL}/${submissionId}/votings`, {
      method: 'GET',
      headers,
    });
    // ERROR HANDLING
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    } else {
      const responseData = await response.json();
      console.log('Votes:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Count Votes
async function countVotes() {
  try {
    const url = new URL(
      `https://sumsi.dev.webundsoehne.com/api/v1/submissions/${submissionId}/votes/count`
    );
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    // ERROR HANDLING
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      // Log the entire response for debugging purposes
    } else {
      const responseData = await response.json();
      console.log('Vote count:', responseData.data.votes);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//submit
async function submitForm() {
  // Get the form element by its ID
  const firstName = document.getElementById('legalguardian_firstname').value;
  const lastName = document.getElementById('legalguardian_lastname').value;
  const email = document.getElementById('email').value;
  const child_firstname = document.getElementById('child_firstname').value;
  const child_age = document.getElementById('child_age').value;

  // Create FormData using the form element
  const postData = new FormData();
  postData.append('legalguardian_firstname', firstName);
  postData.append('legalguardian_lastname', lastName);
  postData.append('email', email);
  postData.append('child_firstname', child_firstname);
  postData.append('child_age', child_age);
  postData.append('approval_privacypolicy', '1');
  postData.append('approval_participation', '1');
  postData.append('approval_mailnotification', '1');
  postData.append(
    'image',
    document.querySelector('input[name="image"]').files[0]
  );
  localStorage.setItem('savedEmail', email);
  console.log(postData);
  try {
    const response = await fetch(
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
    // ERROR HANDLING
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      // Log the entire response for debugging purposes

      if (response.headers.get('Content-Type')?.includes('application/json')) {
        try {
          const responseText = await response.text();
          const validationErrors = JSON.parse(responseText);
          console.error('Validation Errors:', validationErrors);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      } else {
        console.error('Response is not in JSON format.');
        // Handle non-JSON response as needed
      }
    } else {
      const responseData = await response.json();
      console.log('Response data:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  showData();
}

// DELETE
async function deleteFn() {
  const localStorageData = localStorage.getItem('savedEmail');
  const index = saveData.findIndex((todo) => todo.email === localStorageData);
  console.log(index);
  console.log(submissionId);
  if (index !== -1) {
    // Assuming 'saveData' is an array, splice to remove the item locally
    saveData.splice(index, 1);

    try {
      // Assuming 'submissionId' is defined somewhere in your code
      const response = await fetch(`${API_URL}/${submissionId}`, {
        headers,
        method: 'DELETE',
      });

      const data = await response.json();
      localStorage.removeItem('savedEmail');
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.log('Item not found in saveData');
  }
}
async function deleteAllItems() {
  try {
    // Loop through all items in saveData
    for (const item of saveData) {
      const response = await fetch(`${API_URL}/${item.id}`, {
        headers,
        method: 'DELETE',
      });

      const data = await response.json();
      console.log(data);
    }

    // Clear saveData array
    saveData = [];

    // Clear localStorage if needed
    localStorage.removeItem('savedEmail');

    console.log('All items deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}
//Winner
async function determineWinnerAndRest() {
  const allVotes = [];
  const voteTest = [];

  // Collect all votes from the votings array of each user
  saveData.forEach((user) => {
    if (user.votings) {
      allVotes.push(user.votings[0]);
    }
  });

  // Extract emails from the voting objects
  for (const vote of allVotes) {
    if (vote && vote.email) {
      voteTest.push(vote.email);
    }
  }

  console.log(voteTest);
  // Calculate the top three winners using reduce
  const voteCount = voteTest.reduce((acc, email) => {
    acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});

  // Sort the emails by vote count in descending order
  const sortedEmails = Object.keys(voteCount).sort(
    (a, b) => voteCount[b] - voteCount[a]
  );

  // Get the top three winners
  const topThreeWinners = sortedEmails.slice(0, 3);

  // Display the top three winners
  console.log('Top Three Winners:');
  topThreeWinners.forEach((winner, index) => {
    console.log(`${index + 1}. ${winner} with ${voteCount[winner]} votes`);
  });
}

// Example usage
// await determineWinnerAndRest();

// document.getElementById('showData').addEventListener('click', showData);
document.getElementById('vote').addEventListener('click', voting);
document.getElementById('submit').addEventListener('click', submitForm);
