document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("rrrr"); // Prevent the default form submission

    // Create a FormData object, passing in the form
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => (formObject[key] = value));

    // Use fetch to submit the form data
    fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject), // Convert the object to a JSON string
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("Success:", data);
        // Handle success (e.g., showing a success message)
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("errorMessage").innerHTML = "Error happened!";
        // Handle errors (e.g., showing an error message)
      });
  });
});
