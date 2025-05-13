const Avatar = ({ name, size = 32 }) => {
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
    )}&background=random&size=${size}`;

    return (
        <img
            src={url}
            alt={`${name}'s avatar`}
            className="rounded-full"
            width={size}
            height={size}
        />
    );
};

export default Avatar;
