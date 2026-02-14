describe("DELETE /users/[id]", () => {
  test("Delete um usuário pelo id", async () => {
    const response = await fetch(
      "http://localhost:3000/tasks/87ffd0bc-03b3-4660-81e9-022b5215950d",
      {
        method: "DELETE",
      },
    );

    expect(response.status).toBe(204);
  });
});
