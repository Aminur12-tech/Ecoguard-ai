export function calculateEcoScore(input: {
    distanceMeters: number;
    durationSeconds: number;
    rainMm: number;
    rainProbability: number;

}) {
    const distanceKm = input.distanceMeters / 1000;
    const durationMin =  input.durationSeconds / 60;

    const distancePenalty = distanceKm * 0.25;
    const durationPenalty = durationMin * 0.12;
    const rainPenalty = input.rainMm * 7;
    const rainProbPenalty = input.rainProbability * 0.08;

    const ecoScore = Math.max(
        0,
        100 - distancePenalty - durationPenalty - rainPenalty - rainProbPenalty
    );

    const estimatedCarbonKg = +(distanceKm * 0.12).toFixed(2);

    return {
        ecoScore: +ecoScore.toFixed(2),
        distanceKm: +distanceKm.toFixed(2),
        durationMin: +durationMin.toFixed(0),
        estimatedCarbonKg
    };
}