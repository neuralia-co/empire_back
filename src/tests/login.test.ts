import supertest from "supertest";
import app from "../app";
import { expect, test } from "@jest/globals";
import helper from "./testHelpers";
import { sequelize } from "../utils/db";
const api = supertest(app);


describe("user creation", () => {
    /*beforeAll(async () => {
        await sequelize.sync({ force:true });
    });*/

    test("creating a new user with correct information", async () => {
        //await sequelize.sync({ force:true });
        const usersAtStart = await helper.usersInDb();
        console.log(usersAtStart);
        const newUser = {
            username: "jonero6",
            name: "Matthieu Porte",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = userAtEnd.map(n => n.username);
        expect(usernames).toContain(newUser.username);
    });

    test("creating a new user with incorrect information", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "",
            name: "Matthieu Porte",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "jonero6",
            name: "Matthieu Porte",
        };

        const response = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        console.log(response);

        //expect(response.body.error).toContain("expected `username` to be unique");

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });

    afterAll(async () => {
        await sequelize.close();
    });

});




/*describe("test the JWT authorization middleware", () => {

    it("should succeed when accessing an authed route with a valid JWT", async () => {
        const authentication = new Authentication();
        const randomString = faker.random.alphaNumeric(10);
        const email = `user-${randomString}@email.com`;
        const password = "password";

        await authentication.createUser({ email, password });

        const { authToken } = await authentication.loginUser({
            email,
            password,
        });

        // App is used with supertest to simulate server request
        const response = await api
            .post("/v1/auth/protected")
            .expect(200)
            .set("authorization", `bearer ${authToken}`);

        expect(response.body).toMatchObject({
            success: true,
        });
    });

    it("should fail when accessing an authed route with an invalid JWT", async () => {
        const invalidJwt = "OhMyToken";

        const response = await api
            .post("/v1/auth/protected")
            .expect(400)
            .set("authorization", `bearer ${invalidJwt}`);

        expect(response.body).toMatchObject({
            success: false,
            message: "Invalid token.",
        });
    });
});*/



/*
let token = "";
beforeAll(async () => {
    await User.deleteMany({});

    for (const user of helper.initialUsers) {
        await api
            .post("/api/users")
            .send(user);
    }

    const tokenR = await api
        .post("/api/login")
        .send({
            username:"matthiu",
            password:"motdepasse"
        });
    token = tokenR.body.token;


    await Blog.deleteMany({});

    for (const blog of helper.initialBlogs) {
        await api
            .post("/api/blogs")
            .send(blog)
            .set("Authorization", `Bearer ${token}`);
    }

});

describe("blogs reception", () => {

    test("blog posts are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("all blog posts are returned", async () => {
        const response = await api.get("/api/blogs");

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test("a specific blog post is returned among blog posts", async () => {
        const response = await api.get("/api/blogs");

        const titles = response.body.map(r => r.title);
        expect(titles).toContain(helper.initialBlogs[0].title);
    });

    test("a specific blog post can be viewed", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToView = blogsAtStart[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(resultBlog.body.id).toEqual(blogToView.id);
    });
});

describe("user creation", () => {

    test("creating a new user with correct information", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "jonero6",
            name: "Matthieu Porte",
            password: "motdepasse"
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = userAtEnd.map(n => n.username);
        expect(usernames).toContain(newUser.username);
    });

    test("creating a new user with incorrect information", async () => {
        const newUser = {
            username: "jon",
            name: "Matthieu Porte",
            password: "motdepasse"
        };

        const result1 = await api
            .post("/api/users")
            .send(newUser)
            .expect(400);

        expect(result1.body.error).toContain("the username must be at least 4 characters long");

        const newUser2 = {
            username: "jonero",
            name: "Matthieu Porte",
            password: "mot"
        };

        const result2 = await api
            .post("/api/users")
            .send(newUser2)
            .expect(400);

        expect(result2.body.error).toContain("the password must be at least 4 characters long");

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "vincentporte",
            name: "Vincent Porter",
            password: "Evian",
        };

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain("expected `username` to be unique");

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });

});

describe("user connection", () => {

    test("correct login info gives a token", async () => {

        const userInfo = {
            username:"matthiu",
            password:"motdepasse"
        };

        const token = await api
            .post("/api/login")
            .send(userInfo)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(token.body.token.length).toBeGreaterThan(1);
    });

    test("incorrect login info does not gives a token", async () => {

        const userInfo = {
            username:"matthiu",
            password:"motdepasseee"
        };

        const token = await api
            .post("/api/login")
            .send(userInfo)
            .expect(401)
            .expect("Content-Type", /application\/json/);

        expect(token.body.error).toContain("invalid username or password");
    });

});

describe("blog creation", () => {

    test("blog without title is not added", async () => {
        const newBlog = {
            author: "No one"
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("a valid blog post can be added", async () => {
        const newBlog = {
            title: "async/await simplifies making async calls",
            url: "internet.com",
            likes: 42
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const titles = blogsAtEnd.map(n => n.title);
        expect(titles).toContain("async/await simplifies making async calls");
    });

    test("empty likes is set to 0", async() => {
        const newBlog = {
            title: "empty likes is set to 0",
            url: "internet.com"
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];
        expect(lastBlog.title).toEqual("empty likes is set to 0");
        expect(lastBlog.likes).toEqual(0);

    });

});

describe("blog modification", () => {

    test("a blog post cannot be deleted with incorrect token", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const users = await helper.usersInDb();
        const differentUser = users[0];
        const blogToDelete = blogsAtStart[0];

        const tokenReq = await api
            .post("/api/login")
            .send({
                username:differentUser.username,
                password:differentUser.password
            });
        const newToken = tokenReq.body.token;

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${newToken}`)
            .expect(400);


        //expect(token.body.error).toContain("You cannot delete a post you did not create");

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
        const titles = blogsAtEnd.map(r => r.title);
        expect(titles).toContain(blogToDelete.title);
    });

    test("a blog post can be deleted with the correct token", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        const titles = blogsAtEnd.map(r => r.title);
        expect(titles).not.toContain(blogToDelete.title);
    });

    test("a post can be updated with the correct token", async() => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 42 })
            .set("Authorization", `Bearer ${token}`)
            .expect(204);

        const resultBlog = await api
            .get(`/api/blogs/${blogToUpdate.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(resultBlog.body.likes).toEqual(42);
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await mongoose.connection.close();
});

*/
