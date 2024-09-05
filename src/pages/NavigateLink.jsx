import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";

function NavigateLink() {
  const [time, setTime] = useState(5);
  const [openButton, setOpenButton] = useState(false);

  useEffect(() => {
    if (time === 0) {
      setOpenButton(true);
      return;
    }

    const timerId = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div className="flex items-center justify-center h-screen">
      {time > 0 ? (
        <div className="text-center">
          <Spin size="large" />
          <h1 className="text-3xl font-bold mt-4">{time}</h1>
        </div>
      ) : (
        <Button type="primary" size="large" href="https://example.com">
          Open Link
        </Button>
      )}
    </div>
  );
}

export default NavigateLink;
