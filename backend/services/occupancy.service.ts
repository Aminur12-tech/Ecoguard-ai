export function calculateOccupancy(
    visitors: number,
    capacity: number
) {

    return Math.min(
        Math.round(
            (visitors / capacity) * 100
        ),
        100
    );
}