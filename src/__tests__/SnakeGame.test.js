import { getNextQueue } from "../../snake/SnakeGame";

test("Get Next Queue", () => {
    let direction = [1, 0];
    let queue = [[100, 100]];
    expect(
        getNextQueue(queue, direction))
        .toBe([[120, 100]]);
});