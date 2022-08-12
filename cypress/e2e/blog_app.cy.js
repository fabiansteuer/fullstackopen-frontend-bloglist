const user = {
  name: "Fabian",
  username: "fabian",
  password: "password",
};

const blogs = [
  {
    title: "Fabian's Blog",
    author: "Fabian",
    url: "https://fabiansteuer.com",
  },
  {
    title: "Fabian's Second Blog",
    author: "Fabian",
    url: "https://fabiansteuer.com",
  },
];

let createdBlogs = [];

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log In");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();

      cy.contains(user.name);
    });

    it("Fails with wrong credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get("html").should("not.contain", user.name);

      cy.get("#message")
        .should("contain", "Wrong credentials")
        .and("have.css", "background-color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in ", function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
      cy.visit("http://localhost:3000");
    });

    it("Adding a blog works", function () {
      const blog = blogs[0];
      cy.contains("Add blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#add-blog-button").click();

      cy.contains(blog.title);
    });

    describe("With one blog", function () {
      beforeEach(function () {
        createdBlogs = [];
        cy.createBlog(blogs[0]).then((blog) => createdBlogs.push(blog));
        cy.visit("http://localhost:3000");
      });

      it("It can be liked", function () {
        cy.get("#show-blog-button").click();
        cy.get("#like-blog-button").click();

        cy.contains("1 likes");
      });

      it("It can be deleted by the user who added it", function () {
        cy.get("#show-blog-button").click();
        cy.get("#remove-blog-button").click();

        cy.get("html").should("not.contain", blogs[0].title);
      });

      describe("After creating a second blog", function () {
        beforeEach(function () {
          cy.createBlog(blogs[1]).then((blog) => {
            createdBlogs.push(blog);
          });
          cy.visit("http://localhost:3000");
        });

        it("Blogs are sorted by the number of likes", function () {
          // Like first blog once
          cy.get(`#${createdBlogs[0].id}`).within(() => {
            cy.get("#show-blog-button").click();
            cy.get("#like-blog-button").click();
          });

          cy.get("#blog-list").should("contain", "1 likes");

          // Like second blog twice
          cy.get(`#${createdBlogs[1].id}`).within(() => {
            cy.get("#show-blog-button").click();
            cy.get("#like-blog-button").click();
            cy.get("#like-blog-button").click();
          });

          cy.get("#blog-list").should("contain", "2 likes");

          // Expect second blog before first blog now
          cy.get("#blog-list").within(() => {
            cy.get("h3").each((item, index) => {
              expect(item.text()).to.eq(blogs[index === 0 ? 1 : 0].title);
            });
          });
        });
      });
    });
  });
});
