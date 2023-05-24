import { bingo_tasks } from "@prisma/client";

export const ScoreValidation = ({
    eachBingo = 10,
    eachCompletion = 5,
    tasks = []
}: {
    eachBingo?: number,
    eachCompletion?: number,
    tasks?: bingo_tasks[]
}) => {

    let score = 0;

    const bingoGrid = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 14, 15],       //  Star is 13
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 15],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 18, 23],
        [4, 9, 14, 19, 24],
        [5, 10, 15, 20, 25],
        [1, 7, 19, 25],
        [5, 9, 17, 21]
    ];

    const completed = tasks.filter(task => task.task_status === true).length;
    score = completed * eachCompletion;

    const bingoList = tasks.filter(task => task.task_status === true).map(task => Number(task.grid_number));

    for (const bingo of bingoGrid) {
        const bingoScore = bingo.filter(number => bingoList.includes(number)).length;
        if (bingoScore === bingo.length) {
            score += eachBingo;
        }
    }



    return score;
}
