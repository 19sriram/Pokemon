const TaskComponent = () => {
    const mockCalendarData = [[[8, 22]], [[1, 2], [2, 4], [1, 3]]];
    function getConflict(intervals) {
        let sortedArray = intervals.map((item) => item.sort());
        for (let time of sortedArray) {
            if (time.length > 1) {
                time.sort((a, b) => a[0] - b[0]);
            }
            for (let i = 0; i < time.length - 1; i++) {
                const current = time[i];
                const next = time[i + 1];
                if (current[1] > next[0]) {
                    console.log('Conflict:', current, next);
                }
            }
        }
    }

    console.log(getConflict(mockCalendarData));
    return (
        <div>
            Task
        </div>
    )
}

export default TaskComponent;