// Base URL for the 1secmail API
const apiBaseUrl = "https://www.1secmail.com/api/v1/";

// Function to generate a random string (used for email username)
function generateRandomUsername() {
  return Math.random().toString(36).substring(2, 10); // Random string
}

// Function to create a new temporary email
async function createTempEmail() {
  const username = generateRandomUsername(); // Generate random username
  const domain = "1secmail.com"; // Fixed domain provided by the API
  const email = `${username}@${domain}`;

  // Update UI with the email
  document.getElementById("alias").textContent = email;

  // Store the username and domain for checking messages later
  localStorage.setItem("tempEmailUsername", username);
  localStorage.setItem("tempEmailDomain", domain);
  return email;
}

// Function to fetch messages for the temporary email
async function fetchEmails() {
  const username = localStorage.getItem("tempEmailUsername");
  const domain = localStorage.getItem("tempEmailDomain");

  if (!username || !domain) {
    alert("No temporary email found! Generate one first.");
    return;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}?action=getMessages&login=${username}&domain=${domain}`
    );
    const messages = await response.json();

    if (messages.length === 0) {
      alert("No emails received yet!");
    } else {
      // Display email subjects
      const emailList = messages
        .map((msg) => `${msg.id}: ${msg.subject}`)
        .join("\n");
      alert(`Emails received:\n${emailList}`);
    }
  } catch (error) {
    console.error("Failed to fetch emails: ", error);
    alert("Error fetching emails. Try again later.");
  }
}

// Handle alias generation
document.getElementById("generate").addEventListener("click", createTempEmail);

// Handle fetching emails
document.getElementById("copy").addEventListener("click", fetchEmails);
