export const numberFormatter = new Intl.NumberFormat("en-GB", {
  notation: "compact",
  compactDisplay: "short",
});

export const dateDiff = (x) => {
  let now = new Date().getTime();
  let postTime = new Date(x).getTime();
  let diff = (now - postTime) / 1000;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    if (diff < 1 && diff > 0) {
      return "1 second ago";
    }
    if (diff >= 2) {
      return `${Math.floor(diff)} seconds ago`;
    }
  }

  if (diff > minute && diff < hour) {
    let interval = diff / minute;
    if (interval > 2) {
      return `${Math.floor(interval)} minutes ago`;
    } else {
      return "1 minute ago";
    }
  }

  if (diff > hour && diff < day) {
    let interval = diff / hour;
    if (interval >= 2) {
      return `${Math.floor(interval)} hours ago`;
    } else {
      return "1 hour ago";
    }
  }

  if (diff > day && diff < week) {
    let interval = diff / day;
    if (interval >= 2) {
      return `${Math.floor(interval)} days ago`;
    } else {
      return "1 day ago";
    }
  }

  if (diff > week && diff < month) {
    let interval = diff / week;
    if (interval >= 2) {
      return `${Math.floor(interval)} weeks ago`;
    } else {
      return "1 week ago";
    }
  }

  if (diff > month && diff < year) {
    let interval = diff / month;
    if (interval >= 2) {
      return `${Math.floor(interval)} months ago`;
    } else {
      return "1 month ago";
    }
  }

  if (diff > year) {
    let interval = diff / year;
    if (interval >= 2) {
      return `${Math.floor(interval)} years ago`;
    } else {
      return "1 year ago";
    }
  }
};

const timeFormat = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours =
    Math.floor(timer / 3600) < 100
      ? `0${Math.floor(timer / 3600)}`.slice(-2)
      : `${Math.floor(timer / 3600)}`.slice(-3);
  return getHours > 0
    ? `${getHours > 0 && getHours}:${getMinutes}:${getSeconds}`
    : getMinutes > 9
    ? `${getMinutes}:${getSeconds}`
    : `${Number(getMinutes).toString()}:${getSeconds}`;
};

export const vidDuration = (duration) => {
  const pattern = /(?:([\d]+)D)?T(?:([\d]+)H)?(?:([\d]+)M)?(?:([\d]+)S)/;
  const groups = duration.match(pattern);
  if (groups !== null) {
    const days = groups[1] === undefined ? 0 : parseInt(groups[1]);
    const hours = groups[2] === undefined ? 0 : parseInt(groups[2]);
    const minutes = groups[3] === undefined ? 0 : parseInt(groups[3]);
    const seconds = groups[4] === undefined ? 0 : parseInt(groups[4]);
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    return timeFormat(totalSeconds);
  }
};

export default vidDuration;
