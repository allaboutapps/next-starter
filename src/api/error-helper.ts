type Error = {
    data: any;
    options: { status: number };
};

export const NotFound: Error = {
    data: { message: "Not Found" },
    options: { status: 404 },
};

export const Unauthorized: Error = {
    data: { message: "Unauthorized" },
    options: { status: 401 },
};

export const NoToken: Error = {
    data: { message: "No token" },
    options: { status: 409 },
};

export const errorResponse = (error: Error) => {
    return Response.json(error.data, error.options);
};
