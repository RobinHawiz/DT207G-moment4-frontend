import "@styles/style.scss";

getUserProfile();

function getUserProfile(): void {
  fetch("https://dt207g-moment4-backend.azurewebsites.net/api/protected", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "An unknown error occured");
      }
      return response.json();
    })
    .then((data) => {
      const main = document.querySelector("main");
      if (!main) {
        console.error("main elem does not exist");
        return;
      }

      const fragElem = document.createDocumentFragment();

      const usernameElem = document.createElement("p");
      usernameElem.innerText = "Username: " + data.username;

      const emailElem = document.createElement("p");
      emailElem.innerText = "Email: " + data.email;

      const firstNameElem = document.createElement("p");
      firstNameElem.innerText = "First name: " + data.firstName;

      const lastNameElem = document.createElement("p");
      lastNameElem.innerText = "Last name: " + data.lastName;

      const dateCreatedElem = document.createElement("p");
      dateCreatedElem.innerText = "Account creation: " + data.created;

      fragElem.appendChild(usernameElem);
      fragElem.appendChild(emailElem);
      fragElem.appendChild(firstNameElem);
      fragElem.appendChild(lastNameElem);
      fragElem.appendChild(dateCreatedElem);

      main.appendChild(fragElem);
    })
    .catch((error) => {
      console.error("Auth error:", error.message);
      document.querySelector(".error")?.remove();
      const errorElem = document.createElement("div");
      errorElem.classList.add("error");
      errorElem.innerText =
        "You are currently not logged in. Please log in before using this page :)";
      document.body.insertBefore(errorElem, document.body.firstChild);
    });
}
