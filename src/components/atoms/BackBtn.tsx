import { Button } from "antd";
import { useNavigate } from "react-router";
import ARROW_LEFT from "@/assets/icons/arrow-left.svg";

export const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      shape="circle"
      size="large"
      icon={<img src={ARROW_LEFT} alt="Back" className="p-2" />}
      onClick={() => navigate(-1)}
    />
  );
};
