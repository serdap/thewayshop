const apiUrl = "http://localhost:8000/api/v1/auth/login";

const contactForm = document.getElementById("formLogin");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;
    console.log(email)

  const requestOptions = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "email": email,
        "password": password,
    }),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Server response:", data);
      const test = data;
      console.log(test);
      const token = test.data.token;
      localStorage.setItem("token", token)
    window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// function setCookie(name,value,days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "")  + expires + "; path=/";
// }
// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }
// function eraseCookie(name) {
//     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }
