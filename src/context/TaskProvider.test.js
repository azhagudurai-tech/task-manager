import { it } from "vitest";
import { taskReducer } from "./TaskProvider";

describe("taskReducer", () => {
  it("adds a new task", () => {
    const initialState = [];
    const action = {
      type: "ADD_TASK",
      payload: { title: "Learn testing", priority: "high" },
    };

    const newState = taskReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].title).toBe("Learn testing");
    expect(newState[0].completed).toBe(false);
  });

  it("deletes an existing task", () => {
    const tasks = [
      { id: "abc", title: "test" },
      { id: "xyz", title: "other" },
    ];
    const action = {
      type: "DELETE_TASK",
      payload: "abc",
    };

    const newState = taskReducer(tasks, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].id).toBe("xyz");
  });

  it("toggle a task status", () => {
    const tasks = [
      { id: "abc", title: "test", completed: false }
    ];
    const action = {
      type: "TOGGLE_TASK",
      payload: "abc",
    };

    const newState = taskReducer(tasks, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].completed).toBe(true);
  });
});
