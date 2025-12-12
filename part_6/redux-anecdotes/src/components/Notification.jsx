import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;





/*
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>render here notification...</div>
}

export default Notification
*/
