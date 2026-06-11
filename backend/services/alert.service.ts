export function generateAlerts(
    visitors: number,
    rainfall: number,
    occupancy: number
) {

    const alerts = [];

    if (visitors > 300) {

        alerts.push({
            type: "warning",
            title:
                "High Crowd Expected"
        });
    }

    if (rainfall > 20) {

        alerts.push({
            type: "warning",
            title:
                "Heavy Rain Expected"
        });
    }

    if (occupancy > 90) {

        alerts.push({
            type: "danger",
            title:
                "Homestays Nearly Full"
        });
    }

    if (alerts.length === 0) {

        alerts.push({
            type: "success",
            title:
                "Tourism Flow Stable"
        });
    }

    return alerts;
}