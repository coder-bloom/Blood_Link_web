// Request Blood form handler
document.querySelector(".request-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("donorname").value.trim();
  const blood = document.getElementById("bloodgroup").value.trim();
  const hospital = document.getElementById("hospital").value.trim();

  // ✅ Get user safely
  const userData = localStorage.getItem("user");

  if (!userData) {
    alert("⚠️ Please log in first!");
    window.location.href = "./login.html";
    return;
  }

  const user = JSON.parse(userData);

  console.log("User from localStorage:", user);
  console.log("User ID being sent:", user?._id);

  // 🚫 Prevent admin from sending request
  if (user.role === "admin") {
    alert("Admins cannot create blood requests");
    return;
  }

  // ❗ Ensure valid session
  if (!user._id) {
    alert("⚠️ Session expired. Please login again.");
    localStorage.clear();
    window.location.href = "./login.html";
    return;
  }

  // ✅ Validate inputs
  if (!name || !blood || !hospital) {
    alert("❌ Please fill all the required fields!");
    return;
  }

  // ✅ Correct payload (MATCHES BACKEND)
  const DonorData = {
    userId: user._id,
    fullName: name,
    bloodGroup: blood,
    hospital
  };

  try {
    const response = await fetch("http://localhost:5000/api/donor_Request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DonorData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(`✅ Blood request submitted successfully!\n\nRequest ID: ${result.request._id}`);
      this.reset();
    } else {
      alert(`❌ Error: ${result.message || "Failed to submit request"}`);
    }
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("⚠️ Server error! Please try again later.");
  }
});

// Logout function
function logout() {
  localStorage.clear();
  alert("Logged out successfully!");
  window.location.href = "index.html";
}