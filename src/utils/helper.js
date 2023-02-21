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

