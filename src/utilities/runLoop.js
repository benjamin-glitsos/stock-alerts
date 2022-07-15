export default (fn, intervalDays, isDevelopmentMode) => {
    const oneSecond = 1 * 1000;
    const days = intervalDays * 60 * 60 * 1000;
    const interval = isDevelopmentMode ? oneSecond : days;

    setInterval(fn, interval);
};
