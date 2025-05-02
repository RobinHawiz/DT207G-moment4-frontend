import "@styles/style.scss";

main();

function main(): void {
  const form = document.querySelector("form");
  if (!form) {
    console.error("Login form does not exist");
    return;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Clear any previous errors shown
    document.querySelector(".error")?.remove();
    const formData = new FormData(form);
    const payload: any = {};
    for (const entry of formData.entries()) {
      payload[entry[0]] = entry[1];
    }
    login(payload);
  });
}

async function login(payload: any): Promise<void> {
  fetch("https://dt207g-moment4-backend.azurewebsites.net/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          errorMessage.message ||
            errorMessage.error ||
            "An unknown error occured"
        );
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/DT207G-moment4-frontend/profile/";
    })
    .catch((error) => {
      console.error("Login user error:", error.message);
      const errorElem = document.createElement("div");
      errorElem.classList.add("error");
      errorElem.innerText = error.message;
      document.body.insertBefore(errorElem, document.body.firstChild);
    });
}
