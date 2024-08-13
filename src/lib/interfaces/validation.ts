import { z } from 'zod';
import { isValid, parseISO } from 'date-fns';

export const dateSchema = z.string().refine(val => {
    const parsedDate = parseISO(val);
    return isValid(parsedDate);
}, {
    message: "Invalid date format. Use 'YYYY-MM-DD'"
});

export const timeSchema = z.string().refine(val => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timeRegex.test(val);
}, {
    message: "Invalid time format. Use 'HH:MM:SS'"
});
