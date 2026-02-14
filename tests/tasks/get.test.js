describe("GET /tasks", () => {
  test("List all tasks", async () => {
    const response = await fetch("http://localhost:3000/tasks");

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    console.log(responseBody);
  });

  test("List searched tasks", async () => {
    const response = await fetch("http://localhost:3000/tasks?search=Lixo");

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    console.log(responseBody);
  });
});
