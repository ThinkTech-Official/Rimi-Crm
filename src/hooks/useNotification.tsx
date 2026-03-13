import { useCallback, useRef, useState } from "react";
import Notification, { NotificationProps } from "../components/Notification";
import { v4 as uuidv4 } from "uuid";

type Position =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";
interface NotificationWithId extends NotificationProps {
  id: string;
}
const useNotification = (position: Position = "top-center") => {
  const [notifications, setNotifications] = useState<NotificationWithId[]>([]);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
  };
  const triggerNotification = useCallback(
    ({
      duration = 5000,
      animation = "slide-down",
      ...rest
    }: Omit<NotificationProps, "onClose" | "animation"> & { duration?: number;  animation?: any; }) => {
      const id = uuidv4();
      const newNotification: NotificationWithId = {
        ...rest,
        id,
        animation,
        duration,
        onClose: () => removeNotification(id),
      };
      setNotifications((prev) => [newNotification, ...prev]);

      timersRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, duration);
    },
    []
  );

  const NotificationComponent = (
    <div className={`fixed z-50 space-y-3 ${position}`}>
      {notifications.map((n) => (
        <Notification key={n.id} {...n} />
      ))}
    </div>
  );
  return { triggerNotification, NotificationComponent };
};

export default useNotification;
