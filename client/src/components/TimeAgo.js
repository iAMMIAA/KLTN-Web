import {useTimeAgo} from "../hooks/useTimeAgo";

export default function TimeAgo({date}) {
  const {days, hours, minutes, seconds} = useTimeAgo(date);

  if (parseInt(days)) {
    return (
      <span>
        {days} ngày.
      </span>
    );
  }

  if (parseInt(hours)) {
    return (
      <span>
        {hours} giờ.
      </span>
    );
  }

  if (parseInt(minutes)) {
    return (
      <span>
        {minutes} phút.
      </span>
    );
  }

  if (parseInt(seconds)) {
    return (
      <span>
        {seconds} giây.
      </span>
    );
  }
}