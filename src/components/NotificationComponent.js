import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8888/ws"); // 백엔드 웹소켓 엔드포인트와 연결
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      // "/topic/notification" 주소를 구독하고, 메시지가 도착하면 상태를 업데이트
      stompClient.subscribe("/topic/notification", function (notification) {
        setNotifications((prev) => [...prev, notification.body]);
      });
    });

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <p key={index}>{notification}</p>
      ))}
    </div>
  );
};

export default NotificationComponent;
