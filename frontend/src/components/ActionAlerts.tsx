type Props = {
    alerts: {
        type: string;
        title: string;
    }[];
};

function ActionAlerts({
    alerts,
}: Props) {

    const getAlertStyle = (
        type: string
    ) => {

        switch (
            type.toLowerCase()
        ) {

            case "danger":
                return {
                    bg: "bg-red-50",
                    border:
                        "border-red-500",
                    text:
                        "text-red-700",
                    icon: "🚨",
                };

            case "warning":
                return {
                    bg:
                        "bg-yellow-50",
                    border:
                        "border-yellow-500",
                    text:
                        "text-yellow-700",
                    icon: "⚠️",
                };

            case "success":
                return {
                    bg:
                        "bg-green-50",
                    border:
                        "border-green-500",
                    text:
                        "text-green-700",
                    icon: "✅",
                };

            default:
                return {
                    bg:
                        "bg-blue-50",
                    border:
                        "border-blue-500",
                    text:
                        "text-blue-700",
                    icon: "ℹ️",
                };
        }
    };

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            "
        >

            <div
                className="
                flex
                items-center
                justify-between
                mb-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-bold
                    "
                >
                    Action Alerts
                </h3>

                <span
                    className="
                    text-3xl
                    "
                >
                    🔔
                </span>

            </div>

            <div
                className="
                space-y-4
                "
            >

                {alerts.map(
                    (
                        alert,
                        index
                    ) => {

                        const style =
                            getAlertStyle(
                                alert.type
                            );

                        return (

                            <div
                                key={index}
                                className={`
                                ${style.bg}
                                border-l-4
                                ${style.border}
                                p-4
                                rounded-lg
                                `}
                            >

                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-3
                                    "
                                >

                                    <span
                                        className="
                                        text-xl
                                        "
                                    >
                                        {
                                            style.icon
                                        }
                                    </span>

                                    <p
                                        className={`
                                        font-medium
                                        ${style.text}
                                        `}
                                    >
                                        {
                                            alert.title
                                        }
                                    </p>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}

export default ActionAlerts;