import serialize from 'serialize-javascript';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
export const renderObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');
