import { useEffect, useState } from "react";
import { Progress, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PATHS } from "../../router/paths";
import { useAppDispatch } from "../../redux/hooks";
import { setAchievementNew } from "../../redux/slices/achivementSlice";

export const RideProgress = () => {
  const naviagte = useNavigate();
  const [percent, setPercent] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [started, setStarted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ⏳ 3-sekundowa pauza przed rozpoczęciem
    const startDelay = setTimeout(() => setStarted(true), 8000);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 5000; // czas trwania progresu
    const interval = 50;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      if (current + step >= 100) {
        setTimeout(() => setShowButton(true), 500);
      }
      current += step;
      setPercent(Math.min(current, 100));
    }, interval);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      setPercent(100);
      setTimeout(() => setShowButton(true), 500); // małe opóźnienie, żeby pasek się domknął wizualnie
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [started]);

  if (!started && !showButton) {
    return <Progress percent={0} showInfo={false} strokeColor="#7B00FF" />;
  }

  return showButton ? (
    <Button
      shape="round"
      size="large"
      type="default"
      className="w-full"
      icon={<CloseOutlined />}
      onClick={() => {
        dispatch(setAchievementNew(true));
        naviagte(PATHS.HOME);
      }}
    >
      Zakończ
    </Button>
  ) : (
    <Progress percent={percent} showInfo={false} strokeColor="#7B00FF" />
  );
};
