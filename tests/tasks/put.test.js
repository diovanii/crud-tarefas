describe("PUT /tasks/[id]", () => {
  test("Update a single task", async () => {
    const response = await fetch(
      "http://localhost:3000/tasks/a5d0e089-9434-4125-a389-e562de366e83",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Arumar a pia",
          description: "Lavar a louça e guardar os talheres",
        }),
      },
    );

    expect(response.status).toBe(204);
  });
});
