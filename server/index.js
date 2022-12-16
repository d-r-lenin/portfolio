const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "credin/mineral-actor.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
});
const service = google.drive({ version: "v3", auth });

const express = require("express");

const PORT = process.env.PORT || 3000;
const path = require("path");

const app = express();

// set root folder to client/public
app.use(express.static(path.join(__dirname, "../client/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cookie parser
app.use(require("cookie-parser")());

app.use("/admin", (req, res, next) => {
    if (req.cookies.username === "admin") {
        next();
    } else {
        res.redirect("/login");
    }
});

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get("/login", (req, res) => {
    const html = `
        <h1>Admin Login</h1>
        <form action="/login" method="POST">    
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <input type="submit" />
        </form>
    `;
    res.send(html);
});

app.post("/login", (req, res) => {
    if (req.body.username === "admin" && req.body.password === "admin") {
        res.cookie("username", "admin");
    }
    res.redirect("/admin");
});

app.get("/admin", async (req, res) => {
    if (req.cookies.username === "admin") {
        // read file content.json from google drive
        const file = await service.files.get({
            fileId: "1HJ0k1x8xQFYMaV-eHoqe-Lren3Kl-Qbl",
            alt: "media",
        });
        const html = `
        <html>
        <head>
            <title>Admin Page</title>
        </head>
        <body>
            <h1>Admin Page</h1>
            <form action="/admin/content/update" method="POST">
                    <textarea name="content"">${JSON.stringify(file.data)}</textarea>
                <input type="submit" />
            </form>
        </body>
        </html>
        `;
        res.send(html);
    } else {
        res.redirect("/login");
    }
});

app.post("/admin/content/update", async (req, res) => {
    const content = JSON.parse(req.body.content.trim());
    // update file content.json on google drive
    const file = await service.files.update({
        fileId: "1HJ0k1x8xQFYMaV-eHoqe-Lren3Kl-Qbl",
        media: {
            mimeType: "application/json",
            body: JSON.stringify(content),
        },
    });
    res.redirect("/admin");
});

app.get('/content', async (req, res) => {
    // read file content.json from google drive
    const file = await service.files.get({
        fileId: "1HJ0k1x8xQFYMaV-eHoqe-Lren3Kl-Qbl",
        alt: "media",
    });
    res.send(file.data);
});


app.listen(PORT, () => {
    console.log(" Running on port:" + PORT);
});

// const { GoogleAuth } = require("google-auth-library");

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
// async function main() {
//     const auth = new GoogleAuth({
//         scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/documents"]
//     });
//     const service = google.drive({version: 'v3', auth});

//     // to create a new text document
//     // const fileMetadata = {
//     //     name: 'test.txt',
//     //     mimeType: 'text/plain'
//     // };
//     // const media = {
//     //     mimeType: 'text/plain',
//     //     body: 'Hello World'
//     // };
//     // const resi = await service.files.create({
//     //     resource: fileMetadata,
//     //     media: media,
//     //     fields: 'id'
//     // });
//     // console.log(resi.data.id);

//     const params = {

//     };

//     // get list of files
//     const res = await service.files.list(params);

//     const files = res.data.files;
//     if (files.length) {
//         console.log('Files:');
//         files.map((file) => {
//             console.log(`${file.name} (${file.id})`);
//         });
//     } else {
//         console.log('No files found.');
//     }

//     // get cwd
//     const cwd = await service.files.get({
//         fileId: 'root',
//         fields: 'id, name'
//     });
//     console.log(cwd.data);

//     console.log(res.data);

// }

async function main() {
    // service account auth for email sending, and drive access

    // to list files
    const params = {
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
    };
    const res = await service.files.list(params);
    const files = res.data.files;
    if (files.length) {
        console.log("Files:");
        files.map((file) => {
            console.log(`${file.name} (${file.id})`);
        });
    } else {
        console.log("No files found.");
    }

    // read file
    const file = await service.files.get({
        fileId: "1HJ0k1x8xQFYMaV-eHoqe-Lren3Kl-Qbl",
        alt: "media",
    });
    console.log(file.data);
}
main().catch(console.error);
