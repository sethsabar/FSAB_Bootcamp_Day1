import express from "express";
import {Collection, CURSOR_FLAGS, Db, ListCollectionsCursor, MongoClient} from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;
let curPostID = 0;
let curCommentID = 0;

// Middleware.
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.urlencoded({extended: false}));

// ====================================================================
// Routes
// ====================================================================

// types
type Date = {
    minute: number
    hour: number
    day: number
    month: number
    year: number
}

type Comment = {
    commentID: Number
    body: String
    post: Number
    date: Date
}

type Post = {
    postID: Number
    title: String
    body: String
    date: Date
}

// collections
db.createCollection<Post>("posts");
db.createCollection<Comment>("comments");

function newer(post1: Post, post2: Post): boolean {

    if (post1.date.year > post2.date.year) {
        return true;
    } else if (post1.date.year < post2.date.year) {
        return false;
    }
    if (post1.date.month > post2.date.month) {
        return true;
    } else if (post1.date.month < post2.date.month) {
        return false;
    }
    if (post1.date.day > post2.date.day) {
        return true;
    } else if (post1.date.day < post2.date.day) {
        return false;
    }
    if (post1.date.hour > post2.date.hour) {
        return true;
    } else if (post1.date.month < post2.date.month) {
        return false;
    }
    if (post1.date.minute > post2.date.minute) {
        return true;
    } else if (post1.date.month < post2.date.month) {
        return false;
    }
    return false;
}

function sort(lst: Post[]): void {
    for (let i = 0; i < lst.length; i++) {
        for (let j = i + 1; j < lst.length; j++) {
            if (newer(lst[i], lst[j])) {
                let temp = lst[i]
                lst[i] = lst[j]
                lst[j] = temp
            }
        }
    }
}

// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/posts", async (req, res) => {
    var retList: Post[];
    for (const post in db.collection("posts")) {
        let post: Post
        retList.push(post)
    }
    sort(retList);
    res.send(retList);
});

// TODO: Implement a route handler that creates a new post.
app.post("/posts", async (req, res) => {
    let newPost = {postID: curPostID, title: req.get("title"), body: req.get("body"), date: req.get("date")}
    curPostID +=1;
    db.collection("posts").insertOne(newPost);
    res.send(newPost);
});

// TODO: Implement a route handler that gets a post associated with a given postID.
app.get("/posts/:postID", async (req, res) => {
    let post = db.collection("posts").findOne({postID: res.get("postID")});
    res.send(post);
});

// TODO: Implement a route handler that updates the post associated with a given postID.
app.patch("/posts/:postID", async (req, res) => {
    let post = db.collection("posts").updateOne({postID: res.get("postID")}, {title: req.get("title"), body: req.get("title")});
    res.send(post);
});

// TODO: Implement a route handler that deletes the post associated with a given postID.
app.delete("/posts/:postID", async (req, res) => {
    db.collection("posts").deleteOne({postID: req.get("postID")})
    res.send("post deleted");
});

// TODO: Implement a route handler that gets all the comments associated with a given postID.
app.get("/posts/:postID/comments", async (req, res) => {
    let postComments = db.collection("comments").find({postID: req.get("postID")});
    res.send(postComments);
});

// TODO: Implement a route handler that gets adds a comment to the post with the given postID.
app.post("/posts/:postID/comments", async (req, res) => {
    let newComment = {commentID: curCommentID, body: req.get("body"), post: req.get("post"), date: req.get("date")}
    curCommentID += 1;
    db.collection("comments").insertOne(newComment);
    res.send(newComment);
});

// TODO: Implement a route handler that gets a comment associated with the given commentID.
app.get("/posts/:postID/comments/:commentID", async (req, res) => {
    let comment = db.collection("comments").findOne({commentID: req.get("commentID")});
    res.send(comment);
});

// TODO: Implement a route handler that updates a comment associated with the given commentID.
app.patch("/posts/:postID/comments/:commentID", async (req, res) => {
    let comment = db.collection("comments").updateOne({commentID: req.get("commentID")}, {body: req.get("body")})
    res.send(comment);
});

// TODO: Implement a route handler that deletes a comment associated with the given commentID.
app.delete("/posts/:postID/comments/:commentID", async (req, res) => {
    db.collection("comments").deleteOne({commentID: req.get("commentID")});
    res.send("comment deleted");
});


// TODO: add more endpoints here!

// Start the Express server.
function start() {
    const client = new MongoClient("mongodb+srv://sethsabar:Gz9Acyra9T11B79N@cluster0.joeqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    client.connect()
        .then(() => {
            console.log('Connected successfully to server');
            db = client.db("database");
            app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch((err) => {
            console.log("error connecting to mongoDB!", err);
        });
}

start();
