describe("PATCH /tasks/:id", () => {
  test("Update a single task to completed", async () => {
    const response = await fetch(
      "http://localhost:3000/tasks/5b690aae-3ff9-4d0a-a259-d09891e6afb0/complete",
      {
        method: "PATCH",
      },
    );

    expect(response.status).toBe(204);
  });

  test("Update a single task with invalid id", async () => {
    const response = await fetch(
      "http://localhost:3000/tasks/d4ab5624-0df7-4bc7-854b-3677592f425b/complete",
      {
        method: "PATCH",
      },
    );

    expect(response.status).toBe(404);

    const responseBody = await response.json();

    expect(responseBody).toEqual({
      error: "O id informado não foi encontrado",
    });
  });
});
