import dateFormat from "dateformat";

export const formatDate = (date: string): string => {
    return dateFormat(date, "HH:MM  dS mmm yyyy");
};
