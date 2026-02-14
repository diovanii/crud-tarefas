describe("POST /users", () => {
  test("Create user", async () => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Tirar o lixo",
        description: "Pegar o saco e colocar na lata de lixo lá fora",
      }),
    });

    expect(response.status).toBe(201);
  });
});
