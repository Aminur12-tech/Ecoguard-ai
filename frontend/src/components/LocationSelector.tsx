interface Props {

    location: string;

    onChange: (
        location: string
    ) => void;
}

function LocationSelector({
    location,
    onChange
}: Props) {

    const locations = [
        "Kaziranga",
        "Majuli",
        "Manas",
        "Pobitora",
        "Guwahati",
        "Haflong"
    ];

    return (

        <div className="mb-6">

            <label
                className="
                block
                font-semibold
                mb-2
                "
            >
                Select Destination
            </label>

            <select
                value={location}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                className="
                w-full
                md:w-80
                p-3
                rounded-xl
                border
                "
            >

                {locations.map(
                    (item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )
                )}

            </select>

        </div>
    );
}

export default LocationSelector;