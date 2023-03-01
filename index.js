require('dotenv').config();
const app = require("./app.js");
const port = process.env.PORT;

// make server listen on the specified port
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
})
