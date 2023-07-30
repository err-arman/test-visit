function isValidDate(d: any) {
    return d instanceof Date && !isNaN(d as any);
  }
  export const getFormattedLocalDate = (date: Date) => {
    // convert visit_date to string like "2023-07-28"
    if (!isValidDate(date)) return "";
  
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().split("T")[0];
  }